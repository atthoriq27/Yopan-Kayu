import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  // Hide bottom nav on admin routes
  if (location.pathname.startsWith('/kelola') || location.pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    { label: 'Beranda', path: '/', icon: 'cottage' },
    { label: 'Produk', path: '/produk', icon: 'inventory_2' },
    { label: 'Galeri', path: '/galeri', icon: 'photo_camera' },
    { label: 'Profil', path: '/tentang', icon: 'history_edu' },
    { label: 'Kontak', path: '/kontak', icon: 'chat_paste_go' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-[#faf7f2]/95 backdrop-blur-xl border-t border-[#ede5d8] shadow-[0_-2px_12px_rgba(31,36,33,0.06)] md:hidden pb-[env(safe-area-inset-bottom,0px)] will-change-transform"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div className="flex justify-around items-center h-14 px-1 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (location.pathname === item.path) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all ${
                isActive
                  ? 'text-[#6f3c16] font-bold'
                  : 'text-[#52443b] hover:text-[#1c1c19]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'material-symbols-fill' : ''}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] leading-tight tracking-tight ${isActive ? 'font-bold text-[#6f3c16]' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
