# Changelog

Semua perubahan penting pada proyek **Yopan Kayu** didokumentasikan dalam berkas ini.

Format dokumen ini mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/), dan proyek ini mematuhi prinsip [Semantic Versioning](https://semver.org/lang/id/).

---

## [1.2.0] - 2026-10-21

### Ditambahkan
- **Cloudflare Turnstile CAPTCHA**: Perlindungan bot transparan pada formulir masuk pengelola (`/kelola/login`).
- **Verifikasi Ganti Kata Sandi**: Fitur pembaruan kata sandi akun pengelola dengan validasi kata sandi lama pada `/kelola/profil`.
- **Aset Favicon Multi-Ukuran**: Peningkatan ikon situs web dengan logo resmi pohon YK dalam format SVG, PNG (48px, 96px, 192px), ICO, dan Apple Touch Icon.
- **Data Terstruktur Schema.org**: Penerapan Schema JSON-LD `HomeAndConstructionBusiness` untuk memperkuat indeks profil bisnis lokal di Google Search.
- **GitHub Collaboration Templates**: Template Issue (Bug Report, Feature Request) dan Pull Request.
- **Workflow CI/CD**: Otomatisasi GitHub Actions untuk pengecekan tipe (*typecheck*) dan validasi *build*.

### Diubah
- **Optimasi Judul & Meta SEO**: Pembaruan judul utama dan deskripsi pencarian yang berfokus pada jasa kustomisasi furnitur kayu di wilayah Tangerang dan Jabodetabek.
- **Peta Situs (Sitemap)**: Pembaruan tanggal modifikasi berkala pada `sitemap.xml` untuk Googlebot.
- **Tipografi & Konten**: Standardisasi simbol tipografi dan penyelarasan narasi profil workshop Pak Suheri (Pak Heri) di Tigaraksa.

---

## [1.1.0] - 2026-10-10

### Keamanan
- **Route Cloaking**: Pengalihan rute umum `/admin` ke halaman utama (`/`) untuk mengecoh pemindai bot otomatis; memindahkan rute operasional ke `/kelola`.
- **Content Security Policy (CSP)**: Konfigurasi header keamanan ketat pada Netlify (`netlify.toml`) termasuk mitigasi XSS dan clickjacking.
- **Rate Limiting Lokal**: Pembatasan percobaan login gagal (*failed attempts threshold*) dengan penguncian sementara (*lockout duration*).

### Peningkatan
- Pengoptimalan *scroll restoration* dan transisi rute tanpa kedipan pada layout publik.

---

## [1.0.0] - 2026-09-28

### Rilis Perdana
- Rilis produksi platform katalog furnitur kayu resmi Yopan Kayu.
- Halaman publik: Beranda, Katalog Produk (`/produk`), Detail Produk (`/produk/:slug`), Galeri Portofolio (`/galeri`), Tentang Kami (`/tentang`), dan Kontak (`/kontak`).
- Integrasi WhatsApp Direct Order dengan pesan otomatis berbasis nama produk dan dimensi.
- Integrasi database Supabase PostgreSQL dengan kebijakan *Row Level Security (RLS)*.
- CMS mandiri untuk manajemen produk, kategori, dokumentasi portofolio, dan profil usaha.
- Konfigurasi automated deployment via Netlify CI/CD.
