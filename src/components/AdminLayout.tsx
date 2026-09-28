import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAdminSession, logoutAdmin, getBusinessProfile, PROFILE_UPDATED_EVENT } from '../lib/dataService';
import { BusinessProfile } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actionButton,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAdminSession().then((session) => {
      if (!session.isLoggedIn) {
        navigate('/kelola/login', { replace: true });
      } else {
        setAdminEmail(session.email || 'admin@yopankayu.com');
        setIsLoading(false);
      }
    });

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
  }, [navigate]);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/kelola/login', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#6f3c16] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-[#52443b]">Memuat Panel Pengelola...</span>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Ringkasan', path: '/kelola', icon: 'dashboard' },
    { label: 'Katalog Produk', path: '/kelola/produk', icon: 'inventory_2' },
    { label: 'Tambah Produk', path: '/kelola/produk/tambah', icon: 'add_box' },
    { label: 'Kategori Mebel', path: '/kelola/kategori', icon: 'category' },
    { label: 'Galeri Portofolio', path: '/kelola/galeri', icon: 'photo_library' },
    { label: 'Profil Usaha', path: '/kelola/profil', icon: 'storefront' },
  ];

  return (
    <div className="min-h-screen md:h-screen bg-[#f5f1eb] flex flex-col md:flex-row w-full max-w-full md:overflow-hidden">
      {/* Desktop Sidebar (Fixed full-height container, never scrolls with the page) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1c1c19] text-[#faf7f2] border-r border-[#31302d] flex-shrink-0 h-full justify-between select-none">
        {/* Top Section: Brand & Database Status */}
        <div className="flex-shrink-0">
          {/* Brand */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/kelola" className="flex items-center gap-3">
              <img
                src={profile?.logo_url || '/logo/logo-only.svg'}
                alt={profile?.business_name || 'Logo Yopan Kayu'}
                className="w-9 h-9 object-contain rounded-xl flex-shrink-0 shadow-sm bg-white/5 p-0.5"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-white leading-tight">
                  {profile?.business_name || 'Yopan Kayu'}
                </span>
                <span className="text-[10px] text-[#ffb888] font-bold tracking-widest uppercase">Admin CMS</span>
              </div>
            </Link>
          </div>

          {/* Database Status Pill */}
          <div className="px-5 py-2.5 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-white/80 font-medium text-[11px]">
                {isSupabaseConfigured ? 'Supabase Database Online' : 'Penyimpanan Lokal Aktif'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation (scrolls internally only if vertical screen is very short) */}
        <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto min-h-0">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#6f3c16] text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User & Actions Footer (Fixed at the bottom of the sidebar, always visible) */}
        <div className="flex-shrink-0 p-3.5 border-t border-white/10 bg-[#1c1c19] space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[17px]">open_in_new</span>
              <span>Buka Website Publik</span>
            </span>
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col truncate pr-2">
              <span className="text-xs font-semibold text-white truncate" title={adminEmail}>
                {adminEmail}
              </span>
              <span className="text-[10px] text-white/50">Pemilik / Pengelola</span>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar / Logout"
              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors flex items-center gap-1.5 flex-shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="text-xs font-semibold hidden lg:inline">Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content Area: Desktop has independent scrolling */}
      <div className="flex-1 flex flex-col min-w-0 md:h-full md:overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden bg-[#1c1c19] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between border-b border-[#31302d] sticky top-0 z-40 w-full max-w-full flex-shrink-0">
          <Link to="/kelola" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <img
              src={profile?.logo_url || '/logo/logo-only.svg'}
              alt={profile?.business_name || 'Logo Yopan Kayu'}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg flex-shrink-0 bg-white/5 p-0.5"
            />
            <span className="font-serif font-bold text-sm sm:text-base truncate">
              {profile?.business_name || 'Admin Yopan Kayu'}
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Link to="/" className="p-1.5 sm:p-2 text-white/70 hover:text-white" title="Ke Website">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 text-red-400 hover:text-red-300"
              title="Keluar / Logout"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">logout</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">menu</span>
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#242320] border-b border-white/10 px-4 py-3 space-y-1 text-sm text-white w-full max-w-full flex-shrink-0">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>{adminEmail}</span>
              <button onClick={handleLogout} className="text-red-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Bar / Breadcrumb with Header Logout Button (Pinned on Desktop) */}
        <div className="bg-white border-b border-[#ede5d8] px-3.5 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 w-full max-w-full min-w-0 flex-shrink-0 z-20 shadow-xs">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold font-serif text-[#1c1c19] truncate">{title}</h1>
            {subtitle && <p className="text-xs sm:text-sm text-[#52443b] mt-0.5 leading-relaxed">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
            {actionButton && <div>{actionButton}</div>}
            
            {/* Desktop Quick Header Logout */}
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ede5d8] hover:border-red-300 text-xs font-semibold text-[#52443b] hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Keluar dari Panel Admin"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Main Content Body (Independently scrollable on Desktop) */}
        <main className="flex-1 md:overflow-y-auto p-3 sm:p-6 lg:p-8 min-w-0 w-full box-border">
          <div className="max-w-6xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
