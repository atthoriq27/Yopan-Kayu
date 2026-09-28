import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin, getAdminSession, getBusinessProfile } from '../../lib/dataService';
import { BusinessProfile } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_SEC = 60;
const ATTEMPT_STORAGE_KEY = 'yk_auth_fails';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  // Check existing session & lockout on load
  useEffect(() => {
    getAdminSession().then((session) => {
      if (session.isLoggedIn) {
        navigate('/kelola', { replace: true });
      }
    });

    getBusinessProfile().then(setProfile);

    // Read stored lockout state
    checkLockout();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [navigate]);

  const checkLockout = () => {
    try {
      const raw = sessionStorage.getItem(ATTEMPT_STORAGE_KEY);
      if (raw) {
        const { count, lockoutUntil } = JSON.parse(raw);
        if (lockoutUntil && Date.now() < lockoutUntil) {
          const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
          startLockoutCountdown(remainingSec);
          return true;
        } else if (lockoutUntil && Date.now() >= lockoutUntil) {
          // Reset count after lockout duration passes
          sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
    return false;
  };

  const startLockoutCountdown = (seconds: number) => {
    setLockoutRemaining(seconds);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);
          setErrorMsg('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const recordFailedAttempt = () => {
    try {
      let count = 0;
      const raw = sessionStorage.getItem(ATTEMPT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        count = (parsed.count || 0) + 1;
      } else {
        count = 1;
      }

      if (count >= MAX_FAILED_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION_SEC * 1000;
        sessionStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify({ count, lockoutUntil }));
        startLockoutCountdown(LOCKOUT_DURATION_SEC);
      } else {
        sessionStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify({ count }));
      }
    } catch {
      // Ignore storage errors
    }
  };

  const resetFailedAttempts = () => {
    try {
      sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (lockoutRemaining > 0) return;

    // Strict input sanitization
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    // Prevent basic injection characters / malformed input
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setErrorMsg('Format email tidak valid.');
      return;
    }

    if (!sanitizedPassword || sanitizedPassword.length < 4) {
      setErrorMsg('Kata sandi harus diisi dengan benar.');
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdmin(sanitizedEmail, sanitizedPassword);
      if (res.success) {
        resetFailedAttempts();
        navigate('/kelola', { replace: true });
      } else {
        recordFailedAttempt();
        setErrorMsg('Email atau kata sandi tidak valid.');
      }
    } catch {
      recordFailedAttempt();
      setErrorMsg('Email atau kata sandi tidak valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-center items-center px-4 py-10 sm:py-16 selection:bg-[#ffdbc7] selection:text-[#311300]">
      <div className="max-w-md w-full flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Link
            to="/"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-sm hover:scale-105 transition-transform bg-white border border-[#ede5d8] p-1.5 flex items-center justify-center"
            title="Kembali ke Beranda"
          >
            <img
              src={profile?.logo_url || '/logo/logo-only.svg'}
              alt={profile?.business_name || 'Logo Yopan Kayu'}
              className="w-full h-full object-contain"
            />
          </Link>
          
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c19] mt-1 tracking-tight">
            Panel Pengelola
          </h1>
          <p className="text-xs text-[#52443b] max-w-xs">
            Masuk dengan akun terdaftar untuk mengelola katalog produk, foto galeri, dan profil usaha.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ede5d8] shadow-[0_8px_30px_rgba(31,36,33,0.04)] flex flex-col gap-5">
          
          {/* Lockout Alert */}
          {lockoutRemaining > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-2xl flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-amber-700 flex-shrink-0 mt-0.5">lock_clock</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">Akses Dikunci Sementara</span>
                <span className="text-[11px] leading-relaxed text-amber-800">
                  Terlalu banyak percobaan masuk yang salah. Demi keamanan, silakan tunggu <strong>{lockoutRemaining} detik</strong> sebelum mencoba kembali.
                </span>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && lockoutRemaining === 0 && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-red-600 flex-shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-[#1c1c19] text-xs">Email Pengelola</label>
              <input
                type="email"
                required
                autoComplete="email"
                disabled={loading || lockoutRemaining > 0}
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#1c1c19] text-xs">Kata Sandi</label>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#8c6b4f] hover:text-[#6f3c16] font-medium"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  disabled={loading || lockoutRemaining > 0}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ede5d8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6f3c16]/30 text-[#1c1c19] disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutRemaining > 0}
              className="w-full py-3.5 bg-[#1c1c19] hover:bg-[#6f3c16] text-[#faf7f2] font-semibold rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 text-xs sm:text-sm mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : lockoutRemaining > 0 ? (
                <span>Tunggu ({lockoutRemaining}s)</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Secure indicator note */}
          <div className="pt-3 border-t border-[#ede5d8]/80 flex items-center justify-center gap-1.5 text-[11px] text-[#85746a]">
            <span className="material-symbols-outlined text-[14px] text-emerald-700">verified_user</span>
            <span>Koneksi terenkripsi & terlindungi</span>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-[#52443b] hover:text-[#6f3c16] hover:underline inline-flex items-center justify-center gap-1 font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>Kembali ke Website Utama</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
