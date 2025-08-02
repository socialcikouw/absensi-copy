import { supabase } from "../../lib/supabase";

interface UploadResult {
  data?: {
    publicUrl: string;
    path: string;
  };
  error?: string;
}

interface DeleteResult {
  error?: string;
}

interface UrlTestResult {
  accessible: boolean;
  error?: string;
}

class StorageService {
  // Upload foto untuk drop baru harian
  async uploadDropBaruPhoto(
    fileUri: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      console.log("Starting upload for drop baru photo:", fileName);
      console.log("File URI:", fileUri);

      // Create FormData for React Native compatibility
      const formData = new FormData();

      // Append file to FormData
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg",
        name: fileName,
      } as any);

      console.log("FormData created, attempting upload...");

      // Upload to Supabase Storage using FormData
      const { data, error } = await supabase.storage
        .from("dropbaru-photos")
        .upload(fileName, formData, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Upload error:", error);
        return { error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("dropbaru-photos")
        .getPublicUrl(fileName);

      console.log("Upload successful:", urlData.publicUrl);

      return {
        data: {
          publicUrl: urlData.publicUrl,
          path: data.path,
        },
      };
    } catch (error) {
      console.error("Storage service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown upload error",
      };
    }
  }

  // Upload foto untuk drop lama harian
  async uploadDropLamaPhoto(
    fileUri: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      console.log("Starting upload for drop lama photo:", fileName);
      console.log("File URI:", fileUri);

      // Create FormData for React Native compatibility
      const formData = new FormData();

      // Append file to FormData
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg",
        name: fileName,
      } as any);

      console.log("FormData created, attempting upload...");

      // Upload to Supabase Storage using FormData
      const { data, error } = await supabase.storage
        .from("droplama-photos")
        .upload(fileName, formData, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Upload error:", error);
        return { error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("droplama-photos")
        .getPublicUrl(fileName);

      console.log("Upload successful:", urlData.publicUrl);

      return {
        data: {
          publicUrl: urlData.publicUrl,
          path: data.path,
        },
      };
    } catch (error) {
      console.error("Storage service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown upload error",
      };
    }
  }

  // Delete foto drop baru harian
  async deleteDropBaruPhoto(photoUrl: string): Promise<DeleteResult> {
    try {
      // Extract file path from URL
      const urlParts = photoUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      const { error } = await supabase.storage
        .from("dropbaru-photos")
        .remove([fileName]);

      if (error) {
        console.error("Delete error:", error);
        return { error: error.message };
      }

      console.log("Photo deleted successfully:", fileName);
      return {};
    } catch (error) {
      console.error("Delete service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown delete error",
      };
    }
  }

  // Delete foto drop lama harian
  async deleteDropLamaPhoto(photoUrl: string): Promise<DeleteResult> {
    try {
      // Extract file path from URL
      const urlParts = photoUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      const { error } = await supabase.storage
        .from("droplama-photos")
        .remove([fileName]);

      if (error) {
        console.error("Delete error:", error);
        return { error: error.message };
      }

      console.log("Photo deleted successfully:", fileName);
      return {};
    } catch (error) {
      console.error("Delete service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown delete error",
      };
    }
  }

  // Test apakah URL foto bisa diakses
  async testPhotoUrl(photoUrl: string): Promise<UrlTestResult> {
    try {
      const response = await fetch(photoUrl, { method: "HEAD" });

      if (response.ok) {
        return { accessible: true };
      } else {
        return {
          accessible: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        accessible: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // Generic upload method untuk bucket tertentu
  async uploadPhoto(
    fileUri: string,
    fileName: string,
    bucketName: string
  ): Promise<UploadResult> {
    try {
      console.log(`Starting upload to ${bucketName}:`, fileName);
      console.log("File URI:", fileUri);

      // Create FormData for React Native compatibility
      const formData = new FormData();

      // Append file to FormData
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg",
        name: fileName,
      } as any);

      console.log("FormData created, attempting upload...");

      // Upload to Supabase Storage using FormData
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, formData, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Upload error:", error);
        return { error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      console.log("Upload successful:", urlData.publicUrl);

      return {
        data: {
          publicUrl: urlData.publicUrl,
          path: data.path,
        },
      };
    } catch (error) {
      console.error("Storage service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown upload error",
      };
    }
  }

  // Generic delete method untuk bucket tertentu
  async deletePhoto(
    photoUrl: string,
    bucketName: string
  ): Promise<DeleteResult> {
    try {
      // Extract file path from URL
      const urlParts = photoUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (error) {
        console.error("Delete error:", error);
        return { error: error.message };
      }

      console.log("Photo deleted successfully:", fileName);
      return {};
    } catch (error) {
      console.error("Delete service error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown delete error",
      };
    }
  }
}

export const storageService = new StorageService();
