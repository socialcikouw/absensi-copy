import { supabase } from "../../lib/supabase";
import {
  CreateDropBaruHarianData,
  DropBaruHarianData,
} from "../../types/dropbaruharian";

class DropBaruHarianService {
  async createDropBaruHarian(
    data: CreateDropBaruHarianData
  ): Promise<{ data: DropBaruHarianData | null; error: any }> {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Authentication error:", userError);
        return { data: null, error: "User not authenticated" };
      }

      const insertData = {
        profile_id: user.id,
        foto: data.foto || null,
        nama: data.nama,
        alamat: data.alamat,
        pinjaman: data.pinjaman,
        // Database akan auto-calculate saldo, angsuran, tabungan
      };

      const { data: result, error } = await supabase
        .from("drop_baru_harian")
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error("Database insert error:", error);
        return { data: null, error };
      }

      return { data: result, error: null };
    } catch (error) {
      console.error("Service error:", error);
      return { data: null, error };
    }
  }

  async getDropBaruHarianList(): Promise<{
    data: DropBaruHarianData[] | null;
    error: any;
  }> {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Authentication error:", userError);
        return { data: null, error: "User not authenticated" };
      }

      const { data, error } = await supabase
        .from("drop_baru_harian")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database select error:", error);
        return { data: null, error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error("Service error:", error);
      return { data: null, error };
    }
  }

  async getDropBaruHarianById(
    id: string
  ): Promise<{ data: DropBaruHarianData | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("drop_baru_harian")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Database select error:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Service error:", error);
      return { data: null, error };
    }
  }

  async updateDropBaruHarian(
    id: string,
    updates: Partial<CreateDropBaruHarianData>
  ): Promise<{ data: DropBaruHarianData | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("drop_baru_harian")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Database update error:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Service error:", error);
      return { data: null, error };
    }
  }

  async deleteDropBaruHarian(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from("drop_baru_harian")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Database delete error:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Service error:", error);
      return { error };
    }
  }
}

export const dropBaruHarianService = new DropBaruHarianService();
