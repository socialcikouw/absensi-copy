import { supabase } from "../../lib/supabase";
import { CreateDropBaruHarianData, DropBaruHarianData } from "../../types";
import { AbstractHybridService } from "../base/AbstractHybridService";
import { ServiceResponse } from "../base/BaseService";

class DropBaruHarianHybridService extends AbstractHybridService<
  DropBaruHarianData,
  CreateDropBaruHarianData,
  Partial<CreateDropBaruHarianData>
> {
  protected tableName = "drop_baru_harian";

  protected generateId(): string {
    return `drop_baru_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  protected createLocalData(
    data: CreateDropBaruHarianData,
    user: any
  ): DropBaruHarianData {
    return {
      profile_id: user.id,
      foto: data.foto,
      nama: data.nama,
      alamat: data.alamat,
      pinjaman: data.pinjaman,
      saldo: data.pinjaman * 1.2, // Auto-calculate: 120% dari pinjaman
      angsuran: data.pinjaman * 0.05, // Auto-calculate: 5% dari pinjaman
      tabungan: data.pinjaman * 0.05, // Auto-calculate: 5% dari pinjaman
    } as DropBaruHarianData;
  }

  protected createOnlineData(data: CreateDropBaruHarianData, user: any): any {
    return {
      profile_id: user.id,
      foto: data.foto || null,
      nama: data.nama,
      alamat: data.alamat,
      pinjaman: data.pinjaman,
      // Tidak mengirim angsuran, tabungan, saldo karena mereka adalah generated columns
      // Database akan menghitung otomatis: angsuran = pinjaman * 0.05, tabungan = pinjaman * 0.05, saldo = pinjaman * 1.2
    };
  }

  // Online operations implementation
  protected async createOnline(
    data: CreateDropBaruHarianData
  ): Promise<ServiceResponse<DropBaruHarianData>> {
    try {
      const user = await this.getCurrentUser();
      const insertData = this.createOnlineData(data, user);

      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert([insertData])
        .select()
        .single();

      if (error) {
        return this.handleError(error, "createOnline");
      }

      return this.createSuccessResponse(result);
    } catch (error) {
      return this.handleError(error, "createOnline");
    }
  }

  protected async getListOnline(): Promise<
    ServiceResponse<DropBaruHarianData[]>
  > {
    try {
      const user = await this.getCurrentUser();
      const { data, error } = await supabase
        .from(this.tableName)
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        return this.handleError(error, "getListOnline");
      }

      return this.createSuccessResponse(data || []);
    } catch (error) {
      return this.handleError(error, "getListOnline");
    }
  }

  protected async getByIdOnline(
    id: string
  ): Promise<ServiceResponse<DropBaruHarianData>> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return this.handleError(error, "getByIdOnline");
      }

      return this.createSuccessResponse(data);
    } catch (error) {
      return this.handleError(error, "getByIdOnline");
    }
  }

  protected async updateOnline(
    id: string,
    updates: Partial<CreateDropBaruHarianData>
  ): Promise<ServiceResponse<DropBaruHarianData>> {
    try {
      // Hanya mengirim field yang bisa diupdate (tidak termasuk generated columns)
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      // Hanya include field yang ada di CreateDropBaruHarianData
      if (updates.foto !== undefined) updateData.foto = updates.foto;
      if (updates.nama !== undefined) updateData.nama = updates.nama;
      if (updates.alamat !== undefined) updateData.alamat = updates.alamat;
      if (updates.pinjaman !== undefined)
        updateData.pinjaman = updates.pinjaman;

      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return this.handleError(error, "updateOnline");
      }

      return this.createSuccessResponse(data);
    } catch (error) {
      return this.handleError(error, "updateOnline");
    }
  }

  protected async deleteOnline(id: string): Promise<ServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq("id", id);

      if (error) {
        return this.handleError(error, "deleteOnline");
      }

      return this.createSuccessResponse(undefined);
    } catch (error) {
      return this.handleError(error, "deleteOnline");
    }
  }
}

export const dropBaruHarianHybridService = new DropBaruHarianHybridService();
