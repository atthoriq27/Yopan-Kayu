import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { getBusinessProfile, updateBusinessProfile, uploadImage } from '../../lib/dataService';
import { BusinessProfile } from '../../types';
import {
  DEFAULT_ABOUT_IMAGE,
  DEFAULT_ABOUT_BADGE,
  DEFAULT_ABOUT_TITLE,
  DEFAULT_ABOUT_STORY
} from '../../lib/constants';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states - Core Profile
  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form states - About Us Section
  const [aboutImageUrl, setAboutImageUrl] = useState('');
  const [aboutBadgeText, setAboutBadgeText] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutStory, setAboutStory] = useState('');
  const [uploadingAboutImg, setUploadingAboutImg] = useState(false);
  const [aboutImgNote, setAboutImgNote] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getBusinessProfile();
        setProfile(data);
        setBusinessName(data.business_name || '');
        setTagline(data.tagline || '');
        setDescription(data.description || '');
        setWhatsapp(data.whatsapp || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setGoogleMapsUrl(data.google_maps_url || '');
        setInstagram(data.instagram || '');
        setEmail(data.email || '');
        setOpeningHours(data.opening_hours || '');
        setLogoUrl(data.logo_url || '');

        setAboutImageUrl(data.about_image_url || DEFAULT_ABOUT_IMAGE);
        setAboutBadgeText(data.about_badge_text || DEFAULT_ABOUT_BADGE);
        setAboutTitle(data.about_title || DEFAULT_ABOUT_TITLE);
        setAboutStory(data.about_story || DEFAULT_ABOUT_STORY);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [uploadNote, setUploadNote] = useState('');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    setUploadNote('');
    try {
      const url = await uploadImage(file, 'business');
      setLogoUrl(url);
      setUploadNote('✓ Logo baru berhasil dioptimasi. Klik "Perbarui Profil Usaha" di bawah untuk menerapkan.');
    } catch (err: any) {
      alert(err?.message || 'Gagal mengunggah logo.');
    } finally {
      setUploadingLogo(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleResetDefaultLogo = () => {
    setLogoUrl('/logo/logo-only.svg');
    setUploadNote('✓ Logo dikembalikan ke logo bawaan Yopan Kayu (/logo/logo-only.svg). Klik "Perbarui Profil Usaha" untuk menyimpan.');
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAboutImg(true);
    setAboutImgNote('');
    try {
      const url = await uploadImage(file, 'business');
      setAboutImageUrl(url);
      setAboutImgNote('✓ Foto profil pengrajin berhasil diunggah. Klik "Perbarui Profil Usaha" untuk menerapkan.');
    } catch (err: any) {
      alert(err?.message || 'Gagal mengunggah foto.');
    } finally {
      setUploadingAboutImg(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleResetDefaultAboutImage = () => {
    setAboutImageUrl(DEFAULT_ABOUT_IMAGE);
    setAboutBadgeText(DEFAULT_ABOUT_BADGE);
    setAboutImgNote('✓ Foto dan badge dikembalikan ke setelan awal. Klik "Perbarui Profil Usaha" untuk menyimpan.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    try {
      const updated = await updateBusinessProfile({
        business_name: businessName.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        whatsapp: whatsapp.trim(),
        phone: phone.trim(),
        address: address.trim(),
        google_maps_url: googleMapsUrl.trim(),
        instagram: instagram.trim(),
        email: email.trim(),
        opening_hours: openingHours.trim(),
        logo_url: logoUrl.trim(),
        about_image_url: aboutImageUrl.trim(),
        about_badge_text: aboutBadgeText.trim(),
        about_title: aboutTitle.trim(),
        about_story: aboutStory.trim(),
      });
      setProfile(updated);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err: any) {
      alert(`Gagal memperbarui profil: ${err.message || 'Error'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Profil Usaha">
        <div className="p-8 text-center text-xs text-[#52443b]">Memuat profil...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Profil Usaha dan Informasi Kontak"
      subtitle="Perubahan di halaman ini akan langsung memperbarui nomor WhatsApp, alamat, dan jam buka di seluruh website."
    >
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#ede5d8] shadow-warm-sm flex flex-col gap-6 w-full max-w-4xl min-w-0 box-border overflow-hidden">
        
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Profil usaha berhasil disimpan dan diperbarui.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs sm:text-sm w-full min-w-0">
          
          <div className="flex flex-col gap-1.5 sm:col-span-2 w-full min-w-0">
            <label className="font-bold text-[#1c1c19]">Nama Usaha *</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2 w-full min-w-0">
            <label className="font-bold text-[#1c1c19]">Slogan / Tagline Usaha</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Kriya Mebel dan Kayu Solid Berkualitas"
              className="w-full min-w-0 max-w-full box-border px-3.5 sm:px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#1c1c19]">Nomor WhatsApp Utama (Wajib) *</label>
            <input
              type="text"
              required
              placeholder="Contoh: 6281234567890"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] font-mono"
            />
            <span className="text-[11px] text-[#85746a]">Gunakan format internasional tanpa spasi (contoh: 6281234567890)</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#1c1c19]">Nomor Telepon Reguler</label>
            <input
              type="text"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#1c1c19]">Instagram Resmi (username tanpa @)</label>
            <input
              type="text"
              placeholder="yopankayu"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#1c1c19]">Email Usaha</label>
            <input
              type="email"
              placeholder="kontak@yopankayu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="font-bold text-[#1c1c19]">Alamat Workshop Fisik *</label>
            <textarea
              rows={2}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="font-bold text-[#1c1c19]">Link Google Maps</label>
            <input
              type="text"
              placeholder="https://maps.google.com/?q=..."
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="font-bold text-[#1c1c19]">Jam Operasional Workshop</label>
            <input
              type="text"
              placeholder="Senin - Sabtu: 08.00 - 17.00 WIB (Minggu Libur)"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="font-bold text-[#1c1c19]">Deskripsi Singkat Usaha</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19]"
            />
          </div>

          {/* Logo Section */}
          <div className="flex flex-col gap-3 sm:col-span-2 pt-4 border-t border-[#ede5d8]">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#1c1c19] text-sm sm:text-base">Logo Usaha</label>
              <span className="text-[11px] text-[#85746a]">Tampil di Navbar, Footer, dan Panel Admin</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-[#faf7f2] rounded-2xl border border-[#ede5d8]">
              {/* Dual Previews (Light & Dark) */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-xl bg-white border border-[#ede5d8] p-2 flex items-center justify-center shadow-xs">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Preview Terang" className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-serif text-2xl font-bold text-[#6f3c16]">Y</span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#85746a] font-medium">Latar Terang</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-xl bg-[#1c1c19] border border-[#31302d] p-2 flex items-center justify-center shadow-xs">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Preview Gelap" className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-serif text-2xl font-bold text-white">Y</span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#85746a] font-medium">Latar Gelap</span>
                </div>
              </div>

              {/* Upload Controls & URL */}
              <div className="flex-1 flex flex-col gap-2.5 w-full min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#6f3c16] hover:bg-[#5a2f10] text-xs font-bold text-white cursor-pointer transition-colors active:scale-95 shadow-xs">
                    <span className="material-symbols-outlined text-[17px]">upload</span>
                    <span>{uploadingLogo ? 'Mengoptimalkan...' : 'Unggah Logo Baru'}</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploadingLogo}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleResetDefaultLogo}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#ede5d8] text-xs font-semibold text-[#52443b] hover:bg-[#f0ede9] transition-colors active:scale-95"
                    title="Gunakan logo resmi bawaan Yopan Kayu"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    <span>Gunakan Logo Bawaan</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="URL Logo atau jalur berkas..."
                  value={logoUrl}
                  onChange={(e) => {
                    setLogoUrl(e.target.value);
                    setUploadNote('');
                  }}
                  className="w-full px-3.5 py-2 bg-white border border-[#ede5d8] rounded-xl text-xs text-[#1c1c19] font-mono focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30"
                />

                {uploadNote && (
                  <p className="text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    {uploadNote}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Tentang Kami (Founder, Story & Floating Badge) Section     */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-4 sm:col-span-2 pt-6 border-t border-[#ede5d8]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6f3c16] text-[20px]">person_celebrate</span>
                <label className="font-bold text-[#1c1c19] text-sm sm:text-base">Pengaturan Halaman Tentang Kami</label>
              </div>
              <span className="text-xs text-[#85746a]">
                Atur foto profil pengrajin/owner, teks badge mengambang di atas foto, judul, serta cerita tentang usaha Yopan Kayu.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5 bg-[#faf7f2] rounded-2xl border border-[#ede5d8]">
              {/* Left Column: Live Interactive Card Preview */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#1c1c19]">Pratinjau Foto dan Badge</span>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#ece6dc] border border-[#ede5d8] shadow-sm">
                  <img
                    src={aboutImageUrl || DEFAULT_ABOUT_IMAGE}
                    alt="Preview Pengrajin"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_ABOUT_IMAGE;
                    }}
                  />
                  {/* Floating Badge on top of photo */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-black/5 max-w-[90%]">
                    <span className="material-symbols-outlined text-[#6f3c16] text-[16px]">handyman</span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1c1c19] truncate">
                      {aboutBadgeText || 'Pak Heri • Owner'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#85746a] text-center">
                  Tampilan kartu ini yang akan tampil di halaman <strong>Tentang Kami</strong>
                </span>
              </div>

              {/* Right Column: Edit Controls */}
              <div className="lg:col-span-8 flex flex-col gap-3.5">
                {/* Image Upload & Controls */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">Foto Pengrajin / Owner</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#6f3c16] hover:bg-[#5a2f10] text-xs font-bold text-white cursor-pointer transition-colors active:scale-95 shadow-xs">
                      <span className="material-symbols-outlined text-[17px]">upload</span>
                      <span>{uploadingAboutImg ? 'Mengunggah...' : 'Pilih Berkas Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutImageUpload}
                        className="hidden"
                        disabled={uploadingAboutImg}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleResetDefaultAboutImage}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#ede5d8] text-xs font-semibold text-[#52443b] hover:bg-[#f0ede9] transition-colors active:scale-95"
                      title="Kembalikan ke foto bawaan Pak Heri"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>Foto Bawaan</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Atau tempel URL foto..."
                    value={aboutImageUrl}
                    onChange={(e) => {
                      setAboutImageUrl(e.target.value);
                      setAboutImgNote('');
                    }}
                    className="w-full px-3.5 py-2 bg-white border border-[#ede5d8] rounded-xl text-xs text-[#1c1c19] font-mono focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30"
                  />

                  {aboutImgNote && (
                    <p className="text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      {aboutImgNote}
                    </p>
                  )}
                </div>

                {/* Badge Text Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">
                    Teks Badge Mengambang di Foto *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pak Heri • Owner"
                    value={aboutBadgeText}
                    onChange={(e) => setAboutBadgeText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ede5d8] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30"
                  />
                  <span className="text-[11px] text-[#85746a]">
                    Badge kecil di sudut kiri bawah foto (misal: "Pak Heri • Owner", "Pak Suheri • Founder dan Pengrajin")
                  </span>
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">
                    Judul Utama Bagian Tentang Kami
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pembuatan dan Penyediaan Produk Mebel Berkualitas"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ede5d8] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30"
                  />
                </div>

                {/* Story Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1c1c19] text-xs">
                    Cerita / Narasi Tentang Kami
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tuliskan cerita workshop, filosofi nama Yopan Kayu, dan komitmen pelayanan..."
                    value={aboutStory}
                    onChange={(e) => setAboutStory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ede5d8] rounded-xl text-xs sm:text-sm text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 leading-relaxed"
                  />
                  <span className="text-[11px] text-[#85746a]">
                    Pisahkan paragraf dengan menekan <strong>Enter 2 kali</strong> (baris kosong). Tulisan akan otomatis dirapikan per paragraf.
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-[#ede5d8] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#6f3c16] hover:bg-[#5a2f10] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>{saving ? 'Menyimpan...' : 'Perbarui Profil Usaha'}</span>
          </button>
        </div>

      </form>
    </AdminLayout>
  );
};
