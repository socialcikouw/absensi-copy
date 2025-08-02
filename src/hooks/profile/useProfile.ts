import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ProfileData,
  profileService,
} from "../../services/profile/profileService";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const profileData = await profileService.getProfile(user.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    if (!user?.id) return { error: "No user found" };

    try {
      const result = await profileService.updateProfile(user.id, updates);
      if (!result.error) {
        await fetchProfile(); // Refresh profile data
      }
      return result;
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    loading,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};
