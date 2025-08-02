// ========================================
// QUERY KEYS FACTORY
// ========================================
// Generic pattern untuk menghindari duplikasi query keys

/**
 * Generic query key factory untuk entity
 */
const createEntityQueryKeys = (entityName: string) => ({
  all: [entityName] as const,
  lists: () => [...createEntityQueryKeys(entityName).all, "list"] as const,
  list: (filters?: string) =>
    [...createEntityQueryKeys(entityName).lists(), { filters }] as const,
  details: () => [...createEntityQueryKeys(entityName).all, "detail"] as const,
  detail: (id: string) =>
    [...createEntityQueryKeys(entityName).details(), id] as const,
});

/**
 * Generic query key factory untuk entity dengan custom methods
 */
const createCustomEntityQueryKeys = <T extends Record<string, any>>(
  entityName: string,
  customMethods: T
) => ({
  ...createEntityQueryKeys(entityName),
  ...customMethods,
});

// Query Keys untuk TanStack Query
export const queryKeys = {
  // Drop Baru Harian
  dropBaruHarian: createEntityQueryKeys("dropBaruHarian"),

  // Drop Lama Harian
  dropLamaHarian: createEntityQueryKeys("dropLamaHarian"),

  // Profile/User
  profile: createEntityQueryKeys("profile"),

  // Dashboard dengan custom methods
  dashboard: createCustomEntityQueryKeys("dashboard", {
    summary: () =>
      [...createEntityQueryKeys("dashboard").all, "summary"] as const,
    stats: () => [...createEntityQueryKeys("dashboard").all, "stats"] as const,
  }),
} as const;

// Type untuk query keys
export type QueryKeys = typeof queryKeys;
