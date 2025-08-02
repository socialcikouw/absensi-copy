import { DropLamaHarianFormData, ValidationResult } from "../types";
import { parseRibuan } from "./formatRibuan";
import {
  validateNonNegative,
  validateRequiredWithMinLength,
} from "./validation";

export const validateDropLamaHarianForm = (
  formData: DropLamaHarianFormData
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

  // Check saldo
  const saldoNumber = parseRibuan(formData.saldo);
  const saldoValidation = validateNonNegative(saldoNumber, "Saldo");
  if (!saldoValidation.isValid) {
    return saldoValidation;
  }

  // Check angsuran
  const angsuranNumber = parseRibuan(formData.angsuran);
  const angsuranValidation = validateNonNegative(angsuranNumber, "Angsuran");
  if (!angsuranValidation.isValid) {
    return angsuranValidation;
  }

  // Check tabungan
  const tabunganNumber = parseRibuan(formData.tabungan);
  const tabunganValidation = validateNonNegative(tabunganNumber, "Tabungan");
  if (!tabunganValidation.isValid) {
    return tabunganValidation;
  }

  return { isValid: true };
};
