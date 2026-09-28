import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { getProducts, getCategories, getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BUSINESS_PROFILE
} from '../lib/constants';
import { Product, Category, BusinessProfile } from '../types';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryParam = searchParams.get('kategori') || 'semua';
  const searchQueryParam = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>(() => INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(() => INITIAL_CATEGORIES);
  const [profile, setProfile] = useState<BusinessProfile>(() => INITIAL_BUSINESS_PROFILE);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQueryParam);

  useEffect(() => {
    setSearchInput(searchQueryParam);
  }, [searchQueryParam]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, prof, prods] = await Promise.all([
          getCategories(),
          getBusinessProfile(),
          getProducts({
            categorySlug: activeCategoryParam,
            search: searchQueryParam,
          })
        ]);
        setCategories(cats);
        setProfile(prof);
        setProducts(prods);
      } catch (err) {
        console.warn('Error fetching products:', err);
      }
    }
    fetchData();
  }, [activeCategoryParam, searchQueryParam]);

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'semua') {
      params.delete('kategori');
    } else {
      params.set('kategori', slug);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const waCustomUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Yopan Kayu, saya ingin konsultasi pembuatan mebel dengan model dan ukuran custom.'
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-8 pb-24 md:pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[#6f3c16] rounded-full"></span>
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">Katalog Mebel</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1c19]">
          Koleksi Perabot Kayu Solid
        </h1>
        <p className="text-xs sm:text-sm text-[#52443b] max-w-2xl leading-relaxed">
          Seluruh produk dikerjakan secara langsung dengan bahan kayu solid asli (Jati, Sungkai, Mahoni, Trembesi) yang dirancang untuk kekuatan struktural dan estetika ruang tinggal Anda.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#ede5d8] shadow-warm-sm">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#85746a] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Cari nama produk, jenis kayu, atau fungsi..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Cari
          </button>
          {(activeCategoryParam !== 'semua' || searchQueryParam) && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-3.5 py-2.5 bg-[#f0ede9] hover:bg-[#ede5d8] text-[#52443b] text-xs font-semibold rounded-xl transition-colors"
              title="Reset Filter"
            >
              Reset
            </button>
          )}
        </form>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 w-full">
          <button
            type="button"
            onClick={() => handleCategoryClick('semua')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 transition-all ${
              activeCategoryParam === 'semua'
                ? 'bg-[#6f3c16] text-white shadow-sm'
                : 'bg-[#faf7f2] text-[#52443b] border border-[#ede5d8] hover:border-[#6f3c16]'
            }`}
          >
            Semua Produk
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.slug)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 transition-all ${
                activeCategoryParam === cat.slug
                  ? 'bg-[#6f3c16] text-white shadow-sm'
                  : 'bg-[#faf7f2] text-[#52443b] border border-[#ede5d8] hover:border-[#6f3c16]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(searchQueryParam || activeCategoryParam !== 'semua') && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52443b]">
          <span>Menampilkan hasil:</span>
          {searchQueryParam && (
            <span className="px-2.5 py-1 bg-white border border-[#ede5d8] rounded-lg font-medium">
              Pencarian: "{searchQueryParam}"
            </span>
          )}
          {activeCategoryParam !== 'semua' && (
            <span className="px-2.5 py-1 bg-white border border-[#ede5d8] rounded-lg font-medium">
              Kategori: {categories.find(c => c.slug === activeCategoryParam)?.name || activeCategoryParam}
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-[#6f3c16] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-[#52443b]">Memuat katalog mebel...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ede5d8] p-10 text-center flex flex-col items-center gap-4 my-8">
          <div className="w-14 h-14 rounded-full bg-[#fceddf] text-[#6f3c16] flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">inventory_2</span>
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <h3 className="font-serif font-bold text-lg text-[#1c1c19]">Tidak ada produk yang cocok</h3>
            <p className="text-xs text-[#52443b]">
              Coba kata kunci lain atau hubungi pengrajin untuk menanyakan ketersediaan model pesanan kustom.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-[#f0ede9] text-[#1c1c19] text-xs font-bold rounded-xl hover:bg-[#ede5d8] transition-colors"
            >
              Tampilkan Semua Produk
            </button>
            <a
              href={waCustomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#006c47] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#085a3c] transition-colors inline-flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Tanya Custom via WA</span>
            </a>
          </div>
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <div className="p-6 rounded-2xl bg-[#efe9dd]/90 border border-[#e2dacb] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#6f3c16] text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">square_foot</span>
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#1c1c19]">Butuh Ukuran Khusus untuk Ruangan?</h4>
            <p className="text-xs text-[#52443b] mt-0.5">
              Semua model di atas dapat disesuaikan panjang, lebar, tinggi, dan warna finishingnya.
            </p>
          </div>
        </div>
        <a
          href={waCustomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-5 py-3 bg-[#006c47] hover:bg-[#085a3c] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>Konsultasi Ukuran</span>
        </a>
      </div>

    </div>
  );
};
