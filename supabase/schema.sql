-- ===================================================
-- DATABASE SCHEMA: YOPAN KAYU
-- Supabase PostgreSQL + Row Level Security (RLS) + Storage
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
    tagline VARCHAR(255) DEFAULT 'Pembuatan dan Penyediaan Produk Mebel Kayu',
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
-- ROW LEVEL SECURITY (RLS)
-- ===================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profile ENABLE ROW LEVEL SECURITY;

-- Categories RLS:
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" 
ON public.categories FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Anon cannot insert categories" ON public.categories;
CREATE POLICY "Anon cannot insert categories"
ON public.categories FOR INSERT
TO anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Anon cannot update categories" ON public.categories;
CREATE POLICY "Anon cannot update categories"
ON public.categories FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Anon cannot delete categories" ON public.categories;
CREATE POLICY "Anon cannot delete categories"
ON public.categories FOR DELETE
TO anon
USING (false);

DROP POLICY IF EXISTS "Admin can manage categories" ON public.categories;
CREATE POLICY "Admin can manage categories" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Products RLS:
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT 
TO anon 
USING (is_active = true);

DROP POLICY IF EXISTS "Anon cannot insert products" ON public.products;
CREATE POLICY "Anon cannot insert products"
ON public.products FOR INSERT
TO anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Anon cannot update products" ON public.products;
CREATE POLICY "Anon cannot update products"
ON public.products FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Anon cannot delete products" ON public.products;
CREATE POLICY "Anon cannot delete products"
ON public.products FOR DELETE
TO anon
USING (false);

DROP POLICY IF EXISTS "Admin can view all products" ON public.products;
CREATE POLICY "Admin can view all products" 
ON public.products FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Admin can manage products" ON public.products;
CREATE POLICY "Admin can manage products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Product Images RLS:
DROP POLICY IF EXISTS "Public can view product images" ON public.product_images;
CREATE POLICY "Public can view product images" 
ON public.product_images FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Anon cannot insert product images" ON public.product_images;
CREATE POLICY "Anon cannot insert product images"
ON public.product_images FOR INSERT
TO anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Anon cannot update product images" ON public.product_images;
CREATE POLICY "Anon cannot update product images"
ON public.product_images FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Anon cannot delete product images" ON public.product_images;
CREATE POLICY "Anon cannot delete product images"
ON public.product_images FOR DELETE
TO anon
USING (false);

DROP POLICY IF EXISTS "Admin can manage product images" ON public.product_images;
CREATE POLICY "Admin can manage product images" 
ON public.product_images FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Gallery RLS:
DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
CREATE POLICY "Public can view gallery" 
ON public.gallery FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Anon cannot insert gallery" ON public.gallery;
CREATE POLICY "Anon cannot insert gallery"
ON public.gallery FOR INSERT
TO anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Anon cannot update gallery" ON public.gallery;
CREATE POLICY "Anon cannot update gallery"
ON public.gallery FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Anon cannot delete gallery" ON public.gallery;
CREATE POLICY "Anon cannot delete gallery"
ON public.gallery FOR DELETE
TO anon
USING (false);

DROP POLICY IF EXISTS "Admin can manage gallery" ON public.gallery;
CREATE POLICY "Admin can manage gallery" 
ON public.gallery FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Business Profile RLS:
DROP POLICY IF EXISTS "Public can view business profile" ON public.business_profile;
CREATE POLICY "Public can view business profile" 
ON public.business_profile FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Anon cannot insert business profile" ON public.business_profile;
CREATE POLICY "Anon cannot insert business profile"
ON public.business_profile FOR INSERT
TO anon
WITH CHECK (false);

DROP POLICY IF EXISTS "Anon cannot update business profile" ON public.business_profile;
CREATE POLICY "Anon cannot update business profile"
ON public.business_profile FOR UPDATE
TO anon
USING (false);

DROP POLICY IF EXISTS "Anon cannot delete business profile" ON public.business_profile;
CREATE POLICY "Anon cannot delete business profile"
ON public.business_profile FOR DELETE
TO anon
USING (false);

DROP POLICY IF EXISTS "Admin can update business profile" ON public.business_profile;
CREATE POLICY "Admin can update business profile" 
ON public.business_profile FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- ===================================================
-- STORAGE BUCKETS CONFIGURATION
-- ===================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('business', 'business', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage public read policy
DROP POLICY IF EXISTS "Public Access Products Bucket" ON storage.objects;
CREATE POLICY "Public Access Products Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Public Access Gallery Bucket" ON storage.objects;
CREATE POLICY "Public Access Gallery Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Public Access Business Bucket" ON storage.objects;
CREATE POLICY "Public Access Business Bucket" 
ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'business');

