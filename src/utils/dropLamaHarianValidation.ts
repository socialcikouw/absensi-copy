import {
  DropLamaHarianFormData,
  ValidationResult,
} from "../types/droplamaharian";
import { parseCurrency } from "./dropBaruHarianCalculations";

export const validateDropLamaHarianForm = (
  formData: DropLamaHarianFormData
): ValidationResult => {
  // Check nama
  if (!formData.nama.trim()) {
    return { isValid: false, message: "Nama harus diisi" };
  }

  if (formData.nama.trim().length < 3) {
    return { isValid: false, message: "Nama minimal 3 karakter" };
  }

  // Check alamat
  if (!formData.alamat.trim()) {
    return { isValid: false, message: "Alamat harus diisi" };
  }

  if (formData.alamat.trim().length < 3) {
    return { isValid: false, message: "Alamat minimal 3 karakter" };
  }

  // Check saldo
  const saldoNumber = parseCurrency(formData.saldo);
  if (saldoNumber < 0) {
    return { isValid: false, message: "Saldo tidak boleh negatif" };
  }

  // Check angsuran
  const angsuranNumber = parseCurrency(formData.angsuran);
  if (angsuranNumber < 0) {
    return { isValid: false, message: "Angsuran tidak boleh negatif" };
  }

  // Check tabungan
  const tabunganNumber = parseCurrency(formData.tabungan);
  if (tabunganNumber < 0) {
    return { isValid: false, message: "Tabungan tidak boleh negatif" };
  }

  return { isValid: true };
};
