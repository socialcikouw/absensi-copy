# Aplikasi Absensi dengan Fitur Foto

Aplikasi React Native dengan Expo untuk mengelola data nasabah dengan fitur upload foto yang terintegrasi dengan Supabase.

## Fitur Utama

### 📸 Fitur Foto Terintegrasi

- **Upload Foto**: Pilih foto dari galeri atau ambil foto dengan kamera
- **Validasi File**: Validasi ukuran file (maksimal 5MB) dan format (JPG, PNG, WebP)
- **Kompresi Otomatis**: Foto dikompresi untuk menghemat bandwidth
- **Preview Real-time**: Tampilkan preview foto sebelum upload
- **Hapus Foto**: Kemampuan untuk menghapus foto yang sudah dipilih
- **Error Handling**: Penanganan error yang komprehensif

### 🏦 Manajemen Data Nasabah

- **Drop Baru Harian**: Nasabah baru dengan perhitungan otomatis
- **Drop Lama Harian**: Nasabah lama dengan input manual
- **Perhitungan Otomatis**: Angsuran, tabungan, dan saldo dihitung otomatis
- **Validasi Form**: Validasi input yang ketat
- **CRUD Operations**: Create, Read, Update, Delete data nasabah

### 🔐 Keamanan

- **Row Level Security (RLS)**: Setiap user hanya bisa akses data mereka sendiri
- **Storage Policies**: Foto terlindungi dengan policy yang tepat
- **Authentication**: Sistem login yang aman dengan Supabase Auth

## Teknologi yang Digunakan

- **Frontend**: React Native + Expo
- **Backend**: Supabase (PostgreSQL + Storage)
- **Image Picker**: expo-image-picker
- **State Management**: React Hooks
- **Styling**: StyleSheet API

## Setup dan Instalasi

### 1. Prerequisites

- Node.js (v16 atau lebih baru)
- Expo CLI
- Supabase account

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Buat file `.env` dengan konfigurasi Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

Ikuti panduan di [DATABASE_SETUP.md](./DATABASE_SETUP.md) untuk setup database dan storage.

### 5. Run Application

```bash
npx expo start
```

## Struktur Kode

### Hooks

- `useImagePicker`: Hook untuk menangani pemilihan foto
- `useDropBaruHarianForm`: Hook untuk form drop baru harian
- `useDropLamaHarianForm`: Hook untuk form drop lama harian

### Services

- `storageService`: Service untuk upload/delete foto
- `dropBaruHarianService`: Service untuk operasi CRUD drop baru
- `dropLamaHarianService`: Service untuk operasi CRUD drop lama

### Components

- `CreateDropBaruHarianScreen`: Screen untuk tambah nasabah baru
- `CreateDropLamaHarianScreen`: Screen untuk tambah nasabah lama
- `ImageWithFallback`: Component untuk tampilkan foto dengan fallback

## Fitur Foto dalam Detail

### Image Picker Integration

```typescript
const { loading: imageLoading, pickImageWithOptions } = useImagePicker();

const handleImagePick = async () => {
  const result = await pickImageWithOptions();
  if (result.uri && !result.error) {
    updatePhoto(result.uri);
  }
};
```

### Photo Upload Process

1. **Validasi**: Cek ukuran dan format file
2. **Kompresi**: Kompresi foto ke 80% quality
3. **Upload**: Upload ke Supabase Storage
4. **URL Test**: Test apakah URL foto bisa diakses
5. **Cleanup**: Hapus foto jika operasi utama gagal

### Error Handling

- Permission errors
- File size validation
- Upload failures
- Network errors
- Storage quota exceeded

## API Endpoints

### Storage Buckets

- `dropbaru-photos`: Foto nasabah drop baru harian
- `droplama-photos`: Foto nasabah drop lama harian

### Database Tables

- `drop_baru_harian`: Data nasabah baru
- `drop_lama_harian`: Data nasabah lama

## Security Features

### Row Level Security (RLS)

```sql
CREATE POLICY "Users can view own data" ON drop_baru_harian
  FOR SELECT USING (auth.uid() = profile_id);
```

### Storage Policies

```sql
CREATE POLICY "Authenticated users can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'dropbaru-photos');
```

## Performance Optimizations

### Image Optimization

- **Compression**: 80% quality untuk menghemat bandwidth
- **Caching**: Cache foto selama 1 jam
- **Lazy Loading**: Load foto saat diperlukan
- **Progressive Loading**: Tampilkan placeholder saat loading

### Database Optimization

- **Indexes**: Index pada profile_id untuk query yang cepat
- **Generated Columns**: Perhitungan otomatis untuk mengurangi overhead
- **Connection Pooling**: Menggunakan Supabase connection pooling

## Troubleshooting

### Common Issues

1. **Foto tidak upload**

   - Cek permission kamera/galeri
   - Verifikasi koneksi internet
   - Cek storage bucket permissions

2. **Foto tidak tampil**

   - Cek URL foto di Supabase Storage
   - Verifikasi bucket public access
   - Test URL accessibility

3. **Error permission**
   - Restart aplikasi
   - Cek settings permission di device
   - Reinstall aplikasi jika perlu

### Debug Commands

```bash
# Check Expo logs
npx expo logs

# Check Supabase connection
npx expo start --clear
```

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Support

Untuk bantuan dan pertanyaan:

- Buat issue di GitHub
- Dokumentasi lengkap di [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- Supabase documentation: https://supabase.com/docs
