# Yopan Kayu — Custom Furniture Platform & CMS

[![Live Demo](https://img.shields.io/badge/Live_Demo-yopankayu.com-6f3c16?style=flat&logo=google-chrome&logoColor=white)](https://yopankayu.com)
[![CI Validation](https://github.com/atthoriq27/Yopan-Kayu/actions/workflows/ci.yml/badge.svg)](https://github.com/atthoriq27/Yopan-Kayu/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Turnstile_&_DNS-F38020?style=flat&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify&logoColor=white)](https://www.netlify.com/)

Website resmi dan panel kelola (CMS) untuk workshop mebel **Yopan Kayu** di Tigaraksa, Kabupaten Tangerang. Website ini dibuat untuk memudahkan calon pembeli melihat katalog produk, cek portofolio hasil jadi, dan langsung terhubung ke WhatsApp pengrajin untuk custom ukuran atau model, lengkap dengan dashboard pengelola untuk update produk dan profil toko secara mandiri.

Website live: [https://yopankayu.com](https://yopankayu.com)

---

## Fitur Utama

### Halaman Publik
* **Katalog Produk (`/produk`)**: Pengunjung bisa cari produk dan filter berdasarkan kategori (meja, kursi, lemari/rak, pesanan kustom).
* **Order & Konsultasi via WhatsApp (`/produk/:slug`)**: Tiap halaman produk punya tombol WhatsApp yang otomatis mengisi pesan berisi nama produk, spesifikasi bahan, dan ukuran yang diminati.
* **Galeri Proyek (`/galeri`)**: Dokumentasi hasil pengerjaan mebel untuk kafe, kantor, maupun rumah pribadi dengan tampilan foto resolusi penuh.
* **Karakteristik Kayu (`/tentang`)**: Ulasan praktis tentang jenis kayu yang biasa digunakan (Jati Belanda/Pinus, Mahoni, Sungkai, dan Jati) agar pembeli bisa memilih bahan yang pas dengan budget mereka.
* **Tampilan Responsif**: Navigasi nyaman di layar HP dengan bottom navigation bar dan tombol cepat WhatsApp.

### Dashboard Pengelola (`/kelola`)
* **Login Terproteksi**: Dilengkapi verifikasi ganti kata sandi, proteksi brute-force, dan Cloudflare Turnstile captcha agar tidak bisa ditembus bot.
* **Kelola Produk (`/kelola/produk`)**: Tambah, edit, hapus mebel, atur foto produk, serta pilih produk mana yang mau dijadikan produk unggulan di halaman depan.
* **Kelola Galeri & Kategori (`/kelola/kategori`, `/kelola/galeri`)**: Update foto hasil pengerjaan terbaru dan atur kelompok kategori mebel.
* **Profil Bisnis (`/kelola/profil`)**: Pengelola bisa ganti nomor WhatsApp, alamat workshop, tautan Google Maps, dan jam operasional sendiri tanpa perlu ubah kodingan.

### Keamanan & Infrastruktur
* **Pengalihan Rute Admin**: Rute `/admin` sengaja dialihkan ke halaman utama untuk mengelabui bot scanner, sedangkan panel pengelola asli berada di `/kelola`.
* **Header Keamanan Netlify**: Menggunakan Content Security Policy (CSP), X-Frame-Options DENY, dan proteksi XSS pada konfigurasi server Netlify.
* **Cloudflare DNS & Firewall**: Pengelolaan domain dan proteksi Bot Fight Mode di level DNS.

### Optimasi SEO
* **Peringkat 1 Google**: Sudah terindeks di halaman pertama Google untuk pencarian brand dan mebel custom area Tangerang.
* **Google Sitelinks**: Navigasi sub-halaman langsung muncul rapi di hasil pencarian Google.
* **Schema.org LocalBusiness**: Data terstruktur JSON-LD agar Google mengenali unit bisnis fisik Yopan Kayu di Tigaraksa.
* **Favicon Lengkap**: Ikon logo pohon YK resmi dalam format SVG, ICO multi-ukuran, dan PNG standar Google Search (48px, 96px, 192px).

---

## Teknologi yang Digunakan

| Bagian | Teknologi | Keterangan |
|---|---|---|
| Frontend | React 18, TypeScript, Vite | Single Page Application yang cepat dan type-safe |
| Styling | Tailwind CSS | Tampilan clean, modern, dan responsif |
| Icon | Lucide React, Google Material Icons | Ikon navigasi dan simbol produk |
| Routing | React Router DOM v6 | Navigasi halaman dengan layout persisten |
| Database & Auth | Supabase (PostgreSQL) | Database produk, auth pengelola, dan storage gambar |
| Keamanan | Cloudflare Turnstile, Netlify CSP | Captcha anti-bot dan header keamanan web |
| Deployment | Netlify | CI/CD otomatis terhubung ke repositori GitHub |
| DNS | Cloudflare | DNS management dan proteksi bot |

---

## Struktur Folder

```text
yopan-kayu/
├── public/                 # Aset statis (Favicon, logo resmi, sitemap.xml, robots.txt)
│   ├── favicon.svg         # Ikon SVG web
│   ├── favicon-48x48.png   # Ikon standar Google Search
│   ├── sitemap.xml         # Peta situs untuk Googlebot
│   └── _redirects          # Aturan routing SPA Netlify
├── src/
│   ├── components/         # Komponen UI (Navbar, Footer, ProductCard, dll.)
│   ├── lib/
│   │   ├── constants.ts    # Data bawaan & fallback
│   │   ├── dataService.ts  # Layer komunikasi Supabase / LocalStorage
│   │   └── supabase.ts     # Inisialisasi Supabase client
│   ├── pages/              # Halaman publik (Home, Produk, Galeri, Tentang, Kontak)
│   │   └── admin/          # Halaman pengelola (/kelola/*)
│   ├── types/              # Definisi tipe TypeScript
│   ├── App.tsx             # Pengaturan routing utama
│   ├── main.tsx            # Entry point aplikasi
│   └── index.css           # Styling dasar
├── supabase/
│   └── schema.sql          # Skema database PostgreSQL & aturan RLS
├── .github/
│   └── workflows/ci.yml    # Otomatisasi pengecekan build & TypeScript di GitHub
├── netlify.toml            # Header keamanan & pengaturan build Netlify
├── tailwind.config.js      # Konfigurasi tema Tailwind
└── vite.config.ts          # Konfigurasi Vite
```

---

## Pengembang

Dibuat oleh [Arfii](https://github.com/atthoriq27).  
Lisensi: [MIT License](LICENSE).
