import { supabase, isSupabaseConfigured } from './supabase';
import { Category, Product, GalleryItem, BusinessProfile } from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_GALLERY,
  INITIAL_BUSINESS_PROFILE
} from './constants';

const STORAGE_KEYS = {
  CATEGORIES: 'yk_categories_v1',
  PRODUCTS: 'yk_products_v1',
  GALLERY: 'yk_gallery_v1',
  PROFILE: 'yk_profile_v3',
};

export const PROFILE_UPDATED_EVENT = 'yk_profile_updated';

// Local storage helpers
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}:`, e);
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e: any) {
    console.error(`Error writing localStorage for ${key}:`, e);
    if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
      alert('Penyimpanan lokal peramban penuh. Harap gunakan foto dengan ukuran lebih kecil.');
    }
    return false;
  }
}

// Client-side image compression helper to avoid localStorage quota overflow and speed up uploads
export async function compressImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.82
): Promise<string> {
  // SVG doesn't need pixel compression
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Scale dimensions keeping aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Preserve PNG transparency for logos and transparent images
      const isPng = file.type === 'image/png';
      const outputType = isPng ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(outputType, quality);
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

// Ensure local seed is initialized without overwriting user changes
function ensureLocalSeed() {
  if (isSupabaseConfigured) return;
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    setLocal(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setLocal(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    setLocal(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }
}

ensureLocalSeed();

// ---------------- CATEGORIES ----------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      const result = (data || []) as Category[];
      setLocal(STORAGE_KEYS.CATEGORIES, result);
      return result;
    } catch (err) {
      console.warn('Supabase getCategories failed, using local store:', err);
    }
  }
  return getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, isSupabaseConfigured ? [] : INITIAL_CATEGORIES);
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  const slug = category.slug || (category.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = category.id || `cat-${Date.now()}`;
  const now = new Date().toISOString();

  const record: Category = {
    id,
    name: category.name || 'Kategori Baru',
    slug,
    created_at: category.created_at || now,
    updated_at: now
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .upsert(record)
        .select()
        .single();
      if (error) throw error;

      const list = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      const index = list.findIndex(c => c.id === record.id);
      if (index >= 0) {
        list[index] = { ...list[index], ...record };
      } else {
        list.push(record);
      }
      setLocal(STORAGE_KEYS.CATEGORIES, list);
      return data;
    } catch (err: any) {
      console.error('Supabase saveCategory failed:', err);
      throw new Error(`Gagal menyimpan kategori ke server: ${err.message || err}`);
    }
  }

  const list = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const index = list.findIndex(c => c.id === record.id);
  if (index >= 0) {
    list[index] = { ...list[index], ...record };
  } else {
    list.push(record);
  }
  setLocal(STORAGE_KEYS.CATEGORIES, list);
  return record;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      const list = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      const filtered = list.filter(c => c.id !== id);
      setLocal(STORAGE_KEYS.CATEGORIES, filtered);
      return true;
    } catch (err: any) {
      console.error('Supabase deleteCategory failed:', err);
      throw new Error(`Gagal menghapus kategori dari server: ${err.message || err}`);
    }
  }
  const list = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const filtered = list.filter(c => c.id !== id);
  setLocal(STORAGE_KEYS.CATEGORIES, filtered);
  return true;
}

// ---------------- PRODUCTS ----------------
export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  search?: string;
  includeInactive?: boolean;
}): Promise<Product[]> {
  const { categorySlug, featuredOnly, search, includeInactive = false } = options || {};

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `)
        .order('created_at', { ascending: false });

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }
      if (featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      let result = (data || []) as Product[];
      setLocal(STORAGE_KEYS.PRODUCTS, result);
      if (categorySlug && categorySlug !== 'semua') {
        result = result.filter(p => p.category?.slug === categorySlug);
      }
      return result;
    } catch (err) {
      console.warn('Supabase getProducts failed, using local store:', err);
    }
  }

  // Local store fallback
  const categories = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, isSupabaseConfigured ? [] : INITIAL_CATEGORIES);
  let list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, isSupabaseConfigured ? [] : INITIAL_PRODUCTS);

  list = list.map(prod => ({
    ...prod,
    category: categories.find(c => c.id === prod.category_id)
  }));

  if (!includeInactive) {
    list = list.filter(p => p.is_active);
  }
  if (featuredOnly) {
    list = list.filter(p => p.is_featured);
  }
  if (categorySlug && categorySlug !== 'semua') {
    list = list.filter(p => p.category?.slug === categorySlug);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(s) || 
      p.description.toLowerCase().includes(s) ||
      (p.material && p.material.toLowerCase().includes(s))
    );
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `)
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getProductBySlug failed, trying local:', err);
    }
  }

  const categories = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const found = list.find(p => p.slug === slug);
  if (!found) return null;
  return {
    ...found,
    category: categories.find(c => c.id === found.category_id)
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getProductById failed, trying local:', err);
    }
  }

  const categories = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const found = list.find(p => p.id === id);
  if (!found) return null;
  return {
    ...found,
    category: categories.find(c => c.id === found.category_id)
  };
}

export async function saveProduct(
  productData: Partial<Product>,
  additionalImages?: string[]
): Promise<Product> {
  const id = productData.id || `prod-${Date.now()}`;
  const slug = productData.slug || (productData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const now = new Date().toISOString();

  const record: Product = {
    id,
    category_id: productData.category_id || '',
    name: productData.name || 'Produk Mebel Kayu',
    slug,
    description: productData.description || '',
    price: Number(productData.price) || 0,
    image_url: productData.image_url || '',
    is_active: productData.is_active !== undefined ? productData.is_active : true,
    is_featured: productData.is_featured !== undefined ? productData.is_featured : false,
    material: productData.material || '',
    dimensions: productData.dimensions || '',
    finish: productData.finish || '',
    created_at: productData.created_at || now,
    updated_at: now
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(record)
        .select()
        .single();
      if (error) throw error;

      if (additionalImages && additionalImages.length > 0) {
        // Remove existing additional images and insert new ones
        await supabase.from('product_images').delete().eq('product_id', id);
        const imagesToInsert = additionalImages.map((url, idx) => ({
          product_id: id,
          image_url: url,
          sort_order: idx + 1
        }));
        await supabase.from('product_images').insert(imagesToInsert);
      }

      // Update local cache
      const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const images = (additionalImages || []).map((imgUrl, i) => ({
        id: `img-${id}-${i}`,
        product_id: id,
        image_url: imgUrl,
        sort_order: i + 1
      }));
      const fullRecord: Product = {
        ...record,
        images: images.length > 0 ? images : (record.images || [])
      };
      const idx = list.findIndex(p => p.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...fullRecord };
      } else {
        list.unshift(fullRecord);
      }
      setLocal(STORAGE_KEYS.PRODUCTS, list);

      return data;
    } catch (err: any) {
      console.error('Supabase saveProduct failed:', err);
      throw new Error(`Gagal menyimpan produk ke server: ${err.message || err}`);
    }
  }

  // Local fallback (only for local development when Supabase is not configured)
  const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const images = (additionalImages || []).map((imgUrl, i) => ({
    id: `img-${id}-${i}`,
    product_id: id,
    image_url: imgUrl,
    sort_order: i + 1
  }));

  const fullRecord: Product = {
    ...record,
    images: images.length > 0 ? images : (record.images || [])
  };

  const idx = list.findIndex(p => p.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...fullRecord };
  } else {
    list.unshift(fullRecord);
  }
  setLocal(STORAGE_KEYS.PRODUCTS, list);
  return fullRecord;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('product_images').delete().eq('product_id', id);
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      const filtered = list.filter(p => p.id !== id);
      setLocal(STORAGE_KEYS.PRODUCTS, filtered);
      return true;
    } catch (err: any) {
      console.error('Supabase deleteProduct failed:', err);
      throw new Error(`Gagal menghapus produk dari server: ${err.message || err}`);
    }
  }
  const list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const filtered = list.filter(p => p.id !== id);
  setLocal(STORAGE_KEYS.PRODUCTS, filtered);
  return true;
}

// ---------------- GALLERY ----------------
export async function getGallery(categoryFilter?: string): Promise<GalleryItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoryFilter && categoryFilter !== 'Semua') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      const result = (data || []) as GalleryItem[];
      setLocal(STORAGE_KEYS.GALLERY, result);
      return result;
    } catch (err) {
      console.warn('Supabase getGallery failed, using local store:', err);
    }
  }

  let list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, isSupabaseConfigured ? [] : INITIAL_GALLERY);
  if (categoryFilter && categoryFilter !== 'Semua') {
    list = list.filter(item => item.category === categoryFilter);
  }
  return list;
}

export async function saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
  const id = item.id || `gal-${Date.now()}`;
  const now = new Date().toISOString();

  const record: GalleryItem = {
    id,
    title: item.title || 'Dokumentasi Kriya Kayu',
    description: item.description || '',
    image_url: item.image_url || '',
    category: item.category || 'Residensial',
    location: item.location || 'Jabodetabek',
    created_at: item.created_at || now,
    updated_at: now
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .upsert(record)
        .select()
        .single();
      if (error) throw error;

      const list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
      const idx = list.findIndex(g => g.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...record };
      } else {
        list.unshift(record);
      }
      setLocal(STORAGE_KEYS.GALLERY, list);
      return data;
    } catch (err: any) {
      console.error('Supabase saveGalleryItem failed:', err);
      throw new Error(`Gagal menyimpan portofolio ke server: ${err.message || err}`);
    }
  }

  const list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  const idx = list.findIndex(g => g.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...record };
  } else {
    list.unshift(record);
  }
  setLocal(STORAGE_KEYS.GALLERY, list);
  return record;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      const list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
      const filtered = list.filter(g => g.id !== id);
      setLocal(STORAGE_KEYS.GALLERY, filtered);
      return true;
    } catch (err: any) {
      console.error('Supabase deleteGalleryItem failed:', err);
      throw new Error(`Gagal menghapus portofolio dari server: ${err.message || err}`);
    }
  }
  const list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  const filtered = list.filter(g => g.id !== id);
  setLocal(STORAGE_KEYS.GALLERY, filtered);
  return true;
}

// ---------------- BUSINESS PROFILE ----------------
export async function getBusinessProfile(): Promise<BusinessProfile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('business_profile')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const result: BusinessProfile = {
          ...INITIAL_BUSINESS_PROFILE,
          ...data,
          about_image_url: data.about_image_url || INITIAL_BUSINESS_PROFILE.about_image_url,
          about_badge_text: data.about_badge_text || INITIAL_BUSINESS_PROFILE.about_badge_text,
          about_title: data.about_title || INITIAL_BUSINESS_PROFILE.about_title,
          about_story: data.about_story || INITIAL_BUSINESS_PROFILE.about_story,
        };
        // Sync local cache with fresh server data
        setLocal(STORAGE_KEYS.PROFILE, result);
        return result;
      }
    } catch (err) {
      console.warn('Supabase getBusinessProfile failed, using local store:', err);
    }
  }

  // Fallback to local store or initial constants
  const local = getLocal<BusinessProfile>(STORAGE_KEYS.PROFILE, INITIAL_BUSINESS_PROFILE);
  return {
    ...INITIAL_BUSINESS_PROFILE,
    ...local,
    about_image_url: local.about_image_url || INITIAL_BUSINESS_PROFILE.about_image_url,
    about_badge_text: local.about_badge_text || INITIAL_BUSINESS_PROFILE.about_badge_text,
    about_title: local.about_title || INITIAL_BUSINESS_PROFILE.about_title,
    about_story: local.about_story || INITIAL_BUSINESS_PROFILE.about_story,
  };
}

export async function updateBusinessProfile(profile: Partial<BusinessProfile>): Promise<BusinessProfile> {
  const current = await getBusinessProfile();
  const updated: BusinessProfile = {
    ...current,
    ...profile,
    updated_at: new Date().toISOString()
  };

  let finalResult = updated;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('business_profile')
        .upsert(updated)
        .select()
        .single();

      if (error) {
        // If Supabase table doesn't have the new about columns yet
        if (error.message && error.message.toLowerCase().includes('column') && error.message.toLowerCase().includes('does not exist')) {
          console.warn('Supabase business_profile is missing new about columns. Saving core columns to Supabase.');
          const { about_image_url, about_badge_text, about_title, about_story, ...coreProfile } = updated as any;
          await supabase.from('business_profile').upsert(coreProfile);
          setLocal(STORAGE_KEYS.PROFILE, finalResult);
          throw new Error('Kolom "about_image_url" belum ada di tabel Supabase. Data profil utama berhasil disimpan, namun foto Tentang Kami belum bisa tersimpan di server untuk device lain. Harap jalankan script SQL migrasi di Supabase SQL Editor.');
        } else {
          throw error;
        }
      } else if (data) {
        finalResult = { ...updated, ...data };
      }
    } catch (err: any) {
      console.error('Supabase updateBusinessProfile failed:', err);
      throw new Error(`Gagal menyimpan profil usaha ke server: ${err.message || err}`);
    }
  }

  setLocal(STORAGE_KEYS.PROFILE, finalResult);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: finalResult }));
  }

  return finalResult;
}

// Helper to synchronously convert Data URL to Blob without triggering CSP connect-src network checks
function dataUrlToBlob(dataUrl: string): Blob {
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) return new Blob([], { type: 'image/jpeg' });
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  } catch (err) {
    console.warn('Failed to parse data URL to blob:', err);
    return new Blob([], { type: 'image/jpeg' });
  }
}

// ---------------- STORAGE / IMAGE UPLOAD ----------------
export async function uploadImage(
  file: File, 
  bucket: 'products' | 'gallery' | 'business' = 'products',
  options?: { isLogo?: boolean; maxWidth?: number; maxHeight?: number; quality?: number }
): Promise<string> {
  const isLogo = options?.isLogo ?? (bucket === 'business' && (file.type === 'image/svg+xml' || file.name.toLowerCase().includes('logo')));
  const maxWidth = options?.maxWidth ?? (isLogo ? 600 : 1920);
  const maxHeight = options?.maxHeight ?? (isLogo ? 600 : 1920);
  const quality = options?.quality ?? (isLogo ? 0.95 : 0.90);

  // Compress image client-side first to optimize payload size without sacrificing sharpness
  let compressedDataUrl = '';
  try {
    compressedDataUrl = await compressImageFile(file, maxWidth, maxHeight, quality);
  } catch (compErr) {
    console.warn('Client-side compression warning, falling back to original file:', compErr);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = isLogo && file.type === 'image/png' ? 'png' : (file.type === 'image/svg+xml' ? 'svg' : 'jpg');
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Convert compressed data URL to Blob directly without network fetch (immune to CSP connect-src)
      let uploadBlob: Blob = file;
      if (compressedDataUrl && compressedDataUrl.startsWith('data:')) {
        const parsed = dataUrlToBlob(compressedDataUrl);
        if (parsed.size > 0) {
          uploadBlob = parsed;
        }
      }

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, uploadBlob, {
          cacheControl: '3600',
          upsert: true,
          contentType: uploadBlob.type || file.type || 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err: any) {
      console.error('Supabase storage upload failed:', err);
      const detail = err?.message || err?.error_description || (typeof err === 'string' ? err : 'Koneksi ke storage Supabase terputus');
      throw new Error(`Gagal mengunggah foto ke storage (${detail}). Pastikan bucket "${bucket}" sudah dibuat di menu Storage Supabase.`);
    }
  }

  if (compressedDataUrl) {
    return compressedDataUrl;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------------- PASSWORD POLICY & STRENGTH METER ----------------
export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 to 4
  errors: string[];
  checks: {
    minLength: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
    noBlacklist: boolean;
  };
}

export function validatePasswordPolicy(password: string): PasswordValidationResult {
  const trimmed = password.trim();
  const minLength = trimmed.length >= 14;
  const hasUpper = /[A-Z]/.test(trimmed);
  const hasLower = /[a-z]/.test(trimmed);
  const hasNumber = /[0-9]/.test(trimmed);
  const hasSymbol = /[^A-Za-z0-9]/.test(trimmed);

  const blacklistTerms = ['yopan', 'kayu', 'yopankayu', 'tigaraksa', 'admin', 'password', 'mebel', 'furniture'];
  const lower = trimmed.toLowerCase();
  const foundBlacklist = blacklistTerms.filter(term => lower.includes(term));
  const noBlacklist = foundBlacklist.length === 0;

  const errors: string[] = [];
  if (!minLength) errors.push('Minimal 14 karakter.');
  if (!hasUpper) errors.push('Wajib memuat minimal 1 huruf besar (A-Z).');
  if (!hasLower) errors.push('Wajib memuat minimal 1 huruf kecil (a-z).');
  if (!hasNumber) errors.push('Wajib memuat minimal 1 angka (0-9).');
  if (!hasSymbol) errors.push('Wajib memuat minimal 1 simbol/karakter khusus (!@#$%^&* dll).');
  if (!noBlacklist) errors.push(`Tidak boleh memuat nama brand atau kata terlarang (${foundBlacklist.join(', ')}).`);

  let passed = 0;
  if (minLength) passed++;
  if (hasUpper && hasLower) passed++;
  if (hasNumber) passed++;
  if (hasSymbol) passed++;
  if (noBlacklist) passed++;

  // Score 0 - 4
  const score = Math.min(4, Math.max(0, passed - 1));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    checks: {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      noBlacklist
    }
  };
}

// ---------------- AUTHENTICATION & ROLE SEPARATION ----------------
export async function getAdminSession() {
  if (isSupabaseConfigured && supabase) {
    try {
      // Use getUser() for server-verified authentication rather than untrusted local token storage
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        return {
          user,
          isLoggedIn: true,
          email: user.email || ''
        };
      }
    } catch (e) {
      console.warn('Supabase auth user verification failed:', e);
    }
  }

  // Strict: NO localStorage or demo auth fallback
  return { user: null, isLoggedIn: false, email: '' };
}

export async function checkIsAdmin(userId?: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    let targetId = userId;
    if (!targetId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      targetId = user.id;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', targetId)
      .maybeSingle();

    if (error) {
      console.warn('Error checking admin_users table:', error.message);
      return false;
    }

    return !!data;
  } catch (e) {
    console.warn('checkIsAdmin exception:', e);
    return false;
  }
}

export async function loginAdmin(
  email: string,
  password: string,
  captchaToken?: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: 'Email dan kata sandi wajib diisi.' };
  }

  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: 'Konfigurasi database Supabase tidak ditemukan. Hubungi pengelola server.'
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
      options: captchaToken ? { captchaToken } : undefined
    });

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        return {
          success: false,
          error: 'Email belum dikonfirmasi di Supabase. Buka Supabase > Authentication > Users, klik titik tiga (...) di samping user lalu pilih "Confirm user".'
        };
      }
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        return {
          success: false,
          error: 'Email atau kata sandi salah. Silakan pastikan akun sudah terdaftar di Supabase.'
        };
      }
      if (error.message.toLowerCase().includes('captcha')) {
        return {
          success: false,
          error: 'Verifikasi keamanan Captcha gagal atau token kedaluwarsa. Silakan ulangi centang Cloudflare Turnstile.'
        };
      }
      return { success: false, error: `Login gagal: ${error.message}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'Terjadi gangguan koneksi ke Supabase: ' + (err?.message || 'Network error') };
  }
}

