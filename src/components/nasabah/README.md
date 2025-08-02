# Nasabah Components - Separation of Concern

## 📁 **Struktur File**

```
src/components/nasabah/
├── index.ts                    # Export semua komponen
├── DataNasabahHeader.tsx       # Header untuk halaman nasabah
├── DataNasabahList.tsx         # List untuk menampilkan data
└── README.md                   # Dokumentasi ini
```

## 🎯 **Komponen**

### **1. DataNasabahHeader.tsx**

- **Tujuan**: Menampilkan header dengan judul dan summary data
- **Props**: `totalData`, `totalBaru`, `totalLama`
- **Fitur**:
  - Judul halaman
  - Summary total data
  - Breakdown Drop Baru vs Drop Lama

### **2. DataNasabahList.tsx**

- **Tujuan**: Menampilkan list data nasabah dengan FlatList
- **Props**: `data`, `isLoading`, `onRefresh`, `onDelete`, `onCardPress`
- **Fitur**:
  - FlatList dengan refresh control
  - Render DataNasabahCard untuk setiap item
  - Handle delete dan press events

### **3. DataNasabahCard.tsx**

- **Tujuan**: Menampilkan card individual dengan semua data nasabah
- **Props**: Semua field dari `DataNasabahItem` + `onPress`, `onDelete`
- **Fitur**:
  - **Data Lengkap**: ID, Profile ID, Nama, Alamat, Foto
  - **Data Keuangan**: Angsuran, Saldo, Tabungan, Pinjaman (Drop Baru)
  - **Data Waktu**: Created At, Updated At
  - **Type Label**: Baru/Lama dengan warna berbeda
  - **Delete Function**: Konfirmasi hapus data
  - **Image Display**: Foto dengan fallback

## 🔗 **Dependencies**

### **Internal Dependencies**

- `DataNasabahCard` - Komponen card untuk setiap item
- `dashboardStyles` - Styles untuk layout
- `DataNasabahItem` - Type interface dari hook

### **External Dependencies**

- React Native components
- Custom hooks dan utilities

## 📋 **Usage**

```typescript
import { DataNasabahHeader, DataNasabahList } from "@/components/nasabah";

// Dalam komponen
<DataNasabahHeader
  totalData={totalData}
  totalBaru={totalBaru}
  totalLama={totalLama}
/>

<DataNasabahList
  data={data}
  isLoading={isLoading}
  onRefresh={handleRefresh}
  onDelete={handleDelete}
  onCardPress={handleCardPress}
/>
```

## 📊 **Data yang Ditampilkan**

### **Data Umum**

- ✅ **ID**: UUID dari database
- ✅ **Profile ID**: Referensi ke tabel profiles
- ✅ **Nama**: Nama nasabah
- ✅ **Alamat**: Alamat lengkap
- ✅ **Foto**: Foto nasabah dengan fallback
- ✅ **Type**: Label Baru/Lama

### **Data Keuangan**

- ✅ **Angsuran**: Jumlah angsuran
- ✅ **Saldo**: Saldo nasabah
- ✅ **Tabungan**: Jumlah tabungan
- ✅ **Pinjaman**: Hanya untuk Drop Baru

### **Data Waktu**

- ✅ **Created At**: Tanggal pembuatan
- ✅ **Updated At**: Tanggal terakhir diperbarui

## ✅ **Benefits**

1. **Separation of Concern** - Setiap komponen punya tanggung jawab spesifik
2. **Reusability** - Komponen bisa digunakan di tempat lain
3. **Maintainability** - Mudah diubah dan diperbaiki
4. **Testability** - Mudah untuk unit testing
5. **Type Safety** - Menggunakan TypeScript interfaces
6. **Data Completeness** - Menampilkan semua data yang tersedia

## 🔄 **Data Flow**

```
DataNasabah.tsx (Main Component)
├── useDataNasabah (Custom Hook)
├── DataNasabahHeader (Header Component)
└── DataNasabahList (List Component)
    └── DataNasabahCard (Card Component)
        ├── Basic Info (ID, Name, Address)
        ├── Financial Data (Angsuran, Saldo, Tabungan)
        ├── Timestamps (Created, Updated)
        └── Actions (Delete, Press)
```
