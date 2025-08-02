import { supabase } from "../../lib/supabase";
import { CreateDropLamaHarianData, DropLamaHarianData } from "../../types";
import { AbstractHybridService } from "../base/AbstractHybridService";
import { ServiceResponse } from "../base/BaseService";

class DropLamaHarianHybridService extends AbstractHybridService<
  DropLamaHarianData,
  CreateDropLamaHarianData,
  Partial<CreateDropLamaHarianData>
> {
  protected tableName = "drop_lama_harian";

  protected generateId(): string {
    return `drop_lama_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  protected createLocalData(
    data: CreateDropLamaHarianData,
    user: any
  ): DropLamaHarianData {
    return {
      profile_id: user.id,
      foto: data.foto,
      nama: data.nama,
      alamat: data.alamat,
      saldo: data.saldo,
      angsuran: data.angsuran,
      tabungan: data.tabungan,
    } as DropLamaHarianData;
  }

  protected createOnlineData(data: CreateDropLamaHarianData, user: any): any {
    return {
      profile_id: user.id,
      foto: data.foto || null,
      nama: data.nama,
      alamat: data.alamat,
      saldo: data.saldo,
      angsuran: data.angsuran,
      tabungan: data.tabungan,
    };
  }

  // Online operations implementation
  protected async createOnline(
    data: CreateDropLamaHarianData
  ): Promise<ServiceResponse<DropLamaHarianData>> {
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
    ServiceResponse<DropLamaHarianData[]>
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
  ): Promise<ServiceResponse<DropLamaHarianData>> {
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
    updates: Partial<CreateDropLamaHarianData>
  ): Promise<ServiceResponse<DropLamaHarianData>> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
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

export const dropLamaHarianHybridService = new DropLamaHarianHybridService();
