-- ==============================================================================
-- PENDAFTARAN ADMIN PERTAMA KE TABEL ADMIN_USERS
-- Yopan Kayu Management
-- ==============================================================================
--
-- LANGKAH-LANGKAH PENGGUNAAN:
-- 1. Buka Supabase Dashboard (https://supabase.com/dashboard/project/unknmfxhuitptaeytzvf)
-- 2. Buka menu Authentication > Users.
-- 3. Cari baris akun email admin Anda, lalu salin nilai pada kolom 'User UID'
--    (Contoh bentuk User UID: 3a2c4e61-8f90-4d5b-9123-abcdef012345).
-- 4. Ganti teks <GANTI_USER_ID_ADMIN> di bawah dengan User UID tersebut.
-- 5. Jalankan query ini di SQL Editor Supabase.
-- ==============================================================================

INSERT INTO public.admin_users (user_id, role)
VALUES ('<GANTI_USER_ID_ADMIN>', 'admin')
ON CONFLICT (user_id) DO UPDATE
SET role = 'admin';

-- Verifikasi pendaftaran:
SELECT 
    au.user_id,
    u.email,
    au.role,
    au.created_at
FROM public.admin_users au
JOIN auth.users u ON u.id = au.user_id;
