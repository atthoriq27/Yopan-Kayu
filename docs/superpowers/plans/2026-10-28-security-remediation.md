# Security Hardening & Pentest Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Overview
Remediate all 8 vulnerabilities identified during the security penetration test for the Yopan Kayu platform (React + Vite + Supabase + Cloudflare). This includes HTTP security headers, robots.txt hygiene, proper 404 handling, complete eradication of local mock/demo auth fallbacks, proper Cloudflare Turnstile token validation via Supabase Auth, admin MFA/2FA TOTP enforcement, role separation via `admin_users` table and strict PostgreSQL RLS policies, and enterprise-grade NIST password policies with visual strength indicators.

---

## File Structure & Responsibilities

- **`public/_headers`**: Cloudflare Pages / Workers static assets security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, X-Robots-Tag for admin paths).
- **`public/robots.txt`**: Standard robots crawl directives without leaking private `/admin/` and `/kelola/` paths.
- **`src/pages/NotFound.tsx`**: 404 error page maintaining site brand aesthetic, providing navigation back to catalog/home.
- **`src/App.tsx`**: Update router to mount `NotFound` on wildcard `path="*"`.
- **`src/lib/dataService.ts`**: Core data service — purge all demo credentials, default passwords, localStorage auth fallbacks. Integrate Turnstile captcha tokens and TOTP MFA handlers.
- **`src/pages/admin/AdminLogin.tsx`**: Enhance admin login to forward Turnstile tokens, reset widget on failure, and handle 2FA TOTP challenges before granting access.
- **`src/pages/admin/AdminProfile.tsx`**: Add TOTP MFA enrollment/unenrollment UI with QR code and secret display, plus 14+ character password policy with real-time strength meter.
- **`src/components/AdminLayout.tsx`**: Add `admin_users` authorization check and persistent 2FA activation warning banner.
- **`supabase/migrations/20261028_admin_role_and_rls.sql`**: Migration script creating `admin_users` table, `is_admin()` helper function, and strict RLS policies on all tables.
- **`supabase/register_first_admin.sql`**: Template SQL script for user to register their admin UID.

---

## Tasks

### Task 1: Security Headers (`public/_headers`) & Robots.txt Hygiene
- [ ] Create `public/_headers` with HSTS, nosniff, frame-ancestors none, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, CSP, and `X-Robots-Tag: noindex, nofollow` on `/admin/*` and `/kelola/*`.
- [ ] Edit `public/robots.txt` to remove `Disallow: /admin/` and `Disallow: /kelola/`, keeping only `Allow: /` and `Sitemap: https://yopankayu.com/sitemap.xml`.
- [ ] Verify Vite build copies `_headers` to `dist/_headers`.

### Task 2: Halaman 404 Catch-All Route
- [ ] Create `src/pages/NotFound.tsx` matching Yopan Kayu wood/warm palette with helpful recovery CTAs.
- [ ] Update `src/App.tsx` to render `<NotFound />` on `path="*"`.
- [ ] Run `npm run typecheck` to verify router typing.

### Task 3: Complete Removal of Demo / LocalStorage Fallback Auth
- [ ] In `src/lib/dataService.ts`, inspect and eliminate all fallback mock auth code (`admin123`, `demo-admin-id`, `STORAGE_KEYS.AUTH`, `STORAGE_KEYS.PASSWORD`).
- [ ] In `getAdminSession()`, switch to `supabase.auth.getUser()` to verify real server-side JWT session instead of local unverified session.
- [ ] In `loginAdmin()`, ensure it strictly calls `supabase.auth.signInWithPassword` and fails if Supabase is unconfigured.
- [ ] In `logoutAdmin()`, ensure it calls `supabase.auth.signOut()`.
- [ ] In `changeAdminPassword()`, ensure it calls `supabase.auth.signInWithPassword` + `supabase.auth.updateUser`.
- [ ] Grep codebase to confirm zero hardcoded fallback credentials remain.

### Task 4: Proper Cloudflare Turnstile Integration with Supabase Auth
- [ ] Update `loginAdmin` in `src/lib/dataService.ts` to accept optional `captchaToken?: string` and pass to `supabase.auth.signInWithPassword({ email, password, options: { captchaToken } })`.
- [ ] In `src/pages/admin/AdminLogin.tsx`:
  - Pass `turnstileToken` to `loginAdmin`.
  - Reset Turnstile widget and state immediately upon login error (`resetTurnstile()`).
  - Disable submit button while Turnstile is active and token is not yet ready.

### Task 5: Admin MFA / 2FA TOTP Enforcement
- [ ] In `src/lib/dataService.ts`:
  - Add helper functions: `enrollMfaTotp()`, `verifyMfaChallenge(factorId, challengeId, code)`, `challengeAndVerifyMfa(factorId, code)`, `unenrollMfa(factorId)`, `listMfaFactors()`, `getMfaAssuranceLevel()`.
- [ ] In `src/pages/admin/AdminLogin.tsx`:
  - After successful password login, check `getMfaAssuranceLevel()`.
  - If user has enrolled TOTP factor (`nextLevel === 'aal2'`): display TOTP input view, verify code, elevate session to AAL2, then navigate to `/kelola`.
- [ ] In `src/pages/admin/AdminProfile.tsx`:
  - Add "Autentikasi Dua Faktor (2FA / TOTP)" section under security.
  - Implement enrollment flow (show QR code via data URI or SVG, show manual setup key, verify 6-digit code).
  - List active factors and provide unenroll button.
- [ ] In `src/components/AdminLayout.tsx`:
  - Check if admin has 2FA enabled. If not, show persistent banner prompting 2FA enrollment.

### Task 6: Admin Role Separation (`admin_users` & RLS Migration)
- [ ] Create `supabase/migrations/20261028_admin_role_and_rls.sql`:
  - Table `admin_users (user_id uuid primary key references auth.users(id) on delete cascade, role text, created_at timestamptz)`.
  - Enable RLS on `admin_users`.
  - Function `public.is_admin() returns boolean`.
  - Update RLS policies for `products` (anon can only view `is_active = true`), `categories`, `gallery`, `product_images`, `business_profile` (write only allowed for `is_admin()`).
- [ ] Create `supabase/register_first_admin.sql` with placeholder `<GANTI_USER_ID_ADMIN>`.
- [ ] In `src/lib/dataService.ts` and `src/components/AdminLayout.tsx`:
  - Add `checkIsAdmin(userId)` check.
  - In `AdminLayout.tsx`, verify user exists in `admin_users`. If authenticated but not admin, display "Akses Ditolak" error screen with logout button.

### Task 7: Enterprise Password Policy (Min 14 chars, complexity, strength meter)
- [ ] In `src/lib/dataService.ts`:
  - Implement `validatePasswordPolicy(password)`:
    - Min 14 chars.
    - Contains uppercase, lowercase, number, symbol.
    - Blacklist check: 'yopan', 'kayu', 'yopankayu', 'tigaraksa', 'admin'.
- [ ] In `src/pages/admin/AdminProfile.tsx`:
  - Integrate `validatePasswordPolicy` in change password form.
  - Add interactive Password Strength Meter component (visual score bar + requirement checklist).

### Task 8: Verification, Build & Deployment Validation
- [ ] Run `npm run typecheck` and `npm run build` to verify 0 errors.
- [ ] Verify `dist/_headers` exists and contains exact headers.
- [ ] Verify `dist/robots.txt` does not leak `/admin/` or `/kelola/`.
- [ ] Prepare comprehensive manual steps documentation for user (running SQL migration, copying admin UID, enabling captcha in Supabase Auth).
