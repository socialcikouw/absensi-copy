# Panduan Setup SQL - Aplikasi Absensi

## 📋 Daftar File SQL

### 1. `create-tables.sql` - Tabel Database Saja

**Fungsi**: Membuat tabel `drop_baru_harian` dan `drop_lama_harian`
**Isi**:

- ✅ Tabel drop_baru_harian dengan perhitungan otomatis
- ✅ Tabel drop_lama_harian dengan input manual
- ✅ Row Level Security (RLS) policies
- ✅ Indexes untuk performance
- ✅ Triggers untuk update timestamp

### 2. `create-storage-buckets.sql` - Storage Buckets Saja

**Fungsi**: Membuat storage buckets untuk foto
**Isi**:

- ✅ Bucket dropbaru-photos untuk foto drop baru harian
- ✅ Bucket droplama-photos untuk foto drop lama harian
- ✅ Storage policies untuk keamanan

### 3. `setup-storage-buckets.sql` - Semua Komponen (Recommended)

**Fungsi**: Setup lengkap database dan storage
**Isi**:

- ✅ Semua tabel database
- ✅ Semua storage buckets
- ✅ Semua policies dan security
- ✅ Indexes dan triggers
- ✅ Verifikasi setup lengkap

## 🚀 Cara Penggunaan

### Opsi 1: Setup Lengkap (Recommended)

