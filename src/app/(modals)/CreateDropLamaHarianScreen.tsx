import React from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NASABAH_MESSAGES } from "../../constants/messages";
import { useDropLamaHarianForm } from "../../hooks/droplama/useDropLamaHarianForm";
import { useImagePicker } from "../../hooks/shared/useImagePicker";
import { nasabahStyles } from "../../styles/nasabahStyles";

export default function CreateDropLamaHarianScreen() {
  const {
    formData,
    loading,
    updateField,
    updatePhoto,
    handleCurrencyChange,
    handleSubmit,
    isFormValid,
  } = useDropLamaHarianForm();

  // Image picker logic
  const { loading: imageLoading, pickImageWithOptions } = useImagePicker();

  const handleImagePick = async () => {
    const result = await pickImageWithOptions();
    if (result.uri && !result.error) {
      updatePhoto(result.uri);
    } else if (result.error) {
      console.error("Image picker error:", result.error);
      // You could show an alert here if needed
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={nasabahStyles.container}>
        <ScrollView
          style={nasabahStyles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Form Section */}
          <View style={nasabahStyles.formSection}>
            <Text style={nasabahStyles.sectionTitle}>
              Data Drop Lama Harian
            </Text>

            {/* Photo Input */}
            <View style={nasabahStyles.photoContainer}>
              <TouchableOpacity
                style={nasabahStyles.photoButton}
                onPress={handleImagePick}
                activeOpacity={0.7}
                disabled={imageLoading}
              >
                {formData.foto ? (
                  <Image
                    source={{ uri: formData.foto }}
                    style={nasabahStyles.photoImage}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Text style={nasabahStyles.photoIcon}>📷</Text>
                    <Text style={nasabahStyles.photoText}>
                      {NASABAH_MESSAGES.PLACEHOLDERS.PHOTO}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Name Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.NASABAH_NAME}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={nasabahStyles.input}
                value={formData.nama}
                onChangeText={(value) => updateField("nama", value)}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.NAME}
                editable={!loading}
              />
            </View>

            {/* Address Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.NASABAH_ADDRESS}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={[nasabahStyles.input, nasabahStyles.textArea]}
                value={formData.alamat}
                onChangeText={(value) => updateField("alamat", value)}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.ADDRESS}
                multiline
                numberOfLines={3}
                editable={!loading}
              />
            </View>

            {/* Saldo Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.SALDO}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={nasabahStyles.currencyInput}
                value={formData.saldo}
                onChangeText={(value) => handleCurrencyChange("saldo", value)}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.SALDO}
                keyboardType="numeric"
                editable={!loading}
              />
              <Text style={nasabahStyles.errorText}>
                {formData.saldo && "Rp " + formData.saldo}
              </Text>
            </View>

            {/* Angsuran Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.ANGSURAN}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={nasabahStyles.currencyInput}
                value={formData.angsuran}
                onChangeText={(value) =>
                  handleCurrencyChange("angsuran", value)
                }
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.ANGSURAN}
                keyboardType="numeric"
                editable={!loading}
              />
              <Text style={nasabahStyles.errorText}>
                {formData.angsuran && "Rp " + formData.angsuran}
              </Text>
            </View>

            {/* Tabungan Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.TABUNGAN}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={nasabahStyles.currencyInput}
                value={formData.tabungan}
                onChangeText={(value) =>
                  handleCurrencyChange("tabungan", value)
                }
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.TABUNGAN}
                keyboardType="numeric"
                editable={!loading}
              />
              <Text style={nasabahStyles.errorText}>
                {formData.tabungan && "Rp " + formData.tabungan}
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              nasabahStyles.saveButton,
              (!isFormValid() || loading) && nasabahStyles.saveButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid() || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={nasabahStyles.saveButtonText}>
                {NASABAH_MESSAGES.BUTTONS.SAVE_DROP_LAMA}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
