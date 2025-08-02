# Dashboard Hooks - Separation of Concern

## 📁 **Struktur File**

```
src/hooks/dashboard/
├── index.ts                    # Export semua hooks
├── useDashboardData.ts         # Hook untuk mengelola data dashboard
├── useDashboardFilter.ts       # Hook untuk mengelola filter logic
├── useDashboardLogic.ts        # Hook lama (legacy)
└── README.md                   # Dokumentasi ini
```

## 🎯 **Hooks**

### **1. useDashboardData.ts**

- **Tujuan**: Mengelola state dan logic untuk data dashboard
- **Returns**:
  - Data: `data`, `totalData`, `totalBaru`, `totalLama`
  - States: `isLoading`, `hasError`, `errorBaru`, `errorLama`
  - Actions: `handleRefresh`, `handleDelete`, `handleDeleteBaru`, `handleDeleteLama`

### **2. useDashboardFilter.ts**

- **Tujuan**: Mengelola filter logic untuk dashboard
- **Returns**: `filter`, `filteredData`, `handleFilterChange`

### **3. useDashboardLogic.ts** (Legacy)

- **Tujuan**: Hook lama yang masih digunakan sebagai fallback
- **Status**: Deprecated, akan dihapus setelah migration selesai

## 📋 **Interface**

### **DashboardDataItem**

```typescript
interface DashboardDataItem {
  id: string;
  type: "baru" | "lama";
  data: {
    id?: string;
    nama: string;
    alamat: string;
    foto?: string;
    angsuran: number;
    created_at?: string;
    updated_at?: string;
    // Data khusus Drop Baru
    pinjaman?: number;
    saldo?: number;
    tabungan?: number;
  };
}
```

## 🔧 **Features**

### **Data Management**

- ✅ Menggabungkan data Drop Baru dan Drop Lama
- ✅ Transform data ke format yang konsisten
- ✅ Sorting berdasarkan tanggal terbaru
- ✅ Computed states untuk total data
- ✅ **Data Lengkap**: Semua field dari database

### **Filter Management**

- ✅ Filter berdasarkan type (all, baru, lama)
- ✅ Memoized filtered data untuk performa
- ✅ State management untuk filter
- ✅ Unified filter change handler

### **Error Handling**

- ✅ Handle error dari kedua sumber data
- ✅ Retry mechanism
- ✅ Loading states

### **CRUD Operations**

- ✅ Delete untuk Drop Baru
- ✅ Delete untuk Drop Lama
- ✅ Refresh data
- ✅ Unified delete function

## 📊 **Data Mapping**

### **Drop Baru Harian**

```typescript
{
  id, type: "baru",
  data: {
    id, nama, alamat, foto,
    angsuran, created_at, updated_at,
    pinjaman, saldo, tabungan
  }
}
```

### **Drop Lama Harian**

```typescript
{
  id, type: "lama",
  data: {
    id, nama, alamat, foto,
    angsuran, created_at, updated_at,
    saldo, tabungan
  }
}
```

## 📋 **Usage**

```typescript
import { useDashboardData, useDashboardFilter } from "@/hooks/dashboard";

// Dalam komponen
const {
  data,
  totalData,
  totalBaru,
  totalLama,
  isLoading,
  hasError,
  errorBaru,
  errorLama,
  handleRefresh,
  handleDelete,
} = useDashboardData();

const { filter, filteredData, handleFilterChange } = useDashboardFilter(data);
```

## 🔄 **Data Flow**

```
useDashboardData
├── useDropBaruHarianList
├── useDropLamaHarianList
├── Data Transformation
├── State Management
└── Business Logic

useDashboardFilter
├── Filter State
├── Data Filtering
└── Filter Actions
```

## ✅ **Benefits**

1. **Separation of Concern** - Logic terpisah dari UI
2. **Reusability** - Hook bisa digunakan di komponen lain
3. **State Management** - Centralized state management
4. **Error Handling** - Unified error handling
5. **Type Safety** - TypeScript interfaces
6. **Performance** - Memoized data transformation
7. **Data Completeness** - Semua data tersedia untuk komponen

## 🎯 **Business Logic**

### **Data Transformation**

- Map Drop Baru data ke format konsisten
- Map Drop Lama data ke format konsisten
- Combine dan sort berdasarkan tanggal
- **Preserve semua field** dari database

### **Filter Logic**

- Filter berdasarkan type parameter
- Memoized filtered results
- State management untuk filter
- Unified filter change handler

### **Delete Logic**

- Unified delete function dengan type parameter
- Handle success/error states
- Update local state setelah delete

### **Refresh Logic**

- Refresh kedua sumber data
- Handle loading states
- Error recovery
