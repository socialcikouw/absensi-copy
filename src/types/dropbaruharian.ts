export interface DropBaruHarianData {
  id?: string; // UUID in Supabase
  profile_id: string; // UUID reference to profiles
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: number;
  saldo: number; // Auto-calculated: 120% dari pinjaman
  angsuran: number; // Auto-calculated: 5% dari pinjaman
  tabungan: number; // Auto-calculated: 5% dari pinjaman
  created_at?: string;
  updated_at?: string;
}

export interface CreateDropBaruHarianData {
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: number;
  // saldo, angsuran, tabungan akan di-auto-calculate oleh database
}

export interface DropBaruHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  pinjaman: string; // String for form input, will be converted to number
}

export interface DropBaruHarianCalculations {
  angsuran: number;
  tabungan: number;
  saldo: number;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
