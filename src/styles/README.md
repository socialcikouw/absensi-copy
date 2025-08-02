# Styles Documentation

## 📁 **Struktur File**

```
src/styles/
├── authStyles.ts           # Styles untuk komponen auth
├── cardStyles.ts           # Styles untuk card components
├── dashboardStyles.ts      # Styles untuk dashboard
├── dataNasabahStyles.ts    # Styles khusus untuk DataNasabah
├── homeStyles.ts           # Styles untuk home screen
├── nasabahStyles.ts        # Styles untuk form nasabah
├── settingsStyles.ts       # Styles untuk settings
└── README.md               # Dokumentasi ini
```

## 🎨 **DataNasabah Styles**

### **Overview**

`dataNasabahStyles.ts` adalah style khusus untuk komponen DataNasabah yang menggunakan design system modern dengan color palette yang konsisten.

### **Design System**

#### **Color Palette**

```typescript
// Primary Colors
Primary: "#10b981"     // Green untuk Drop Baru
Secondary: "#f59e0b"   // Orange untuk Drop Lama
Danger: "#ef4444"      // Red untuk delete button

// Background Colors
Background: "#f8fafc"  // Light gray background
Card: "#ffffff"        // White card background
ID Section: "#f1f5f9"  // Light gray untuk ID section

// Text Colors
Primary Text: "#1e293b"    // Dark slate
Secondary Text: "#64748b"  // Medium slate
Muted Text: "#94a3b8"      // Light slate
```

#### **Typography**

```typescript
// Header
Header Title: 24px, Bold (700)
Header Subtitle: 14px, Medium (500)

// Card
Card Name: 18px, Bold (700)
Card Address: 14px, Regular
Financial Value: 16px, Bold (700)
ID Value: 12px, Monospace

// Labels
Type Label: 12px, Bold (700), Uppercase
Info Label: 14px, Semi-bold (600)
Timestamp: 12px, Medium (500)
```

### **Component Styles**

#### **1. Card Design**

- **Modern Card**: Border radius 16px, shadow dengan elevation
- **Responsive Layout**: Flexbox untuk adaptif layout
- **Image Container**: 80x80px dengan border dan rounded corners
- **Type Label**: Absolute positioned dengan badge design

#### **2. Financial Data**

- **Highlighted Background**: Light gray background untuk financial data
- **Green Color**: Currency values menggunakan green color
- **Proper Spacing**: Margin dan padding yang konsisten

#### **3. ID Section**

- **Monospace Font**: Untuk ID values agar mudah dibaca
- **Background Container**: Light gray background untuk grouping
- **Compact Layout**: Efficient space usage

#### **4. Timestamp Section**

- **Side-by-side Layout**: Created dan Updated dates
- **Border Separator**: Top border untuk visual separation
- **Small Typography**: Compact text untuk metadata

#### **5. Interactive Elements**

- **Delete Button**: Red background dengan shadow
- **Hover Effects**: Active opacity untuk feedback
- **Proper Spacing**: Consistent button sizing

### **Features**

#### **🎯 Modern Design**

- Shadow dan elevation untuk depth
- Border radius untuk modern look
- Consistent spacing dan typography

#### **📱 Responsive Layout**

- Flexbox untuk adaptive layout
- Proper margins dan padding
- Image scaling yang responsive

#### **🎨 Color Consistency**

- Slate gray color palette
- Semantic colors (green/orange/red)
- Proper contrast ratios

#### **⚡ Performance**

- Optimized shadows
- Efficient layout calculations
- Minimal re-renders

### **Usage Examples**

#### **Basic Card**

```typescript
import { dataNasabahStyles } from "@/styles/dataNasabahStyles";

<View style={dataNasabahStyles.card}>
  <Text style={dataNasabahStyles.cardName}>Nama Nasabah</Text>
</View>;
```

#### **Financial Row**

```typescript
<View style={dataNasabahStyles.financialRow}>
  <Text style={dataNasabahStyles.financialLabel}>Angsuran:</Text>
  <Text style={dataNasabahStyles.financialValue}>Rp 50.000</Text>
</View>
```

#### **Type Label**

```typescript
<View style={[dataNasabahStyles.typeLabel, dataNasabahStyles.typeLabelBaru]}>
  <Text style={dataNasabahStyles.typeLabelText}>Baru</Text>
</View>
```

### **Benefits**

1. **🎨 Visual Consistency** - Design yang konsisten di semua komponen
2. **📱 Responsive Design** - Adaptif untuk berbagai ukuran layar
3. **⚡ Performance** - Optimized styles untuk performa yang baik
4. **🔧 Maintainability** - Mudah diubah dan diperbaiki
5. **📚 Documentation** - Dokumentasi yang lengkap
6. **🎯 User Experience** - UX yang modern dan menarik

### **Best Practices**

1. **Use Semantic Colors** - Gunakan warna yang memiliki makna
2. **Consistent Spacing** - Gunakan spacing yang konsisten
3. **Typography Hierarchy** - Gunakan font size yang sesuai
4. **Responsive Design** - Pastikan responsive di semua device
5. **Performance** - Optimize shadows dan effects
6. **Accessibility** - Pastikan contrast ratio yang baik
