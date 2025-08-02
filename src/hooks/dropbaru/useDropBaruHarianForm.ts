import { useState } from "react";
import { Alert } from "react-native";
import { dropBaruHarianService } from "../../services/dropbaru/dropBaruHarianService";
import { storageService } from "../../services/storage/storageService";
import {
  calculateDropBaruHarianValues,
  parseCurrency,
} from "../../utils/dropBaruHarianCalculations";
import { validateDropBaruHarianForm } from "../../utils/dropBaruHarianValidation";

interface DropBaruHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: string;
}

interface DropBaruHarianCalculations {
  angsuran: number;
  tabungan: number;
  saldo: number;
}

const initialFormData: DropBaruHarianFormData = {
  foto: undefined,
  nama: "",
  alamat: "",
  pinjaman: "",
};

const initialCalculations: DropBaruHarianCalculations = {
  angsuran: 0,
  tabungan: 0,
  saldo: 0,
};

export const useDropBaruHarianForm = () => {
  const [formData, setFormData] =
    useState<DropBaruHarianFormData>(initialFormData);
  const [calculations, setCalculations] =
    useState<DropBaruHarianCalculations>(initialCalculations);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof DropBaruHarianFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-calculate when pinjaman changes
    if (field === "pinjaman" && value) {
      const pinjamanNumber = parseCurrency(value);
      if (pinjamanNumber > 0) {
        const newCalculations = calculateDropBaruHarianValues(pinjamanNumber);
        setCalculations(newCalculations);
      } else {
        setCalculations(initialCalculations);
      }
    }
  };

  const updatePhoto = (photoUri: string) => {
    setFormData((prev) => ({
      ...prev,
      foto: photoUri,
    }));
  };

  const formatCurrencyInput = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format with thousand separators
    if (numericValue) {
      return new Intl.NumberFormat("id-ID").format(parseInt(numericValue));
    }

    return "";
  };

  const handleLoanAmountChange = (value: string) => {
    const formatted = formatCurrencyInput(value);
    updateField("pinjaman", formatted);
  };

  const validateForm = (): boolean => {
    const validation = validateDropBaruHarianForm(formData);
    return validation.isValid;
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return false;
    }

    setLoading(true);
    try {
      let photoUrl = formData.foto;

      // Upload photo if exists
      if (formData.foto && formData.foto.startsWith("file://")) {
        console.log("Uploading photo to dropbaru-photos bucket...");

        // Additional validation sebelum upload
        console.log("Photo URI to upload:", formData.foto);

        const fileName = `drop-baru-harian-${Date.now()}.jpg`;
        const uploadResult = await storageService.uploadDropBaruPhoto(
          formData.foto,
          fileName
        );

        if (uploadResult.error) {
          console.error("Photo upload failed:", uploadResult.error);
          Alert.alert(
            "Error Upload Foto",
            uploadResult.error || "Gagal mengupload foto. Silakan coba lagi."
          );
          return false;
        }

        photoUrl = uploadResult.data?.publicUrl;
        console.log(
          "Photo uploaded successfully to dropbaru-photos:",
          photoUrl
        );

        // Test apakah URL foto bisa diakses
        if (photoUrl) {
          try {
            const urlTest = await storageService.testPhotoUrl(photoUrl);
            if (!urlTest.accessible) {
              console.warn(
                "WARNING: Photo URL may not be accessible:",
                urlTest.error
              );
              // Tetap lanjutkan karena mungkin perlu waktu untuk policy terapply
            }
          } catch (testError) {
            console.warn("Could not test photo URL accessibility:", testError);
            // Tidak perlu stop proses karena ini hanya test
          }
        }
      }

      // Prepare data for submission
      const submitData = {
        foto: photoUrl,
        nama: formData.nama.trim(),
        alamat: formData.alamat.trim(),
        pinjaman: parseCurrency(formData.pinjaman),
      };

      console.log("Submitting drop baru harian:", submitData);

      const { data, error } = await dropBaruHarianService.createDropBaruHarian(
        submitData
      );

      if (error) {
        console.error("Error creating drop baru harian:", error);

        // Clean up uploaded photo if main operation failed
        if (photoUrl && photoUrl !== formData.foto) {
          try {
            await storageService.deleteDropBaruPhoto(photoUrl);
          } catch (cleanupError) {
            console.error("Error cleaning up photo:", cleanupError);
          }
        }

        return false;
      }

      console.log("Drop baru harian created successfully:", data);

      // Reset form on success
      resetForm();
      return true;
    } catch (error) {
      console.error("Unexpected error during submission:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCalculations(initialCalculations);
  };

  const isFormValid = () => {
    return validateForm();
  };

  return {
    formData,
    calculations,
    loading,
    updateField,
    updatePhoto,
    handleLoanAmountChange,
    handleSubmit,
    resetForm,
    isFormValid,
  };
};
