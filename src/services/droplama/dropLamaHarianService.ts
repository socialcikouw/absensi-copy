import { supabase } from "../../lib/supabase";
import {
  CreateDropLamaHarianData,
  DropLamaHarianData,
} from "../../types/droplamaharian";

class DropLamaHarianService {
  async createDropLamaHarian(
    data: CreateDropLamaHarianData
  ): Promise<{ data: DropLamaHarianData | null; error: any }> {
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
        saldo: data.saldo,
        angsuran: data.angsuran,
        tabungan: data.tabungan,
      };

      const { data: result, error } = await supabase
        .from("drop_lama_harian")
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

  async getDropLamaHarianList(): Promise<{
    data: DropLamaHarianData[] | null;
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
        .from("drop_lama_harian")
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

  async getDropLamaHarianById(
    id: string
  ): Promise<{ data: DropLamaHarianData | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("drop_lama_harian")
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

  async updateDropLamaHarian(
    id: string,
    updates: Partial<CreateDropLamaHarianData>
  ): Promise<{ data: DropLamaHarianData | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("drop_lama_harian")
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

  async deleteDropLamaHarian(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from("drop_lama_harian")
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

export const dropLamaHarianService = new DropLamaHarianService();
