import { dbOperations, syncQueue } from "../../lib/database";
import { syncService } from "../sync/SyncService";
import { BaseService, ServiceResponse } from "./BaseService";

/**
 * Abstract Hybrid Service
 * Provides common hybrid (online/offline) functionality for all services
 */
export abstract class AbstractHybridService<
  TData,
  TCreateData,
  TUpdateData
> extends BaseService {
  protected abstract tableName: string;
  protected abstract generateId(): string;
  protected abstract createLocalData(data: TCreateData, user: any): TData;
  protected abstract createOnlineData(data: TCreateData, user: any): any;

  // Create (hybrid approach)
  async create(data: TCreateData): Promise<ServiceResponse<TData>> {
    try {
      const user = await this.getCurrentUser();
      const id = this.generateId();
      const now = new Date().toISOString();

      const localData: TData = {
        ...this.createLocalData(data, user),
        id,
        created_at: now,
        updated_at: now,
      } as TData;

      // Try online first
      const isOnline = await syncService.checkConnectivity();

      if (isOnline) {
        try {
          const onlineResult = await this.createOnline(data);
          if (onlineResult.success) {
            // Store in local database as synced
            await dbOperations.insert(this.tableName, {
              ...onlineResult.data,
              synced: 1,
            });
            return onlineResult;
          }
        } catch (error) {
          console.warn(
            `Online create failed for ${this.tableName}, falling back to offline:`,
            error
          );
        }
      }

      // Fallback to offline
      await dbOperations.insert(this.tableName, {
        ...localData,
        synced: 0,
      });

      // Add to sync queue
      await syncQueue.add(this.tableName, "INSERT", localData);

      return this.createSuccessResponse(localData);
    } catch (error) {
      return this.handleError(error, `create${this.tableName}`);
    }
  }

  // Get list (hybrid approach)
  async getList(): Promise<ServiceResponse<TData[]>> {
    try {
      const isOnline = await syncService.checkConnectivity();

      if (isOnline) {
        try {
          const onlineResult = await this.getListOnline();
          if (onlineResult.success) {
            // Update local database
            for (const item of onlineResult.data || []) {
              await dbOperations.insert(this.tableName, {
                ...item,
                synced: 1,
              });
            }
            return onlineResult;
          }
        } catch (error) {
          console.warn(
            `Online fetch failed for ${this.tableName}, using offline data:`,
            error
          );
        }
      }

      // Fallback to offline
      const localData = await dbOperations.getAll(this.tableName);
      return this.createSuccessResponse(localData);
    } catch (error) {
      return this.handleError(error, `get${this.tableName}List`);
    }
  }

  // Get by ID (hybrid approach)
  async getById(id: string): Promise<ServiceResponse<TData>> {
    try {
      const isOnline = await syncService.checkConnectivity();

      if (isOnline) {
        try {
          const onlineResult = await this.getByIdOnline(id);
          if (onlineResult.success) {
            // Update local database
            await dbOperations.insert(this.tableName, {
              ...onlineResult.data,
              synced: 1,
            });
            return onlineResult;
          }
        } catch (error) {
          console.warn(
            `Online fetch failed for ${this.tableName}, using offline data:`,
            error
          );
        }
      }

      // Fallback to offline
      const localData = await dbOperations.getById(this.tableName, id);
      if (!localData) {
        return this.handleError(
          "Data tidak ditemukan",
          `get${this.tableName}ById`
        );
      }

      return this.createSuccessResponse(localData);
    } catch (error) {
      return this.handleError(error, `get${this.tableName}ById`);
    }
  }

  // Update (hybrid approach)
  async update(
    id: string,
    updates: TUpdateData
  ): Promise<ServiceResponse<TData>> {
    try {
      const isOnline = await syncService.checkConnectivity();
      const now = new Date().toISOString();

      const updateData = {
        ...updates,
        updated_at: now,
      };

      if (isOnline) {
        try {
          const onlineResult = await this.updateOnline(id, updates);
          if (onlineResult.success) {
            // Update local database as synced
            await dbOperations.update(this.tableName, id, {
              ...updateData,
              synced: 1,
            });
            return onlineResult;
          }
        } catch (error) {
          console.warn(
            `Online update failed for ${this.tableName}, falling back to offline:`,
            error
          );
        }
      }

      // Fallback to offline
      await dbOperations.update(this.tableName, id, {
        ...updateData,
        synced: 0,
      });

      // Add to sync queue
      await syncQueue.add(this.tableName, "UPDATE", { id, ...updateData });

      // Get updated data
      const updatedData = await dbOperations.getById(this.tableName, id);
      return this.createSuccessResponse(updatedData);
    } catch (error) {
      return this.handleError(error, `update${this.tableName}`);
    }
  }

  // Delete (hybrid approach)
  async delete(id: string): Promise<ServiceResponse<void>> {
    try {
      const isOnline = await syncService.checkConnectivity();

      if (isOnline) {
        try {
          const onlineResult = await this.deleteOnline(id);
          if (onlineResult.success) {
            // Remove from local database
            await dbOperations.delete(this.tableName, id);
            return onlineResult;
          }
        } catch (error) {
          console.warn(
            `Online delete failed for ${this.tableName}, falling back to offline:`,
            error
          );
        }
      }

      // Fallback to offline
      await dbOperations.delete(this.tableName, id);

      // Add to sync queue
      await syncQueue.add(this.tableName, "DELETE", { id });

      return this.createSuccessResponse(undefined);
    } catch (error) {
      return this.handleError(error, `delete${this.tableName}`);
    }
  }

  // Sync pending operations
  async syncPendingOperations(): Promise<ServiceResponse<void>> {
    return await syncService.syncPendingOperations();
  }

  // Get sync status
  async getSyncStatus(): Promise<ServiceResponse<any>> {
    return await syncService.getSyncStatus();
  }

  // Abstract online operations - must be implemented by subclasses
  protected abstract createOnline(
    data: TCreateData
  ): Promise<ServiceResponse<TData>>;
  protected abstract getListOnline(): Promise<ServiceResponse<TData[]>>;
  protected abstract getByIdOnline(id: string): Promise<ServiceResponse<TData>>;
  protected abstract updateOnline(
    id: string,
    updates: TUpdateData
  ): Promise<ServiceResponse<TData>>;
  protected abstract deleteOnline(id: string): Promise<ServiceResponse<void>>;
}
