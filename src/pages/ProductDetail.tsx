import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getProducts, getBusinessProfile, getWhatsAppUrl, formatRupiah } from '../lib/dataService';
import { Product, BusinessProfile } from '../types';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductData() {
      if (!slug) return;
      setLoading(true);
      try {
        const [prod, prof] = await Promise.all([
          getProductBySlug(slug),
          getBusinessProfile(),
        ]);

        if (!prod) {
          navigate('/produk', { replace: true });
          return;
        }

        setProduct(prod);
        setActiveImage(prod.image_url);
        setProfile(prof);

        // Fetch related products from same category or general
        const related = await getProducts({ categorySlug: prod.category?.slug });
        setRelatedProducts(related.filter(p => p.id !== prod.id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-[#6f3c16] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[#52443b]">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) return null;

  // Automated WhatsApp Message as required
  const waMessage = `Halo Yopan Kayu, saya tertarik dengan produk ${product.name}. Saya ingin mendapatkan informasi lebih lanjut.`;
  const waOrderUrl = getWhatsAppUrl(profile?.whatsapp || '6281234567890', waMessage);

  // Collect all gallery photos (main + additional)
  const allImages = [
    product.image_url,
    ...(product.images ? product.images.map(img => img.image_url) : [])
  ].filter((url, index, self) => url && self.indexOf(url) === index);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-10 pb-24 md:pb-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#85746a] overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-[#6f3c16]">Beranda</Link>
        <span>/</span>
        <Link to="/produk" className="hover:text-[#6f3c16]">Katalog Produk</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link to={`/produk?kategori=${product.category.slug}`} className="hover:text-[#6f3c16]">
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[#1c1c19] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-5 sm:p-8 rounded-3xl border border-[#ede5d8] shadow-warm-md">
        
        {/* Gallery Images Column */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0ede9] border border-[#ede5d8] shadow-inner group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.is_featured && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#6f3c16] text-[#faf7f2] text-xs font-bold shadow-sm">
                Produk Unggulan
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images exist */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === imgUrl ? 'border-[#6f3c16] scale-105 shadow-sm' : 'border-[#ede5d8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & WhatsApp CTA Column */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            
            {/* Category & Status */}
            <div className="flex items-center gap-2">
              {product.category && (
                <span className="px-3 py-1 rounded-lg bg-[#efe9dd] text-[#6f3c16] text-xs font-bold">
                  {product.category.name}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-[#e7f5ee] text-[#006c47] text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c47]"></span>
                Siap Dipesan (Made by Order)
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1c19] leading-tight">
              {product.name}
            </h1>

            {/* Price Tag */}
            <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5d8] flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-[#85746a] uppercase font-bold tracking-wider block">
                  Estimasi Biaya Kriya
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6f3c16]">
                  {formatRupiah(product.price)}
                </span>
              </div>
              <span className="text-[11px] text-[#85746a] text-right">
                *Dapat disesuaikan spesifikasi
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-[#52443b] leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Specifications Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#f0ede9] rounded-2xl border border-[#ede5d8]/80 text-xs">
              <div className="flex flex-col">
                <span className="text-[#85746a] font-medium">Bahan Baku:</span>
                <span className="text-[#1c1c19] font-bold mt-0.5">{product.material || 'Kayu Solid Nusantara'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#85746a] font-medium">Dimensi / Ukuran:</span>
                <span className="text-[#1c1c19] font-bold mt-0.5">{product.dimensions || 'Bisa Custom Ukuran'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#85746a] font-medium">Finishing:</span>
                <span className="text-[#1c1c19] font-bold mt-0.5">{product.finish || 'Natural Clear Doff / Satin'}</span>
              </div>
            </div>
          </div>

          {/* Primary CTA: WhatsApp direct order/consultation */}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#006c47] hover:bg-[#085a3c] text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transition-all active:scale-98"
            >
              <WhatsAppIcon className="w-6 h-6 fill-white" />
              <span>Tanya via WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-[#85746a] text-center">
              <span className="material-symbols-outlined text-[16px] text-[#006c47]">verified</span>
              <span>Langsung tersambung dengan Pak Heri untuk diskusi model dan pengiriman</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Craftsmanship Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">forest</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1c1c19]">100% Kayu Solid</h4>
            <p className="text-[11px] text-[#52443b]">Bukan serbuk gergaji olahan MDF/partikel board.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">straighten</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1c1c19]">Fleksibel Dimensi</h4>
            <p className="text-[11px] text-[#52443b]">Bisa diperbesar/diperkecil pas dengan denah kamar.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#92f7c2] text-[#006c47] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1c1c19]">Pengiriman Aman</h4>
            <p className="text-[11px] text-[#52443b]">Packing tebal dan kurir khusus area Jabodetabek.</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#1c1c19]">
              Produk Terkait Lainnya
            </h2>
            <Link to="/produk" className="text-xs font-bold text-[#6f3c16] hover:underline flex items-center gap-1">
              <span>Katalog Lengkap</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
