import NetInfo from "@react-native-community/netinfo";
import { dbOperations, initDatabase, syncQueue } from "../../lib/database";
import { supabase } from "../../lib/supabase";
import { BaseService, ServiceResponse } from "../base/BaseService";

export interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingOperations: number;
}

class SyncService extends BaseService {
  private syncInProgress = false;

  // Check network connectivity
  async checkConnectivity(): Promise<boolean> {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.isConnected === true;
    } catch {
      return false;
    }
  }

  // Initialize sync service
  async initialize(): Promise<void> {
    await initDatabase();
  }

  // Sync all pending operations
  async syncPendingOperations(): Promise<ServiceResponse<void>> {
    if (this.syncInProgress) {
      return this.createSuccessResponse(undefined);
    }

    const isOnline = await this.checkConnectivity();
    if (!isOnline) {
      return this.handleError(
        "Tidak ada koneksi internet",
        "syncPendingOperations"
      );
    }

    this.syncInProgress = true;

    try {
      // Process sync queue
      const pendingOperations = await syncQueue.getPending();

      for (const operation of pendingOperations) {
        await this.processSyncOperation(operation);
        await syncQueue.remove(operation.id);
      }

      return this.createSuccessResponse(undefined);
    } catch (error) {
      return this.handleError(error, "syncPendingOperations");
    } finally {
      this.syncInProgress = false;
    }
  }

  // Process individual sync operation
  private async processSyncOperation(operation: any): Promise<void> {
    const { table_name, operation: opType, data } = operation;
    const parsedData = JSON.parse(data);

    switch (opType) {
      case "INSERT":
        await this.syncInsert(table_name, parsedData);
        break;
      case "UPDATE":
        await this.syncUpdate(table_name, parsedData);
        break;
      case "DELETE":
        await this.syncDelete(table_name, parsedData.id);
        break;
    }
  }

  // Sync insert operation
  private async syncInsert(tableName: string, data: any): Promise<void> {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to sync insert: ${error.message}`);
    }

    // Update local record with synced flag
    await dbOperations.update(tableName, data.id, { synced: 1 });
  }

  // Sync update operation
  private async syncUpdate(tableName: string, data: any): Promise<void> {
    const { id, ...updateData } = data;

    const { error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to sync update: ${error.message}`);
    }

    // Update local record with synced flag
    await dbOperations.update(tableName, id, { synced: 1 });
  }

  // Sync delete operation
  private async syncDelete(tableName: string, id: string): Promise<void> {
    const { error } = await supabase.from(tableName).delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to sync delete: ${error.message}`);
    }
  }

  // Pull data from server to local
  async pullFromServer(tableName: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.getCurrentUser();

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        return this.handleError(error, "pullFromServer");
      }

      // Store in local database
      for (const item of data || []) {
        await dbOperations.insert(tableName, { ...item, synced: 1 });
      }

      return this.createSuccessResponse(undefined);
    } catch (error) {
      return this.handleError(error, "pullFromServer");
    }
  }

  // Get sync status
  async getSyncStatus(): Promise<ServiceResponse<SyncStatus>> {
    try {
      const isOnline = await this.checkConnectivity();
      const pendingOperations = await syncQueue.getPending();

      const status: SyncStatus = {
        isOnline,
        lastSync: null, // TODO: Implement last sync tracking
        pendingOperations: pendingOperations.length,
      };

      return this.createSuccessResponse(status);
    } catch (error) {
      return this.handleError(error, "getSyncStatus");
    }
  }

  // Force sync all data
  async forceSync(): Promise<ServiceResponse<void>> {
    try {
      // Pull latest data from server
      await this.pullFromServer("drop_baru_harian");
      await this.pullFromServer("drop_lama_harian");

      // Push pending operations
      await this.syncPendingOperations();

      return this.createSuccessResponse(undefined);
    } catch (error) {
      return this.handleError(error, "forceSync");
    }
  }
}

export const syncService = new SyncService();
