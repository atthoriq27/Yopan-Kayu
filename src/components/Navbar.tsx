import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBusinessProfile, getWhatsAppUrl, PROFILE_UPDATED_EVENT } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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



  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Produk', path: '/produk' },
    { label: 'Portofolio', path: '/galeri' },
    { label: 'Tentang Kami', path: '/tentang' },
    { label: 'Kontak', path: '/kontak' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const waUrl = getWhatsAppUrl(
    profile?.whatsapp || '6281234567890',
    'Halo Yopan Kayu, saya ingin konsultasi mengenai pembuatan mebel kriya kayu solid.'
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ede5d8]/80 shadow-[0_1px_8px_rgba(31,36,33,0.03)] pt-safe">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand Mark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0 min-w-0"
            title="Yopan Kayu"
          >
            <img
              src={profile?.logo_url || '/logo/logo-only.svg'}
              alt={profile?.business_name || 'Logo Yopan Kayu'}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#1c1c19] leading-none truncate">
              {profile?.business_name || 'Yopan Kayu'}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-sm transition-all rounded-lg ${
                    isActive
                      ? 'text-[#6f3c16] font-bold bg-[#6f3c16]/5'
                      : 'text-[#52443b] hover:text-[#1c1c19] hover:bg-black/[0.03] font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-[#6f3c16] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop Pill Search Bar (from reference) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center rounded-full bg-white border border-[#ede5d8] hover:border-[#d9cbbe] focus-within:border-[#6f3c16] focus-within:ring-2 focus-within:ring-[#6f3c16]/15 pl-4 pr-1 py-1 shadow-xs transition-all duration-300 group"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mebel solid..."
                className="bg-transparent text-xs sm:text-sm text-[#1c1c19] placeholder:text-[#9c8e82] focus:outline-none w-36 lg:w-48 xl:w-56 focus:w-44 lg:focus:w-56 xl:focus:w-64 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 rounded-full text-[#85746a] hover:text-[#1c1c19] flex items-center justify-center mr-1"
                  title="Hapus pencarian"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              )}
              <button
                type="submit"
                aria-label="Cari Produk"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] flex items-center justify-center flex-shrink-0 transition-colors shadow-xs active:scale-95"
                title="Cari produk"
              >
                <span className="material-symbols-outlined text-[16px]">search</span>
              </button>
            </form>

            {/* Mobile Search Button (Compact toggle only on mobile) */}
            <button
              aria-label="Pencarian Produk"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden w-8 h-8 rounded-full border border-[#ede5d8] bg-white text-[#52443b] hover:text-[#1c1c19] flex items-center justify-center hover:bg-[#f6f2ec] active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              aria-label="Menu Navigasi"
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#ede5d8] bg-white text-[#1c1c19] flex items-center justify-center hover:bg-[#f6f3ee] active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-[#ede5d8] bg-[#fbf8f3] px-3.5 py-2.5 shadow-md">
            <form onSubmit={handleSearchSubmit} className="flex items-center rounded-full bg-white border border-[#ede5d8] pl-3.5 pr-1 py-1 shadow-xs">
              <input
                type="text"
                placeholder="Cari meja, kursi, lemari solid..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-xs text-[#1c1c19] placeholder:text-[#9c8e82] focus:outline-none py-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 rounded-full text-[#85746a] hover:text-[#1c1c19] flex items-center justify-center mr-1"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
              <button
                type="submit"
                aria-label="Cari"
                className="w-7 h-7 rounded-full bg-[#1c1c19] hover:bg-[#6f3c16] text-white flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[15px]">search</span>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-[#1c1c19]/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <aside
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 bottom-0 z-[75] w-[80vw] max-w-xs bg-[#faf7f2] border-l border-[#ede5d8] shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between md:hidden ${
          isDrawerOpen
            ? 'translate-x-0 opacity-100 visible pointer-events-auto'
            : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ede5d8]">
            <Link
              to="/"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-2.5 select-none"
              title="Yopan Kayu"
            >
              <img
                src={profile?.logo_url || '/logo/logo-only.svg'}
                alt={profile?.business_name || 'Logo Yopan Kayu'}
                className="w-8 h-8 object-contain rounded-md flex-shrink-0"
              />
              <span className="font-serif text-base font-bold text-[#1c1c19]">
                {profile?.business_name || 'Yopan Kayu'}
              </span>
            </Link>
            <button
              aria-label="Tutup Menu"
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#ede5d8] text-[#52443b] hover:text-[#1c1c19] flex items-center justify-center transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 pt-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-[#6f3c16]/10 text-[#6f3c16] font-semibold'
                      : 'text-[#42362f] hover:bg-[#ede5d8]/40 hover:text-[#1c1c19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[19px] ${isActive ? 'text-[#6f3c16]' : 'text-[#85746a]'}`}>
                      {link.path === '/' ? 'cottage' : link.path === '/produk' ? 'chair' : link.path === '/galeri' ? 'photo_library' : link.path === '/tentang' ? 'history_edu' : 'chat_bubble'}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6f3c16]" />
                  ) : (
                    <span className="material-symbols-outlined text-[15px] text-[#c2b4a5]">
                      chevron_right
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Clean Editorial WhatsApp CTA */}
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] flex items-center justify-center gap-2 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-98"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Customer-facing Footer of Drawer */}
        <div className="p-4 sm:p-5 bg-[#f6f1ea] border-t border-[#ede5d8] flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#1c1c19]">
              <span className="material-symbols-outlined text-[15px] text-[#6f3c16]">storefront</span>
              <span>Workshop Yopan Kayu</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#6e5d53] pl-5">
              Tigaraksa, Kab. Tangerang, Banten
            </p>
            <p className="text-[11px] text-[#85746a] pl-5">
              Senin – Sabtu: 08.00 – 17.00 WIB
            </p>
          </div>

          <div className="pt-2 border-t border-[#ede5d8]/80 flex items-center justify-between text-[11px]">
            <span className="text-[10px] text-[#85746a]/70">© Yopan Kayu</span>
            <span className="text-[10px] text-[#85746a]/70">Tigaraksa, Tangerang</span>
          </div>
        </div>
      </aside>
    </>
  );
};
