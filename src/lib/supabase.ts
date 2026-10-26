import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://unknmfxhuitptaeytzvf.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVua25tZnhodWl0cHRhZXl0enZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1Nzk1NzksImV4cCI6MjEwNjE1NTU3OX0.aT1-aKYi9CgIAhjDCp6oqdTE7Tj5tFLTy7izsMuokcQ';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;
