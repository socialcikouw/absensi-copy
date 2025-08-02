import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

export interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  updated_at: string;
}

export interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

export interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
