import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { AuthFormData } from "../../types/auth";
import {
  validateLoginForm,
  validateRegisterForm,
} from "../../utils/validation";

export const useLoginForm = (onSwitchToRegister: () => void) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      Alert.alert("Error", validation.message || "Form tidak valid");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        Alert.alert("Login Failed", error.message || "Login gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    handleLogin,
    updateField,
    onSwitchToRegister,
  };
};

export const useRegisterForm = (onSwitchToLogin: () => void) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      Alert.alert("Error", validation.message || "Form tidak valid");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password);
      if (error) {
        Alert.alert("Registration Failed", error.message || "Registrasi gagal");
      } else {
        Alert.alert(
          "Success",
          "Registrasi berhasil! Silakan check email Anda untuk verifikasi.",
          [{ text: "OK", onPress: onSwitchToLogin }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    handleRegister,
    updateField,
    onSwitchToLogin,
  };
};