-- Storage admin upload/insert policy
DROP POLICY IF EXISTS "Admin Upload Products Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Products Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Admin Upload Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Gallery Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admin Upload Business Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Business Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'business');

-- Storage admin update policy
DROP POLICY IF EXISTS "Admin Update Products Bucket" ON storage.objects;
CREATE POLICY "Admin Update Products Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admin Update Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Update Gallery Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admin Update Business Bucket" ON storage.objects;
CREATE POLICY "Admin Update Business Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'business');

-- Storage admin delete policy
DROP POLICY IF EXISTS "Admin Delete Products Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Products Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Admin Delete Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Gallery Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admin Delete Business Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Business Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'business');

-- ===================================================
-- SEED INITIAL DATA
-- ===================================================

-- Categories
INSERT INTO public.categories (id, name, slug) VALUES
('cat-kursi-sofa', 'Kursi dan Sofa', 'kursi-sofa'),
('cat-meja', 'Makan dan Kerja', 'makan-kerja'),
('cat-lemari-rak', 'Lemari dan Rak', 'lemari-rak'),
('cat-custom', 'Pesanan Kustom', 'pesanan-kustom')
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name, 
  slug = EXCLUDED.slug;

-- Business Profile
INSERT INTO public.business_profile (
  id, business_name, tagline, description, phone, whatsapp, 
  address, google_maps_url, instagram, email, logo_url, opening_hours
) VALUES (
  'yopan-kayu-main',
  'Yopan Kayu',
  'Pembuatan dan Penyediaan Produk Mebel Kayu',
  'Yopan Kayu merupakan usaha yang bergerak di bidang pembuatan dan penyediaan berbagai produk mebel berbahan kayu dengan mengutamakan kualitas, kerapian, dan hasil pengerjaan yang sesuai dengan kebutuhan pelanggan.',
  '081234567890',
  '6281234567890',
  'Jalan Kp. Pabuaran asem No.003, RT.002, Pete, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720',
  'https://maps.app.goo.gl/asat73UmjKZ6zYN49',
  'yopankayu',
  'kontak@yopankayu.com',
  '/logo/logo-only.svg',
  'Senin - Sabtu: 08.00 - 17.00 WIB'
) ON CONFLICT (id) DO UPDATE SET updated_at = now();

