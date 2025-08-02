# Setup Guide - React Native Expo dengan TanStack Query & Offline-First

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install TanStack Query dan dependencies
npm install @tanstack/react-query @tanstack/react-query-devtools

# Install Expo SQLite untuk offline storage
npm install expo-sqlite

# Install NetInfo untuk network detection
npm install @react-native-community/netinfo
```

### 2. Environment Setup

Pastikan file `.env` atau environment variables sudah dikonfigurasi:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

### 3. Initialize Database

Tambahkan inisialisasi database di `App.tsx` atau root component:

```typescript
import { initDatabase } from "./src/lib/database";

// Di dalam useEffect atau componentDidMount
useEffect(() => {
  const setupDatabase = async () => {
    try {
      await initDatabase();
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  };

  setupDatabase();
}, []);
```

## 📱 Penggunaan

### 1. Menggunakan Hybrid Hooks

```typescript
import { useDropBaruHarianListHybrid } from "../hooks/dropbaru/useDropBaruHarianHybrid";

const MyComponent = () => {
  const {
    data: dropBaruHarianList,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useDropBaruHarianListHybrid();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <FlatList
      data={dropBaruHarianList}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    />
  );
};
```

### 2. Menggunakan Mutations

```typescript
import { useCreateDropBaruHarianHybrid } from "../hooks/dropbaru/useDropBaruHarianHybrid";

const CreateForm = () => {
  const createMutation = useCreateDropBaruHarianHybrid();

  const handleSubmit = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        // Data akan otomatis di-cache dan UI ter-update
        console.log("Data berhasil dibuat");
      },
      onError: (error) => {
        console.error("Gagal membuat data:", error);
      },
    });
  };

  return (
    <Button
      onPress={handleSubmit}
      disabled={createMutation.isPending}
      title={createMutation.isPending ? "Menyimpan..." : "Simpan"}
    />
  );
};
```

### 3. Menggunakan Optimized Components

```typescript
import { DropBaruHarianListOptimized } from "../components/dropbaru/DropBaruHarianListOptimized";

const DropBaruHarianScreen = () => {
  const handleItemPress = (item) => {
    // Navigate to detail screen
    navigation.navigate("Detail", { id: item.id });
  };

  const handleAddPress = () => {
    // Navigate to create screen
    navigation.navigate("Create");
  };

  return (
    <DropBaruHarianListOptimized
      onItemPress={handleItemPress}
      onAddPress={handleAddPress}
    />
  );
};
```

## 🔧 Konfigurasi

### 1. Query Client Configuration

File: `src/lib/queryClient.ts`

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 10 * 60 * 1000, // 10 menit
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});
```

### 2. Database Schema

File: `src/lib/database.ts`

```sql
-- Drop Baru Harian table
CREATE TABLE IF NOT EXISTS drop_baru_harian (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  foto TEXT,
  nama TEXT NOT NULL,
  alamat TEXT NOT NULL,
  pinjaman REAL NOT NULL,
  saldo REAL,
  angsuran REAL,
  tabungan REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  synced INTEGER DEFAULT 0
);

-- Sync queue table
CREATE TABLE IF NOT EXISTS sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

## 🔄 Migration dari Old Code

### 1. Dari Old Hooks

**Sebelum:**

```typescript
const { dropBaruHarianList, loading, error, refreshList } =
  useDropBaruHarianList();
```

**Sesudah:**

```typescript
const { data, isLoading, error, refetch } = useDropBaruHarianListHybrid();
```

### 2. Dari Old Service Calls

**Sebelum:**

```typescript
const { data, error } = await dropBaruHarianService.getDropBaruHarianList();
```

**Sesudah:**

```typescript
const { data, error, success } =
  await dropBaruHarianHybridService.getDropBaruHarianList();
```

### 3. Dari Old Components

**Sebelum:**

```typescript
<DropBaruHarianList
  data={dropBaruHarianList}
  loading={loading}
  onRefresh={refreshList}
/>
```

**Sesudah:**

```typescript
<DropBaruHarianListOptimized
  onItemPress={handleItemPress}
  onAddPress={handleAddPress}
/>
```

## 🎯 Best Practices

### 1. Error Handling

```typescript
// Gunakan error boundary untuk catch errors
const { data, error } = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  retry: (failureCount, error) => {
    // Custom retry logic
    if (error.status === 404) return false;
    return failureCount < 3;
  },
});
```

### 2. Optimistic Updates

```typescript
const updateMutation = useMutation({
  mutationFn: updateData,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(["data"]);

    // Snapshot previous value
    const previousData = queryClient.getQueryData(["data"]);

    // Optimistically update
    queryClient.setQueryData(["data"], (old) => [...old, newData]);

    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["data"], context.previousData);
  },
});
```

### 3. Background Sync

```typescript
// Sync data di background
useEffect(() => {
  const syncData = async () => {
    const syncMutation = useSyncPendingOperations();
    await syncMutation.mutateAsync();
  };

  // Sync setiap 5 menit
  const interval = setInterval(syncData, 5 * 60 * 1000);

  return () => clearInterval(interval);
}, []);
```

## 🐛 Troubleshooting

### 1. Query tidak refetch

**Penyebab:** Query keys tidak konsisten
**Solusi:** Pastikan query keys sama di semua tempat

```typescript
// ✅ Benar
const queryKey = ["dropBaruHarian", "list"];

// ❌ Salah - keys berbeda
const queryKey1 = ["dropBaruHarian", "list"];
const queryKey2 = ["dropBaruHarian", "lists"];
```

### 2. Offline data tidak sync

**Penyebab:** Sync queue tidak diproses
**Solusi:** Cek network connectivity dan sync status

```typescript
const { data: syncStatus } = useSyncStatus();
console.log("Pending operations:", syncStatus?.pendingOperations);

// Manual sync
const syncMutation = useSyncPendingOperations();
await syncMutation.mutateAsync();
```

### 3. Type errors

**Penyebab:** Type definitions tidak match
**Solusi:** Update type definitions

```typescript
// Pastikan interface sesuai
interface DropBaruHarianData {
  id: string;
  nama: string;
  alamat: string;
  // ... other fields
}
```

## 📊 Monitoring

### 1. TanStack Query DevTools

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

### 2. Performance Monitoring

```typescript
// Track query performance
const { data, isLoading, isFetching } = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  onSuccess: (data) => {
    console.log("Query successful:", data.length, "items");
  },
  onError: (error) => {
    console.error("Query failed:", error);
  },
});
```

## 🚀 Advanced Features

### 1. Infinite Queries

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["dropBaruHarian", "infinite"],
    queryFn: ({ pageParam = 0 }) => fetchPage(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
```

### 2. Prefetching

```typescript
// Prefetch data untuk screen berikutnya
const prefetchData = () => {
  queryClient.prefetchQuery({
    queryKey: ["dropBaruHarian", "detail", id],
    queryFn: () => fetchDetail(id),
  });
};
```

### 3. Optimistic Updates dengan Rollback

```typescript
const mutation = useMutation({
  mutationFn: updateData,
  onMutate: async (newData) => {
    await queryClient.cancelQueries(["data"]);
    const previousData = queryClient.getQueryData(["data"]);
    queryClient.setQueryData(["data"], newData);
    return { previousData };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(["data"], context.previousData);
  },
});
```

## 📚 Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Expo SQLite Documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [React Native NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)
- [Offline-First Architecture](https://developer.android.com/topic/architecture/data-layer/offline-first)
