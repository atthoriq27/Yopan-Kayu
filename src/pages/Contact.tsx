import React, { useEffect, useState } from 'react';
import { getBusinessProfile, getWhatsAppUrl } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { CustomSelect } from '../components/CustomSelect';

export const Contact: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Meja Makan dan Kerja');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    getBusinessProfile().then(setProfile);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Pak Heri, nama saya ${name || 'Pelanggan'}.\nSaya tertarik konsultasi perabot kayu jenis: ${interest}.\nCatatan ukuran/model: ${notes || '-'}\nNomor kontak: ${phone || '-'}`;
    const url = getWhatsAppUrl(profile?.whatsapp || '6281234567890', text);
    window.open(url, '_blank');
  };

  const directWaUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Pak Heri, saya ingin konsultasi langsung seputar mebel kriya kayu solid.'
  );

  const address = profile?.address || 'Jalan Kp. Pabuaran asem No.003, RT.002, Pete, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720';
  const mapsUrl = profile?.google_maps_url || 'https://maps.app.goo.gl/asat73UmjKZ6zYN49';
  const rawPhone = profile?.whatsapp || '6281234567890';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex flex-col gap-8 sm:gap-12 pb-24 md:pb-16">
      
      {/* Editorial Header */}
      <div className="flex flex-col gap-2.5 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ede5d8] w-fit shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6f3c16]" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#6f3c16]">
            Pusat Informasi dan Konsultasi Kriya
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1c1c19] tracking-tight leading-[1.15]">
          Hubungi dan Kunjungi Workshop
        </h1>
        <p className="text-xs sm:text-sm text-[#52443b] leading-relaxed">
          Pintu workshop kami di Tigaraksa selalu terbuka untuk mendiskusikan denah, rincian ukuran, serta kurasi material balok kayu solid terbaik untuk hunian Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* Left Column: Workshop Location & Official Contacts */}
        <div className="lg:col-span-5 flex flex-col gap-5 w-full">
          
          {/* Main Workshop Info Card */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-xs flex flex-col gap-5">
            
            <div className="flex items-center gap-3 pb-3.5 border-b border-[#f0ede9]">
              <div className="w-10 h-10 rounded-xl bg-[#faf7f2] border border-[#ede5d8] flex items-center justify-center flex-shrink-0 text-[#6f3c16]">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#1c1c19]">
                  Workshop Fisik Tigaraksa
                </h2>
                <span className="text-[11px] text-[#8c6b4f] font-medium">Kabupaten Tangerang, Banten</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#52443b]">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#6f3c16] text-[18px] mt-0.5 flex-shrink-0">
                  location_on
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-[#1c1c19]">Alamat Lengkap</span>
                  <span className="text-xs text-[#52443b] leading-relaxed">
                    {address}
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf7f2] hover:bg-[#f0ede9] text-[#6f3c16] border border-[#ede5d8] text-[11px] font-semibold w-fit transition-all shadow-xs mt-0.5"
                  >
                    <span>Buka Rute di Google Maps</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-[#f0ede9]">
                <span className="material-symbols-outlined text-[#6f3c16] text-[18px] mt-0.5 flex-shrink-0">
                  schedule
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1c1c19]">Jam Operasional Workshop</span>
                  <span className="text-xs text-[#52443b] mt-0.5">
                    {profile?.opening_hours || 'Senin – Sabtu: 08.00 – 17.00 WIB'}
                  </span>
                  <span className="text-[11px] text-[#8c6b4f] mt-0.5">Kunjungan fisik langsung disambut dengan hangat</span>
                </div>
              </div>

              {/* WhatsApp Direct Link */}
              <div className="flex items-start gap-3 pt-3 border-t border-[#f0ede9]">
                <WhatsAppIcon className="w-4 h-4 fill-[#006c47] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1c1c19]">WhatsApp Pengrajin (Pak Heri)</span>
                  <a
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#006c47] font-bold hover:underline mt-0.5"
                  >
                    +{rawPhone}
                  </a>
                  <span className="text-[11px] text-[#8c6b4f]">Konsultasi ramah dan estimasi biaya transparan</span>
                </div>
              </div>

              {/* Instagram */}
              {profile?.instagram && (
                <div className="flex items-start gap-3 pt-3 border-t border-[#f0ede9]">
                  <span className="material-symbols-outlined text-[#6f3c16] text-[18px] mt-0.5 flex-shrink-0">
                    photo_camera
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1c1c19]">Instagram Resmi</span>
                    <a
                      href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#6f3c16] font-semibold hover:underline mt-0.5"
                    >
                      @{profile.instagram.replace('@', '')}
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Note at bottom of card */}
            <div className="pt-3 border-t border-[#f0ede9] text-[11px] text-[#8c6b4f] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6f3c16]" />
              <span>Program Kemitraan PkM Universitas Pamulang</span>
            </div>

          </div>

          {/* Clean Map Preview Container */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#ede5d8] shadow-xs overflow-hidden">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#ece6dc]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkg3kc7OU0nWehXp6lC6ikojWVfiU-_kOYWp_uKk8Gs3PpT45OaCXxNjBY3s7gpauAiwrp1X8vwUd8ScOf7NVPi93SMWiKiZiDhEw_Dpd5HTuhKZ6OzI46K9PvP3aPk0a3UZNpOU3MeD5H-BRCqymZ8rIeQRN_C-ogmokuEkaGbas0DLRmqWzWY1ntyFRcdsDvQd57Xu_V2LhRc0zRS2ovRK51XsX0atZWkEZ9-qEkL3jJJthH08DuiA"
                alt="Peta Lokasi Workshop Tigaraksa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] flex items-center justify-center p-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-[#1c1c19] text-xs font-semibold rounded-full shadow-md flex items-center gap-2 hover:bg-[#faf7f2] transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[#6f3c16] text-[16px]">near_me</span>
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Custom Order & Inquiry Form to WhatsApp */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-xs flex flex-col gap-5 sm:gap-6">
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#8c6b4f]">
                Formulir Diskusi Cepat
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1c19]">
                Konsultasikan Rencana Mebel Anda
              </h2>
              <p className="text-xs sm:text-sm text-[#52443b] leading-relaxed">
                Tuliskan gambaran perabot atau ukuran yang Anda butuhkan. Kami akan menyusun draf pesan otomatis yang tersambung langsung ke WhatsApp pengrajin kami.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">Nama Anda</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Hendra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">Nomor WhatsApp (Opsional)</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 0812xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#1c1c19] text-xs">Kategori Mebel yang Diminati</label>
                <CustomSelect
                  value={interest}
                  onChange={(val) => setInterest(val)}
                  options={[
                    { value: 'Meja Makan dan Kerja', label: 'Meja Makan dan Kerja (Solid Teak / Trembesi)' },
                    { value: 'Kursi dan Sofa Santai', label: 'Kursi dan Sofa Santai (Sungkai / Mahoni)' },
                    { value: 'Lemari dan Rak Dinding', label: 'Lemari dan Rak Dinding Modular' },
                    { value: 'Pesanan Custom Khusus', label: 'Pesanan Kustom Khusus (Sesuai Sketsa Ruang)' },
                    { value: 'Proyek Kafe / Komersial', label: 'Proyek Kafe / Kantor / Komersial' },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#1c1c19] text-xs">Catatan / Perkiraan Ukuran / Referensi</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan rencana Anda, perkiraan panjang x lebar x tinggi ruangan, atau referensi model yang disukai..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] font-semibold rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-98 text-xs sm:text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Kirim Rencana ke WhatsApp Pak Heri</span>
                </button>
                <span className="text-[11px] text-[#8c6b4f] text-center">
                  Formulir ini akan otomatis membuka obrolan WhatsApp terformat dengan Pak Heri.
                </span>
              </div>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
