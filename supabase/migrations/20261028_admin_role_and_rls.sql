-- ===================================================
-- MIGRATION: ROLE ADMIN SEPARATION & STRICT RLS POLICIES
-- Tanggal: 2026-10-28
-- Target: Yopan Kayu (Supabase PostgreSQL)
-- ===================================================

-- 1. Buat Tabel admin_users (Referensi ke auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS) pada tabel admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Cabut akses publik apapun ke admin_users
REVOKE ALL ON public.admin_users FROM anon;

-- Policy admin_users: Hanya user yang sedang login yang dapat mengecek apakah ID-nya ada di admin_users
DROP POLICY IF EXISTS "Users can check their own admin status" ON public.admin_users;
CREATE POLICY "Users can check their own admin status"
ON public.admin_users FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Policy admin_users: Hanya super-admin/admin terdaftar yang bisa menambah/mengubah admin_users
DROP POLICY IF EXISTS "Admins can manage admin_users" ON public.admin_users;
CREATE POLICY "Admins can manage admin_users"
ON public.admin_users FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));


-- 2. Helper Function: is_admin()
-- Fungsi ini memeriksa apakah auth.uid() dari pemanggil query terdaftar di admin_users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
    );
$$;


-- 3. PERBAIKAN RLS TABEL PRODUCTS
-- Anonim hanya boleh melihat produk yang statusnya aktif (is_active = true)
-- Admin dapat melihat SEMUA produk (termasuk draft/tidak aktif)
-- Hanya Admin yang boleh INSERT, UPDATE, DELETE produk
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Admin can view all products" ON public.products;
DROP POLICY IF EXISTS "Admin can manage products" ON public.products;
DROP POLICY IF EXISTS "Anon cannot insert products" ON public.products;
DROP POLICY IF EXISTS "Anon cannot update products" ON public.products;
DROP POLICY IF EXISTS "Anon cannot delete products" ON public.products;

CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Admin can view all products"
ON public.products FOR SELECT
TO authenticated
USING (public.is_admin() OR is_active = true);

CREATE POLICY "Admin can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.is_admin());


-- 4. PERBAIKAN RLS TABEL CATEGORIES
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admin can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Anon cannot insert categories" ON public.categories;
DROP POLICY IF EXISTS "Anon cannot update categories" ON public.categories;
DROP POLICY IF EXISTS "Anon cannot delete categories" ON public.categories;

CREATE POLICY "Public can view categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin can insert categories"
ON public.categories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update categories"
ON public.categories FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete categories"
ON public.categories FOR DELETE
TO authenticated
USING (public.is_admin());


-- 5. PERBAIKAN RLS TABEL PRODUCT_IMAGES
DROP POLICY IF EXISTS "Public can view product images" ON public.product_images;
DROP POLICY IF EXISTS "Admin can manage product images" ON public.product_images;
DROP POLICY IF EXISTS "Anon cannot insert product images" ON public.product_images;
DROP POLICY IF EXISTS "Anon cannot update product images" ON public.product_images;
DROP POLICY IF EXISTS "Anon cannot delete product images" ON public.product_images;

CREATE POLICY "Public can view product images"
ON public.product_images FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin can insert product images"
ON public.product_images FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update product images"
ON public.product_images FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete product images"
ON public.product_images FOR DELETE
TO authenticated
USING (public.is_admin());


-- 6. PERBAIKAN RLS TABEL GALLERY
DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admin can manage gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anon cannot insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anon cannot update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Anon cannot delete gallery" ON public.gallery;

CREATE POLICY "Public can view gallery"
ON public.gallery FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin can insert gallery"
ON public.gallery FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update gallery"
ON public.gallery FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete gallery"
ON public.gallery FOR DELETE
TO authenticated
USING (public.is_admin());


-- 7. PERBAIKAN RLS TABEL BUSINESS_PROFILE
DROP POLICY IF EXISTS "Public can view business profile" ON public.business_profile;
DROP POLICY IF EXISTS "Admin can update business profile" ON public.business_profile;
DROP POLICY IF EXISTS "Admin can manage business profile" ON public.business_profile;
DROP POLICY IF EXISTS "Anon cannot insert business profile" ON public.business_profile;
DROP POLICY IF EXISTS "Anon cannot update business profile" ON public.business_profile;
DROP POLICY IF EXISTS "Anon cannot delete business profile" ON public.business_profile;

CREATE POLICY "Public can view business profile"
ON public.business_profile FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin can insert business profile"
ON public.business_profile FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update business profile"
ON public.business_profile FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete business profile"
ON public.business_profile FOR DELETE
TO authenticated
USING (public.is_admin());
