import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

// ========================================
// IMAGE PICKER TYPES & UTILITIES
// ========================================

interface ImagePickerResult {
  uri: string | null;
  error?: string;
}

interface UseImagePickerReturn {
  loading: boolean;
  pickImage: () => Promise<ImagePickerResult>;
  takePhoto: () => Promise<ImagePickerResult>;
  pickImageWithOptions: () => Promise<ImagePickerResult>;
}

/**
 * Image picker utilities untuk menghindari duplikasi
 */
const imagePickerUtils = {
  /**
   * Validasi permissions untuk camera dan media library
   */
  checkPermissions: async (): Promise<{
    granted: boolean;
    error?: string;
  }> => {
    try {
      // Check camera permissions
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        return {
          granted: false,
          error: "Izin kamera diperlukan untuk mengambil foto",
        };
      }

      // Check media library permissions
      const mediaPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!mediaPermission.granted) {
        return {
          granted: false,
          error: "Izin galeri diperlukan untuk memilih foto",
        };
      }

      return { granted: true };
    } catch (error) {
      console.error("Permission check error:", error);
      return {
        granted: false,
        error: "Gagal memeriksa izin. Silakan restart aplikasi.",
      };
    }
  },

  /**
   * Validasi gambar yang dipilih
   */
  validateImage: (
    result: ImagePicker.ImagePickerResult
  ): { isValid: boolean; error?: string } => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return { isValid: false, error: "Tidak ada gambar yang dipilih" };
    }

    const asset = result.assets[0];

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (asset.fileSize && asset.fileSize > maxSize) {
      const sizeMB = (asset.fileSize / (1024 * 1024)).toFixed(2);
      return {
        isValid: false,
        error: `Ukuran file terlalu besar (${sizeMB}MB). Maksimal 5MB.`,
      };
    }

    // Check dimensions (optional - untuk mencegah gambar terlalu kecil)
    if (asset.width && asset.height) {
      const minDimension = 100; // Minimal 100px
      if (asset.width < minDimension || asset.height < minDimension) {
        return {
          isValid: false,
          error: `Resolusi gambar terlalu kecil (${asset.width}x${asset.height}). Minimal ${minDimension}x${minDimension}px.`,
        };
      }
    }

    // Check file type from URI extension since asset.type might be generic "image"
    const fileExtension = asset.uri.split(".").pop()?.toLowerCase();
    const validExtensions = ["jpg", "jpeg", "png", "webp"];

    if (fileExtension && !validExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.",
      };
    }

    return { isValid: true };
  },

  /**
   * Common image picker options
   */
  getImagePickerOptions: () => ({
    allowsEditing: true,
    aspect: [4, 3] as [number, number],
    quality: 0.8, // Compress untuk mengurangi ukuran file
    exif: false, // Remove EXIF data untuk privacy
  }),

  /**
   * Handle image picker result dengan error handling
   */
  handleImagePickerResult: async (
    result: ImagePicker.ImagePickerResult,
    source: string
  ): Promise<ImagePickerResult> => {
    console.log(`${source} result:`, {
      canceled: result.canceled,
      assetsLength: result.assets?.length,
      firstAsset: result.assets?.[0]
        ? {
            uri: result.assets[0].uri,
            width: result.assets[0].width,
            height: result.assets[0].height,
            fileSize: result.assets[0].fileSize,
            type: result.assets[0].type,
          }
        : null,
    });

    // Validate result
    const validation = imagePickerUtils.validateImage(result);
    if (!validation.isValid) {
      return { uri: null, error: validation.error };
    }

    const uri = result.assets![0].uri;
    console.log(`✅ Gambar berhasil dipilih dari ${source}:`, uri);

    return { uri };
  },
};

// ========================================
// IMAGE PICKER HOOK
// ========================================

export const useImagePicker = (): UseImagePickerReturn => {
  const [loading, setLoading] = useState(false);

  // Fungsi untuk memilih dari galeri
  const pickImage = async (): Promise<ImagePickerResult> => {
    setLoading(true);

    try {
      console.log("🖼️ Membuka galeri...");

      // Check permissions
      const permissionCheck = await imagePickerUtils.checkPermissions();
      if (!permissionCheck.granted) {
        return { uri: null, error: permissionCheck.error };
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        ...imagePickerUtils.getImagePickerOptions(),
      });

      return await imagePickerUtils.handleImagePickerResult(result, "galeri");
    } catch (error) {
      console.error("Pick image error:", error);
      return {
        uri: null,
        error: `Gagal membuka galeri: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil foto dengan kamera
  const takePhoto = async (): Promise<ImagePickerResult> => {
    setLoading(true);

    try {
      console.log("📷 Membuka kamera...");

      // Check permissions
      const permissionCheck = await imagePickerUtils.checkPermissions();
      if (!permissionCheck.granted) {
        return { uri: null, error: permissionCheck.error };
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync(
        imagePickerUtils.getImagePickerOptions()
      );

      return await imagePickerUtils.handleImagePickerResult(result, "kamera");
    } catch (error) {
      console.error("Take photo error:", error);
      return {
        uri: null,
        error: `Gagal mengambil foto: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menampilkan opsi pilihan (galeri atau kamera)
  const pickImageWithOptions = async (): Promise<ImagePickerResult> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Pilih Foto",
        "Dari mana Anda ingin mengambil foto?",
        [
          {
            text: "Batal",
            style: "cancel",
            onPress: () => resolve({ uri: null }),
          },
          {
            text: "Galeri",
            onPress: async () => {
              const result = await pickImage();
              resolve(result);
            },
          },
          {
            text: "Kamera",
            onPress: async () => {
              const result = await takePhoto();
              resolve(result);
            },
          },
        ],
        { cancelable: true, onDismiss: () => resolve({ uri: null }) }
      );
    });
  };

  return {
    loading,
    pickImage,
    takePhoto,
    pickImageWithOptions,
  };
};
