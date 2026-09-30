import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { CustomSelect } from '../../components/CustomSelect';
import { getProductById, saveProduct, getCategories, uploadImage } from '../../lib/dataService';
import { Category, Product } from '../../types';

export const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [finish, setFinish] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newAddImageUrl, setNewAddImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    async function init() {
      const cats = await getCategories();
      setCategories(cats);
      if (cats.length > 0 && !categoryId) {
        setCategoryId(cats[0].id);
      }

      if (isEdit && id) {
        const prod = await getProductById(id);
        if (prod) {
          setName(prod.name);
          setSlug(prod.slug);
          setCategoryId(prod.category_id);
          setPrice(prod.price || '');
          setDescription(prod.description || '');
          setMaterial(prod.material || '');
          setDimensions(prod.dimensions || '');
          setFinish(prod.finish || '');
          setImageUrl(prod.image_url || '');
          setIsActive(prod.is_active);
          setIsFeatured(prod.is_featured);
          if (prod.images) {
            setAdditionalImages(prod.images.map(img => img.image_url));
          }
        }
        setFetching(false);
      }
    }
    init();
  }, [id, isEdit]);

  // Auto-generate slug when name changes if slug wasn't manually edited
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  const handleMainFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'products');
      setImageUrl(url);
    } catch (err: any) {
      alert(err?.message || 'Gagal mengunggah foto.');
    } finally {
      setUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAdditionalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'products');
      setAdditionalImages((prev) => [...prev, url]);
    } catch (err: any) {
      alert(err?.message || 'Gagal mengunggah foto tambahan.');
    } finally {
      setUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAddAdditionalImage = () => {
    if (newAddImageUrl.trim()) {
      setAdditionalImages([...additionalImages, newAddImageUrl.trim()]);
      setNewAddImageUrl('');
    }
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama produk wajib diisi.');
      return;
    }
    if (!categoryId) {
      alert('Pilih kategori produk.');
      return;
    }

    setLoading(true);
    try {
      const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await saveProduct(
        {
          id: id || undefined,
          name: name.trim(),
          slug: finalSlug,
          category_id: categoryId,
          price: Number(price) || 0,
          description: description.trim(),
          material: material.trim(),
          dimensions: dimensions.trim(),
          finish: finish.trim(),
          image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
          is_active: isActive,
          is_featured: isFeatured,
        },
        additionalImages
      );

      navigate('/kelola/produk');
    } catch (err: any) {
      alert(`Gagal menyimpan produk: ${err.message || 'Terjadi kesalahan.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Produk">
        <div className="p-12 text-center text-xs text-[#52443b]">Memuat data produk...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEdit ? 'Ubah Informasi Produk' : 'Tambah Produk Mebel Baru'}
      subtitle="Pastikan foto produk jernih dan spesifikasi kayu terisi lengkap."
      actionButton={
        <Link
          to="/kelola/produk"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#ede5d8] text-xs font-semibold text-[#52443b] hover:bg-[#faf7f2]"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Batal</span>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-sm flex flex-col gap-6 sm:gap-8 w-full max-w-4xl min-w-0 box-border">
        
        {/* Basic Details Section */}
        <div className="flex flex-col gap-4 w-full min-w-0">
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19] border-b border-[#ede5d8] pb-2">
            1. Informasi Dasar Produk
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs sm:text-sm w-full min-w-0">
            <div className="flex flex-col gap-1.5 sm:col-span-2 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Nama Produk *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Meja Makan Solid Teak 6 Kursi"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Slug URL (Otomatis) *</label>
              <input
                type="text"
                required
                placeholder="meja-makan-solid-teak"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Kategori Mebel *</label>
              <CustomSelect
                value={categoryId}
                onChange={(val) => setCategoryId(val)}
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                placeholder="Pilih Kategori Mebel..."
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Harga Estimasi (Rp) *</label>
              <input
                type="number"
                placeholder="Contoh: 4850000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Bahan Baku Kayu</label>
              <input
                type="text"
                placeholder="Contoh: Kayu Jati Solid Pilihan (Kadar Air < 14%)"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Dimensi / Ukuran</label>
              <input
                type="text"
                placeholder="Contoh: 180 x 90 x 76 cm"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Finishing Akhir</label>
              <input
                type="text"
                placeholder="Contoh: Natural Polyurethane Clear Doff"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 w-full min-w-0">
              <label className="font-bold text-[#1c1c19]">Deskripsi Lengkap Produk</label>
              <textarea
                rows={4}
                placeholder="Ceritakan keistimewaan sambungan, keunggulan serat, serta saran penempatan ruangan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>
          </div>
        </div>

        {/* Media / Photos Section */}
        <div className="flex flex-col gap-4 w-full min-w-0">
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19] border-b border-[#ede5d8] pb-2">
            2. Dokumentasi Foto Produk
          </h2>

          {/* Main Photo */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full min-w-0">
            <div className="w-full sm:w-48 max-w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0ede9] border border-[#ede5d8] flex-shrink-0 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview Foto Utama" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[#85746a] text-[36px]">image</span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-3 w-full min-w-0 text-xs sm:text-sm">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <label className="font-bold text-[#1c1c19]">Foto Utama (Wajib)</label>
                <input
                  type="text"
                  placeholder="URL Foto atau Unggah berkas di bawah..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
                />
              </div>

              <div>
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f0ede9] hover:bg-[#ede5d8] text-xs font-bold text-[#1c1c19] cursor-pointer transition-colors w-full sm:w-auto text-center">
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  <span>{uploadingImage ? 'Mengunggah...' : 'Pilih Berkas Foto'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainFileUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Additional Photos */}
          <div className="flex flex-col gap-3 pt-3 border-t border-[#ede5d8]/60 text-xs sm:text-sm w-full min-w-0">
            <label className="font-bold text-[#1c1c19]">Foto Tambahan / Sudut Lain (Opsional)</label>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full min-w-0">
              <input
                type="text"
                placeholder="Masukkan URL foto sudut lain..."
                value={newAddImageUrl}
                onChange={(e) => setNewAddImageUrl(e.target.value)}
                className="flex-1 min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
              <button
                type="button"
                onClick={handleAddAdditionalImage}
                className="flex-shrink-0 px-3.5 py-2 bg-[#6f3c16] text-white rounded-xl text-xs font-bold hover:bg-[#5a2f10] active:scale-95"
              >
                Tambah URL
              </button>
              <label className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f0ede9] hover:bg-[#ede5d8] text-xs font-bold text-[#1c1c19] cursor-pointer transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[16px]">upload</span>
                <span>Unggah Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalFileUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {additionalImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 pt-2 w-full min-w-0">
                {additionalImages.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#ede5d8] group">
                    <img src={url} alt={`Tambahan ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveAdditionalImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Display Settings Section */}
        <div className="flex flex-col gap-4 w-full min-w-0">
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19] border-b border-[#ede5d8] pb-2">
            3. Pengaturan Tampilan dan Status
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full min-w-0">
            <label className="flex items-start sm:items-center gap-3 cursor-pointer min-w-0">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 accent-[#6f3c16] rounded flex-shrink-0 mt-0.5 sm:mt-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-[#1c1c19]">Status Aktif / Tayang</span>
                <span className="text-[11px] text-[#52443b] leading-tight">Tampilkan produk di katalog publik website</span>
              </div>
            </label>

            <label className="flex items-start sm:items-center gap-3 cursor-pointer min-w-0">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-[#6f3c16] rounded flex-shrink-0 mt-0.5 sm:mt-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-[#1c1c19]">Produk Unggulan</span>
                <span className="text-[11px] text-[#52443b] leading-tight">Sorot produk ini di beranda depan (Landing Page)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Actions Buttons */}
        <div className="pt-4 border-t border-[#ede5d8] flex items-center justify-end gap-2.5 sm:gap-3 w-full min-w-0">
          <Link
            to="/kelola/produk"
            className="px-4 sm:px-5 py-2.5 rounded-xl border border-[#ede5d8] text-xs sm:text-sm font-bold text-[#52443b] hover:bg-[#faf7f2] transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Simpan Produk</span>
              </>
            )}
          </button>
        </div>

      </form>
    </AdminLayout>
  );
};
