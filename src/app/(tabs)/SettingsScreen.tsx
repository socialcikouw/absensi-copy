import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SettingsMenuItem } from "../../components/settings/SettingsMenuItem";
import {
  NASABAH_LIST_MESSAGES,
  SETTINGS_MESSAGES,
  UI_TEXT,
} from "../../constants/messages";
import { useSettingsLogic } from "../../hooks/settings/useSettingsLogic";
import { settingsStyles } from "../../styles/settingsStyles";

export default function SettingsScreen() {
  const {
    profileLoading,
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
    getUserInitials,
    getDisplayName,
    getDisplayEmail,
    handleNasabahList,
  } = useSettingsLogic();

  return (
    <View style={settingsStyles.container}>
      <ScrollView style={settingsStyles.scrollContainer}>
        {/* Profile Section */}
        <View style={settingsStyles.profileSection}>
          <TouchableOpacity
            style={settingsStyles.profileInfo}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <View style={settingsStyles.avatar}>
              {profileLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={settingsStyles.avatarText}>
                  {getUserInitials()}
                </Text>
              )}
            </View>
            <View style={settingsStyles.profileDetails}>
              <Text style={settingsStyles.profileName}>{getDisplayName()}</Text>
              <Text style={settingsStyles.profileEmail}>
                {getDisplayEmail()}
              </Text>
            </View>
            <Text style={settingsStyles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Akun</Text>
          <SettingsMenuItem
            icon="👤"
            title={UI_TEXT.EDIT_PROFILE}
            subtitle="Ubah nama, foto, dan informasi lainnya"
            onPress={handleEditProfile}
          />
          <SettingsMenuItem
            icon="🔒"
            title={UI_TEXT.CHANGE_PASSWORD}
            subtitle="Ganti password untuk keamanan akun"
            onPress={handleChangePassword}
            isLast
          />
        </View>

        {/* App Settings Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Pengaturan Aplikasi</Text>
          <SettingsMenuItem
            icon="🔔"
            title={UI_TEXT.NOTIFICATION_SETTINGS}
            subtitle="Atur notifikasi absensi dan pengingat"
            onPress={handleNotificationSettings}
          />
          <SettingsMenuItem
            icon="📍"
            title={UI_TEXT.LOCATION_SETTINGS}
            subtitle="Pengaturan lokasi untuk check-in/out"
            onPress={handleLocationSettings}
            isLast
          />
        </View>

        {/* Data Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Data</Text>
          <SettingsMenuItem
            icon="👤"
            title={NASABAH_LIST_MESSAGES.UI.TITLE}
            subtitle="Lihat semua data nasabah"
            onPress={handleNasabahList}
            isLast
          />
          <SettingsMenuItem
            icon="📊"
            title={UI_TEXT.ATTENDANCE_HISTORY}
            subtitle="Lihat riwayat kehadiran Anda"
            onPress={handleAttendanceHistory}
            isLast
          />
        </View>

        {/* Support Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Dukungan</Text>
          <SettingsMenuItem
            icon="❓"
            title={UI_TEXT.HELP_SUPPORT}
            subtitle="FAQ dan hubungi tim dukungan"
            onPress={handleHelp}
          />
          <SettingsMenuItem
            icon="ℹ️"
            title={UI_TEXT.ABOUT_APP}
            subtitle="Versi aplikasi dan informasi lainnya"
            onPress={handleAbout}
          />
          <SettingsMenuItem
            icon="🛡️"
            title={UI_TEXT.PRIVACY_POLICY}
            subtitle="Kebijakan privasi dan keamanan data"
            onPress={handlePrivacyPolicy}
          />
          <SettingsMenuItem
            icon="📄"
            title={UI_TEXT.TERMS_SERVICE}
            subtitle="Syarat dan ketentuan penggunaan"
            onPress={handleTermsService}
            isLast
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={settingsStyles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={settingsStyles.logoutButtonText}>
            {SETTINGS_MESSAGES.MENU.LOGOUT}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
