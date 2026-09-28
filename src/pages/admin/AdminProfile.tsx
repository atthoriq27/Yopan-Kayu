import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { getBusinessProfile, updateBusinessProfile, uploadImage } from '../../lib/dataService';
import { BusinessProfile } from '../../types';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states
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
    } catch (err) {
      alert('Gagal mengunggah logo.');
    } finally {
      setUploadingLogo(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleResetDefaultLogo = () => {
    setLogoUrl('/logo/logo-only.svg');
    setUploadNote('✓ Logo dikembalikan ke logo bawaan Yopan Kayu (/logo/logo-only.svg). Klik "Perbarui Profil Usaha" untuk menyimpan.');
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
