Peran: Kamu adalah seorang ahli rekayasa perangkat lunak yang berspesialisasi dalam React Native, TypeScript, dan optimasi performa.

Konteks: Saya memiliki aplikasi React Native Expo dengan TypeScript. Aplikasi ini menggunakan Supabase untuk autentikasi dan database. Saat ini, saya mengalami masalah performa pada pengambilan (fetching) data dan ingin merombak (refactor) kode saya untuk menerapkan praktik terbaik.

Tujuan Utama: Refactor aplikasi untuk mengintegrasikan TanStack Query (React Query) sebagai lapisan caching data, menerapkan prinsip Separation of Concerns (SoC), dan secara opsional menyiapkan fondasi untuk strategi offline-first menggunakan Expo SQLite.

Berikut adalah langkah-langkah yang harus kamu lakukan:

1. Strukturisasi Lapisan Layanan (Service Layer):

2. Implementasi Custom Hooks untuk Logika Data:

3. Refactor Komponen UI:

4. Persiapan untuk Offline-First dengan Expo SQLite
