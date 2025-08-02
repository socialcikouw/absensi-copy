import React from "react";
import { useAuthNavigation } from "../../hooks/auth/useAuthNavigation";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

export const AuthScreen: React.FC = () => {
  const { isLogin, switchToLogin, switchToRegister } = useAuthNavigation();

  return isLogin ? (
    <LoginScreen onSwitchToRegister={switchToRegister} />
  ) : (
    <RegisterScreen onSwitchToLogin={switchToLogin} />
  );
};
