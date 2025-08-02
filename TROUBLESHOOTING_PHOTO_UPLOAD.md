# Troubleshooting Upload Foto - 0 Bytes Issue

## 🔍 **Masalah yang Dialami**

**Gejala**:

- Foto berhasil diupload ke Supabase Storage
- File muncul di storage dengan ukuran 0 bytes
- Foto tidak bisa ditampilkan
- Column `foto` di database terisi URL tapi foto kosong

## 🛠️ **Solusi yang Telah Diterapkan**

### 1. **Perbaikan StorageService**

**File**: `src/services/storage/storageService.ts`

**Perubahan**:

- Menggunakan `FormData` untuk React Native compatibility
- Menghilangkan dependensi `expo-file-system`
- Menambahkan logging yang lebih detail
- Menggunakan `contentType: 'image/jpeg'` secara eksplisit

```typescript
// Create FormData for React Native compatibility
const formData = new FormData();

// Append file to FormData
formData.append("file", {
  uri: fileUri,
  type: "image/jpeg",
  name: fileName,
} as any);

// Upload to Supabase Storage using FormData
const { data, error } = await supabase.storage
  .from("dropbaru-photos")
  .upload(fileName, formData, {
    cacheControl: "3600",
    upsert: false,
    contentType: "image/jpeg",
  });
```

### 2. **Verifikasi Storage Buckets**

**File**: `create-storage-buckets.sql` dan `setup-storage-buckets.sql`

**Pastikan bucket sudah dibuat dengan benar**:

```sql
-- Jalankan di Supabase SQL Editor
-- File: setup-storage-buckets.sql
```

**Bucket yang diperlukan**:

- `dropbaru-photos` - untuk foto drop baru harian
- `droplama-photos` - untuk foto drop lama harian

**Konfigurasi bucket**:

- Public access: `true`
- File size limit: `5242880` (5MB)
- Allowed MIME types: `['image/jpeg', 'image/png', 'image/webp']`

### 3. **Verifikasi Storage Policies**

**Policies yang diperlukan**:

```sql
-- Upload policy
CREATE POLICY "Authenticated users can upload dropbaru photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- View policy
CREATE POLICY "Authenticated users can view dropbaru photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Delete policy
CREATE POLICY "Authenticated users can delete dropbaru photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );
```

## 🔧 **Langkah Debugging**

### 1. **Cek Console Logs**

Buka developer tools dan lihat console logs:

```javascript
// Logs yang harus muncul:
"Starting upload for drop baru photo: filename.jpg";
"File URI: file:///path/to/photo.jpg";
"FormData created, attempting upload...";
"Upload successful: https://...";
```

### 2. **Verifikasi File URI**

Pastikan URI yang dikembalikan oleh `useImagePicker` valid:

```typescript
// Di useImagePicker.ts, tambahkan logging:
console.log("Selected file URI:", result.assets[0].uri);
console.log("File size:", result.assets[0].fileSize);
console.log("File type:", result.assets[0].type);
```

### 3. **Test Upload Manual**

Coba upload file kecil (1-2MB) untuk test:

```typescript
// Test dengan file yang sudah pasti valid
const testUri = "file:///path/to/small-test-image.jpg";
const result = await storageService.uploadDropBaruPhoto(testUri, "test.jpg");
console.log("Test upload result:", result);
```

### 4. **Cek Supabase Dashboard**

1. **Storage Buckets**:

   - Buka Supabase Dashboard > Storage
   - Pastikan bucket `dropbaru-photos` dan `droplama-photos` ada
   - Cek apakah bucket public

2. **Storage Policies**:

   - Buka Supabase Dashboard > Storage > Policies
   - Pastikan policies untuk upload, view, delete sudah ada

3. **File Details**:
   - Klik file yang diupload
   - Cek metadata file (size, type, created_at)
   - Coba download file untuk test

## 🚨 **Kemungkinan Penyebab**

### 1. **React Native File URI Issue**

**Masalah**: React Native tidak bisa langsung menggunakan `fetch` untuk `file://` URI

**Solusi**: Gunakan `FormData` seperti yang sudah diimplementasikan

### 2. **Storage Bucket Configuration**

**Masalah**: Bucket tidak dikonfigurasi dengan benar

**Solusi**: Jalankan `setup-storage-buckets.sql` di Supabase SQL Editor

### 3. **Storage Policies**

**Masalah**: Policies tidak mengizinkan upload

**Solusi**: Pastikan policies untuk INSERT sudah dibuat

### 4. **File Size/Type Validation**

**Masalah**: File terlalu besar atau format tidak didukung

**Solusi**: Cek validasi di `useImagePicker.ts`

### 5. **Network Issues**

**Masalah**: Koneksi internet bermasalah saat upload

**Solusi**: Cek koneksi dan coba upload ulang

## 📋 **Checklist Verifikasi**

### ✅ **Setup Database**

- [ ] Tabel `drop_baru_harian` dan `drop_lama_harian` sudah dibuat
- [ ] Column `foto` ada di kedua tabel
- [ ] RLS policies sudah dibuat

### ✅ **Setup Storage**

- [ ] Bucket `dropbaru-photos` sudah dibuat
- [ ] Bucket `droplama-photos` sudah dibuat
- [ ] Bucket public access = true
- [ ] File size limit = 5MB
- [ ] Allowed MIME types sudah dikonfigurasi

### ✅ **Setup Policies**

- [ ] Upload policies sudah dibuat
- [ ] View policies sudah dibuat
- [ ] Delete policies sudah dibuat

### ✅ **Code Implementation**

- [ ] `storageService.ts` sudah diperbaiki
- [ ] `useImagePicker.ts` sudah benar
- [ ] Form hooks sudah terintegrasi

### ✅ **Testing**

- [ ] Coba upload file kecil (1-2MB)
- [ ] Cek console logs
- [ ] Verifikasi file di Supabase Dashboard
- [ ] Test download file

## 🔄 **Alternatif Solusi**

### 1. **Gunakan Base64 Upload**

Jika FormData masih bermasalah, coba upload base64:

```typescript
// Convert file to base64 first
const base64 = await FileSystem.readAsStringAsync(fileUri, {
  encoding: FileSystem.EncodingType.Base64,
});

// Upload base64 string
const { data, error } = await supabase.storage
  .from("dropbaru-photos")
  .upload(fileName, base64, {
    contentType: "image/jpeg",
  });
```

### 2. **Gunakan Blob Upload**

Coba dengan pendekatan blob yang berbeda:

```typescript
// Convert URI to blob using XMLHttpRequest
const blob = await new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => resolve(xhr.response);
  xhr.onerror = () => reject(new Error("Failed to load file"));
  xhr.open("GET", fileUri);
  xhr.responseType = "blob";
  xhr.send();
});

// Upload blob
const { data, error } = await supabase.storage
  .from("dropbaru-photos")
  .upload(fileName, blob);
```

### 3. **Gunakan Supabase Storage API Langsung**

Coba dengan REST API langsung:

```typescript
const response = await fetch(
  `${supabaseUrl}/storage/v1/object/dropbaru-photos/${fileName}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "image/jpeg",
    },
    body: formData,
  }
);
```

## 📞 **Support**

Jika masalah masih berlanjut:

1. **Cek Logs**: Lihat console logs untuk error detail
2. **Test Manual**: Coba upload file via Supabase Dashboard
3. **Check Network**: Pastikan koneksi internet stabil
4. **Restart App**: Restart aplikasi dan coba lagi
5. **Contact Support**: Jika masih bermasalah, buat issue di GitHub

---

**Status**: 🔧 **IN PROGRESS** - Perbaikan sedang dilakukan
