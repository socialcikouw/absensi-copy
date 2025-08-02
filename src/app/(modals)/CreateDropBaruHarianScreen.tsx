import React from "react";
import {
  ActivityIndicator,
  Alert,
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
import { useDropBaruHarianForm } from "../../hooks/dropbaru/useDropBaruHarianForm";
import { useImagePicker } from "../../hooks/shared/useImagePicker";
import { nasabahStyles } from "../../styles/nasabahStyles";

export default function CreateDropBaruHarianScreen() {
  const {
    formData,
    calculations,
    loading,
    updateField,
    updatePhoto,
    handleLoanAmountChange,
    handleSubmit,
    isFormValid,
  } = useDropBaruHarianForm();

  // Image picker logic
  const { loading: imageLoading, pickImageWithOptions } = useImagePicker();

  const handleImagePick = async () => {
    try {
      const result = await pickImageWithOptions();

      if (result.uri && !result.error) {
        console.log("✅ Foto berhasil dipilih:", result.uri);
        updatePhoto(result.uri);
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
          updatePhoto("");
          console.log("🗑️ Foto dihapus dari form");
        },
      },
    ]);
  };

  const handleFormSubmit = async () => {
    try {
      const success = await handleSubmit();

      if (success) {
        Alert.alert(
          "Berhasil",
          "Data nasabah drop baru harian berhasil disimpan!",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate back atau refresh list
                console.log("✅ Form submitted successfully");
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Gagal",
          "Gagal menyimpan data nasabah. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      Alert.alert(
        "Error",
        "Terjadi kesalahan saat menyimpan data. Silakan coba lagi."
      );
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
              Data Drop Baru Harian
            </Text>

            {/* Photo Input */}
            <View style={nasabahStyles.photoContainer}>
              <TouchableOpacity
                style={[
                  nasabahStyles.photoButton,
                  imageLoading && nasabahStyles.photoButtonDisabled,
                ]}
                onPress={handleImagePick}
                activeOpacity={0.7}
                disabled={imageLoading || loading}
              >
                {imageLoading ? (
                  <View style={nasabahStyles.photoLoadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={nasabahStyles.photoLoadingText}>
                      Memilih foto...
                    </Text>
                  </View>
                ) : formData.foto ? (
                  <View style={nasabahStyles.photoPreviewContainer}>
                    <Image
                      source={{ uri: formData.foto }}
                      style={nasabahStyles.photoImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={nasabahStyles.removePhotoButton}
                      onPress={handleRemovePhoto}
                      activeOpacity={0.8}
                    >
                      <Text style={nasabahStyles.removePhotoText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={nasabahStyles.photoPlaceholderContainer}>
                    <Text style={nasabahStyles.photoIcon}>📷</Text>
                    <Text style={nasabahStyles.photoText}>
                      {NASABAH_MESSAGES.PLACEHOLDERS.PHOTO}
                    </Text>
                    <Text style={nasabahStyles.photoSubtext}>
                      Tap untuk memilih foto
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Photo validation info */}
              {formData.foto && (
                <Text style={nasabahStyles.photoInfoText}>
                  ✅ Foto siap diupload
                </Text>
              )}
            </View>

            {/* Name Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.NASABAH_NAME}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={[
                  nasabahStyles.input,
                  loading && nasabahStyles.inputDisabled,
                ]}
                value={formData.nama}
                onChangeText={(value) => updateField("nama", value)}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.NAME}
                editable={!loading}
                autoCapitalize="words"
              />
            </View>

            {/* Address Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.NASABAH_ADDRESS}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={[
                  nasabahStyles.input,
                  nasabahStyles.textArea,
                  loading && nasabahStyles.inputDisabled,
                ]}
                value={formData.alamat}
                onChangeText={(value) => updateField("alamat", value)}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.ADDRESS}
                multiline
                numberOfLines={3}
                editable={!loading}
                autoCapitalize="sentences"
              />
            </View>

            {/* Loan Amount Input */}
            <View style={nasabahStyles.inputContainer}>
              <Text style={nasabahStyles.label}>
                {NASABAH_MESSAGES.FORM.LOAN_AMOUNT}{" "}
                <Text style={nasabahStyles.requiredStar}>*</Text>
              </Text>
              <TextInput
                style={[
                  nasabahStyles.currencyInput,
                  loading && nasabahStyles.inputDisabled,
                ]}
                value={formData.pinjaman}
                onChangeText={handleLoanAmountChange}
                placeholder={NASABAH_MESSAGES.PLACEHOLDERS.LOAN}
                keyboardType="numeric"
                editable={!loading}
              />
              {formData.pinjaman && (
                <Text style={nasabahStyles.currencyDisplay}>
                  Rp {formData.pinjaman}
                </Text>
              )}
            </View>

            {/* Calculations Display */}
            {calculations.angsuran > 0 && (
              <View style={nasabahStyles.calculationsContainer}>
                <Text style={nasabahStyles.calculationsTitle}>
                  Perhitungan Otomatis:
                </Text>
                <View style={nasabahStyles.calculationRow}>
                  <Text style={nasabahStyles.calculationLabel}>Angsuran:</Text>
                  <Text style={nasabahStyles.calculationValue}>
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      calculations.angsuran
                    )}
                  </Text>
                </View>
                <View style={nasabahStyles.calculationRow}>
                  <Text style={nasabahStyles.calculationLabel}>Tabungan:</Text>
                  <Text style={nasabahStyles.calculationValue}>
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      calculations.tabungan
                    )}
                  </Text>
                </View>
                <View style={nasabahStyles.calculationRow}>
                  <Text style={nasabahStyles.calculationLabel}>Saldo:</Text>
                  <Text style={nasabahStyles.calculationValue}>
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(calculations.saldo)}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              nasabahStyles.saveButton,
              (!isFormValid() || loading || imageLoading) &&
                nasabahStyles.saveButtonDisabled,
            ]}
            onPress={handleFormSubmit}
            disabled={!isFormValid() || loading || imageLoading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={nasabahStyles.buttonLoadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={nasabahStyles.saveButtonText}>Menyimpan...</Text>
              </View>
            ) : (
              <Text style={nasabahStyles.saveButtonText}>
                {NASABAH_MESSAGES.BUTTONS.SAVE_NASABAH}
              </Text>
            )}
          </TouchableOpacity>

          {/* Form validation info */}
          {!isFormValid() && (
            <View style={nasabahStyles.validationContainer}>
              <Text style={nasabahStyles.validationText}>
                ⚠️ Mohon lengkapi semua field yang wajib diisi
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
