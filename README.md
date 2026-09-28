# Yopan Kayu - Website Mebel & Kriya Kayu Solid

Website resmi dan sistem informasi pemasaran UMKM **Yopan Kayu** (Tigaraksa, Kabupaten Tangerang). Dibuat menggunakan React, Vite, Tailwind CSS, dan terintegrasi dengan Supabase.

---

## 🌟 Fitur Utama

### 1. Halaman Publik (Tampilan Mobile & Desktop)
- **Beranda (Landing Page) (`/`)**:
  - Banner Kemitraan PkM Universitas Pamulang
  - Hero Section dengan CTA ganda ("Lihat Katalog" & "Konsultasi WA")
  - Strip Kategori Pilihan (scroll horizontal)
  - Profil Singkat Usaha & Pengrajin Utama Mas Yopan
  - Portofolio Preview hasil pengerjaan kriya
  - 4 Keunggulan Bengkel Kriya (Kayu solid asli, custom ukuran, langsung pengrajin, presisi)
  - Produk Unggulan Terpilih
  - 5 Alur Pemesanan Mudah (non-checkout / non-ecommerce)
  - CTA Khusus WhatsApp Desain Kustom
  - Informasi Workshop Fisik & Peta Google Maps
  - Footer Lengkap
- **Katalog Produk Lengkap (`/produk`)**:
  - Filter kategori (Semua, Kursi & Sofa, Makan & Kerja, Lemari & Rak, Pesanan Kustom)
  - Pencarian (Search) nama produk dan jenis kayu
  - Kartu produk informatif dengan format harga Rupiah dan tag bahan kayu
- **Detail Produk (`/produk/:slug`)**:
  - Galeri foto utama + thumbnail sudut lain
  - Spesifikasi bahan baku, dimensi ukuran, dan finishing
  - Tombol **"Tanya via WhatsApp"** dengan pesan otomatis:
    `Halo Yopan Kayu, saya tertarik dengan produk [Nama Produk]. Saya ingin mendapatkan informasi lebih lanjut.`
  - Rekomendasi produk terkait dari kategori yang sama
- **Galeri Portofolio (`/galeri`)**:
  - Dokumentasi hasil pekerjaan lapangan
  - Filter kategori proyek (Residensial, Kafe & Komersial, Interior Rumah)
  - Lightbox modal untuk melihat foto resolusi penuh
  - Tombol konsultasi proyek serupa ke WhatsApp
- **Tentang Kami (`/tentang`)**:
  - Profil lengkap, dedikasi kayu solid nusantara (Jati, Mahoni, Trembesi, Sungkai, Pinus)
  - Kemitraan dengan program PkM Universitas Pamulang
- **Kontak & Workshop (`/kontak`)**:
  - Alamat workshop di Pamulang, jam operasional, link Google Maps, Instagram resmi
  - Formulir konsultasi cepat yang langsung tersambung ke WhatsApp

### 2. Admin CMS Dashboard (`/admin`)
- **Autentikasi Aman (`/admin/login`)**:
  - Login via Supabase Auth atau Demo Mode (`admin@yopankayu.com` / `admin123`)
- **Ringkasan Usaha (`/admin`)**:
  - Metrik total produk, produk aktif, kategori, dan dokumentasi galeri
- **Manajemen Produk (`/admin/produk`)**:
  - Tambah, Edit, Hapus produk mebel
  - Kelola foto utama dan multi-foto sudut lain
  - Toggle status tayang (Aktif/Draft) & status Unggulan
- **Manajemen Kategori (`/admin/kategori`)**:
  - Tambah, edit, dan hapus kategori mebel
- **Manajemen Galeri (`/admin/galeri`)**:
  - Unggah foto portofolio, atur judul, lokasi proyek, dan kategori
- **Pengaturan Profil Usaha (`/admin/profil`)**:
  - Ubah nama usaha, deskripsi, nomor WhatsApp utama, alamat workshop, link maps, dan Instagram langsung tanpa coding

---

## 🛠️ Desain & Estetika (UI/UX)
Mengadopsi spesifikasi desain **Artisanal Woodcraft Commerce**:
- **Warna Pokok**: Teak / Cognac Brown (`#6f3c16` / `#85532b`), WhatsApp Emerald Green (`#006c47`), Soft Warm Eggshell (`#faf7f2`), Soft Sand Border (`#ede5d8`).
- **Tipografi**: Heading serif berwibawa (*Playfair Display* / *Merriweather*) dipadukan sans-serif modern (*Plus Jakarta Sans*).
- **Pengalaman Mobile**: Bottom navigation bar bergaya native app, touch drawer, dan tombol cepat WhatsApp melayang.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka peramban di: `http://localhost:5173/`

3. **Build produksi:**
   ```bash
   npm run build
   ```

---

## 🗄️ Setup Database Supabase

1. Buat proyek baru di [Supabase](https://supabase.com).
2. Buka menu **SQL Editor** di dashboard Supabase Anda.
3. Buka file [schema.sql](file:///c:/CODING/Yopan%20Kayu/supabase/schema.sql) di proyek ini, salin seluruh kodenya, lalu klik **Run**.
   Script ini secara otomatis membuat:
   - Tabel `categories`, `products`, `product_images`, `gallery`, `business_profile`
   - Row Level Security (RLS) policies (Publik hanya bisa membaca data aktif, Admin dapat mengelola CRUD)
   - Storage buckets: `products`, `gallery`, `business`
   - Data awal (seed data)
4. Buat user admin baru di Supabase menu **Authentication** -> **Users** -> **Add user** (misal: `admin@yopankayu.com` dengan password yang aman).
5. Salin URL dan Anon Key dari **Project Settings** -> **API**, lalu masukkan ke dalam file `.env`:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

*Catatan: Jika Supabase belum dikonfigurasi, website otomatis berjalan menggunakan mode penyimpanan lokal (localStorage) dengan data bawaan yang lengkap sehingga langsung bisa digunakan untuk pengujian dan demo.*

---

## 🌐 Panduan Deployment ke Netlify

1. Hubungkan repository GitHub ke Netlify.
2. Atur Build command:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Tambahkan Environment Variables di Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Untuk mendukung routing client-side (SPA) di Netlify, file `public/_redirects` telah disiapkan:
   ```text
   /*    /index.html   200
   ```
