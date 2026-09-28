import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { CustomSelect } from '../../components/CustomSelect';
import { getProducts, getCategories, deleteProduct, saveProduct, formatRupiah } from '../../lib/dataService';
import { Product, Category } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        getProducts({ includeInactive: true }),
        getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      setDeletingId(id);
      try {
        await deleteProduct(id);
        await loadData();
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleToggleActive = async (product: Product) => {
    await saveProduct({
      ...product,
      is_active: !product.is_active
    });
    await loadData();
  };

  const handleToggleFeatured = async (product: Product) => {
    await saveProduct({
      ...product,
      is_featured: !product.is_featured
    });
    await loadData();
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'semua' || p.category_id === selectedCategory || p.category?.slug === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <AdminLayout
      title="Manajemen Katalog Produk"
      subtitle="Kelola seluruh perabot mebel kayu, status tayang, dan produk unggulan."
      actionButton={
        <Link
          to="/kelola/produk/tambah"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>Tambah Produk</span>
        </Link>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Filter & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#85746a] text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-64">
            <span className="text-xs text-[#52443b] whitespace-nowrap hidden sm:inline">Kategori:</span>
            <CustomSelect
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              options={[
                { value: 'semua', label: 'Semua Kategori' },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
              className="flex-1"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-[#ede5d8] shadow-warm-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-[#52443b]">Memuat produk...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#faf7f2] border-b border-[#ede5d8] text-[#85746a] text-[11px] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga</th>
                    <th className="py-3 px-4 text-center">Unggulan</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ede5d8]">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#faf7f2]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-cover bg-[#f0ede9] flex-shrink-0"
                          />
                          <div className="flex flex-col truncate max-w-xs">
                            <span className="font-bold text-[#1c1c19] truncate">{prod.name}</span>
                            <span className="text-[11px] text-[#85746a] truncate">{prod.material || '-'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#52443b]">
                        {prod.category?.name || '-'}
                      </td>

                      <td className="py-3 px-4 font-bold text-[#6f3c16]">
                        {formatRupiah(prod.price)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(prod)}
                          title="Klik untuk ubah status unggulan"
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                            prod.is_featured
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {prod.is_featured ? 'star' : 'star_outline'}
                          </span>
                        </button>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(prod)}
                          title="Klik untuk ubah status tayang"
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            prod.is_active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {prod.is_active ? 'Tayang' : 'Draft'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/kelola/produk/${prod.id}/edit`}
                            className="p-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white transition-colors"
                            title="Edit Produk"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </Link>
                          <button
                            type="button"
                            disabled={deletingId === prod.id}
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors disabled:opacity-50"
                            title="Hapus Produk"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[#85746a] text-[36px]">inventory_2</span>
              <p className="text-xs text-[#52443b]">Tidak ada produk yang sesuai dengan pencarian/kategori.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
