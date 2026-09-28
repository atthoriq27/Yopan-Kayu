import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { getCategories, saveCategory, deleteCategory } from '../../lib/dataService';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // New Category Form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Mode
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setSlug(autoSlug);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await saveCategory({
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
      setName('');
      setSlug('');
      await loadData();
    } catch (err: any) {
      alert(`Gagal menambah kategori: ${err.message || 'Error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditSlug(cat.slug);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    try {
      await saveCategory({
        ...editingCategory,
        name: editName.trim(),
        slug: editSlug.trim() || editName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
      setEditingCategory(null);
      await loadData();
    } catch (err: any) {
      alert(`Gagal menyimpan perubahan: ${err.message || 'Error'}`);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (window.confirm(`Hapus kategori "${catName}"? Produk dalam kategori ini tidak akan terhapus.`)) {
      try {
        await deleteCategory(id);
        await loadData();
      } catch (err: any) {
        alert(`Gagal menghapus: ${err.message || 'Error'}`);
      }
    }
  };

  return (
    <AdminLayout
      title="Manajemen Kategori Mebel"
      subtitle="Atur klasifikasi produk seperti Kursi dan Sofa, Meja, Lemari, dan Pesanan Kustom."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Add New Category Form */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full min-w-0">
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-sm flex flex-col gap-4 w-full min-w-0 box-border overflow-hidden">
            <h2 className="font-serif text-lg font-bold text-[#1c1c19]">
              Tambah Kategori Baru
            </h2>

            <form onSubmit={handleCreate} className="flex flex-col gap-3 text-xs sm:text-sm w-full min-w-0">
              <div className="flex flex-col gap-1.5 min-w-0">
                <label className="font-bold text-[#1c1c19]">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Meja Belajar Solid"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
                />
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <label className="font-bold text-[#1c1c19]">Slug URL *</label>
                <input
                  type="text"
                  required
                  placeholder="meja-belajar-solid"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full min-w-0 max-w-full box-border px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3 bg-[#6f3c16] hover:bg-[#5a2f10] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Tambah Kategori</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Category List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-3xl border border-[#ede5d8] shadow-warm-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#ede5d8] flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1c1c19]">
                Daftar Kategori ({categories.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-[#52443b]">Memuat kategori...</div>
            ) : categories.length > 0 ? (
              <div className="divide-y divide-[#ede5d8]">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 flex items-center justify-between gap-3 hover:bg-[#faf7f2]/50 transition-colors">
                    {editingCategory?.id === cat.id ? (
                      <form onSubmit={handleSaveEdit} className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-3 py-1.5 bg-[#faf7f2] border border-[#ede5d8] rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          required
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          className="px-3 py-1.5 bg-[#faf7f2] border border-[#ede5d8] rounded-lg text-xs font-mono"
                        />
                        <div className="flex gap-1">
                          <button type="submit" className="px-3 py-1 bg-[#6f3c16] text-white text-xs font-bold rounded-lg">
                            Simpan
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="px-3 py-1 bg-stone-200 text-stone-700 text-xs font-bold rounded-lg"
                          >
                            Batal
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#f0ede9] text-[#6f3c16] flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[18px]">category</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1c1c19] text-sm">{cat.name}</span>
                            <span className="text-[11px] font-mono text-[#85746a]">/produk?kategori={cat.slug}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(cat)}
                            className="p-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white transition-colors"
                            title="Edit Kategori"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cat.id, cat.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors"
                            title="Hapus Kategori"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#52443b]">Belum ada kategori.</div>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