1. **Buka Supabase Dashboard**

   - Login ke [Supabase Dashboard](https://supabase.com/dashboard)
   - Pilih project Anda
   - Klik menu **SQL Editor**

2. **Jalankan Script Lengkap**

   ```sql
   -- Copy seluruh isi file setup-storage-buckets.sql
   -- Paste di SQL Editor
   -- Klik tombol "Run" atau tekan Ctrl+Enter
   ```

3. **Verifikasi Hasil**
   - Cek output di bagian bawah SQL Editor
   - Pastikan semua query berhasil (tidak ada error)
   - Lihat pesan "✅ Setup database dan storage berhasil!"

### Opsi 2: Setup Bertahap

#### Langkah 1: Buat Tabel Database

```sql
-- Copy isi file create-tables.sql
-- Jalankan di SQL Editor
-- Verifikasi tabel berhasil dibuat
```

#### Langkah 2: Buat Storage Buckets

```sql
-- Copy isi file create-storage-buckets.sql
-- Jalankan di SQL Editor
-- Verifikasi buckets berhasil dibuat
```

## 📊 Verifikasi Setup

### 1. Cek Tabel Database

```sql
-- Cek apakah tabel sudah dibuat
SELECT
  table_name,
  table_type,
  '✅ Tabel berhasil dibuat' as status
FROM information_schema.tables
WHERE table_name IN ('drop_baru_harian', 'drop_lama_harian')
  AND table_schema = 'public';
```

### 2. Cek Storage Buckets

```sql
-- Cek apakah buckets sudah dibuat
SELECT
  id,
  name,
  public,
  file_size_limit,
  '✅ Bucket berhasil dibuat' as status
FROM storage.buckets
WHERE id IN ('dropbaru-photos', 'droplama-photos');
```

### 3. Cek RLS Policies

```sql
-- Cek policies untuk tabel
SELECT
  tablename,
  policyname,
  cmd,
  '✅ Policy berhasil dibuat' as status
FROM pg_policies
WHERE tablename IN ('drop_baru_harian', 'drop_lama_harian');
```

### 4. Cek Storage Policies

```sql
-- Cek policies untuk storage
SELECT
  policyname,
  cmd,
  '✅ Storage policy berhasil dibuat' as status
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%drop%';
```

## 🔍 Troubleshooting

### Error: "relation already exists"

**Penyebab**: Tabel sudah ada
**Solusi**:

- Gunakan `CREATE TABLE IF NOT EXISTS` (sudah ada di script)
- Atau drop tabel dulu jika ingin recreate

### Error: "bucket already exists"

**Penyebab**: Bucket sudah ada
**Solusi**:

- Script menggunakan `ON CONFLICT (id) DO NOTHING`
- Bucket tidak akan dibuat ulang jika sudah ada

### Error: "policy already exists"

**Penyebab**: Policy sudah ada
**Solusi**:

- Drop policy dulu: `DROP POLICY "policy_name" ON table_name;`
- Atau gunakan `CREATE POLICY IF NOT EXISTS` (untuk PostgreSQL 15+)

### Error: "function already exists"

**Penyebab**: Function sudah ada
**Solusi**:

- Script menggunakan `CREATE OR REPLACE FUNCTION`
- Function akan diupdate otomatis

### Error: "cannot use generated column in column generation expression"

**Penyebab**: Generated column mereferensikan generated column lain
**Solusi**:

- Gunakan perhitungan langsung dari kolom input
- Hindari dependensi antar generated columns

## 📝 Struktur Tabel

### drop_baru_harian

| Column     | Type         | Description                          |
| ---------- | ------------ | ------------------------------------ |
| id         | UUID         | Primary key                          |
| profile_id | UUID         | Foreign key ke auth.users            |
| foto       | TEXT         | URL foto nasabah                     |
| nama       | VARCHAR(255) | Nama nasabah                         |
| alamat     | TEXT         | Alamat nasabah                       |
| pinjaman   | INTEGER      | Jumlah pinjaman                      |
| angsuran   | INTEGER      | Auto-calculated (5% dari pinjaman)   |
| tabungan   | INTEGER      | Auto-calculated (5% dari pinjaman)   |
| saldo      | INTEGER      | Auto-calculated (120% dari pinjaman) |
| created_at | TIMESTAMPTZ  | Waktu dibuat                         |
| updated_at | TIMESTAMPTZ  | Waktu update                         |

### drop_lama_harian

| Column     | Type         | Description               |
| ---------- | ------------ | ------------------------- |
| id         | UUID         | Primary key               |
| profile_id | UUID         | Foreign key ke auth.users |
| foto       | TEXT         | URL foto nasabah          |
| nama       | VARCHAR(255) | Nama nasabah              |
| alamat     | TEXT         | Alamat nasabah            |
| saldo      | INTEGER      | Saldo manual input        |
| angsuran   | INTEGER      | Angsuran manual input     |
| tabungan   | INTEGER      | Tabungan manual input     |
| created_at | TIMESTAMPTZ  | Waktu dibuat              |
| updated_at | TIMESTAMPTZ  | Waktu update              |

## 🔐 Security Features

### Row Level Security (RLS)

- Setiap user hanya bisa akses data mereka sendiri
- Policy berdasarkan `auth.uid() = profile_id`
- Mencakup SELECT, INSERT, UPDATE, DELETE

### Storage Policies

- Hanya authenticated users yang bisa upload
- Hanya authenticated users yang bisa view
- Hanya authenticated users yang bisa delete

## 📈 Performance Features

### Indexes

- `idx_drop_baru_harian_profile_id` - untuk query berdasarkan user
- `idx_drop_baru_harian_created_at` - untuk sorting berdasarkan waktu
- `idx_drop_lama_harian_profile_id` - untuk query berdasarkan user
- `idx_drop_lama_harian_created_at` - untuk sorting berdasarkan waktu

### Generated Columns

- `angsuran`, `tabungan`, `saldo` di drop_baru_harian dihitung otomatis
- Mengurangi overhead aplikasi
- Konsistensi data terjamin
- Tidak ada dependensi antar generated columns

### Triggers

- Auto-update `updated_at` saat ada perubahan data
- Tidak perlu manual update timestamp

## 🧪 Testing

### Test Insert Data

```sql
-- Test insert drop baru harian
INSERT INTO drop_baru_harian (profile_id, nama, alamat, pinjaman)
VALUES (
  auth.uid(),
  'Test Nasabah',
  'Test Alamat',
  1000000
);

-- Verifikasi perhitungan otomatis
SELECT
  pinjaman,
  angsuran,
  tabungan,
  saldo,
  'Angsuran harus 5% dari pinjaman' as check_angsuran,
  'Tabungan harus 5% dari pinjaman' as check_tabungan,
  'Saldo harus 120% dari pinjaman' as check_saldo
FROM drop_baru_harian
WHERE nama = 'Test Nasabah';

-- Test insert drop lama harian
INSERT INTO drop_lama_harian (profile_id, nama, alamat, saldo, angsuran, tabungan)
VALUES (
  auth.uid(),
  'Test Nasabah Lama',
  'Test Alamat Lama',
  500000,
  50000,
  25000
);
```

### Test Upload Foto

```sql
-- Test upload ke storage (via aplikasi)
-- Cek apakah file muncul di bucket
SELECT * FROM storage.objects
WHERE bucket_id = 'dropbaru-photos';
```

### Test Policies

```sql
-- Test apakah user hanya bisa lihat data sendiri
SELECT * FROM drop_baru_harian WHERE profile_id = auth.uid();
```

## 📞 Support

### Jika Ada Error

1. **Cek Log Error**: Lihat pesan error di SQL Editor
2. **Cek Documentation**: Lihat [DATABASE_SETUP.md](./DATABASE_SETUP.md)
3. **Cek Supabase Docs**: [Supabase Documentation](https://supabase.com/docs)
4. **Buat Issue**: Jika masih bermasalah, buat issue di GitHub

### Debug Commands

```sql
-- Cek user authentication
SELECT auth.uid();

-- Cek table structure
\d drop_baru_harian

-- Cek storage buckets
SELECT * FROM storage.buckets;

-- Cek policies
SELECT * FROM pg_policies WHERE tablename = 'drop_baru_harian';

-- Cek generated columns
SELECT
  column_name,
  data_type,
  is_generated,
  generation_expression
FROM information_schema.columns
WHERE table_name = 'drop_baru_harian'
  AND is_generated = 'ALWAYS';
```

---

**Status**: ✅ **READY** - File SQL siap digunakan untuk setup database dan storage!