export async function changeAdminPassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const cleanOld = oldPassword.trim();
  const cleanNew = newPassword.trim();

  if (!cleanOld) {
    return { success: false, error: 'Kata sandi saat ini wajib diisi.' };
  }
  if (!cleanNew) {
    return { success: false, error: 'Kata sandi baru wajib diisi.' };
  }

  // Validate strict password policy (NIST-compliant, min 14 chars, complexity, blacklist)
  const validation = validatePasswordPolicy(cleanNew);
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.errors.join(' ')
    };
  }

  if (cleanOld === cleanNew) {
    return { success: false, error: 'Kata sandi baru tidak boleh sama dengan kata sandi saat ini.' };
  }

  const session = await getAdminSession();
  if (!session.isLoggedIn || !session.email) {
    return { success: false, error: 'Sesi pengelola tidak aktif. Silakan login kembali.' };
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Koneksi database Supabase tidak terpasang.' };
  }

  try {
    // 1. Re-authenticate to verify old password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.email,
      password: cleanOld
    });
    if (signInError) {
      return { success: false, error: 'Kata sandi saat ini (lama) salah. Silakan periksa kembali.' };
    }

    // 2. Update to new password via Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: cleanNew
    });
    if (updateError) {
      return {
        success: false,
        error: updateError.message || 'Gagal memperbarui kata sandi di Supabase.'
      };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'Terjadi gangguan koneksi ke Supabase saat memperbarui kata sandi.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut error:', e);
    }
  }
  // Clear any legacy demo tokens that might be in browser storage
  localStorage.removeItem('yk_demo_auth_v1');
  localStorage.removeItem('yk_demo_password_v1');
  sessionStorage.removeItem('yk_login_attempts');
}

