# Nasabah Hooks - Separation of Concern

## 📁 **Struktur File**

```
src/hooks/nasabah/
├── index.ts                    # Export semua hooks
├── useDataNasabah.ts           # Hook untuk mengelola data nasabah
└── README.md                   # Dokumentasi ini
```

## 🎯 **Hooks**

### **1. useDataNasabah.ts**

- **Tujuan**: Mengelola state dan logic untuk data nasabah
- **Returns**:
  - Data: `data`, `totalData`, `totalBaru`, `totalLama`
  - States: `isLoading`, `hasError`, `errorBaru`, `errorLama`
  - Actions: `handleRefresh`, `handleDelete`, `handleDeleteBaru`, `handleDeleteLama`

## 📋 **Interface**

### **DataNasabahItem**

```typescript
interface DataNasabahItem {
  id?: string;
  profile_id?: string;
  nama: string;
  alamat: string;
  foto?: string;
  angsuran: number;
  created_at?: string;
  updated_at?: string;
  type: "baru" | "lama";
  // Data khusus Drop Baru
  pinjaman?: number;
  saldo?: number;
  tabungan?: number;
}
```

## 🔧 **Features**

### **Data Management**

- ✅ Menggabungkan data Drop Baru dan Drop Lama
- ✅ Transform data ke format yang konsisten
- ✅ Sorting berdasarkan tanggal terbaru
- ✅ Computed states untuk total data
- ✅ **Data Lengkap**: Semua field dari database

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
  id, profile_id, nama, alamat, foto,
  angsuran, created_at, updated_at,
  type: "baru",
  pinjaman, saldo, tabungan
}
```

### **Drop Lama Harian**

```typescript
{
  id, profile_id, nama, alamat, foto,
  angsuran, created_at, updated_at,
  type: "lama",
  saldo, tabungan
}
```

## 📋 **Usage**

```typescript
import { useDataNasabah } from "@/hooks/nasabah";

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
} = useDataNasabah();
```

## 🔄 **Data Flow**

```
useDataNasabah
├── useDropBaruHarianList
├── useDropLamaHarianList
├── Data Transformation
├── State Management
└── Business Logic
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

### **Delete Logic**

- Unified delete function dengan type parameter
- Handle success/error states
- Update local state setelah delete

### **Refresh Logic**

- Refresh kedua sumber data
- Handle loading states
- Error recovery
