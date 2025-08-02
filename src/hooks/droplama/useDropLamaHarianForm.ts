import { useState } from "react";
import { Alert } from "react-native";
import { dropLamaHarianService } from "../../services/droplama/dropLamaHarianService";
import { storageService } from "../../services/storage/storageService";
import { validateDropLamaHarianForm } from "../../utils/dropLamaHarianValidation";

interface DropLamaHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  saldo: string;
  angsuran: string;
  tabungan: string;
}

const initialFormData: DropLamaHarianFormData = {
  foto: undefined,
  nama: "",
  alamat: "",
  saldo: "",
  angsuran: "",
  tabungan: "",
};

export const useDropLamaHarianForm = () => {
  const [formData, setFormData] =
    useState<DropLamaHarianFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof DropLamaHarianFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleCurrencyChange = (
    field: "saldo" | "angsuran" | "tabungan",
    value: string
  ) => {
    const formatted = formatCurrencyInput(value);
    updateField(field, formatted);
  };

  const validateForm = (): boolean => {
    const validation = validateDropLamaHarianForm(formData);
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
        console.log("Uploading photo to droplama-photos bucket...");
        const fileName = `drop-lama-harian-${Date.now()}.jpg`;
        const uploadResult = await storageService.uploadDropLamaPhoto(
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
          "Photo uploaded successfully to droplama-photos:",
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

      // Parse currency values
      const parseCurrency = (value: string): number => {
        return parseInt(value.replace(/[^\d]/g, "")) || 0;
      };

      // Prepare data for submission
      const submitData = {
        foto: photoUrl,
        nama: formData.nama.trim(),
        alamat: formData.alamat.trim(),
        saldo: parseCurrency(formData.saldo),
        angsuran: parseCurrency(formData.angsuran),
        tabungan: parseCurrency(formData.tabungan),
      };

      console.log("Submitting drop lama harian:", submitData);

      const { data, error } = await dropLamaHarianService.createDropLamaHarian(
        submitData
      );

      if (error) {
        console.error("Error creating drop lama harian:", error);

        // Clean up uploaded photo if main operation failed
        if (photoUrl && photoUrl !== formData.foto) {
          try {
            await storageService.deleteDropLamaPhoto(photoUrl);
          } catch (cleanupError) {
            console.error("Error cleaning up photo:", cleanupError);
          }
        }

        return false;
      }

      console.log("Drop lama harian created successfully:", data);

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
  };

  const isFormValid = () => {
    return validateForm();
  };

  return {
    formData,
    loading,
    updateField,
    updatePhoto,
    handleCurrencyChange,
    handleSubmit,
    resetForm,
    isFormValid,
  };
};