// ---------------- MFA / 2FA (TOTP) MANAGEMENT ----------------
export async function getMfaAssuranceLevel() {
  if (!isSupabaseConfigured || !supabase) {
    return { currentLevel: 'aal1', nextLevel: 'aal1', currentAuthenticationMethods: [] };
  }
  try {
    const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) {
      console.warn('getAuthenticatorAssuranceLevel error:', error);
      return { currentLevel: 'aal1', nextLevel: 'aal1', currentAuthenticationMethods: [] };
    }
    return data;
  } catch (e) {
    console.warn('getMfaAssuranceLevel exception:', e);
    return { currentLevel: 'aal1', nextLevel: 'aal1', currentAuthenticationMethods: [] };
  }
}

export async function listMfaFactors() {
  if (!isSupabaseConfigured || !supabase) return { all: [], totp: [] };
  try {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) {
      console.warn('listFactors error:', error);
      return { all: [], totp: [] };
    }
    return data;
  } catch (e) {
    console.warn('listMfaFactors exception:', e);
    return { all: [], totp: [] };
  }
}

export async function enrollMfaTotp() {
  if (!isSupabaseConfigured || !supabase) {
    return { error: 'Supabase belum terkonfigurasi.' };
  }
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      issuer: 'Yopan Kayu'
    });
    if (error) return { error: error.message };
    return { data };
  } catch (err: any) {
    return { error: err?.message || 'Gagal mendaftarkan faktor TOTP' };
  }
}

export async function challengeAndVerifyMfa(factorId: string, code: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase belum terkonfigurasi.' };
  }
  try {
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId
    });
    if (challengeError) {
      return { success: false, error: challengeError.message };
    }

    const { data, error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code: code.trim()
    });

    if (verifyError) {
      return { success: false, error: verifyError.message || 'Kode verifikasi 2FA tidak valid.' };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal memverifikasi kode 2FA.' };
  }
}

export async function unenrollMfa(factorId: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase belum terkonfigurasi.' };
  }
  try {
    const { data, error } = await supabase.auth.mfa.unenroll({
      factorId
    });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menonaktifkan 2FA.' };
  }
}

// Format Rupiah Helper
export function formatRupiah(amount: number): string {
  if (!amount || isNaN(amount)) return 'Hubungi Kami';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Generate WhatsApp Link Helper
export function getWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const finalPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`;
}
