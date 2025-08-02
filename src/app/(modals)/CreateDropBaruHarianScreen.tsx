import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FormInput, PhotoInput, SaveButton } from "../../components/shared";
import { NASABAH_MESSAGES } from "../../constants/messages";
import { useDropBaruHarianForm } from "../../hooks/dropbaru/useDropBaruHarianForm";
import { useImagePicker } from "../../hooks/shared/useImagePicker";
import { nasabahStyles } from "../../styles/nasabahStyles";
import { handleRibuanInputChange } from "../../utils/formatRibuan";

export default function CreateDropBaruHarianScreen() {
  const {
    formData,
    isLoading,
    isSubmitting,
    error,
    setFormData,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useDropBaruHarianForm();

  // Image picker logic
  const { loading: imageLoading, pickImageWithOptions } = useImagePicker();

  const handleImagePick = async () => {
    try {
      const result = await pickImageWithOptions();

      if (result.uri && !result.error) {
        console.log("✅ Foto berhasil dipilih:", result.uri);
        setFormData((prev) => ({ ...prev, foto: result.uri || undefined }));
      } else if (result.error) {
        console.error("❌ Image picker error:", result.error);
        Alert.alert(
          "Error Pilih Foto",
          result.error || "Gagal memilih foto. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("❌ Unexpected error in image picker:", error);
      Alert.alert(
        "Error",
        "Terjadi kesalahan saat memilih foto. Silakan coba lagi."
      );
    }
  };

  const handleRemovePhoto = () => {
    Alert.alert("Hapus Foto", "Apakah Anda yakin ingin menghapus foto ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          setFormData((prev) => ({ ...prev, foto: undefined }));
          console.log("🗑️ Foto dihapus dari form");
        },
      },
    ]);
  };

  const handleFormSubmit = async () => {
    try {
      await handleSubmit();
      console.log("✅ Form submitted successfully");
    } catch (error) {
      console.error("❌ Form submission error:", error);
      Alert.alert(
        "Error",
        "Terjadi kesalahan saat menyimpan data. Silakan coba lagi."
      );
    }
  };

  const isFormValid = () => {
    return (
      formData.nama.trim() !== "" &&
      formData.alamat.trim() !== "" &&
      formData.pinjaman.trim() !== ""
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
              Data Drop Baru Harian
            </Text>

            {/* Photo Input */}
            <PhotoInput
              foto={formData.foto}
              loading={isLoading}
              imageLoading={imageLoading}
              onPhotoPick={handleImagePick}
              onPhotoRemove={handleRemovePhoto}
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

            {/* Loan Amount Input dengan Format Ribuan dan fieldType numeric */}
            <FormInput
              label={NASABAH_MESSAGES.FORM.LOAN_AMOUNT}
              value={formData.pinjaman}
              onChangeText={(value) =>
                handleRibuanInputChange(value, (formattedValue) =>
                  handleInputChange("pinjaman", formattedValue)
                )
              }
              placeholder={NASABAH_MESSAGES.PLACEHOLDERS.LOAN}
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
            onPress={handleFormSubmit}
            disabled={!isFormValid() || isLoading || imageLoading}
            loading={isSubmitting}
            text={NASABAH_MESSAGES.BUTTONS.SAVE_NASABAH}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
