import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import { BusinessProfile } from '../types';
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-12 pb-24 md:pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[#6f3c16] rounded-full"></span>
          <span className="text-xs uppercase tracking-wider text-[#6f3c16] font-bold">Profil Bengkel</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1c19]">
          Tentang Yopan Kayu
        </h1>
        <p className="text-xs sm:text-sm text-[#52443b] max-w-2xl leading-relaxed">
          Usaha pembuatan dan penyediaan produk mebel berbahan kayu dengan mengutamakan kualitas, kerapian, dan hasil pengerjaan yang sesuai kebutuhan Anda.
        </p>
      </div>

      {/* Main Story & Founder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-md w-full">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#ece6dc] shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0pN2zKVEc3QUClmDoxqxceKE8cniJa-8CManzl-wjm19aE1cLRV-s8ehpMbQxVtqe3WQ3y6m1OqRYATluIaOkT7t3g4NxoWh44Y95JCguiKVBjOStmFRewmmgApdEnwc8jszsUieQqKa76Om_JdxWG1XVoEV7owvs6HE9DAuz06qkHSmdztZ2kT1A2Sgo0lCrDHKk9_3eGkTmIt2Ma6eiLpyGWePH2PXkbD6UEYw8E6PRzTQ1bUR0w"
              alt="Pak Suheri (Pak Heri) - Pengrajin dan Pemilik Yopan Kayu"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6f3c16] text-[18px]">handyman</span>
              <span className="text-xs font-bold text-[#1c1c19]">Pak Heri • Owner</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fceddf] text-[#6f3c16] text-xs font-bold self-start">
            <span>Profil Usaha</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] leading-tight">
            Pembuatan dan Penyediaan Produk Mebel Berkualitas
          </h2>

          <p className="text-sm text-[#52443b] leading-relaxed">
            Yopan Kayu merupakan usaha bengkel mebel kayu solid yang dikelola langsung oleh Pak Suheri (akrab disapa Pak Heri) di Tigaraksa. Nama Yopan Kayu sendiri diambil dengan rasa bangga dari nama putra tercinta beliau, mencerminkan ketulusan dalam berkarya untuk menghasilkan perabot berkualitas tinggi bagi setiap keluarga.
          </p>

          <p className="text-sm text-[#52443b] leading-relaxed">
            Dengan pengalaman bertahun-tahun dalam mengolah kayu solid pilihan, Pak Heri selalu mengutamakan kerapian sambungan, kehalusan amplas, serta kenyamanan ergonomis setiap perabot. Kami siap membantu Anda berdiskusi santai mulai dari pemilihan jenis kayu (Jati, Trembesi, Sungkai, Mahoni) hingga warna finishing yang serasi dengan ruangan Anda.
          </p>

          <p className="text-sm text-[#52443b] leading-relaxed">
            Melalui hadirnya Yopan Kayu secara digital, kami ingin memudahkan pelanggan dalam mengenal produk, melihat katalog, dan menghubungi kami untuk mendapatkan informasi lebih lanjut maupun melakukan pemesanan.
          </p>

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
            Jenis Kayu Nusantara yang Kami Olah
          </h2>
          <p className="text-xs sm:text-sm text-[#52443b]">
            Setiap kayu memiliki karakter kepadatan, corak serat, dan keunikan masing-masing:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Jati Solid</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Raja mebel dengan kandungan minyak alami tinggi yang tahan rayap, cuaca lembap, dan memiliki serat emas cokelat ikonik.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Trembesi (Suar)</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Memiliki corak serat sapwood dramatis dan papan utuh satu lembar tebal (live edge) tanpa sambungan untuk meja makan dan kerja mewah.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Mahoni Oven</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Tekstur pori halus dan padat, sangat ideal untuk pewarnaan dark walnut, perabot interior kafe, dan model bergaya klasik kontemporer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ede5d8] shadow-warm-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbc7] text-[#6f3c16] flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1c19]">Kayu Sungkai dan Pinus</h3>
            <p className="text-xs text-[#52443b] leading-relaxed">
              Pilihan kayu berwarna cerah alami dengan serat lurus jelas, favorit untuk interior bertema Skandinavia, Japandi, dan modern minimalis.
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
            Pak Heri siap berdiskusi langsung menentukan jenis kayu dan perkiraan rancangan anggaran.
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