-- Products
INSERT INTO public.products (
  id, category_id, name, slug, description, price, 
  image_url, is_active, is_featured, material, dimensions, finish
) VALUES
(
  'prod-meja-makan-teak',
  'cat-meja',
  'Meja Makan Solid Teak 6 Kursi',
  'meja-makan-solid-teak-6-kursi',
  'Meja makan berbahan kayu jati solid grade A dengan sambungan purus presisi. Permukaan halus dengan finishing natural doff yang menonjolkan urat serat kayu jati alami tanpa merusak tekstur aslinya. Dilengkapi 6 kursi kokoh dengan sandaran ergonomis.',
  4850000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
  true,
  true,
  'Kayu Jati Solid Pilihan (Kadar Air < 14%)',
  '180 x 90 x 76 cm',
  'Natural Polyurethane Clear Doff Halus'
),
(
  'prod-armchair-scandi',
  'cat-kursi-sofa',
  'Armchair Scandinavian Sungkai Solid',
  'armchair-scandinavian-sungkai-solid',
  'Kursi santai bergaya Skandinavia dengan konstruksi kayu sungkai oven solid. Kaki-kaki dibubut ramping namun sangat kuat menahan beban. Dilengkapi busa high density berlapis kain linen hangat bertekstur nyaman.',
  1650000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA',
  true,
  true,
  'Kayu Sungkai Oven + Premium Textured Linen',
  '68 x 72 x 82 cm (Tinggi Dudukan 44 cm)',
  'Bleached Natural Matte Sealant'
),
(
  'prod-credenza-japandi',
  'cat-lemari-rak',
  'Credenza TV Japandi Minimalis',
  'credenza-tv-japandi-minimalis',
  'Kabinet TV berkonsep Japandi (Japanese-Scandinavian) dengan pintu geser kisi-kisi kayu jati solid. Memberikan sirkulasi udara optimal untuk perangkat elektronik di dalamnya serta menambah estetika ruang keluarga.',
  2950000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ',
  true,
  true,
  'Kayu Jati Solid + Handle Brass Kuningan',
  '160 x 42 x 52 cm',
  'Teak Oil Natural Satin'
),
(
  'prod-rak-modular-pine',
  'cat-lemari-rak',
  'Rak Dinding Serbaguna Modular Pinus',
  'rak-dinding-serbaguna-modular-pinus',
  'Rak dinding gantung minimalis dari kayu pinus pilihan tanpa mata kayu mati. Dapat dipasang secara modular horizontal maupun vertikal untuk menata buku, tanaman hias, atau koleksi keramik kesayangan.',
  750000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
  true,
  true,
  'Kayu Pinus Solid Pilihan',
  '90 x 22 x 65 cm',
  'Water-based Clear Sealant Ramah Lingkungan'
),
(
  'prod-meja-kerja-trembesi',
  'cat-meja',
  'Meja Kerja Live Edge Trembesi Suar',
  'meja-kerja-live-edge-trembesi-suar',
  'Meja kerja kayu trembesi solid satu lembar utuh tanpa sambungan (live edge) dengan lekukan alami pohon di kedua tepinya. Sangat eksklusif untuk ruang direksi, home office, maupun ruang pertemuan.',
  5400000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg',
  true,
  false,
  'Kayu Trembesi Suar Utuh Solid (Tebal 7 cm)',
  '200 x 85-95 x 76 cm',
  'Glossy / Semi-Matte Epoxy Resin Coating'
),
(
  'prod-set-kursi-kafe',
  'cat-kursi-sofa',
  'Set Meja dan Kursi Kafe Mahoni Solid',
  'set-meja-kursi-kafe-mahoni-solid',
  'Set perabot kafe terdiri dari 1 meja bistro bundar dan 2 kursi sandaran lengkung berbahan kayu mahoni tua. Dikerjakan dengan finishing walnut deep brown yang tahan tumpahan air dan pemakaian harian komersial.',
  2100000,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
  true,
  false,
  'Kayu Mahoni Oven Grade A',
  'Meja Dia 70 x T 75 cm, Kursi Standar Kafe',
  'Dark Walnut Semi-Gloss PU'
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  is_active = EXCLUDED.is_active,
  is_featured = EXCLUDED.is_featured,
  material = EXCLUDED.material,
  dimensions = EXCLUDED.dimensions,
  finish = EXCLUDED.finish;

-- Product Images
INSERT INTO public.product_images (id, product_id, image_url, sort_order) VALUES
('img-1-1', 'prod-meja-makan-teak', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA', 1),
('img-1-2', 'prod-meja-makan-teak', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg', 2),
('img-2-1', 'prod-armchair-scandi', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA', 1),
('img-3-1', 'prod-credenza-japandi', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ', 1),
('img-4-1', 'prod-rak-modular-pine', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ', 1),
('img-5-1', 'prod-meja-kerja-trembesi', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg', 1),
('img-6-1', 'prod-set-kursi-kafe', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg', 1)
ON CONFLICT (id) DO NOTHING;

-- Gallery
INSERT INTO public.gallery (id, title, description, image_url, category, location) VALUES
(
  'gal-1',
  'Meja Kerja Solid Trembesi Live Edge',
  'Pengerjaan meja kerja eksekutif satu lembar kayu trembesi solid tanpa sambungan dengan tebal 7 cm untuk apartemen residensial.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg',
  'Residensial',
  'Kebayoran Baru, Jakarta Selatan'
),
(
  'gal-2',
  'Rak Buku Minimalis Modular Kayu Jati Belanda',
  'Instalasi rak dinding floor-to-ceiling dengan finishing natural matte untuk ruang baca keluarga di kawasan BSD.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAuAJmWsi3C1t9tewBW3jjlzLUK7sJjPoMj2OJrII5qPiX8qjlpDMGxJvaNTxI-j_Zx5-899jAin23cTI_Z_q9M_5nNPNkLl3grjTyKgXQf8s9np3LVseXUmg9QyBqIzeY-iTbY8WlYFoeBLCfPFBvn65pwrvHj_RD6maqX-Tm7CRJ3UQZlXFVUL5GwG3fAPaYgQy9Xo0fFO_uR7N3GSTZDezul7Qeu8K9onvY3NRlAsLsCi85rCtyHg',
  'Interior Rumah',
  'BSD City, Tangerang'
),
(
  'gal-3',
  'Set Kursi dan Meja Kafe Kayu Mahoni',
  'Pengerjaan 12 set furnitur kafe komersial berbahan kayu mahoni oven dengan daya tahan cuaca semi-outdoor.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
  'Kafe dan Komersial',
  'Sentul, Bogor'
),
(
  'gal-4',
  'Kitchen Island dan Bar Stool Kayu Jati',
  'Meja bar dapur bersih dengan top table kayu jati selebar 80 cm bertekstur urat halus dipadu stool ergonomis.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg',
  'Residensial',
  'Bintaro Jaya, Tangerang Selatan'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  location = EXCLUDED.location;
