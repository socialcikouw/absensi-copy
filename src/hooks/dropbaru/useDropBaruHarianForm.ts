import { useState } from "react";
import { Alert } from "react-native";
import { dropBaruHarianHybridService } from "../../services/dropbaru/DropBaruHarianHybridService";
import {
  calculateDropBaruHarianValues,
  validateDropBaruHarianForm,
} from "../../utils";
import { parseRibuan } from "../../utils/formatRibuan";

interface DropBaruHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: string;
}

interface UseDropBaruHarianFormReturn {
  formData: DropBaruHarianFormData;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  setFormData: React.Dispatch<React.SetStateAction<DropBaruHarianFormData>>;
  handleInputChange: (
    field: keyof DropBaruHarianFormData,
    value: string
  ) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export const useDropBaruHarianForm = (): UseDropBaruHarianFormReturn => {
  const [formData, setFormData] = useState<DropBaruHarianFormData>({
    nama: "",
    alamat: "",
    pinjaman: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof DropBaruHarianFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate form data
      const validation = validateDropBaruHarianForm(formData);
      if (!validation.isValid) {
        setError(validation.message || "Data tidak valid");
        return;
      }

      // Parse pinjaman to number (menggunakan parseRibuan untuk handle format ribuan)
      const pinjamanNumber = parseRibuan(formData.pinjaman);

      // Calculate other values
      const calculations = calculateDropBaruHarianValues(pinjamanNumber);

      // Prepare data for service
      const serviceData = {
        foto: formData.foto,
        nama: formData.nama.trim(),
        alamat: formData.alamat.trim(),
        pinjaman: pinjamanNumber,
      };

      // Submit to service
      const response = await dropBaruHarianHybridService.create(serviceData);

      if (response.success) {
        Alert.alert("Sukses", "Data drop baru harian berhasil ditambahkan", [
          {
            text: "OK",
            onPress: () => resetForm(),
          },
        ]);
      } else {
        setError(response.error || "Gagal menambahkan data");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Terjadi kesalahan saat menambahkan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      alamat: "",
      pinjaman: "",
    });
    setError(null);
  };

  return {
    formData,
    isLoading,
    isSubmitting,
    error,
    setFormData,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
