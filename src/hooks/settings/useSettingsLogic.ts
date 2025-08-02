import { router } from "expo-router";
import { Alert } from "react-native";
import { AUTH_MESSAGES } from "../../constants/messages";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../profile/useProfile";

export const useSettingsLogic = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  const handleLogout = () => {
    Alert.alert(AUTH_MESSAGES.LOGOUT.TITLE, AUTH_MESSAGES.LOGOUT.MESSAGE, [
      { text: AUTH_MESSAGES.LOGOUT.CANCEL, style: "cancel" },
      {
        text: AUTH_MESSAGES.LOGOUT.CONFIRM,
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert("Info", "Fitur Edit Profil akan segera tersedia");
  };

  const handleChangePassword = () => {
    Alert.alert("Info", "Fitur Ubah Password akan segera tersedia");
  };

  const handleNotificationSettings = () => {
    Alert.alert("Info", "Fitur Pengaturan Notifikasi akan segera tersedia");
  };

  const handleLocationSettings = () => {
    Alert.alert("Info", "Fitur Pengaturan Lokasi akan segera tersedia");
  };

  const handleAttendanceHistory = () => {
    Alert.alert("Info", "Fitur Riwayat Absensi akan segera tersedia");
  };

  const handleHelp = () => {
    Alert.alert("Info", "Fitur Bantuan akan segera tersedia");
  };

  const handleAbout = () => {
    Alert.alert(
      "Tentang Aplikasi",
      "Sistem Absensi v1.0.0\n\nAplikasi absensi modern dengan teknologi terkini untuk memudahkan pencatatan kehadiran karyawan."
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("Info", "Fitur Kebijakan Privasi akan segera tersedia");
  };

  const handleTermsService = () => {
    Alert.alert("Info", "Fitur Syarat & Ketentuan akan segera tersedia");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (profile?.email || user?.email) {
      return (profile?.email || user?.email || "").charAt(0).toUpperCase();
    }
    return "?";
  };

  const getDisplayName = () => {
    return profile?.full_name || "Pengguna";
  };

  const getDisplayEmail = () => {
    return profile?.email || user?.email || "Tidak tersedia";
  };

  const handleNasabahList = () => {
    router.push("/DataNasabah");
  };

  return {
    // State
    user,
    profile,
    profileLoading,

    // Actions
    handleLogout,
    handleEditProfile,
    handleChangePassword,
    handleNotificationSettings,
    handleLocationSettings,
    handleAttendanceHistory,
    handleHelp,
    handleAbout,
    handlePrivacyPolicy,
    handleTermsService,
    handleNasabahList,
    // Utils
    getUserInitials,
    getDisplayName,
    getDisplayEmail,
  };
};
