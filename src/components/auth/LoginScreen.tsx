import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UI_TEXT } from "../../constants/messages";
import { useLoginForm } from "../../hooks/auth/useAuthForm";
import { authStyles } from "../../styles/authStyles";
import { LoginScreenProps } from "../../types/auth";

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSwitchToRegister,
}) => {
  const { formData, loading, handleLogin, updateField } =
    useLoginForm(onSwitchToRegister);

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>{UI_TEXT.LOGIN_TITLE}</Text>
        <Text style={authStyles.subtitle}>{UI_TEXT.LOGIN_SUBTITLE}</Text>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>{UI_TEXT.EMAIL_LABEL}</Text>
          <TextInput
            style={authStyles.input}
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>{UI_TEXT.PASSWORD_LABEL}</Text>
          <TextInput
            style={authStyles.input}
            value={formData.password}
            onChangeText={(value) => updateField("password", value)}
            placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[authStyles.button, loading && authStyles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={authStyles.buttonText}>{UI_TEXT.LOGIN_BUTTON}</Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.switchContainer}>
          <Text style={authStyles.switchText}>{UI_TEXT.NO_ACCOUNT}</Text>
          <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
            <Text style={authStyles.switchLink}>{UI_TEXT.REGISTER_LINK}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
