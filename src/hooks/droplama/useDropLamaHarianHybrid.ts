import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { dropLamaHarianHybridService } from "../../services/droplama/DropLamaHarianHybridService";
import { CreateDropLamaHarianData } from "../../types";

// Get drop lama harian list
export const useDropLamaHarianListHybrid = () => {
  return useQuery({
    queryKey: queryKeys.dropLamaHarian.lists(),
    queryFn: async () => {
      const response = await dropLamaHarianHybridService.getList();
      if (!response.success) {
        throw new Error(
          response.error || "Failed to fetch drop lama harian list"
        );
      }
      return response.data || [];
    },
  });
};

// Get drop lama harian by ID
export const useDropLamaHarianByIdHybrid = (id: string) => {
  return useQuery({
    queryKey: queryKeys.dropLamaHarian.detail(id),
    queryFn: async () => {
      const response = await dropLamaHarianHybridService.getById(id);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch drop lama harian");
      }
      return response.data;
    },
    enabled: !!id,
  });
};

// Create drop lama harian
export const useCreateDropLamaHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDropLamaHarianData) => {
      const response = await dropLamaHarianHybridService.create(data);
      if (!response.success) {
        throw new Error(response.error || "Failed to create drop lama harian");
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropLamaHarian.lists(),
      });
    },
  });
};

// Update drop lama harian
export const useUpdateDropLamaHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateDropLamaHarianData>;
    }) => {
      const response = await dropLamaHarianHybridService.update(id, updates);
      if (!response.success) {
        throw new Error(response.error || "Failed to update drop lama harian");
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update cache
      if (data?.id) {
        queryClient.setQueryData(
          queryKeys.dropLamaHarian.detail(data.id),
          data
        );
      }
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropLamaHarian.lists(),
      });
    },
  });
};

// Delete drop lama harian
export const useDeleteDropLamaHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await dropLamaHarianHybridService.delete(id);
      if (!response.success) {
        throw new Error(response.error || "Failed to delete drop lama harian");
      }
      return response.data;
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: queryKeys.dropLamaHarian.detail(id),
      });
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropLamaHarian.lists(),
      });
    },
  });
};

// Sync pending operations
export const useSyncDropLamaHarianHybrid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response =
        await dropLamaHarianHybridService.syncPendingOperations();
      if (!response.success) {
        throw new Error(response.error || "Failed to sync operations");
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.dropLamaHarian.lists(),
      });
    },
  });
};
