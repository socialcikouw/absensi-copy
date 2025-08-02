# Database Setup Guide

## Supabase Database Setup

### 1. Setup Database Tables

Jalankan file SQL berikut untuk membuat tabel:

#### File: `create-tables.sql`

```sql
-- Jalankan di Supabase SQL Editor
-- File: create-tables.sql
```

Script ini akan membuat:

- Tabel `drop_baru_harian` dengan perhitungan otomatis
- Tabel `drop_lama_harian` dengan input manual
- Row Level Security (RLS) policies
- Indexes untuk performance
- Triggers untuk update timestamp

#### drop_baru_harian Table

```sql
CREATE TABLE IF NOT EXISTS drop_baru_harian (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  foto TEXT,
  nama VARCHAR(255) NOT NULL,
  alamat TEXT NOT NULL,
  pinjaman INTEGER NOT NULL,
  angsuran INTEGER GENERATED ALWAYS AS (pinjaman * 0.05) STORED,
  tabungan INTEGER GENERATED ALWAYS AS (pinjaman * 0.05) STORED,
  saldo INTEGER GENERATED ALWAYS AS (pinjaman * 1.2) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### drop_lama_harian Table

```sql
CREATE TABLE IF NOT EXISTS drop_lama_harian (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  foto TEXT,
  nama VARCHAR(255) NOT NULL,
  alamat TEXT NOT NULL,
  saldo INTEGER NOT NULL,
  angsuran INTEGER NOT NULL,
  tabungan INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Setup Storage Buckets

Jalankan file SQL berikut untuk membuat storage buckets:

#### File: `create-storage-buckets.sql`

```sql
-- Jalankan di Supabase SQL Editor
-- File: create-storage-buckets.sql
```

Script ini akan membuat:

- Bucket `dropbaru-photos` untuk foto drop baru harian
- Bucket `droplama-photos` untuk foto drop lama harian
- Storage policies untuk keamanan

#### Create Storage Buckets

1. **dropbaru-photos bucket** (untuk foto drop baru harian):

   - Go to Storage in Supabase Dashboard
   - Create new bucket named `dropbaru-photos`
   - Set as public bucket
   - Configure CORS policy if needed

2. **droplama-photos bucket** (untuk foto drop lama harian):

   - Create new bucket named `droplama-photos`
   - Set as public bucket
   - Configure CORS policy if needed

#### Storage Policies

For each bucket, create the following policies:

```sql
-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload dropbaru photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to view photos
CREATE POLICY "Authenticated users can view dropbaru photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete their own photos
CREATE POLICY "Authenticated users can delete dropbaru photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );
```

### 3. Complete Setup (All-in-One)

Jika ingin setup semuanya sekaligus, gunakan file:

#### File: `setup-storage-buckets.sql`

```sql
-- Jalankan di Supabase SQL Editor
-- File: setup-storage-buckets.sql
```

Script ini mencakup:

- ✅ Tabel drop_baru_harian dan drop_lama_harian
- ✅ Storage buckets dropbaru-photos dan droplama-photos
- ✅ RLS policies untuk semua tabel
- ✅ Storage policies untuk semua buckets
- ✅ Indexes untuk performance
- ✅ Triggers untuk update timestamp
- ✅ Verifikasi setup lengkap

### 4. Environment Variables

Make sure your `.env` file contains:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Permissions Setup

#### iOS Permissions (app.json)

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Aplikasi memerlukan akses ke galeri untuk memilih foto nasabah.",
          "cameraPermission": "Aplikasi memerlukan akses ke kamera untuk mengambil foto nasabah."
        }
      ]
    ]
  }
}
```

#### Android Permissions (app.json)

```json
{
  "expo": {
    "android": {
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

### 6. Testing the Setup

1. **Test Database Connection**:

   - Try creating a new drop baru harian record
   - Verify RLS policies work correctly

2. **Test Photo Upload**:

   - Try uploading a photo from gallery/camera
   - Verify photo appears in Supabase Storage
   - Verify photo URL is accessible

3. **Test Photo Deletion**:

   - Try deleting a record with photo
   - Verify photo is removed from Storage

### 7. Troubleshooting

#### Common Issues:

1. **Photo upload fails**:

   - Check bucket permissions
   - Verify CORS settings
   - Check file size limits

2. **RLS policy errors**:

   - Ensure user is authenticated
   - Check policy syntax
   - Verify table structure

3. **Photo not displaying**:

   - Check bucket is public
   - Verify URL format
   - Test URL accessibility

4. **Generated column errors**:

   - Ensure no circular dependencies between generated columns
   - Use direct calculations from input columns only

#### Debug Commands:

```sql
-- Check if user is authenticated
SELECT auth.uid();

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'drop_baru_harian';

-- Check storage buckets
SELECT * FROM storage.buckets;

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'drop_baru_harian';

-- Check generated columns
SELECT
  column_name,
  data_type,
  is_generated,
  generation_expression
FROM information_schema.columns
WHERE table_name = 'drop_baru_harian'
  AND is_generated = 'ALWAYS';
```

### 8. Security Considerations

1. **File Size Limits**: Photos are limited to 5MB
2. **File Type Validation**: Only JPG, PNG, WebP allowed
3. **User Isolation**: Users can only access their own photos
4. **Automatic Cleanup**: Photos are deleted when records are deleted

### 9. Performance Optimization

1. **Image Compression**: Photos are compressed to 80% quality
2. **Caching**: Photos are cached for 1 hour
3. **Lazy Loading**: Photos are loaded on demand
4. **Error Handling**: Graceful fallbacks for failed uploads

### 10. File Structure

```
📁 SQL Files:
├── create-tables.sql          # Tabel database saja
├── create-storage-buckets.sql # Storage buckets saja
└── setup-storage-buckets.sql  # Semua komponen (recommended)

📁 Documentation:
├── DATABASE_SETUP.md          # Panduan lengkap ini
├── SETUP-MANUAL.md           # Setup manual di dashboard
└── PHOTO_FEATURE_SUMMARY.md  # Ringkasan fitur foto
```

### 11. Quick Start

1. **Jalankan SQL Script**:

   ```bash
   # Copy isi file setup-storage-buckets.sql
   # Paste di Supabase SQL Editor
   # Klik Run
   ```

2. **Verifikasi Setup**:

   - Cek Tables di Database
   - Cek Storage Buckets
   - Test upload foto

3. **Test Aplikasi**:

   ```bash
   npx expo start
   ```

### 12. Support

Jika ada masalah:

1. Cek [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
2. Buat issue di GitHub repository
3. Hubungi Supabase support jika diperlukan
