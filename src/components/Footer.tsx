import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl, PROFILE_UPDATED_EVENT } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const Footer: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    getBusinessProfile().then(setProfile);

    const handleProfileUpdate = (e: any) => {
      if (e.detail) {
        setProfile(e.detail);
      }
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    };
  }, []);

  // Sembunyikan footer di halaman kelola / admin
  if (location.pathname.startsWith('/kelola') || location.pathname.startsWith('/admin')) {
    return null;
  }

  const phone = profile?.whatsapp || '6281234567890';
  const waUrl = getWhatsAppUrl(
    phone,
    'Halo Yopan Kayu, saya ingin bertanya seputar produk dan pemesanan mebel kayu solid.'
  );

  const address = profile?.address || 'Jalan Kp. Pabuaran asem No.003, RT.002, Pete, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720';
  const mapsUrl = profile?.google_maps_url || 'https://maps.app.goo.gl/asat73UmjKZ6zYN49';

  return (
    <footer className="bg-[#f5efe6] border-t border-[#e8dfd5] text-[#1c1c19] pt-10 sm:pt-14 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Marketing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1: Brand Authority & Craft Legacy (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <Link to="/" className="flex items-center gap-2.5 w-fit group">
              <img
                src={profile?.logo_url || '/logo/logo-only.svg'}
                alt={profile?.business_name || 'Logo Yopan Kayu'}
                className="w-9 h-9 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#1c1c19] leading-tight">
                  {profile?.business_name || 'Yopan Kayu'}
                </span>
                <span className="text-[10px] text-[#6f3c16] uppercase tracking-[0.14em] font-bold">
                  Bengkel Kriya Kayu Solid
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#52443b] leading-relaxed max-w-sm">
              Pengrajin mebel kayu solid di Tigaraksa. Memproduksi meja makan, kursi, credenza, dan interior kustom presisi dari balok kayu jati, trembesi, sungkai, dan mahoni pilihan.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e8dfd5] text-[11px] text-[#6f3c16] font-medium w-fit shadow-xs">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>Kolaborasi PkM Univ. Pamulang</span>
            </div>
          </div>

          {/* Column 2: Katalog & Layanan (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6f3c16]">
              Koleksi dan Layanan
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#52443b]">
              <li>
                <Link to="/produk" className="hover:text-[#6f3c16] hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8c6b4f]"></span>
                  <span>Meja Makan dan Kerja Solid</span>
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-[#6f3c16] hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8c6b4f]"></span>
                  <span>Kursi dan Armchair Santai</span>
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-[#6f3c16] hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8c6b4f]"></span>
                  <span>Credenza TV dan Lemari Rak</span>
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-[#6f3c16] hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8c6b4f]"></span>
                  <span>Portofolio Hasil Proyek</span>
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-[#6f3c16] hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#8c6b4f]"></span>
                  <span>Pesanan Kustom Ukuran Ruang</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Bahan Baku & Nilai Mutu (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6f3c16]">
              Kayu Pilihan
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#52443b]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#006c47]">check_circle</span>
                <span>Kayu Jati Solid Grade A</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#006c47]">check_circle</span>
                <span>Trembesi / Suar Utuh</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#006c47]">check_circle</span>
                <span>Mahoni Oven Kering</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#006c47]">check_circle</span>
                <span>Sungkai Terang Natural</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#006c47]">check_circle</span>
                <span>Sambungan Purus Kokoh</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Workshop & Quick Action (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6f3c16]">
              Workshop dan Lokasi
            </h4>
            
            <div className="flex items-start gap-1.5 text-xs text-[#52443b] leading-relaxed">
              <span className="material-symbols-outlined text-[#6f3c16] text-[16px] flex-shrink-0 mt-0.5">location_on</span>
              <span>{address}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#78675a]">
              <span className="material-symbols-outlined text-[14px] text-[#8c6b4f]">schedule</span>
              <span>{profile?.opening_hours || 'Senin – Sabtu: 08.00 – 17.00 WIB'}</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#faf7f2] text-[#1c1c19] border border-[#ede5d8] text-xs font-semibold transition-all shadow-xs text-center"
              >
                <span className="material-symbols-outlined text-[14px] text-[#6f3c16]">near_me</span>
                <span>Petunjuk Google Maps</span>
                <span className="material-symbols-outlined text-[12px] text-[#8c6b4f]">open_in_new</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] text-xs font-semibold transition-all shadow-xs text-center"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>Diskusi Proyek via WA</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="mt-10 pt-5 border-t border-[#e8dfd5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7d6c62]">
          <p>© {new Date().getFullYear()} Yopan Kayu. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="material-symbols-outlined text-[13px] text-[#6f3c16]">location_on</span>
            <span>Bengkel Tigaraksa, Kab. Tangerang</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
