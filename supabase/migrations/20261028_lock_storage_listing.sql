-- ===================================================
-- MIGRATION: LOCK STORAGE LISTING & STRICT ADMIN WRITE
-- Tanggal: 2026-10-28
-- Target: Supabase Storage (storage.objects)
-- ===================================================

-- 1. Cabut policy SELECT untuk anonim (mencegah enumerasi/listing isi bucket oleh publik)
DROP POLICY IF EXISTS "Public Access Products Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Gallery Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Business Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Select Products Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Select Gallery Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Select Business Bucket" ON storage.objects;

-- Berikan akses SELECT/list hanya kepada admin terdaftar
-- Catatan: Gambar website tetap tampil normal karena bucket publik melayani
-- URL langsung (/storage/v1/object/public/...) tanpa melewati policy SELECT ini.
CREATE POLICY "Admin Select Products Bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'products' AND public.is_admin());

CREATE POLICY "Admin Select Gallery Bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'gallery' AND public.is_admin());

CREATE POLICY "Admin Select Business Bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'business' AND public.is_admin());

-- 2. Perketat policy INSERT (Upload) hanya untuk admin terdaftar
DROP POLICY IF EXISTS "Admin Upload Products Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Products Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'products' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Upload Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Gallery Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Upload Business Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Business Bucket" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'business' AND public.is_admin());

-- 3. Perketat policy UPDATE hanya untuk admin terdaftar
DROP POLICY IF EXISTS "Admin Update Products Bucket" ON storage.objects;
CREATE POLICY "Admin Update Products Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'products' AND public.is_admin())
WITH CHECK (bucket_id = 'products' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Update Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Update Gallery Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'gallery' AND public.is_admin())
WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Update Business Bucket" ON storage.objects;
CREATE POLICY "Admin Update Business Bucket" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'business' AND public.is_admin())
WITH CHECK (bucket_id = 'business' AND public.is_admin());

-- 4. Perketat policy DELETE hanya untuk admin terdaftar
DROP POLICY IF EXISTS "Admin Delete Products Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Products Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'products' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Gallery Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Gallery Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Business Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Business Bucket" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'business' AND public.is_admin());
