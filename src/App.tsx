import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloat } from './components/WhatsAppFloat';

// Public Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Admin CMS Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminProfile } from './pages/admin/AdminProfile';


// Disable browser's auto scroll restoration so manual scroll management is smooth and predictable
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Scroll to top helper on route transition (instant reset without jarring animated scroll)
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
};

// Persistent Public Layout Container (using Outlet so navbar NEVER unmounts or flickers)
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1c1c19] w-full max-w-full overflow-x-hidden relative">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppFloat />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes wrapped in persistent PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Products />} />
          <Route path="/produk/:slug" element={<ProductDetail />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>

        {/* Pengelola CMS Routes (Accessible exclusively via /kelola) */}
        <Route path="/kelola/login" element={<AdminLogin />} />
        <Route path="/kelola" element={<AdminDashboard />} />
        <Route path="/kelola/produk" element={<AdminProducts />} />
        <Route path="/kelola/produk/tambah" element={<AdminProductForm />} />
        <Route path="/kelola/produk/:id/edit" element={<AdminProductForm />} />
        <Route path="/kelola/kategori" element={<AdminCategories />} />
        <Route path="/kelola/galeri" element={<AdminGallery />} />
        <Route path="/kelola/profil" element={<AdminProfile />} />

        {/* Security Cloaking: redirect common bot target /admin to Homepage */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/admin/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
