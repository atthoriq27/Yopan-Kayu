# Yopan Kayu — Custom Furniture Platform & Admin CMS

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

Platform web resmi dan Content Management System (CMS) untuk **Yopan Kayu**, unit usaha workshop mebel dan kriya kayu kustom di Tigaraksa, Kabupaten Tangerang. Dirancang dan dibangun sebagai solusi digital *end-to-end* yang menghubungkan calon pelanggan secara langsung dengan pengrajin, dilengkapi sistem manajemen inventaris mandiri, proteksi keamanan tingkat produksi, serta optimasi SEO lokal.

🌐 **Website Live:** [https://yopankayu.com](https://yopankayu.com)

---

## 🌟 Sorotan Fitur & Nilai Bisnis

### 1. Pengalaman Pelanggan (Public Showcase)
* **Katalog Produk Dinamis (`/produk`)**: Fitur pencarian instan dan filter kategori mebel *real-time* (meja kerja/makan, kursi, lemari/rak, kustom) dengan tag spesifikasi bahan baku.
* **Konversi Pemesanan Otomatis WhatsApp (`/produk/:slug`)**: Alur pemesanan langsung terintegrasi WhatsApp dengan pembuatan pesan otomatis (*pre-populated order message*) yang memuat nama produk, ukuran, dan referensi desain.
* **Galeri Dokumentasi Lapangan (`/galeri`)**: Portofolio proyek nyata (kafe, perkantoran, hunian) dengan tampilan modal *lightbox* resolusi tinggi.
* **Edukasi Karakteristik Kayu Solid (`/tentang`)**: Panduan interaktif pemilihan bahan kayu solid (Jati Belanda/Pinus, Mahoni, Sungkai, Jati) untuk membantu keputusan pembelian calon pelanggan.
* **Antarmuka Mobile-First**: Navigasi bawah bergaya aplikasi native (*bottom navigation bar*), drawer sentuh, serta floating CTA WhatsApp.

### 2. Portal Pengelola Mandiri (`/kelola`)
* **Autentikasi Terproteksi**: Dilengkapi verifikasi kata sandi lama saat pembaruan profil, *rate-limiting* lokal, serta *lockout timer* untuk memitigasi serangan brute-force.
* **Proteksi Bot Cloudflare Turnstile**: Integrasi CAPTCHA modern tanpa teka-teki visual yang mengganggu pengguna asli, aktif memverifikasi setiap upaya login.
* **Manajemen Produk & Inventaris (`/kelola/produk`)**: Manajemen CRUD produk, status tayang (Aktif / Draft), dan penanda Produk Unggulan.
* **Manajemen Portofolio & Kategori (`/kelola/kategori`, `/kelola/galeri`)**: Pengelolaan foto hasil pengerjaan dan struktur kategori mebel.
* **Pengaturan Profil Bisnis (`/kelola/profil`)**: Pengelola dapat mengubah nomor WhatsApp, alamat workshop, tautan Google Maps, dan jam operasional tanpa perlu menyentuh kodingan.

### 3. Keamanan & Performa Produksi (Security Hardening)
* **Route Cloaking**: Rute pemindai bot umum (`/admin` dan `/admin/*`) otomatis dialihkan ke halaman utama, mengaburkan lokasi portal manajemen yang sebenarnya (`/kelola`).
* **Content Security Policy (CSP)**: Konfigurasi header ketat pada Netlify (`netlify.toml`) untuk memblokir serangan XSS, clickjacking (`X-Frame-Options: DENY`), dan injeksi skrip eksternal yang tidak diizinkan.
* **Edge Network Cloudflare**: Pengelolaan DNS dengan perlindungan DDOS dan *Bot Fight Mode* aktif sebelum permintaan mencapai server.

### 4. Hasil Validasi Mesin Pencari (Search Engine Impact)
* **Peringkat #1 Google Search**: Berhasil menduduki peringkat teratas pada pencarian kata kunci merek dan furnitur lokal Tangerang.
* **Google Sitelinks Aktif**: Struktur web yang rapi dan semantik membuat Google secara otomatis memberikan *sitelinks* navigasi langsung pada hasil pencarian.
* **Schema.org Structured Data**: Integrasi JSON-LD `HomeAndConstructionBusiness` untuk memperkuat indeks profil bisnis lokal dan Google Maps.
* **Aset Favicon Multi-Ukuran**: Standardisasi ikon situs web dengan logo resmi pohon YK dalam format SVG, PNG (48px, 96px, 192px), ICO, dan Apple Touch Icon.

---

## 🛠️ Tech Stack & Ekosistem

| Layer | Teknologi | Peran & Implementasi |
|---|---|---|
| **Frontend Core** | React 18, TypeScript, Vite | Single Page Application (SPA) dengan *strict type safety* |
| **Styling & UI** | Tailwind CSS, PostCSS | Sistem desain *artisanal woodcraft* responsif |
| **Icons & Fonts** | Lucide React, Google Material Icons | Ikonografi modern dan tipografi Google Fonts |
| **Routing** | React Router DOM v6 | Navigasi client-side dengan *persistent layout* & *scroll reset* |
| **Backend & Database** | Supabase (PostgreSQL) | Headless database, Row Level Security (RLS), Storage Buckets |
| **Security & CAPTCHA** | Cloudflare Turnstile, Netlify CSP | Proteksi bot login dan pengerasan header HTTP |
| **Deployment & Hosting**| Netlify | Automated Git-triggered CI/CD dengan SPA redirects |
| **DNS & CDN** | Cloudflare | DNS management, SSL/TLS, Bot Fight Mode |

---

## 📁 Struktur Direktori

```text
yopan-kayu/
├── public/                 # Aset statis (Favicon multi-ukuran, Sitemap, Robots, Logo)
│   ├── favicon.svg         # Vektor favicon resmi
│   ├── favicon-48x48.png   # Ikon standar Google Search
│   ├── sitemap.xml         # Peta situs terindeks Google
│   └── _redirects          # SPA fallback routing untuk Netlify
├── src/
│   ├── components/         # Komponen UI modular (Navbar, Footer, ProductCard, dll.)
│   ├── lib/
│   │   ├── constants.ts    # Data fallback & initial state
│   │   ├── dataService.ts  # Layer abstraksi data (Supabase API / LocalStorage)
│   │   └── supabase.ts     # Inisialisasi klien Supabase
│   ├── pages/              # Halaman publik (Home, Products, Gallery, About, Contact)
│   │   └── admin/          # Halaman CMS pengelola (/kelola/*)
│   ├── types/              # Deklarasi tipe TypeScript (Product, Category, Profile)
│   ├── App.tsx             # Konfigurasi routing utama & proteksi rute
│   ├── main.tsx            # Entry point aplikasi React
│   └── index.css           # Styling dasar & utilitas kustom
├── supabase/
│   └── schema.sql          # Skema database PostgreSQL, RLS policies, & storage
├── .github/
│   └── workflows/ci.yml    # Otomatisasi validasi build & typecheck (CI)
├── netlify.toml            # Header keamanan produksi (CSP/HSTS) & konfigurasi build
├── tailwind.config.js      # Konfigurasi tema warna & tipografi Tailwind
└── vite.config.ts          # Konfigurasi bundler Vite
```

---

## 👤 Pengembang Proyek

Didesain dan dikembangkan oleh **[Arfii](https://github.com/atthoriq27)**.  
Lisensi kode: [MIT License](LICENSE).
