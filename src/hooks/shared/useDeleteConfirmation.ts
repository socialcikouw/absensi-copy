import { Alert } from "react-native";

interface UseDeleteConfirmationProps {
  title?: string;
  message: string;
  onConfirm: () => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
}

export const useDeleteConfirmation = ({
  title = "Konfirmasi Hapus",
  message,
  onConfirm,
  successMessage = "Data berhasil dihapus",
  errorMessage = "Gagal menghapus data",
}: UseDeleteConfirmationProps) => {
  const showDeleteConfirmation = () => {
    Alert.alert(title, message, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            await onConfirm();
            Alert.alert("Berhasil", successMessage);
          } catch (error) {
            console.error("Delete error:", error);
            Alert.alert("Error", errorMessage);
          }
        },
      },
    ]);
  };

  return { showDeleteConfirmation };
};
