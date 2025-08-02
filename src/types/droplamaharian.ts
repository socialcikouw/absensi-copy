export interface DropLamaHarianData {
  id?: string; // UUID in Supabase
  profile_id: string; // UUID reference to profiles
  foto?: string;
  nama: string;
  alamat: string;
  saldo: number;
  angsuran: number;
  tabungan: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDropLamaHarianData {
  foto?: string;
  nama: string;
  alamat: string;
  saldo: number;
  angsuran: number;
  tabungan: number;
}

export interface DropLamaHarianFormData {
  foto?: string;
  nama: string;
  alamat: string;
  saldo: string; // String for form input, will be converted to number
  angsuran: string; // String for form input, will be converted to number
  tabungan: string; // String for form input, will be converted to number
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
