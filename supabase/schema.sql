-- ===================================================
-- DATABASE SCHEMA: YOPAN KAYU
-- Supabase PostgreSQL + Row Level Security (RLS)
-- ===================================================

-- 1. Table: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: products
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price BIGINT DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    material VARCHAR(200),
    dimensions VARCHAR(150),
    finish VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: product_images
CREATE TABLE IF NOT EXISTS public.product_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: gallery
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Residensial',
    location VARCHAR(150) DEFAULT 'Jabodetabek',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: business_profile
CREATE TABLE IF NOT EXISTS public.business_profile (
    id TEXT PRIMARY KEY DEFAULT 'yopan-kayu-main',
    business_name VARCHAR(150) NOT NULL DEFAULT 'Yopan Kayu',
    tagline VARCHAR(255) DEFAULT 'Kriya Mebel & Kayu Solid Berkualitas',
    description TEXT,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    address TEXT,
    google_maps_url TEXT,
    instagram VARCHAR(100),
    email VARCHAR(100),
    logo_url TEXT,
    opening_hours VARCHAR(255),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profile ENABLE ROW LEVEL SECURITY;

-- Categories RLS:
-- Public can read all categories
CREATE POLICY "Public can view categories" 
ON public.categories FOR SELECT 
TO anon, authenticated 
USING (true);

-- Authenticated admin can insert, update, delete
CREATE POLICY "Admin can manage categories" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Products RLS:
-- Public can view active products
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT 
TO anon 
USING (is_active = true);

-- Authenticated admin can view all products (including draft/inactive)
CREATE POLICY "Admin can view all products" 
ON public.products FOR SELECT 
TO authenticated 
USING (true);

-- Authenticated admin can CRUD products
CREATE POLICY "Admin can manage products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Product Images RLS:
CREATE POLICY "Public can view product images" 
ON public.product_images FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin can manage product images" 
ON public.product_images FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Gallery RLS:
CREATE POLICY "Public can view gallery" 
ON public.gallery FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin can manage gallery" 
ON public.gallery FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Business Profile RLS:
CREATE POLICY "Public can view business profile" 
ON public.business_profile FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin can update business profile" 
ON public.business_profile FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- ===================================================
-- STORAGE BUCKETS CONFIGURATION (RUN IN SUPABASE SQL)
-- ===================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('business', 'business', true)
ON CONFLICT (id) DO NOTHING;

-- Storage public read policy
CREATE POLICY "Public Access Products Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'products');

CREATE POLICY "Public Access Gallery Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'gallery');

CREATE POLICY "Public Access Business Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'business');

-- Storage authenticated admin upload policy
CREATE POLICY "Admin Upload Products Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'products');

CREATE POLICY "Admin Upload Gallery Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin Upload Business Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'business');

-- ===================================================
-- SEED INITIAL DATA
-- ===================================================
INSERT INTO public.categories (id, name, slug) VALUES
('cat-kursi-sofa', 'Kursi & Sofa', 'kursi-sofa'),
('cat-meja', 'Makan & Kerja', 'makan-kerja'),
('cat-lemari-rak', 'Lemari & Rak', 'lemari-rak'),
('cat-custom', 'Pesanan Kustom', 'pesanan-kustom')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.business_profile (
  id, business_name, tagline, description, phone, whatsapp, 
  address, google_maps_url, instagram, email, opening_hours
) VALUES (
  'yopan-kayu-main',
  'Yopan Kayu',
  'Kriya Mebel & Kayu Solid Berkualitas',
  'Bengkel kriya mebel kayu solid lokal nusantara. Mengolah kayu jati, mahoni, trembesi, dan sungkai pilihan menjadi perabot tahan lama bergaransi langsung dari pengrajin berpengalaman di Tangerang Selatan.',
  '081234567890',
  '6281234567890',
  'Jl. Raya Kriya Kayu No. 18, Pamulang, Kota Tangerang Selatan, Banten 15417',
  'https://maps.google.com/?q=Pamulang,Tangerang+Selatan',
  'yopankayu',
  'kontak@yopankayu.com',
  'Senin - Sabtu: 08.00 - 17.00 WIB (Minggu Libur & Janji Temu)'
) ON CONFLICT (id) DO UPDATE SET updated_at = now();
