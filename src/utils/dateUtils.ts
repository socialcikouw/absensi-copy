// ========================================
// DATE UTILITIES
// ========================================
// Centralized date formatting utilities untuk menghindari duplikasi

import { PROFILE_MESSAGES } from "@/src/constants/messages";

/**
 * Format date untuk display dengan locale Indonesia
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Tidak diketahui";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format date untuk display dengan format yang lebih detail
 */
export const formatDateDetailed = (dateString?: string): string => {
  if (!dateString) return "Tidak diketahui";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};

/**
 * Format date untuk display dengan waktu
 */
export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "Tidak diketahui";
  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get time-based greeting
 */
export const getTimeBasedGreeting = (userName?: string): string => {
  const hour = new Date().getHours();
  let timeGreeting: string;

  if (hour >= 5 && hour < 12) {
    timeGreeting = PROFILE_MESSAGES.GREETING.MORNING;
  } else if (hour >= 12 && hour < 15) {
    timeGreeting = PROFILE_MESSAGES.GREETING.AFTERNOON;
  } else if (hour >= 15 && hour < 18) {
    timeGreeting = PROFILE_MESSAGES.GREETING.EVENING;
  } else {
    timeGreeting = PROFILE_MESSAGES.GREETING.NIGHT;
  }

  if (userName) {
    return `${timeGreeting}, ${userName}!`;
  }
  return timeGreeting;
};
