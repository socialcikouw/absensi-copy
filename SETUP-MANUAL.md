# Panduan Manual Setup Storage Bucket

## Setup Storage Bucket di Supabase Dashboard

### Langkah 1: Buka Supabase Dashboard

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Klik menu **Storage** di sidebar kiri

### Langkah 2: Buat Bucket untuk Drop Baru Harian

1. Klik tombol **"New bucket"**
2. Isi form dengan detail berikut:
   - **Name**: `dropbaru-photos`
   - **Public bucket**: ✅ **Centang** (penting!)
   - **File size limit**: `5 MB`
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`
3. Klik **"Create bucket"**

### Langkah 3: Buat Bucket untuk Drop Lama Harian

1. Klik tombol **"New bucket"** lagi
2. Isi form dengan detail berikut:
   - **Name**: `droplama-photos`
   - **Public bucket**: ✅ **Centang** (penting!)
   - **File size limit**: `5 MB`
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`
3. Klik **"Create bucket"**

### Langkah 4: Verifikasi Bucket

Setelah membuat bucket, Anda akan melihat:

```
Storage
├── dropbaru-photos (Public)
└── droplama-photos (Public)
```

### Langkah 5: Test Upload Manual (Opsional)

Untuk memastikan bucket berfungsi:

1. Klik bucket `dropbaru-photos`
2. Klik **"Upload file"**
3. Pilih file gambar (JPG/PNG/WebP, < 5MB)
4. Upload file
5. Klik file yang diupload untuk melihat URL

URL harus bisa diakses langsung dari browser.

## Troubleshooting

### Error: "Bucket not found"

**Penyebab**: Bucket belum dibuat atau nama salah
**Solusi**:

- Pastikan nama bucket tepat: `dropbaru-photos` dan `droplama-photos`
- Cek di Storage dashboard apakah bucket ada

### Error: "Permission denied"

**Penyebab**: Bucket tidak public atau policy salah
**Solusi**:

- Pastikan bucket di-set sebagai "Public bucket"
- Cek RLS policies di SQL Editor

### Error: "File size too large"

**Penyebab**: File > 5MB
**Solusi**:

- Kompres foto sebelum upload
- Atau ubah file size limit di bucket settings

### Error: "Invalid file type"

**Penyebab**: File bukan gambar atau format tidak didukung
**Solusi**:

- Pastikan file adalah JPG, PNG, atau WebP
- Cek MIME type di bucket settings

## Verifikasi Setup

### 1. Cek Bucket di Dashboard

```
✅ dropbaru-photos (Public)
✅ droplama-photos (Public)
```

### 2. Test Upload dari Aplikasi

1. Buka aplikasi
2. Coba tambah nasabah baru
3. Upload foto
4. Cek apakah foto muncul di bucket

### 3. Cek Console Logs

Log yang diharapkan:

```
✅ Starting upload for drop baru photo: drop-baru-harian-1234567890.jpg
✅ Upload successful: https://xxx.supabase.co/storage/v1/object/public/dropbaru-photos/...
✅ Photo uploaded successfully to dropbaru-photos
```

## Konfigurasi Tambahan

### CORS Settings (Jika Diperlukan)

Jika ada masalah CORS, tambahkan di bucket settings:

```json
[
  {
    "origin": "*",
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "headers": ["*"]
  }
]
```

### File Retention Policy

Untuk menghemat storage, bisa set retention policy:

1. Buka bucket settings
2. Set **"File retention period"** ke 30 hari atau sesuai kebutuhan
3. Aktifkan **"Automatic cleanup"**

## Monitoring

### Cek Storage Usage

1. Buka **Storage** > **Overview**
2. Lihat **"Storage used"** dan **"Bandwidth used"**
3. Monitor **"File count"** per bucket

### Cek Upload Logs

1. Buka **Logs** > **Storage**
2. Filter by bucket name
3. Monitor upload/delete activities

## Backup & Recovery

### Export Bucket Data

```bash
# Download semua file dari bucket
supabase storage download dropbaru-photos ./backup/dropbaru-photos
supabase storage download droplama-photos ./backup/droplama-photos
```

### Restore Bucket Data

```bash
# Upload file ke bucket
supabase storage upload dropbaru-photos ./backup/dropbaru-photos
supabase storage upload droplama-photos ./backup/droplama-photos
```

## Security Best Practices

1. **Regular Monitoring**: Cek storage usage secara berkala
2. **File Validation**: Pastikan hanya gambar yang diupload
3. **Size Limits**: Tetap gunakan limit 5MB
4. **Backup**: Backup data penting secara berkala
5. **Access Control**: Monitor siapa yang akses storage

## Support

Jika masih ada masalah:

1. Cek [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
2. Buat issue di GitHub repository
3. Hubungi Supabase support jika diperlukan
