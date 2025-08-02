import { useState } from "react";

interface DropMingguanFormData {
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: string;
}

const initialFormData: DropMingguanFormData = {
  foto: undefined,
  nama: "",
  alamat: "",
  pinjaman: "",
};

export const useDropMingguanForm = () => {
  const [formData, setFormData] =
    useState<DropMingguanFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof DropMingguanFormData, value: string) => {
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

  const handleLoanAmountChange = (value: string) => {
    const formatted = formatCurrencyInput(value);
    updateField("pinjaman", formatted);
  };

  const validateForm = (): boolean => {
    return !!(
      formData.nama.trim() &&
      formData.alamat.trim() &&
      formData.pinjaman.trim()
    );
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return false;
    }

    setLoading(true);
    try {
      // TODO: Implement drop mingguan service
      console.log("Submitting drop mingguan:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    handleLoanAmountChange,
    handleSubmit,
    resetForm,
    isFormValid,
  };
};
