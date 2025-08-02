import { useState } from "react";
import { Alert } from "react-native";
import { dropLamaHarianHybridService } from "../../services/droplama/DropLamaHarianHybridService";
import { validateDropLamaHarianForm } from "../../utils";
import { parseRibuan } from "../../utils/formatRibuan";

interface DropLamaHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  saldo: string;
  angsuran: string;
  tabungan: string;
}

interface UseDropLamaHarianFormReturn {
  formData: DropLamaHarianFormData;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  setFormData: React.Dispatch<React.SetStateAction<DropLamaHarianFormData>>;
  handleInputChange: (
    field: keyof DropLamaHarianFormData,
    value: string
  ) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export const useDropLamaHarianForm = (): UseDropLamaHarianFormReturn => {
  const [formData, setFormData] = useState<DropLamaHarianFormData>({
    nama: "",
    alamat: "",
    saldo: "",
    angsuran: "",
    tabungan: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof DropLamaHarianFormData,
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
      const validation = validateDropLamaHarianForm(formData);
      if (!validation.isValid) {
        setError(validation.message || "Data tidak valid");
        return;
      }

      // Parse numeric values (menggunakan parseRibuan untuk handle format ribuan)
      const saldoNumber = parseRibuan(formData.saldo);
      const angsuranNumber = parseRibuan(formData.angsuran);
      const tabunganNumber = parseRibuan(formData.tabungan);

      // Prepare data for service
      const serviceData = {
        foto: formData.foto,
        nama: formData.nama.trim(),
        alamat: formData.alamat.trim(),
        saldo: saldoNumber,
        angsuran: angsuranNumber,
        tabungan: tabunganNumber,
      };

      // Submit to service
      const response = await dropLamaHarianHybridService.create(serviceData);

      if (response.success) {
        Alert.alert("Sukses", "Data drop lama harian berhasil ditambahkan", [
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
      saldo: "",
      angsuran: "",
      tabungan: "",
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
