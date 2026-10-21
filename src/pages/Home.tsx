import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { getProducts, getCategories, getGallery, getBusinessProfile, formatRupiah } from '../lib/dataService';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_GALLERY,
  INITIAL_BUSINESS_PROFILE
} from '../lib/constants';
import { Product, Category, GalleryItem, BusinessProfile } from '../types';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(() =>
    INITIAL_PRODUCTS.filter(p => p.is_featured).slice(0, 4)
  );
  const [allProducts, setAllProducts] = useState<Product[]>(() => INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(() => INITIAL_CATEGORIES);
  const [galleryPreview, setGalleryPreview] = useState<GalleryItem[]>(() =>
    INITIAL_GALLERY.slice(0, 3)
  );
  const [profile, setProfile] = useState<BusinessProfile>(() => INITIAL_BUSINESS_PROFILE);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  const [activeWood, setActiveWood] = useState<string>('jati-belanda');
  const [mobileCompareTab, setMobileCompareTab] = useState<'solid' | 'particle'>('solid');

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats, gals, prof] = await Promise.all([
          getProducts(),
          getCategories(),
          getGallery(),
          getBusinessProfile(),
        ]);
        if (prods.length > 0) {
          setAllProducts(prods);
          setFeaturedProducts(prods.filter(p => p.is_featured).slice(0, 4));
        }
        if (cats.length > 0) setCategories(cats);
        if (gals.length > 0) setGalleryPreview(gals.slice(0, 3));
        if (prof) setProfile(prof);
      } catch (err) {
        console.warn('Error refreshing home data:', err);
      }
    }
    loadData();
  }, []);

  // Hero interactive showcase items - fokus ke mebel Jati Belanda & Solid populer
  const heroShowcase = [
    {
      label: 'Meja Kerja Pinus',
      title: 'Meja Kerja dan Belajar Minimalis Jati Belanda',
      material: 'Kayu Jati Belanda (Pinus Solid Oven)',
      finish: 'Natural Clear Doff Halus (Tahan Air)',
      price: 950000,
      slug: 'meja-kerja-belajar-minimalis-jati-belanda',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
      badge: 'Favorit Home Office'
    },
    {
      label: 'Set Meja Kafe',
      title: 'Set Meja dan Bangku Kafe Jati Belanda',
      material: 'Kayu Jati Belanda Solid Pilihan',
      finish: 'Clear Natural Semi-Doff / Walnut',
      price: 1450000,
      slug: 'set-meja-bangku-kafe-jati-belanda',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
      badge: 'Set Kafe dan Resto'
    },
    {
      label: 'Rak Dinding Pinus',
      title: 'Rak Dinding Ambalan Modular Jati Belanda',
      material: 'Kayu Jati Belanda Solid Pilihan',
      finish: 'Water-based Clear Coat Halus',
      price: 450000,
      slug: 'rak-dinding-ambalan-modular-jati-belanda',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
      badge: 'Dekorasi Dinding'
    }
  ];

  const currentHero = heroShowcase[activeHeroSlide];

  // Filtered products for curated section
  const displayProducts = activeCategorySlug === 'all'
    ? allProducts.slice(0, 6)
    : allProducts.filter(p => {
        const cat = categories.find(c => c.slug === activeCategorySlug);
        return cat ? p.category_id === cat.id : true;
      }).slice(0, 6);

  // Karakteristik jenis kayu (Fokus utama Jati Belanda)
  const woodTypes = [
    {
      id: 'jati-belanda',
      name: 'Kayu Jati Belanda (Pinus Solid)',
      origin: 'Pinus Pilihan Kering Oven',
      character: 'Pilihan paling diminati karena warna cerah alaminya (krem muda) dengan serat dan mata kayu yang estetik. Ruangan jadi terasa lebih terang, bersih, dan modern. Ringan namun kokoh, bebas rayap, dan harganya sangat bersahabat di kantong dibanding jenis kayu lain.',
      bestFor: 'Meja kerja/belajar, set meja dan kursi kafe, rak dinding, kitchen set, ambalan, dan dipan',
      durability: 'Awet Bertahun-tahun (Kering Oven Bebas Rayap)',
      hardness: 'Solid, Kuat dan Ringan',
      finishType: 'Natural Clear Doff, Semi-Gloss, atau Vernis Warna Gelap',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ'
    },
    {
      id: 'jati',
      name: 'Kayu Jati Solid (Teak)',
      origin: 'Jawa Tengah dan Jawa Timur',
      character: 'Kayu legendaris yang terkenal sangat keras, tahan puluhan tahun, dan kebal rayap berkat minyak alaminya. Memiliki guratan serat cokelat keemasan yang klasik dan berkelas.',
      bestFor: 'Meja makan keluarga besar, kursi tamu, dan lemari utama',
      durability: '50+ Tahun',
      hardness: 'Sangat Keras dan Berat',
      finishType: 'Natural Teak Oil / Clear Doff Halus',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA'
    },
    {
      id: 'sungkai',
      name: 'Kayu Sungkai Oven',
      origin: 'Sumatera dan Kalimantan',
      character: 'Warna kayu cerah lembut dengan serat lurus yang rapi. Sangat cocok bagi Anda yang menyukai gaya minimalis Skandinavia atau Japandi yang simpel dan rapi.',
      bestFor: 'Kursi santai minimalis, meja rias, dan credenza TV',
      durability: '20+ Tahun',
      hardness: 'Kuat Terstruktur',
      finishType: 'Natural Bleached Matte',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA'
    },
    {
      id: 'mahoni',
      name: 'Kayu Mahoni Oven',
      origin: 'Jawa dan Sumatera',
      character: 'Tekstur pori kayu sangat rapat dan halus dengan warna cokelat kemerahan. Sangat bagus untuk pewarnaan gelap (dark walnut atau salak) yang memberi kesan hangat.',
      bestFor: 'Set meja kafe vintage, meja kerja, dan kabinet laci',
      durability: '25+ Tahun',
      hardness: 'Keras dan Padat',
      finishType: 'Walnut Semi-Gloss / Cokelat Tua',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg'
    }
  ];

  const selectedWood = woodTypes.find(w => w.id === activeWood) || woodTypes[0];

  return (
    <div className="flex flex-col w-full bg-[#faf7f2] text-[#1c1c19] overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Fokus Jati Belanda & Bahasa Membumi)     */}
      {/* ======================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-12 pt-4 sm:pt-14 pb-10 sm:pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Direct Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left">
            
            {/* Tag Brand */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ede5d8] w-fit shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6f3c16]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.1em] uppercase text-[#6f3c16]">
                Jasa Custom Furniture dan Pengrajin Kayu Tangerang
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[28px] sm:text-5xl lg:text-[50px] font-semibold text-[#1c1c19] leading-[1.2] sm:leading-[1.16] tracking-tight">
              Jasa Custom Furniture Kayu, <br className="hidden sm:inline" />
              <span className="text-[#6f3c16]">Rapi, Kuat, dan Pas Ukuran</span> untuk Ruangan Anda.
            </h1>

            {/* Subheadline Copy */}
            <p className="text-xs sm:text-base text-[#52443b] leading-relaxed max-w-xl font-normal">
              Dibuat langsung di workshop kami di Tigaraksa. Melayani pesanan custom meja cafe, meja kasir, kitchen set, dipan tempat tidur, rak display, lemari, hingga booth usaha dengan aneka pilihan material kayu berkualitas sesuai kebutuhan dan anggaran Anda.
            </p>

            {/* Refined Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1">
              <Link
                to="/produk"
                className="py-3 sm:py-3.5 px-6 bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 transition-all group text-center"
              >
                <span>Lihat Katalog Produk</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>

              <Link
                to="/kontak"
                className="py-2.5 sm:py-3.5 px-6 bg-white hover:bg-[#f6f2ec] text-[#1c1c19] border border-[#ede5d8] hover:border-[#6f3c16]/50 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all text-center"
              >
                <span>Tanya dan Konsultasi Ukuran</span>
              </Link>
            </div>

            {/* Practical Trust Metric Cards */}
            <div className="pt-4 sm:pt-6 border-t border-[#ede5d8]/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl">
              <div className="flex flex-col gap-0.5">
                <span className="font-serif text-base sm:text-2xl font-bold text-[#1c1c19]">Bahan</span>
                <span className="text-[10px] sm:text-xs text-[#52443b] leading-tight font-medium">Kayu Pilihan</span>
                <span className="text-[9px] sm:text-[10px] text-[#8c6b4f]">Kuat, awet, dan kokoh</span>
              </div>
              <div className="flex flex-col gap-0.5 border-l border-[#ede5d8] pl-2 sm:pl-4">
                <span className="font-serif text-base sm:text-2xl font-bold text-[#1c1c19]">Halus</span>
                <span className="text-[10px] sm:text-xs text-[#52443b] leading-tight font-medium">Amplas dan Finishing</span>
                <span className="text-[9px] sm:text-[10px] text-[#8c6b4f]">Mulus dan nyaman disentuh</span>
              </div>
              <div className="flex flex-col gap-0.5 border-l border-[#ede5d8] pl-2 sm:pl-4">
                <span className="font-serif text-base sm:text-2xl font-bold text-[#1c1c19]">Custom</span>
                <span className="text-[10px] sm:text-xs text-[#52443b] leading-tight font-medium">Bebas Ukuran</span>
                <span className="text-[9px] sm:text-[10px] text-[#8c6b4f]">Pas di sudut ruangan</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Hero Showcase Collage */}
          <div className="lg:col-span-5 w-full flex flex-col gap-2.5 sm:gap-3">
            
            {/* Main Visual Frame */}
            <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] bg-[#ece6dc] shadow-[0_12px_32px_rgba(31,36,33,0.08)] border border-[#ede5d8] group">
              <img
                src={currentHero.image}
                alt={currentHero.title}
                key={currentHero.slug}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span>{currentHero.badge}</span>
              </div>

              {/* Bottom Glassmorphic Product Card Overlay */}
              <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-[#ede5d8]/80 shadow-lg flex items-center justify-between gap-2.5 transition-transform">
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-[#1c1c19] truncate">{currentHero.title}</span>
                  <span className="text-[10px] sm:text-[11px] text-[#8c6b4f] truncate">{currentHero.material}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#6f3c16] mt-0.5">{formatRupiah(currentHero.price)}</span>
                </div>
                <Link
                  to={`/produk/${currentHero.slug}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-white flex items-center justify-center flex-shrink-0 transition-all shadow-sm active:scale-95"
                  title="Lihat Detail Mebel"
                >
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Interactive Hero Slide Tabs */}
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8c6b4f] uppercase tracking-wider">
                Contoh Mebel:
              </span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                {heroShowcase.map((item, idx) => (
                  <button
                    key={item.slug}
                    onClick={() => setActiveHeroSlide(idx)}
                    className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full transition-all ${
                      activeHeroSlide === idx
                        ? 'bg-[#1c1c19] text-white font-semibold shadow-xs'
                        : 'bg-white border border-[#ede5d8] text-[#52443b] hover:text-[#1c1c19] hover:bg-[#f6f2ec]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. KEUNGGULAN WORKSHOP KAMI                               */}
      {/* ======================================================== */}
      <section className="border-y border-[#ede5d8] bg-white py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            
            <div className="flex items-start gap-3 p-3 sm:p-0 rounded-2xl bg-[#faf7f2]/50 sm:bg-transparent border sm:border-0 border-[#ede5d8]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white sm:bg-[#faf7f2] border border-[#ede5d8] flex items-center justify-center flex-shrink-0 text-[#6f3c16] shadow-xs">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">verified</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19]">100% Kayu Jati Belanda Asli</h4>
                <p className="text-[11px] sm:text-xs text-[#52443b] leading-relaxed mt-0.5">
                  Dibuat dari kayu pinus solid utuh, bukan serbuk MDF atau triplek tipis yang gampang rontok.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-0 rounded-2xl bg-[#faf7f2]/50 sm:bg-transparent border sm:border-0 border-[#ede5d8]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white sm:bg-[#faf7f2] border border-[#ede5d8] flex items-center justify-center flex-shrink-0 text-[#6f3c16] shadow-xs">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">carpenter</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19]">Sambungan Kokoh dan Rapat</h4>
                <p className="text-[11px] sm:text-xs text-[#52443b] leading-relaxed mt-0.5">
                  Dirangkai dengan sambungan kayu saling kunci yang presisi, tidak gampang goyang walau sering digeser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-0 rounded-2xl bg-[#faf7f2]/50 sm:bg-transparent border sm:border-0 border-[#ede5d8]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white sm:bg-[#faf7f2] border border-[#ede5d8] flex items-center justify-center flex-shrink-0 text-[#6f3c16] shadow-xs">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">straighten</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19]">Bebas Custom Ukuran</h4>
                <p className="text-[11px] sm:text-xs text-[#52443b] leading-relaxed mt-0.5">
                  Bebas sesuaikan panjang, lebar, dan tinggi agar pas dengan sudut ruangan rumah atau tempat usaha Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-0 rounded-2xl bg-[#faf7f2]/50 sm:bg-transparent border sm:border-0 border-[#ede5d8]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white sm:bg-[#faf7f2] border border-[#ede5d8] flex items-center justify-center flex-shrink-0 text-[#6f3c16] shadow-xs">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19]">Dikirim Siap Pakai</h4>
                <p className="text-[11px] sm:text-xs text-[#52443b] leading-relaxed mt-0.5">
                  Diantar langsung dalam kondisi sudah jadi dan kokoh, tanpa perlu pusing merakit sendiri.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. BAHAN BAKU UTAMA: SPESIALIS KAYU JATI BELANDA         */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-6 sm:gap-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#8c6b4f] font-bold">
              Bahan Baku Pilihan Kami
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Spesialis Kayu Jati Belanda dan Pilihan Kayu Solid Lainnya
            </h2>
            <p className="text-xs sm:text-sm text-[#52443b] max-w-xl leading-relaxed">
              Kami fokus pada <strong>kayu jati belanda (pinus) solid</strong> karena urat seratnya estetik, warnanya cerah bersih, dan harganya jauh lebih terjangkau. Namun kami juga siap membuatkan mebel dari kayu solid lain sesuai keinginan Anda.
            </p>
          </div>

          <Link
            to="/produk"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-[#ede5d8] hover:border-[#6f3c16] text-xs font-semibold text-[#1c1c19] hover:bg-[#faf7f2] transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>Lihat Semua Produk</span>
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#6f3c16]">arrow_forward</span>
          </Link>
        </div>

        {/* Wood Type Selector Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-[#ede5d8]">
          {woodTypes.map((wood) => (
            <button
              key={wood.id}
              onClick={() => setActiveWood(wood.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeWood === wood.id
                  ? 'bg-[#1c1c19] text-white shadow-sm'
                  : 'bg-white text-[#52443b] border border-[#ede5d8] hover:text-[#1c1c19] hover:bg-[#f6f2ec]'
              }`}
            >
              {wood.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Selected Wood Showcase Spec Sheet Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#ede5d8] p-5 sm:p-10 shadow-[0_8px_30px_rgba(31,36,33,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#f4ede3] text-[#6f3c16] text-[11px] sm:text-xs font-bold">
                {selectedWood.hardness}
              </span>
              <span className="text-[11px] sm:text-xs text-[#8c6b4f] font-medium">Asal: {selectedWood.origin}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#1c1c19]">
              {selectedWood.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#52443b] leading-relaxed">
              {selectedWood.character}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-[#ede5d8]/80 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-[#1c1c19] uppercase tracking-wider text-[10px]">Paling Cocok Untuk:</span>
                <span className="text-[#52443b] text-[11px] sm:text-xs">{selectedWood.bestFor}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-[#1c1c19] uppercase tracking-wider text-[10px]">Daya Tahan dan Keawetan:</span>
                <span className="text-[#6f3c16] font-semibold text-[11px] sm:text-xs">{selectedWood.durability}</span>
              </div>
              <div className="flex flex-col gap-0.5 sm:col-span-2">
                <span className="font-bold text-[#1c1c19] uppercase tracking-wider text-[10px]">Pilihan Finishing:</span>
                <span className="text-[#52443b] text-[11px] sm:text-xs">{selectedWood.finishType}</span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                to={`/produk?search=${encodeURIComponent(selectedWood.id)}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6f3c16] hover:underline"
              >
                <span>Lihat Koleksi {selectedWood.name.split(' (')[0]}</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-[#ece6dc] border border-[#ede5d8]">
              <img
                src={selectedWood.image}
                alt={selectedWood.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 4. CURATED COLLECTION (Bento & Filterable Showcase)      */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-24 bg-[#f8f5ee] border-y border-[#ede5d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-6 sm:gap-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#8c6b4f] font-bold">
                Koleksi Pilihan Workshop
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
                Pilihan Mebel Populer untuk Rumah dan Usaha
              </h2>
              <p className="text-xs sm:text-sm text-[#52443b] max-w-xl">
                Mulai dari meja kerja, meja makan, rak dinding, sampai perlengkapan kafe. Semua dibuat rapi dan bisa disesuaikan dengan ukuran ruangan Anda.
              </p>
            </div>

            <Link
              to="/produk"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-white text-xs font-semibold tracking-wide shadow-sm transition-all self-start sm:self-auto"
            >
              <span>Buka Seluruh Katalog</span>
              <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCategorySlug('all')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategorySlug === 'all'
                  ? 'bg-[#1c1c19] text-white shadow-xs'
                  : 'bg-white border border-[#ede5d8] text-[#52443b] hover:text-[#1c1c19]'
              }`}
            >
              Semua Koleksi
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategorySlug(cat.slug)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategorySlug === cat.slug
                    ? 'bg-[#1c1c19] text-white shadow-xs'
                    : 'bg-white border border-[#ede5d8] text-[#52443b] hover:text-[#1c1c19]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PERBANDINGAN: KAYU SOLID ASLI VS MEBEL SERBUK (MDF)   */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 sm:gap-10">
          
          <div className="flex flex-col gap-1.5 sm:gap-2 text-center items-center max-w-2xl mx-auto">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#8c6b4f] font-bold">
              Panduan Memilih Mebel
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Beda Mebel Kayu Solid Asli vs Mebel Serbuk (MDF / Partikel Board)
            </h2>
            <p className="text-xs sm:text-sm text-[#52443b] leading-relaxed">
              Banyak yang tergiur mebel pabrikan murah, tapi baru 1-2 tahun sudah melengkung dan melepuh saat kena air. Ini perbandingan langsungnya:
            </p>
          </div>

          {/* Mobile Segmented Toggle View */}
          <div className="block md:hidden">
            <div className="flex items-center p-1 rounded-2xl bg-white border border-[#ede5d8] mb-4 shadow-xs">
              <button
                onClick={() => setMobileCompareTab('solid')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mobileCompareTab === 'solid'
                    ? 'bg-[#6f3c16] text-white shadow-xs'
                    : 'text-[#52443b]'
                }`}
              >
                ✦ Kayu Solid Yopan
              </button>
              <button
                onClick={() => setMobileCompareTab('particle')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mobileCompareTab === 'particle'
                    ? 'bg-[#1c1c19] text-white shadow-xs'
                    : 'text-[#52443b]'
                }`}
              >
                Mebel Serbuk (MDF)
              </button>
            </div>

            {mobileCompareTab === 'solid' ? (
              <div className="bg-white p-5 rounded-2xl border-2 border-[#6f3c16] shadow-sm flex flex-col gap-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6f3c16]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>100% Kayu Solid Asli (Jati Belanda dan Solid)</span>
                </div>
                <div className="flex flex-col gap-3 text-xs text-[#1c1c19]">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Kayu Asli Pilihan:</strong> Kayu solid utuh tanpa serbuk kimia. Menopang beban berat tanpa melengkung.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Sambungan Rapat:</strong> Sambungan kayu saling kunci yang kokoh, tidak gampang goyang saat dipindahkan.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Tahan Cipratan Air:</strong> Aman dari tumpahan air minum dan cuaca lembap, cukup dilap langsung bersih.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Bisa Dipernis Ulang:</strong> Jika bertahun-tahun kemudian kusam, bisa diamplas dan divernis lagi agar tampak baru.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#f2ece3] p-5 rounded-2xl border border-[#ded4c3] flex flex-col gap-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#52443b]">
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  <span>Mebel Serbuk Pabrikan (MDF / Partikel Board)</span>
                </div>
                <div className="flex flex-col gap-3 text-xs text-[#52443b]">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[16px] flex-shrink-0 mt-0.5">close</span>
                    <span><strong>Bahan Serbuk:</strong> Serbuk gergaji dipres lem kimia. Gampang patah dan ambles jika ditumpuk beban.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[16px] flex-shrink-0 mt-0.5">close</span>
                    <span><strong>Sekrup Cepat Dol:</strong> Sekrup pada serbuk kayu cepat longgar dan mebel jadi gampang goyang.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[16px] flex-shrink-0 mt-0.5">close</span>
                    <span><strong>Rentan Air:</strong> Kena rembesan air sedikit saja langsung menggelembung, melepuh, dan hancur.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[16px] flex-shrink-0 mt-0.5">close</span>
                    <span><strong>Susah Diperbaiki:</strong> Lapisan stiker tipis mudah terkelupas dan tidak bisa dipernis ulang.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Clean Comparison Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-[#ede5d8] overflow-hidden shadow-[0_8px_30px_rgba(31,36,33,0.04)]">
            <div className="grid grid-cols-12 border-b border-[#ede5d8] bg-[#faf7f2]">
              <div className="col-span-4 p-5 font-bold text-xs uppercase tracking-wider text-[#8c6b4f]">
                Perbandingan Kualitas
              </div>
              <div className="col-span-4 p-5 font-bold text-xs uppercase tracking-wider text-[#6f3c16] border-l border-[#ede5d8] bg-[#fdfaf6]">
                ✦ Standar Kayu Solid Yopan
              </div>
              <div className="col-span-4 p-5 font-bold text-xs uppercase tracking-wider text-[#85746a] border-l border-[#ede5d8]">
                Mebel Pabrikan Serbuk (MDF / Partikel)
              </div>
            </div>

            {/* Row 1: Bahan Baku */}
            <div className="grid grid-cols-12 border-b border-[#ede5d8] text-xs">
              <div className="col-span-4 p-5 font-semibold text-[#1c1c19]">
                Bahan Baku dan Kekuatan Struktur
              </div>
              <div className="col-span-4 p-5 text-[#1c1c19] border-l border-[#ede5d8] bg-[#fdfaf6] leading-relaxed font-medium">
                100% kayu solid utuh (Jati Belanda oven / kayu solid pilihan). Padat, kokoh, dan tahan beban berat tanpa melengkung.
              </div>
              <div className="col-span-4 p-5 text-[#52443b] border-l border-[#ede5d8] leading-relaxed">
                Serbuk gergaji yang dipres lem kimia (MDF/Partikel Board) dengan lapisan kertas stiker tipis.
              </div>
            </div>

            {/* Row 2: Sambungan Konstruksi */}
            <div className="grid grid-cols-12 border-b border-[#ede5d8] text-xs">
              <div className="col-span-4 p-5 font-semibold text-[#1c1c19]">
                Konstruksi dan Sambungan Kayu
              </div>
              <div className="col-span-4 p-5 text-[#1c1c19] border-l border-[#ede5d8] bg-[#fdfaf6] leading-relaxed font-medium">
                Sambungan kayu saling kunci yang presisi dan kuat. Mebel tetap kokoh dan tidak goyang walau sering digeser.
              </div>
              <div className="col-span-4 p-5 text-[#52443b] border-l border-[#ede5d8] leading-relaxed">
                Hanya sekrup tipis ke serbuk kayu. Cepat dol, longgar, dan goyang saat dipindahkan.
              </div>
            </div>

            {/* Row 3: Ketahanan Air dan Lembap */}
            <div className="grid grid-cols-12 border-b border-[#ede5d8] text-xs">
              <div className="col-span-4 p-5 font-semibold text-[#1c1c19]">
                Ketahanan Terhadap Air dan Lembap
              </div>
              <div className="col-span-4 p-5 text-[#1c1c19] border-l border-[#ede5d8] bg-[#fdfaf6] leading-relaxed font-medium">
                Tahan tumpahan air dan udara lembap. Mudah dibersihkan cukup dengan lap basah.
              </div>
              <div className="col-span-4 p-5 text-[#52443b] border-l border-[#ede5d8] leading-relaxed">
                Jika terkena rembesan air, serbuk mengembang melepuh dan hancur tanpa bisa diperbaiki.
              </div>
            </div>

            {/* Row 4: Masa Pakai dan Refinishing */}
            <div className="grid grid-cols-12 text-xs">
              <div className="col-span-4 p-5 font-semibold text-[#1c1c19]">
                Masa Pakai dan Kemudahan Perawatan
              </div>
              <div className="col-span-4 p-5 text-[#1c1c19] border-l border-[#ede5d8] bg-[#fdfaf6] leading-relaxed font-medium">
                Awet bertahun-tahun. Dapat diamplas atau dipernis ulang kapan saja agar kembali tampak seperti baru.
              </div>
              <div className="col-span-4 p-5 text-[#52443b] border-l border-[#ede5d8] leading-relaxed">
                Lapisan mudah terkelupas dan jika rusak biasanya harus langsung dibuang.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. ALUR PEMESANAN (Praktis, Mudah dan Gak Ribet)         */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-20 bg-[#f8f5ee] border-t border-[#ede5d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8 sm:gap-12">
          
          {/* Top Header: Balanced 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ede5d8] w-fit shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6f3c16]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#8c6b4f] font-bold">
                  Alur Pemesanan Mudah
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight leading-tight">
                Cara Pesan Mebel Custom (Mudah dan Gak Ribet)
              </h2>
              <p className="text-xs sm:text-sm text-[#52443b] leading-relaxed max-w-xl">
                Belum punya ukuran pas atau gambar desain teknis? Tenang saja, cukup ceritakan kebutuhan Anda atau kirimkan contoh foto dari internet, kami siap bantu buatkan.
              </p>
            </div>

            {/* Right Artisan Note Card */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#ece6dc] flex-shrink-0 border border-[#ede5d8]">
                    <img
                      src={profile?.about_image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0pN2zKVEc3QUClmDoxqxceKE8cniJa-8CManzl-wjm19aE1cLRV-s8ehpMbQxVtqe3WQ3y6m1OqRYATluIaOkT7t3g4NxoWh44Y95JCguiKVBjOStmFRewmmgApdEnwc8jszsUieQqKa76Om_JdxWG1XVoEV7owvs6HE9DAuz06qkHSmdztZ2kT1A2Sgo0lCrDHKk9_3eGkTmIt2Ma6eiLpyGWePH2PXkbD6UEYw8E6PRzTQ1bUR0w'}
                      alt={profile?.about_badge_text || 'Pak Heri - Owner'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#1c1c19]">
                      {(profile?.about_badge_text || 'Pak Heri • Owner').split('•')[0]?.trim() || 'Pak Heri'}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#8c6b4f] font-semibold uppercase tracking-wider">
                      {(profile?.about_badge_text || 'Pak Heri • Owner').split('•')[1]?.trim() || 'Owner'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#52443b] italic leading-relaxed">
                  &ldquo;Banyak pelanggan datang cuma bawa screenshot dari Pinterest atau coretan sederhana di kertas. Dari situ kami diskusikan bareng sampai ukurannya pas di ruangan dan harganya cocok di kantong.&rdquo;
                </p>

                <Link
                  to="/kontak"
                  className="w-full py-2.5 px-4 rounded-full bg-[#faf7f2] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white border border-[#ede5d8] hover:border-[#6f3c16] text-xs font-semibold flex items-center justify-center gap-2 transition-all text-center"
                >
                  <span>Hubungi dan Kunjungi Workshop</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom 4-Step Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Step 01 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ede5d8] shadow-xs flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#6f3c16]/30 transition-all group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16]/30 group-hover:text-[#6f3c16] transition-colors">01</span>
                  <span className="material-symbols-outlined text-[20px] text-[#8c6b4f]/60 group-hover:text-[#6f3c16] transition-colors">design_services</span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1c1c19]">
                  Kirim Foto Model dan Ukuran
                </h3>
                <p className="text-xs text-[#52443b] leading-relaxed">
                  Kirimkan foto contoh mebel yang Anda suka dan perkiraan ukuran ruangan. Kami bantu arahkan ukuran yang proporsional dan nyaman dipakai.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0ede9] text-[11px] font-semibold text-[#6f3c16]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Konsultasi santai dan gratis</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ede5d8] shadow-xs flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#6f3c16]/30 transition-all group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16]/30 group-hover:text-[#6f3c16] transition-colors">02</span>
                  <span className="material-symbols-outlined text-[20px] text-[#8c6b4f]/60 group-hover:text-[#6f3c16] transition-colors">palette</span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1c1c19]">
                  Pilih Kayu dan Warna Finishing
                </h3>
                <p className="text-xs text-[#52443b] leading-relaxed">
                  Pilih bahan utama kayu jati belanda yang estetik atau kayu solid lainnya. Tentukan warna finishing (natural doff, satin, atau walnut). Biaya kami hitungkan jelas di awal.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0ede9] text-[11px] font-semibold text-[#6f3c16]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Harga transparan tanpa biaya tersembunyi</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ede5d8] shadow-xs flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#6f3c16]/30 transition-all group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16]/30 group-hover:text-[#6f3c16] transition-colors">03</span>
                  <span className="material-symbols-outlined text-[20px] text-[#8c6b4f]/60 group-hover:text-[#6f3c16] transition-colors">handyman</span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1c1c19]">
                  Pengerjaan di Workshop Kami
                </h3>
                <p className="text-xs text-[#52443b] leading-relaxed">
                  Dikerjakan langsung dengan teliti di workshop kami di Tigaraksa. Potongan kayu presisi, sambungan saling kunci kokoh, dan diamplas sampai mulus halus.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0ede9] text-[11px] font-semibold text-[#6f3c16]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Bisa dipantau langsung perkembangannya</span>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#ede5d8] shadow-xs flex flex-col justify-between gap-3 hover:shadow-md hover:border-[#6f3c16]/30 transition-all group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16]/30 group-hover:text-[#6f3c16] transition-colors">04</span>
                  <span className="material-symbols-outlined text-[20px] text-[#8c6b4f]/60 group-hover:text-[#6f3c16] transition-colors">local_shipping</span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1c1c19]">
                  Pengantaran Siap Pakai
                </h3>
                <p className="text-xs text-[#52443b] leading-relaxed">
                  Mebel kami kirimkan dalam kondisi sudah terpasang utuh dan kokoh. Anda tidak perlu repot merakit sendiri atau pusing cari obeng di rumah.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0ede9] text-[11px] font-semibold text-[#6f3c16]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Langsung siap ditaruh dan dipakai</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. CONTOH HASIL MEBEL DI TEMPAT PELANGGAN                */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#8c6b4f] font-bold">
              Dokumentasi Proyek
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Contoh Mebel yang Pernah Kami Kerjakan
            </h2>
            <p className="text-xs sm:text-sm text-[#52443b] max-w-xl">
              Foto asli hasil pengerjaan mebel custom yang sudah terpasang di rumah tinggal, kafe, dan ruang usaha pelanggan kami.
            </p>
          </div>

          <Link
            to="/galeri"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-[#ede5d8] hover:border-[#6f3c16] text-xs font-semibold text-[#1c1c19] hover:bg-[#faf7f2] transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>Lihat Semua Portofolio</span>
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#6f3c16]">arrow_forward</span>
          </Link>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryPreview.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ede5d8] shadow-[0_4px_20px_rgba(31,36,33,0.04)] flex flex-col group"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#ece6dc]">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {item.category && (
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-2.5 sm:gap-3">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#1c1c19]">{item.title}</h3>
                  <p className="text-xs text-[#52443b] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.location && (
                  <div className="pt-2 border-t border-[#ede5d8] flex items-center gap-1.5 text-xs text-[#8c6b4f]">
                    <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-[#6f3c16]">location_on</span>
                    <span className="text-[11px] sm:text-xs">{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. PRE-FOOTER CALLOUT: KUNJUNGAN ATAU JELAJAHI           */}
      {/* ======================================================== */}
      <section className="bg-[#1c1c19] text-[#faf7f2] py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4 sm:gap-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#e8dfd5] text-[10px] sm:text-[11px] font-medium tracking-wider uppercase">
            <span>Kunjungi Workshop Kami</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-semibold leading-[1.2] tracking-tight max-w-xl">
            Mau Diskusi atau Cek Kayunya Langsung?
          </h2>

          <p className="text-xs sm:text-sm text-[#d6cbbe] leading-relaxed max-w-lg">
            Pintu workshop kami di Tigaraksa selalu terbuka bagi Anda yang ingin ngobrol santai, melihat contoh kayu jati belanda, atau langsung konsultasi lewat WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto">
            <Link
              to="/kontak"
              className="w-full sm:w-auto px-6 py-3 bg-[#faf7f2] hover:bg-white text-[#1c1c19] rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md text-center"
            >
              Lihat Kontak dan Lokasi Workshop
            </Link>

            <Link
              to="/galeri"
              className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all text-center"
            >
              Lihat Portofolio Lengkap
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
