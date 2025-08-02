import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nasabahStyles } from "../../styles/nasabahStyles";

// ========================================
// FORM COMPONENTS
// ========================================
// Reusable form components untuk menghindari duplikasi

interface PhotoInputProps {
  foto?: string;
  loading?: boolean;
  imageLoading?: boolean;
  onPhotoPick: () => void;
  onPhotoRemove?: () => void;
  placeholderText?: string;
}

/**
 * Reusable photo input component
 */
export const PhotoInput: React.FC<PhotoInputProps> = ({
  foto,
  loading = false,
  imageLoading = false,
  onPhotoPick,
  onPhotoRemove,
  placeholderText = "Pilih Foto",
}) => {
  return (
    <View style={nasabahStyles.photoContainer}>
      <TouchableOpacity
        style={[
          nasabahStyles.photoButton,
          imageLoading && nasabahStyles.photoButtonDisabled,
        ]}
        onPress={onPhotoPick}
        activeOpacity={0.7}
        disabled={imageLoading || loading}
      >
        {imageLoading ? (
          <View style={nasabahStyles.photoLoadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={nasabahStyles.photoLoadingText}>Memilih foto...</Text>
          </View>
        ) : foto ? (
          <View style={nasabahStyles.photoPreviewContainer}>
            <Image
              source={{ uri: foto }}
              style={nasabahStyles.photoImage}
              resizeMode="cover"
            />
            {onPhotoRemove && (
              <TouchableOpacity
                style={nasabahStyles.removePhotoButton}
                onPress={onPhotoRemove}
                activeOpacity={0.8}
              >
                <Text style={nasabahStyles.removePhotoText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={nasabahStyles.photoPlaceholderContainer}>
            <Text style={nasabahStyles.photoIcon}>📷</Text>
            <Text style={nasabahStyles.photoText}>{placeholderText}</Text>
            <Text style={nasabahStyles.photoSubtext}>
              Tap untuk memilih foto
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Photo validation info */}
      {foto && (
        <Text style={nasabahStyles.photoInfoText}>✅ Foto siap diupload</Text>
      )}
    </View>
  );
};

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "numeric";
  editable?: boolean;
  style?: any;
  maxLength?: number;
  fieldType?: "nama" | "alamat" | "numeric" | "default";
}

/**
 * Reusable form input component dengan validasi otomatis
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  editable = true,
  style,
  maxLength,
  fieldType = "default",
}) => {
  // Auto-determine maxLength berdasarkan fieldType
  const getMaxLength = () => {
    if (maxLength) return maxLength;

    switch (fieldType) {
      case "nama":
        return 21; // maxLength nama = 21
      case "alamat":
        return 21; // maxLength alamat = 21
      case "numeric":
        return 15; // maxLength untuk field numeric
      default:
        return undefined;
    }
  };

  // Auto-determine keyboardType berdasarkan fieldType
  const getKeyboardType = () => {
    if (keyboardType !== "default") return keyboardType;

    switch (fieldType) {
      case "numeric":
        return "numeric";
      default:
        return "default";
    }
  };

  // Auto-determine autoCapitalize
  const getAutoCapitalize = () => {
    switch (fieldType) {
      case "nama":
        return "words" as const;
      case "alamat":
        return "words" as const;
      case "numeric":
        return "none" as const;
      default:
        return "words" as const; // Default selalu words
    }
  };

  return (
    <View style={nasabahStyles.inputContainer}>
      <Text style={nasabahStyles.label}>
        {label} {required && <Text style={nasabahStyles.requiredStar}>*</Text>}
      </Text>
      <TextInput
        style={[
          nasabahStyles.input,
          multiline && nasabahStyles.textArea,
          !editable && nasabahStyles.inputDisabled,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={getKeyboardType()}
        editable={editable}
        autoCapitalize={getAutoCapitalize()}
        maxLength={getMaxLength()}
      />

      {/* Validation info untuk nama dan alamat */}
      {(fieldType === "nama" || fieldType === "alamat") && (
        <Text style={nasabahStyles.validationInfoText}>
          {value.length < 3
            ? `⚠️ Minimal ${3 - value.length} karakter lagi`
            : value.length >= 21
            ? "⚠️ Maksimal 21 karakter"
            : `✅ ${value.length}/21 karakter`}
        </Text>
      )}
    </View>
  );
};

interface SaveButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  text: string;
  loadingText?: string;
}

/**
 * Reusable save button component
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  text,
  loadingText = "Menyimpan...",
}) => {
  return (
    <TouchableOpacity
      style={[
        nasabahStyles.saveButton,
        (disabled || loading) && nasabahStyles.saveButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={nasabahStyles.buttonLoadingContainer}>
          <ActivityIndicator color="#fff" size="small" />
          <Text style={nasabahStyles.saveButtonText}>{loadingText}</Text>
        </View>
      ) : (
        <Text style={nasabahStyles.saveButtonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
