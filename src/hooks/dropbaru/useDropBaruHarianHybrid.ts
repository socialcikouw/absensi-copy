import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { dropBaruHarianHybridService } from "../../services/dropbaru/DropBaruHarianHybridService";
import { CreateDropBaruHarianData } from "../../types";

// Get drop baru harian list
export const useDropBaruHarianListHybrid = () => {
  return useQuery({
    queryKey: queryKeys.dropBaruHarian.lists(),
    queryFn: async () => {
      const response = await dropBaruHarianHybridService.getList();
      if (!response.success) {
        throw new Error(
          response.error || "Failed to fetch drop baru harian list"
        );
      }
      return response.data || [];
    },
  });
};

// Get drop baru harian by ID
export const useDropBaruHarianByIdHybrid = (id: string) => {
  return useQuery({
    queryKey: queryKeys.dropBaruHarian.detail(id),
    queryFn: async () => {
      const response = await dropBaruHarianHybridService.getById(id);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch drop baru harian");
      }
      return response.data;
    },
    enabled: !!id,
  });
};

// Create drop baru harian
export const useCreateDropBaruHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDropBaruHarianData) => {
      const response = await dropBaruHarianHybridService.create(data);
      if (!response.success) {
        throw new Error(response.error || "Failed to create drop baru harian");
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropBaruHarian.lists(),
      });
    },
  });
};

// Update drop baru harian
export const useUpdateDropBaruHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateDropBaruHarianData>;
    }) => {
      const response = await dropBaruHarianHybridService.update(id, updates);
      if (!response.success) {
        throw new Error(response.error || "Failed to update drop baru harian");
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update cache
      if (data?.id) {
        queryClient.setQueryData(
          queryKeys.dropBaruHarian.detail(data.id),
          data
        );
      }
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropBaruHarian.lists(),
      });
    },
  });
};

// Delete drop baru harian
export const useDeleteDropBaruHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await dropBaruHarianHybridService.delete(id);
      if (!response.success) {
        throw new Error(response.error || "Failed to delete drop baru harian");
      }
      return response.data;
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.dropBaruHarian.detail(id),
      });
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropBaruHarian.lists(),
      });
    },
  });
};

// Sync pending operations
export const useSyncDropBaruHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response =
        await dropBaruHarianHybridService.syncPendingOperations();
      if (!response.success) {
        throw new Error(response.error || "Failed to sync operations");
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropBaruHarian.lists(),
      });
    },
  });
};
