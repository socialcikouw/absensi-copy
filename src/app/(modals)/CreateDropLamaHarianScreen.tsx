import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FormInput, PhotoInput, SaveButton } from "../../components/shared";
import { NASABAH_MESSAGES } from "../../constants/messages";
import { useDropLamaHarianForm } from "../../hooks/droplama/useDropLamaHarianForm";
import { useImagePicker } from "../../hooks/shared/useImagePicker";
import { nasabahStyles } from "../../styles/nasabahStyles";
import { handleRibuanInputChange } from "../../utils/formatRibuan";

export default function CreateDropLamaHarianScreen() {
  const {
    formData,
    isLoading,
    isSubmitting,
    error,
    setFormData,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useDropLamaHarianForm();

  // Image picker logic
  const { loading: imageLoading, pickImageWithOptions } = useImagePicker();

  const handleImagePick = async () => {
    const result = await pickImageWithOptions();
    if (result.uri && !result.error) {
      setFormData((prev) => ({ ...prev, foto: result.uri || undefined }));
    } else if (result.error) {
      console.error("Image picker error:", result.error);
    }
  };

  const isFormValid = () => {
    return (
      formData.nama.trim() !== "" &&
      formData.alamat.trim() !== "" &&
      formData.saldo.trim() !== "" &&
      formData.angsuran.trim() !== "" &&
      formData.tabungan.trim() !== ""
    );
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
            <PhotoInput
              foto={formData.foto}
              loading={isLoading}
              imageLoading={imageLoading}
              onPhotoPick={handleImagePick}
              placeholderText={NASABAH_MESSAGES.PLACEHOLDERS.PHOTO}
            />

            {/* Name Input dengan fieldType nama */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.NASABAH_NAME}
              value={formData.nama}
              onChangeText={(value) => handleInputChange("nama", value)}
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.NAME}
              required
              editable={!isLoading}
              fieldType="nama"
            />

            {/* Address Input dengan fieldType alamat */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.NASABAH_ADDRESS}
              value={formData.alamat}
              onChangeText={(value) => handleInputChange("alamat", value)}
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.ADDRESS}
              required
              multiline
              numberOfLines={3}
              editable={!isLoading}
              fieldType="alamat"
            />

            {/* Saldo Input dengan Format Ribuan dan fieldType numeric */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.SALDO}
              value={formData.saldo}
              onChangeText={(value) =>
                handleRibuanInputChange(value, (formattedValue) =>
                  handleInputChange("saldo", formattedValue)
                )
              }
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.SALDO}
              required
              editable={!isLoading}
              style={nasabahStyles.currencyInput}
              fieldType="numeric"
            />

            {/* Angsuran Input dengan Format Ribuan dan fieldType numeric */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.ANGSURAN}
              value={formData.angsuran}
              onChangeText={(value) =>
                handleRibuanInputChange(value, (formattedValue) =>
                  handleInputChange("angsuran", formattedValue)
                )
              }
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.ANGSURAN}
              required
              editable={!isLoading}
              style={nasabahStyles.currencyInput}
              fieldType="numeric"
            />

            {/* Tabungan Input dengan Format Ribuan dan fieldType numeric */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.TABUNGAN}
              value={formData.tabungan}
              onChangeText={(value) =>
                handleRibuanInputChange(value, (formattedValue) =>
                  handleInputChange("tabungan", formattedValue)
                )
              }
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.TABUNGAN}
              required
              editable={!isLoading}
              style={nasabahStyles.currencyInput}
              fieldType="numeric"
            />
          </View>

          {/* Error Display */}
          {error && (
            <View style={nasabahStyles.validationContainer}>
              <Text style={[nasabahStyles.validationText, { color: "red" }]}>
                ❌ {error}
              </Text>
            </View>
          )}

          {/* Form validation info */}
          {!isFormValid() && (
            <View style={nasabahStyles.validationContainer}>
              <Text style={nasabahStyles.validationText}>
                ⚠️ Mohon lengkapi semua field yang wajib diisi
              </Text>
            </View>
          )}

          {/* Save Button */}
          <SaveButton
            onPress={handleSubmit}
            disabled={!isFormValid() || isLoading || imageLoading}
            loading={isSubmitting}
            text={NASABAH_MESSAGES.BUTTONS.SAVE_DROP_LAMA}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
