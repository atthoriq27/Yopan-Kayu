import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export const NotFound: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    getBusinessProfile().then(setProfile);
  }, []);

  const waUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Yopan Kayu, saya membuka tautan yang tidak ditemukan di website dan ingin menanyakan informasi produk mebel.'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center justify-center text-center">
      {/* Decorative Wood Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdbc7]/60 text-[#6f3c16] text-xs font-bold uppercase tracking-wider mb-4 border border-[#f0c5ad]">
        <span className="material-symbols-outlined text-[16px]">search_off</span>
        <span>Kode Galat 404</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1c19] tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h1>

      <p className="text-sm sm:text-base text-[#52443b] max-w-lg mb-8 leading-relaxed">
        Maaf, halaman yang Anda tuju tidak tersedia, telah dipindahkan, atau alamat URL yang Anda masukkan kurang tepat.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>Kembali ke Beranda</span>
        </Link>

        <Link
          to="/produk"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#faf7f2] text-[#1c1c19] border border-[#ede5d8] text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">chair</span>
          <span>Lihat Katalog Produk</span>
        </Link>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f4ede3] hover:bg-[#ebdccb] text-[#52443b] border border-[#ede5d8] text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
          <span>Bantuan WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
