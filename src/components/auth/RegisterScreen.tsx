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
import { useRegisterForm } from "../../hooks/auth/useAuthForm";
import { authStyles } from "../../styles/authStyles";
import { RegisterScreenProps } from "../../types/auth";

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSwitchToLogin,
}) => {
  const { formData, loading, handleRegister, updateField } =
    useRegisterForm(onSwitchToLogin);

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>{UI_TEXT.REGISTER_TITLE}</Text>
        <Text style={authStyles.subtitle}>{UI_TEXT.REGISTER_SUBTITLE}</Text>

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
            placeholder={UI_TEXT.PASSWORD_HINT_PLACEHOLDER}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>{UI_TEXT.CONFIRM_PASSWORD_LABEL}</Text>
          <TextInput
            style={authStyles.input}
            value={formData.confirmPassword || ""}
            onChangeText={(value) => updateField("confirmPassword", value)}
            placeholder={UI_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[
            authStyles.button,
            authStyles.registerButton,
            loading && authStyles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={authStyles.buttonText}>{UI_TEXT.REGISTER_BUTTON}</Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.switchContainer}>
          <Text style={authStyles.switchText}>{UI_TEXT.HAVE_ACCOUNT}</Text>
          <TouchableOpacity onPress={onSwitchToLogin} disabled={loading}>
            <Text style={authStyles.switchLink}>{UI_TEXT.LOGIN_LINK}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
