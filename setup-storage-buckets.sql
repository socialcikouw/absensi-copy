-- SQL untuk Setup Lengkap Database dan Storage
-- Jalankan script ini di Supabase SQL Editor untuk setup lengkap

-- ========================================
-- 1. TABEL DROP BARU HARIAN
-- ========================================

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

-- Enable RLS untuk drop_baru_harian
ALTER TABLE drop_baru_harian ENABLE ROW LEVEL SECURITY;

-- Policy untuk drop_baru_harian
CREATE POLICY "Users can view own drop_baru_harian" ON drop_baru_harian
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own drop_baru_harian" ON drop_baru_harian
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own drop_baru_harian" ON drop_baru_harian
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own drop_baru_harian" ON drop_baru_harian
  FOR DELETE USING (auth.uid() = profile_id);

-- ========================================
-- 2. TABEL DROP LAMA HARIAN
-- ========================================

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

-- Enable RLS untuk drop_lama_harian
ALTER TABLE drop_lama_harian ENABLE ROW LEVEL SECURITY;

-- Policy untuk drop_lama_harian
CREATE POLICY "Users can view own drop_lama_harian" ON drop_lama_harian
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own drop_lama_harian" ON drop_lama_harian
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own drop_lama_harian" ON drop_lama_harian
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own drop_lama_harian" ON drop_lama_harian
  FOR DELETE USING (auth.uid() = profile_id);

-- ========================================
-- 3. STORAGE BUCKETS
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
-- 4. STORAGE POLICIES
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
-- 5. INDEXES UNTUK PERFORMANCE
-- ========================================

-- Index untuk profile_id di drop_baru_harian
CREATE INDEX IF NOT EXISTS idx_drop_baru_harian_profile_id 
ON drop_baru_harian(profile_id);

-- Index untuk created_at di drop_baru_harian
CREATE INDEX IF NOT EXISTS idx_drop_baru_harian_created_at 
ON drop_baru_harian(created_at DESC);

-- Index untuk profile_id di drop_lama_harian
CREATE INDEX IF NOT EXISTS idx_drop_lama_harian_profile_id 
ON drop_lama_harian(profile_id);

-- Index untuk created_at di drop_lama_harian
CREATE INDEX IF NOT EXISTS idx_drop_lama_harian_created_at 
ON drop_lama_harian(created_at DESC);

-- ========================================
-- 6. TRIGGER UNTUK UPDATE TIMESTAMP
-- ========================================

-- Function untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger untuk drop_baru_harian
CREATE TRIGGER update_drop_baru_harian_updated_at 
    BEFORE UPDATE ON drop_baru_harian 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk drop_lama_harian
CREATE TRIGGER update_drop_lama_harian_updated_at 
    BEFORE UPDATE ON drop_lama_harian 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 7. VERIFIKASI SETUP LENGKAP
-- ========================================

-- Verifikasi tabel telah dibuat
SELECT 
  table_name,
  table_type,
  '✅ Tabel berhasil dibuat' as status
FROM information_schema.tables 
WHERE table_name IN ('drop_baru_harian', 'drop_lama_harian')
  AND table_schema = 'public';

-- Verifikasi RLS policies
SELECT 
  tablename,
  policyname,
  cmd,
  '✅ RLS Policy berhasil dibuat' as status
FROM pg_policies 
WHERE tablename IN ('drop_baru_harian', 'drop_lama_harian');

-- Verifikasi storage buckets
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
  '✅ Storage Policy berhasil dibuat' as status
FROM pg_policies 
WHERE tablename = 'objects'
  AND policyname LIKE '%drop%';

-- Verifikasi indexes
SELECT 
  tablename,
  indexname,
  '✅ Index berhasil dibuat' as status
FROM pg_indexes 
WHERE tablename IN ('drop_baru_harian', 'drop_lama_harian')
  AND indexname LIKE 'idx_drop_%';

-- Verifikasi triggers
SELECT 
  trigger_name,
  event_manipulation,
  action_statement,
  '✅ Trigger berhasil dibuat' as status
FROM information_schema.triggers 
WHERE trigger_name LIKE '%drop_%_updated_at';

-- ========================================
-- 8. PESAN SUKSES
-- ========================================

SELECT '✅ Setup lengkap database dan storage berhasil!' as status; 