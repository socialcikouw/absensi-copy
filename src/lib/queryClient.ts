import { QueryClient } from "@tanstack/react-query";
import { BASE_QUERY_CONFIG, QUERY_CONFIG } from "./queryConfig";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Use base configuration
      ...BASE_QUERY_CONFIG,
      // Default cache settings
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 10 * 60 * 1000, // 10 menit
    },
    mutations: {
      // Use mutation configuration
      ...QUERY_CONFIG.MUTATION,
    },
  },
});
