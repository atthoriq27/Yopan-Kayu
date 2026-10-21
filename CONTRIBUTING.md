# Contributing to Yopan Kayu

Terima kasih telah tertarik untuk berkontribusi pada proyek **Yopan Kayu**! Dokumen ini berisi panduan untuk menjaga kualitas kode, alur kerja Git, dan standar kolaborasi proyek.

---

## 📋 Alur Kontribusi (Git Workflow)

1. **Fork & Clone**
   ```bash
   git clone https://github.com/<username>/Yopan-Kayu.git
   cd Yopan-Kayu
   ```

2. **Buat Branch Fitur Baru**
   Gunakan konvensi penamaan branch yang deskriptif:
   - `feat/nama-fitur` (untuk fitur baru)
   - `fix/nama-bug` (untuk perbaikan bug)
   - `docs/pembaruan-dokumentasi` (untuk dokumentasi)
   - `refactor/nama-komponen` (untuk refaktorisasi tanpa mengubah fungsi)
   ```bash
   git checkout -b feat/tambah-filter-kayu
   ```

3. **Instal Dependensi & Jalankan Lokal**
   ```bash
   npm install
   npm run dev
   ```

4. **Validasi Kode Sebelum Commit**
   Pastikan tidak ada kesalahan tipe TypeScript dan proses build berhasil:
   ```bash
   npm run typecheck
   npm run build
   ```

5. **Commit Perubahan dengan Conventional Commits**
   Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: tambah filter jenis kayu jati dan pinus pada katalog`
   - `fix: perbaiki validasi form nomor whatsapp pengelola`
   - `docs: perbarui panduan setup environment`
   - `refactor: optimasi pemanggilan Supabase client`
   ```bash
   git commit -m "feat: deskripsi perubahan"
   ```

6. **Push & Buat Pull Request (PR)**
   ```bash
   git push origin feat/nama-fitur
   ```
   Buka GitHub dan ajukan Pull Request ke branch `main`. Pastikan mengisi template PR dengan jelas.

---

## 🎨 Standar Kode & Desain

- **TypeScript**: Hindari penggunaan tipe `any` sebisa mungkin. Definisikan antarmuka/tipe di `src/types/`.
- **Komponen React**: Gunakan *Functional Components* dengan hooks (`useState`, `useEffect`, `useCallback`).
- **Styling**: Gunakan kelas utilitas Tailwind CSS. Selaraskan dengan palet warna brand (`#6f3c16`, `#faf7f2`, `#ede5d8`).
- **Aksesibilitas (a11y)**: Gunakan elemen HTML semantik (`<nav>`, `<main>`, `<article>`, `<button>`) dan sertakan `alt` pada setiap gambar.

---

## ❓ Pertanyaan & Diskusi
Jika menemukan bug atau memiliki ide perbaikan, silakan buka [GitHub Issue](https://github.com/atthoriq27/Yopan-Kayu/issues).
