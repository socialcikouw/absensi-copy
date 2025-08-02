# Dashboard Components

## 📁 **Struktur File**

```
src/components/dashboard/
├── DashboardHeader.tsx      # Header dengan greeting dan filter
├── DashboardCard.tsx        # Card khusus untuk dashboard
├── DashboardList.tsx        # List untuk menampilkan data
├── DashboardItem.tsx        # Card lama (legacy)
├── EmptyState.tsx           # Empty state component
├── ErrorState.tsx           # Error state component
├── LoadingState.tsx         # Loading state component
├── FilterButtons.tsx        # Filter buttons component
└── README.md                # Dokumentasi ini
```

## 🎯 **Komponen**

### **1. DashboardCard.tsx**

- **Tujuan**: Card khusus untuk dashboard dengan design modern
- **Props**: `item`, `onCardPress`, `onDeleteLama`, `onDeleteBaru`
- **Fitur**:
  - **Modern Design**: Shadow, border radius, clean layout
  - **Compact Layout**: Optimized untuk dashboard view
  - **Two-Row Layout**: Foto-nama-dibuat di baris pertama, alamat-angsuran di baris kedua
  - **Interactive**: Touch feedback untuk navigasi

### **2. DashboardHeader.tsx**

- **Tujuan**: Header dengan greeting dan summary data
- **Props**: `combinedData`, `filter`, `dropLamaHarianList`, `dropBaruHarianList`, `onFilterChange`, `userName`
- **Fitur**:
  - **Dynamic Greeting**: Time-based greeting dengan nama user
  - **Data Summary**: Total data dengan breakdown
  - **Filter Integration**: Filter buttons integration

### **3. DashboardList.tsx**

- **Tujuan**: List component untuk menampilkan data dashboard
- **Props**: `data`, `isLoading`, `onRefresh`, `onCardPress`
- **Fitur**:
  - **FlatList**: Optimized untuk performa
  - **Refresh Control**: Pull-to-refresh functionality
  - **Card Rendering**: Render DashboardCard untuk setiap item

### **4. DashboardItem.tsx** (Legacy)

- **Tujuan**: Card lama yang masih digunakan sebagai fallback
- **Status**: Deprecated, akan dihapus setelah migration selesai

## 🎨 **Design System**

### **Color Palette**

```typescript
// Primary Colors
Primary: "#007AFF"     // Blue untuk primary actions
Success: "#10b981"     // Green untuk Drop Baru
Warning: "#f59e0b"     // Orange untuk Drop Lama
Danger: "#ef4444"      // Red untuk delete button

// Background Colors
Background: "#f8fafc"  // Light gray background
Card: "#ffffff"        // White card background
Financial: "#f8fafc"   // Light gray untuk financial data

// Text Colors
Primary Text: "#1e293b"    // Dark slate
Secondary Text: "#64748b"  // Medium slate
Muted Text: "#94a3b8"      // Light slate
```

### **Typography**

```typescript
// Card
Card Name: 16px, Bold (700)
Card Address: 13px, Regular
Card Date: 11px, Italic
Angsuran Value: 14px, Bold (700), Green
Angsuran Label: 11px, Semi-bold (600)

// Header
Header Title: 18px, Bold (700)
Header Subtitle: 12px, Regular
```

## 📊 **Layout Structure**

### **DashboardCard Layout**

```
┌─────────────────────────────────────┐
│ [Foto]  Nama Nasabah        15 Jan  │
│         Alamat lengkap...   Rp 50k  │
└─────────────────────────────────────┘
```

**Baris Pertama**: Foto - Nama - Tanggal Dibuat
**Baris Kedua**: Alamat - Angsuran

### **DashboardHeader Layout**

```
┌─────────────────────────────────────┐
│ Selamat Pagi, Nael!                │
│ Total Drop: 5 Nasabah (3 Drop Lama, │
│ 2 Drop Baru)                       │
│                                     │
│ [Semua] [Drop Lama] [Drop Baru]     │
└─────────────────────────────────────┘
```

## 🔧 **Features**

### **🎯 Modern Design**

- Shadow dan elevation untuk depth
- Border radius untuk modern look
- Consistent spacing dan typography
- Clean two-row layout

### **📱 Responsive Layout**

- Flexbox untuk adaptive layout
- Proper margins dan padding
- Image scaling yang responsive
- Touch-friendly card sizes

### **⚡ Performance**

- Optimized shadows
- Efficient layout calculations
- Minimal re-renders
- Proper key extraction

### **🎨 Interactive Elements**

- Touch feedback dengan activeOpacity
- Card press untuk navigasi
- Filter button animations
- Refresh control integration

## 📋 **Usage Examples**

### **Basic DashboardCard**

```typescript
import { DashboardCard } from "@/components/dashboard/DashboardCard";

<DashboardCard
  item={item}
  onCardPress={handleCardPress}
  onDeleteLama={async () => true}
  onDeleteBaru={async () => true}
/>;
```

### **DashboardList**

```typescript
import { DashboardList } from "@/components/dashboard/DashboardList";

<DashboardList
  data={filteredData}
  isLoading={isLoading}
  onRefresh={handleRefresh}
  onCardPress={handleCardPress}
/>;
```

### **DashboardHeader with Greeting**

```typescript
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

<DashboardHeader
  combinedData={combinedData}
  filter={filter}
  dropLamaHarianList={dropLamaHarianList}
  dropBaruHarianList={dropBaruHarianList}
  onFilterChange={handleFilterChange}
  userName={userName}
/>;
```

## ✅ **Benefits**

1. **🎨 Visual Consistency** - Design yang konsisten dengan DataNasabah
2. **📱 Responsive Design** - Adaptif untuk berbagai ukuran layar
3. **⚡ Performance** - Optimized untuk dashboard performance
4. **🔧 Maintainability** - Mudah diubah dan diperbaiki
5. **📚 Documentation** - Dokumentasi yang lengkap
6. **🎯 User Experience** - UX yang modern dan menarik
7. **🔄 Separation of Concern** - Logic terpisah dari UI

## 🔄 **Migration**

### **From DashboardItem to DashboardCard**

- ✅ **Completed**: DashboardCard sudah dibuat
- ✅ **Completed**: Style sudah diupdate
- ✅ **Completed**: Index.tsx sudah menggunakan DashboardCard
- ✅ **Completed**: Layout baru dengan two-row design
- ✅ **Completed**: Removed delete button dan badge
- 🔄 **Pending**: Remove DashboardItem setelah testing

### **Benefits of Migration**

1. **Better Design** - Modern card design dengan layout yang lebih clean
2. **Simplified Layout** - Two-row layout yang mudah dibaca
3. **Compact Display** - Optimized untuk dashboard view
4. **Consistent Styling** - Menggunakan design system yang sama
5. **No Delete Functionality** - Focus pada display dan navigasi

## 🎯 **Best Practices**

1. **Use DashboardCard** - Untuk semua card di dashboard
2. **Consistent Styling** - Gunakan dashboardStyles
3. **Proper Props** - Pass semua required props
4. **Navigation** - Handle card press untuk navigasi
5. **Performance** - Use proper key extraction
6. **Accessibility** - Ensure proper touch targets
