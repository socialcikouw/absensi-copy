-- SQL untuk Membuat Storage Buckets untuk Foto
-- Jalankan script ini di Supabase SQL Editor

-- ========================================
-- 1. BUAT STORAGE BUCKETS
-- ========================================

-- Buat bucket untuk foto drop baru harian
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dropbaru-photos',
  'dropbaru-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Buat bucket untuk foto drop lama harian
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'droplama-photos',
  'droplama-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 2. BUAT STORAGE POLICIES
-- ========================================

-- Policy untuk upload foto drop baru harian
CREATE POLICY "Authenticated users can upload dropbaru photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Policy untuk view foto drop baru harian
CREATE POLICY "Authenticated users can view dropbaru photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Policy untuk delete foto drop baru harian
CREATE POLICY "Authenticated users can delete dropbaru photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'dropbaru-photos' AND auth.role() = 'authenticated'
  );

-- Policy untuk upload foto drop lama harian
CREATE POLICY "Authenticated users can upload droplama photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'droplama-photos' AND auth.role() = 'authenticated'
  );

-- Policy untuk view foto drop lama harian
CREATE POLICY "Authenticated users can view droplama photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'droplama-photos' AND auth.role() = 'authenticated'
  );

-- Policy untuk delete foto drop lama harian
CREATE POLICY "Authenticated users can delete droplama photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'droplama-photos' AND auth.role() = 'authenticated'
  );

-- ========================================
-- 3. VERIFIKASI SETUP
-- ========================================

-- Verifikasi buckets telah dibuat
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  '✅ Bucket berhasil dibuat' as status
FROM storage.buckets 
WHERE id IN ('dropbaru-photos', 'droplama-photos');

-- Verifikasi storage policies
SELECT 
  policyname,
  cmd,
  '✅ Storage policy berhasil dibuat' as status
FROM pg_policies 
WHERE tablename = 'objects'
  AND policyname LIKE '%drop%';

-- ========================================
-- 4. PESAN SUKSES
-- ========================================

SELECT '✅ Setup storage buckets dropbaru-photos dan droplama-photos berhasil!' as status; 