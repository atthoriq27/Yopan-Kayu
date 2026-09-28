import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { getProducts, getCategories, getGallery, getBusinessProfile, formatRupiah } from '../../lib/dataService';
import { Product, Category, GalleryItem, BusinessProfile } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [prods, cats, gals, prof] = await Promise.all([
          getProducts({ includeInactive: true }),
          getCategories(),
          getGallery(),
          getBusinessProfile(),
        ]);
        setProducts(prods);
        setCategories(cats);
        setGallery(gals);
        setProfile(prof);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const activeProductsCount = products.filter(p => p.is_active).length;
  const featuredProductsCount = products.filter(p => p.is_featured).length;

  return (
    <AdminLayout
      title="Ringkasan Usaha dan Katalog"
      subtitle="Selamat datang di panel pengelola Yopan Kayu."
      actionButton={
        <Link
          to="/kelola/produk/tambah"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>Tambah Produk Baru</span>
        </Link>
      }
    >
      <div className="flex flex-col gap-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#85746a] font-bold uppercase tracking-wider">Total Produk</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] mt-1">{products.length}</span>
              <span className="text-[11px] text-[#006c47] font-semibold mt-0.5">{activeProductsCount} produk aktif</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#85746a] font-bold uppercase tracking-wider">Kategori Mebel</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] mt-1">{categories.length}</span>
              <span className="text-[11px] text-[#52443b] mt-0.5">Klasifikasi model</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f0ede9] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">category</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#85746a] font-bold uppercase tracking-wider">Item Galeri</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] mt-1">{gallery.length}</span>
              <span className="text-[11px] text-[#52443b] mt-0.5">Dokumentasi hasil</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f0ede9] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">photo_library</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#85746a] font-bold uppercase tracking-wider">Produk Unggulan</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16] mt-1">{featuredProductsCount}</span>
              <span className="text-[11px] text-[#52443b] mt-0.5">Tampil di beranda</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#fceddf] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">star</span>
            </div>
          </div>

        </div>

        {/* Quick Actions Strip */}
        <div className="bg-white p-6 rounded-2xl border border-[#ede5d8] shadow-warm-sm flex flex-col gap-4">
          <h2 className="font-serif font-bold text-base text-[#1c1c19]">Navigasi Cepat Pengelolaan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/kelola/produk"
              className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5d8] hover:border-[#6f3c16] transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1c1c19]"
            >
              <span className="material-symbols-outlined text-[#6f3c16] text-[20px]">format_list_bulleted</span>
              <span>Daftar Produk</span>
            </Link>

            <Link
              to="/kelola/kategori"
              className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5d8] hover:border-[#6f3c16] transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1c1c19]"
            >
              <span className="material-symbols-outlined text-[#6f3c16] text-[20px]">category</span>
              <span>Kelola Kategori</span>
            </Link>

            <Link
              to="/kelola/galeri"
              className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5d8] hover:border-[#6f3c16] transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1c1c19]"
            >
              <span className="material-symbols-outlined text-[#6f3c16] text-[20px]">photo_library</span>
              <span>Kelola Galeri</span>
            </Link>

            <Link
              to="/kelola/profil"
              className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5d8] hover:border-[#6f3c16] transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1c1c19]"
            >
              <span className="material-symbols-outlined text-[#6f3c16] text-[20px]">storefront</span>
              <span>Profil dan Kontak</span>
            </Link>
          </div>
        </div>

        {/* Recent Products Table */}
        <div className="bg-white rounded-2xl border border-[#ede5d8] shadow-warm-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#ede5d8] flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-[#1c1c19]">Produk Terbaru</h2>
            <Link to="/kelola/produk" className="text-xs font-bold text-[#6f3c16] hover:underline">
              Kelola Semua ({products.length})
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-[#85746a]">Memuat data...</div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#faf7f2] border-b border-[#ede5d8] text-[#85746a] text-[11px] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ede5d8]">
                  {products.slice(0, 5).map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#faf7f2]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-[#f0ede9] flex-shrink-0"
                          />
                          <div className="flex flex-col truncate max-w-xs">
                            <span className="font-semibold text-[#1c1c19] truncate">{prod.name}</span>
                            <span className="text-[11px] text-[#85746a] truncate">{prod.material || 'Kayu Solid'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#52443b]">
                        {prod.category?.name || '-'}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#6f3c16]">
                        {formatRupiah(prod.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {prod.is_active ? 'Aktif' : 'Non-aktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/kelola/produk/${prod.id}/edit`}
                          className="px-2.5 py-1 rounded-lg bg-[#f0ede9] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white font-semibold text-xs transition-colors"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#85746a]">
              Belum ada produk. Klik tombol di atas untuk menambah produk baru.
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
