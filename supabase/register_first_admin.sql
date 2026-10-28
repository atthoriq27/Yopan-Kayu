-- ==============================================================================
-- DAFTARKAN ADMIN PENGELOLA KE TABEL ADMIN_USERS
-- Yopan Kayu Management
-- ==============================================================================

INSERT INTO public.admin_users (user_id, role)
VALUES 
  ('3504ffbe-d928-4ad6-969d-33ac2c3a01ed', 'admin'), -- Mang Heri (heryadjah@gmail.com)
  ('67df00ab-e59f-4b93-ae89-fd2a99ce2284', 'admin')  -- Anda (autoruns27@gmail.com)
ON CONFLICT (user_id) DO UPDATE 
SET role = 'admin';

-- Cek hasil pendaftaran:
SELECT 
    au.user_id,
    u.email,
    au.role,
    au.created_at
FROM public.admin_users au
JOIN auth.users u ON u.id = au.user_id;
