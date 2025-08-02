import {
  DropBaruHarianFormData,
  ValidationResult,
} from "../types/dropbaruharian";
import { parseCurrency } from "./dropBaruHarianCalculations";

export const validateDropBaruHarianForm = (
  formData: DropBaruHarianFormData
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

  // Check pinjaman
  if (!formData.pinjaman.trim()) {
    return { isValid: false, message: "Pinjaman harus diisi" };
  }

  const pinjamanNumber = parseCurrency(formData.pinjaman);
  if (pinjamanNumber <= 0) {
    return { isValid: false, message: "Pinjaman harus lebih besar dari 0" };
  }

  if (pinjamanNumber < 100000) {
    return { isValid: false, message: "Pinjaman minimal Rp 100.000" };
  }

  return { isValid: true };
};
