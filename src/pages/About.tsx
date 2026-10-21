import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import { BusinessProfile } from '../types';
import {
  DEFAULT_ABOUT_IMAGE,
  DEFAULT_ABOUT_BADGE,
  DEFAULT_ABOUT_TITLE,
  DEFAULT_ABOUT_STORY
} from '../lib/constants';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    getBusinessProfile().then(setProfile);
  }, []);

  const waUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Pak Heri, saya membaca profil usaha Yopan Kayu dan ingin berdiskusi mengenai proyek kriya mebel.'
  );

  const storyText = profile?.about_story || DEFAULT_ABOUT_STORY;
  const storyParagraphs = storyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-12 pb-24 md:pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[#6f3c16] rounded-full"></span>
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">Tentang Kami</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1c19]">
          Tentang Yopan Kayu
        </h1>
        <p className="text-xs sm:text-sm text-[#52443b] max-w-2xl leading-relaxed">
          Workshop spesialis mebel kayu jati belanda (pinus solid) dan berbagai pilihan kayu solid di Tigaraksa. Mengutamakan kayu asli, sambungan kokoh, amplasan halus, dan harga terjangkau langsung dari pengrajin.
        </p>
      </div>

      {/* Main Story & Founder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-md w-full">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#ece6dc] shadow-inner">
            <img
              src={profile?.about_image_url || DEFAULT_ABOUT_IMAGE}
              alt={profile?.about_badge_text || 'Pak Suheri (Pak Heri) - Pengrajin dan Pemilik Yopan Kayu'}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_ABOUT_IMAGE;
              }}
            />
            <div className="absolute bottom-3 left-3 bg-white px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-2 border border-[#ede5d8] max-w-[90%]">
              <span className="material-symbols-outlined text-[#6f3c16] text-[18px]">carpenter</span>
              <span className="text-xs font-bold text-[#1c1c19] truncate">
                {profile?.about_badge_text || DEFAULT_ABOUT_BADGE}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">
            Profil Usaha
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] leading-tight">
            {profile?.about_title || DEFAULT_ABOUT_TITLE}
          </h2>

          {storyParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-sm text-[#52443b] leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="p-4 rounded-2xl bg-[#f0ede9] border border-[#ede5d8] flex items-start gap-3 mt-1">
            <span className="material-symbols-outlined text-[#6f3c16] text-[24px] mt-0.5 flex-shrink-0">
              verified
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#1c1c19]">Komitmen Kualitas dan Pelayanan</h4>
              <p className="text-xs text-[#52443b] mt-0.5 leading-relaxed">
                Kami siap membantu dan berdiskusi dengan ramah mengenai kebutuhan produk mebel Anda, mulai dari pemilihan bahan, model, hingga proses pengerjaan dan pengiriman.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Materials We Use */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">Bahan Baku Pilihan</span>
          <h2 className="font-serif text-2xl font-bold text-[#1c1c19]">
            Jenis Kayu yang Kami Olah di Workshop
          </h2>
          <p className="text-xs sm:text-sm text-[#52443b]">
            Utamanya kayu jati belanda solid, serta aneka kayu solid nusantara lainnya sesuai permintaan Anda:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Jati Belanda (Pinus)</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Fokus utama kami. Warna cerah alami dengan serat dan alur mata kayu yang estetik. Sangat cocok untuk meja kerja, kafe, dan rak minimalis dengan harga ramah kantong.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Jati Solid (Teak)</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Kayu sangat keras dan tahan puluhan tahun dengan kandungan minyak alami anti-rayap. Pilihan tepat untuk meja makan keluarga besar dan perabot utama.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Sungkai Oven</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Warna krem lembut dengan alur serat lurus rapi. Sangat cocok bagi Anda yang menyukai gaya Skandinavia atau Japandi modern yang bersih dan lapang.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Mahoni Oven</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Tekstur pori halus dan padat, sangat ideal untuk pewarnaan dark walnut pada mebel interior kafe vintage, meja kantor, dan bufet laci.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#f4ede3] border border-[#ede5d8] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#1c1c19]">
            Ingin Berdiskusi Mengenai Kebutuhan Hunian Anda?
          </h3>
          <p className="text-xs sm:text-sm text-[#52443b]">
            Kami siap berdiskusi langsung bersama Anda menentukan pilihan jenis kayu dan perkiraan rancangan anggaran yang pas.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
          <Link
            to="/produk"
            className="flex-1 sm:flex-initial text-center px-5 py-2.5 sm:py-3 rounded-full bg-white border border-[#ede5d8] text-xs sm:text-sm font-semibold text-[#1c1c19] hover:bg-[#faf7f2] transition-colors"
          >
            Lihat Produk
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial text-center px-5 py-2.5 sm:py-3 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span>Konsultasi WA</span>
          </a>
        </div>
      </div>

    </div>
  );
};
