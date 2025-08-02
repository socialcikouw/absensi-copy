import { DropBaruHarianFormData, ValidationResult } from "../types";
import { parseRibuan } from "./formatRibuan";
import {
  validateMinValue,
  validatePositive,
  validateRequired,
  validateRequiredWithMinLength,
} from "./validation";

export const validateDropBaruHarianForm = (
  formData: DropBaruHarianFormData
): ValidationResult => {
  // Check nama
  const namaValidation = validateRequiredWithMinLength(
    formData.nama,
    3,
    "Nama"
  );
  if (!namaValidation.isValid) {
    return namaValidation;
  }

  // Check alamat
  const alamatValidation = validateRequiredWithMinLength(
    formData.alamat,
    3,
    "Alamat"
  );
  if (!alamatValidation.isValid) {
    return alamatValidation;
  }

  // Check pinjaman
  const pinjamanRequired = validateRequired(formData.pinjaman, "Pinjaman");
  if (!pinjamanRequired.isValid) {
    return pinjamanRequired;
  }

  const pinjamanNumber = parseRibuan(formData.pinjaman);
  const pinjamanPositive = validatePositive(pinjamanNumber, "Pinjaman");
  if (!pinjamanPositive.isValid) {
    return pinjamanPositive;
  }

  const pinjamanMinValue = validateMinValue(pinjamanNumber, 100000, "Pinjaman");
  if (!pinjamanMinValue.isValid) {
    return pinjamanMinValue;
  }

  return { isValid: true };
};
