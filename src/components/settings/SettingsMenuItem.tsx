import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { settingsStyles } from "../../styles/settingsStyles";

interface SettingsMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isLast?: boolean;
}

export const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  isLast = false,
}) => {
  return (
    <TouchableOpacity
      style={settingsStyles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={settingsStyles.menuIcon}>{icon}</Text>
      <View style={settingsStyles.menuContent}>
        <Text style={settingsStyles.menuTitle}>{title}</Text>
        {subtitle && (
          <Text style={settingsStyles.menuSubtitle}>{subtitle}</Text>
        )}
      </View>
      <Text style={settingsStyles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
};
