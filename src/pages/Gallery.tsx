import React, { useEffect, useState } from 'react';
import { getGallery, getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import { GalleryItem, BusinessProfile } from '../types';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['Semua', 'Residensial', 'Interior Rumah', 'Kafe dan Komersial'];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [gals, prof] = await Promise.all([
          getGallery(activeCategory === 'Semua' ? undefined : activeCategory),
          getBusinessProfile(),
        ]);
        setItems(gals);
        setProfile(prof);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory]);

  const waUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    `Halo Yopan Kayu, saya melihat galeri portofolio Anda${selectedItem ? ` mengenai '${selectedItem.title}'` : ''} dan tertarik memesan konsep serupa.`
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-8 pb-24 md:pb-12">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[#6f3c16] rounded-full"></span>
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">Portofolio Kriya</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1c19]">
          Dokumentasi Hasil Pekerjaan
        </h1>
        <p className="text-xs sm:text-sm text-[#52443b] max-w-2xl leading-relaxed">
          Kumpulan dokumentasi proyek nyata dari bengkel kami untuk kebutuhan hunian pribadi, apartemen, kafe, dan kantor di wilayah Jabodetabek.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 transition-all ${
              activeCategory === cat
                ? 'bg-[#6f3c16] text-white shadow-sm'
                : 'bg-white text-[#52443b] border border-[#ede5d8] hover:border-[#6f3c16]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-[#6f3c16] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-[#52443b]">Memuat galeri portofolio...</p>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ede5d8] shadow-warm-sm hover:shadow-warm-md hover:border-[#d7c2b7] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ece6dc]">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#1c1c19] text-xs font-bold shadow-md flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    Lihat Foto
                  </span>
                </div>
                {item.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1c1c19] group-hover:text-[#6f3c16] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#52443b] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.location && (
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#85746a]">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#ede5d8] p-10 text-center flex flex-col items-center gap-3">
          <p className="text-sm text-[#52443b]">Belum ada item portofolio pada kategori ini.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-[#1c1c19] overflow-hidden">
              <img
                src={selectedItem.image_url}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Description & CTA */}
            <div className="p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {selectedItem.category && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#efe9dd] text-[#6f3c16] text-[11px] font-bold">
                      {selectedItem.category}
                    </span>
                  )}
                  {selectedItem.location && (
                    <span className="text-xs text-[#85746a] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {selectedItem.location}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1c19]">
                  {selectedItem.title}
                </h2>
                <p className="text-sm text-[#52443b] leading-relaxed mt-1">
                  {selectedItem.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#ede5d8] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#85746a]">
                  Tertarik memesan konsep atau model seperti ini?
                </span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#006c47] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#085a3c] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Konsultasi Proyek Ini via WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
