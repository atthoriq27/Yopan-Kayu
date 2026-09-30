import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { CustomSelect } from '../../components/CustomSelect';
import { getGallery, saveGalleryItem, deleteGalleryItem, uploadImage } from '../../lib/dataService';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Residensial');
  const [location, setLocation] = useState('Jabodetabek');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getGallery();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCategory('Residensial');
    setLocation('Jabodetabek');
  };

  const handleStartEdit = (item: GalleryItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.image_url);
    setCategory(item.category || 'Residensial');
    setLocation(item.location || 'Jabodetabek');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, 'gallery');
      setImageUrl(url);
    } catch (err: any) {
      alert(err?.message || 'Gagal mengunggah foto.');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      alert('Judul dan foto wajib diisi.');
      return;
    }

    setSaving(true);
    try {
      await saveGalleryItem({
        id: editingId || undefined,
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim(),
        category,
        location: location.trim(),
      });
      resetForm();
      await loadData();
    } catch (err: any) {
      alert(`Gagal menyimpan: ${err.message || 'Error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (window.confirm(`Hapus dokumentasi "${itemTitle}" dari galeri?`)) {
      try {
        await deleteGalleryItem(id);
        await loadData();
      } catch (err: any) {
        alert(`Gagal menghapus: ${err.message || 'Error'}`);
      }
    }
  };

  return (
    <AdminLayout
      title="Manajemen Galeri Portofolio"
      subtitle="Unggah dan kelola foto dokumentasi kriya pesanan yang telah dikerjakan."
    >
      <div className="flex flex-col gap-8">
        
        {/* Form Add / Edit */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-sm flex flex-col gap-5 w-full min-w-0 box-border overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#ede5d8] pb-3">
            <h2 className="font-serif text-lg font-bold text-[#1c1c19]">
              {isEditing ? 'Ubah Item Galeri' : 'Tambah Foto Portofolio Baru'}
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-[#85746a] hover:text-[#6f3c16] font-bold"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm w-full min-w-0">
            <div className="flex flex-col gap-1.5 sm:col-span-2 min-w-0">
              <label className="font-bold text-[#1c1c19]">Judul Proyek / Pekerjaan *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Meja Kerja Solid Trembesi Live Edge"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <label className="font-bold text-[#1c1c19]">Kategori Proyek</label>
              <CustomSelect
                value={category}
                onChange={(val) => setCategory(val)}
                options={[
                  { value: 'Residensial', label: 'Residensial' },
                  { value: 'Interior Rumah', label: 'Interior Rumah' },
                  { value: 'Kafe dan Komersial', label: 'Kafe dan Komersial' },
                  { value: 'Kantor dan Publik', label: 'Kantor dan Publik' },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <label className="font-bold text-[#1c1c19]">Lokasi Pengerjaan / Pengiriman</label>
              <input
                type="text"
                placeholder="Contoh: Bintaro, Tangerang Selatan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 min-w-0">
              <label className="font-bold text-[#1c1c19]">Foto Portofolio *</label>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full min-w-0">
                <input
                  type="text"
                  required
                  placeholder="URL Foto atau Unggah dari berkas..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full flex-1 min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
                />
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f0ede9] hover:bg-[#ede5d8] text-xs font-bold text-[#1c1c19] cursor-pointer transition-colors whitespace-nowrap flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  <span>{uploading ? 'Mengunggah...' : 'Pilih File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 min-w-0">
              <label className="font-bold text-[#1c1c19]">Deskripsi / Catatan Pengerjaan</label>
              <textarea
                rows={3}
                placeholder="Jelaskan spesifikasi kayu, ukuran, dan kebutuhan khusus yang dikerjakan pada proyek ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex justify-end gap-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl border border-[#ede5d8] text-xs font-bold text-[#52443b]"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>{saving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambahkan ke Galeri'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Gallery Items Grid */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-lg font-bold text-[#1c1c19]">
            Daftar Portofolio Aktif ({items.length})
          </h2>

          {loading ? (
            <div className="p-8 text-center text-xs text-[#52443b]">Memuat galeri...</div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#ede5d8] shadow-warm-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#ece6dc]">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      {item.category && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <h3 className="font-serif font-bold text-base text-[#1c1c19]">{item.title}</h3>
                      <p className="text-xs text-[#52443b] line-clamp-2 mt-0.5">{item.description}</p>
                      {item.location && (
                        <span className="text-[11px] text-[#85746a] flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-[#ede5d8]/60 mt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="px-3 py-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white text-xs font-bold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-[#ede5d8] text-center text-xs text-[#52443b]">
              Belum ada portofolio yang diunggah.
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
