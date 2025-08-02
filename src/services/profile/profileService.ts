import { supabase } from "../../lib/supabase";

export interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  updated_at: string;
}

class ProfileService {
  async getProfile(userId: string): Promise<ProfileData | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Profile service error:", error);
      return null;
    }
  }

  async updateProfile(userId: string, updates: Partial<ProfileData>) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { data: null, error };
    }
  }

  async isUsernameAvailable(username: string, excludeUserId?: string) {
    try {
      let query = supabase
        .from("profiles")
        .select("id")
        .eq("username", username);

      if (excludeUserId) {
        query = query.neq("id", excludeUserId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error checking username:", error);
        return false;
      }

      return data.length === 0;
    } catch (error) {
      console.error("Username check error:", error);
      return false;
    }
  }
}

export const profileService = new ProfileService();
