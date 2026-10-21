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

Website resmi dan platform katalog digital untuk **Yopan Kayu**, workshop pengrajin mebel dan kriya kayu di Tigaraksa, Kabupaten Tangerang. Dibangun dengan arsitektur modern berbasis React, TypeScript, dan Supabase, serta dilengkapi portal Content Management System (CMS) mandiri dan sistem keamanan berlapis.

🔗 **Akses Langsung:** [https://yopankayu.com](https://yopankayu.com)

---

## 📐 Arsitektur & Fitur Utama

### 1. Antarmuka Publik (Client Experience)
- **Katalog Produk Dinamis (`/produk`)**: Penyaringan kategori real-time, pencarian instan nama produk & bahan kayu, serta indikator spesifikasi material.
- **Detail Produk & Konsultasi Langsung (`/produk/:slug`)**: Galeri foto multi-sudut, spesifikasi dimensi, dan tombol pemesanan WhatsApp otomatis dengan *pre-filled message*.
- **Portofolio Galeri Proyek (`/galeri`)**: Dokumentasi pengerjaan lapangan (furnitur kafe, residensial, kantor) dengan modal preview resolusi tinggi.
- **Profil Workshop & Informasi Kayu (`/tentang`, `/kontak`)**: Komparasi karakteristik kayu solid (Jati Belanda/Pinus, Mahoni, Sungkai, Jati) dan rute Google Maps terintegrasi.
- **Pengalaman Mobile-First**: Navigasi bawah (*bottom bar*) ala aplikasi native, drawer menu sentuh, serta tombol WhatsApp melayang.

### 2. Portal Manajemen Pengelola (`/kelola`)
- **Autentikasi Terproteksi (`/kelola/login`)**: Dilengkapi sistem verifikasi ganti kata sandi, *rate-limiting* lokal, dan *lockout timer* mitigasi serangan brute-force.
- **Proteksi Bot Cloudflare Turnstile**: Integrasi CAPTCHA transparan tanpa teka-teki visual yang mengganggu pengguna asli.
- **Manajemen Inventaris & Katalog (`/kelola/produk`)**: Operasi CRUD produk lengkap dengan status tayang (Draft/Aktif) dan penanda Produk Unggulan.
- **Manajemen Kategori & Galeri (`/kelola/kategori`, `/kelola/galeri`)**: Pengelolaan taksonomi mebel dan dokumentasi foto proyek.
- **Pengaturan Profil Usaha (`/kelola/profil`)**: Modifikasi nomor WhatsApp, alamat workshop, tautan Google Maps, dan media sosial secara mandiri tanpa menyentuh kode.

### 3. Keamanan & Infrastruktur (Production Hardening)
- **Route Cloaking**: Rute umum bot (`/admin` dan `/admin/*`) otomatis dialihkan ke halaman utama, memitigasi pemindaian bot otomatis.
- **Content Security Policy (CSP)**: Konfigurasi header ketat pada Netlify (`netlify.toml`) untuk mencegah XSS, clickjacking (`X-Frame-Options: DENY`), dan injeksi skrip berbahaya.
- **Cloudflare Edge Protection**: DNS terkelola dengan Bot Fight Mode aktif untuk menyaring lalu lintas bot berbahaya sebelum mencapai server.

### 4. Search Engine Optimization (Technical & Local SEO)
- **Schema.org Structured Data**: Integrasi JSON-LD bertipe `HomeAndConstructionBusiness` untuk mendukung *Google Knowledge Graph* dan profil bisnis lokal.
- **Indeks Google & Sitelinks**: Terindeks di peringkat **#1 Google Search** dengan tautan navigasi langsung (*Google Sitelinks*).
- **Aset Favicon Multi-Platform**: Mendukung SVG vektor, ICO multi-ukuran (16px, 32px, 48px), PNG standar Google (48px, 96px, 192px), dan Apple Touch Icon.
- **XML Sitemap Otomatis**: Dilengkapi konfigurasi frekuensi pembaruan (*changefreq*) dan prioritas perayapan untuk mesin pencari.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, PostCSS, Google Fonts (Playfair Display, Merriweather, Plus Jakarta Sans) |
| **Icons & UI Assets** | Lucide React, Google Material Symbols |
| **Routing & Navigation**| React Router DOM v6 (dengan layout persist & scroll restoration) |
| **Backend & Database** | Supabase (PostgreSQL, Row Level Security, Storage Buckets, Auth) |
| **Security & Captcha** | Cloudflare Turnstile, Strict CSP Headers |
| **Deployment & CI/CD** | Netlify (Automated Git-triggered builds) |
| **Domain & DNS** | Cloudflare DNS (HTTPS, DNSSEC, Bot Management) |

---

## 📁 Struktur Direktori

```text
yopan-kayu/
├── public/                 # Aset statis publik (Favicon, Sitemap, Robots, Logo)
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
├── netlify.toml            # Pengaturan build & header keamanan produksi (CSP/HSTS)
├── tailwind.config.js      # Konfigurasi tema warna & tipografi Tailwind
└── vite.config.ts          # Konfigurasi bundler Vite
```

---

## 🚀 Panduan Memulai (Local Development)

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- Package manager: `npm` atau `pnpm`

### 1. Kloning Repository
```bash
git clone https://github.com/atthoriq27/Yopan-Kayu.git
cd Yopan-Kayu
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi Supabase Anda:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```
> *Catatan: Jika variabel Supabase dikosongkan, aplikasi akan otomatis berjalan menggunakan mock data bawaan (`localStorage`) sehingga seluruh antarmuka tetap dapat diuji secara penuh.*

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:5173`.

### 5. Build Produksi
Untuk menguji hasil bundle sebelum deployment:
```bash
npm run build
npm run preview
```

---

## 🗄️ Inisialisasi Database (Supabase)

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Buka menu **SQL Editor**.
3. Buka file [`supabase/schema.sql`](file:///c:/CODING/Yopan%20Kayu/supabase/schema.sql), salin seluruh isi kodenya, lalu klik **Run**.
4. Skrip akan secara otomatis membuat:
   - Tabel: `categories`, `products`, `product_images`, `gallery`, dan `business_profile`.
   - Kebijakan **Row Level Security (RLS)**: Publik hanya dapat membaca data yang aktif; Pengelola terautentikasi dapat melakukan operasi CRUD penuh.
   - Storage Buckets: `products`, `gallery`, dan `business` beserta kebijakan aksesnya.
5. Buat akun pengelola di **Authentication** $\rightarrow$ **Users** $\rightarrow$ **Add User**.

---

## 📄 Dokumentasi & Standar Komunitas

- [Panduan Kontribusi (CONTRIBUTING.md)](CONTRIBUTING.md)
- [Pedoman Perilaku Komunitas (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md)
- [Catatan Rilis (CHANGELOG.md)](CHANGELOG.md)
- [Kebijakan Keamanan (SECURITY.md)](SECURITY.md)
- [Lisensi Proyek (LICENSE)](LICENSE)

---

## 👤 Pengembang Utama

Dikembangkan oleh **[Arfii](https://github.com/atthoriq27)**.  
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
