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
  PROFILE: 'yk_profile_v2',
  AUTH: 'yk_demo_auth_v1',
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
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    setLocal(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setLocal(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    setLocal(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    setLocal(STORAGE_KEYS.PROFILE, INITIAL_BUSINESS_PROFILE);
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
      return data || [];
    } catch (err) {
      console.warn('Supabase getCategories failed, using local store:', err);
    }
  }
  return getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
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
      return data;
    } catch (err) {
      console.warn('Supabase saveCategory failed, updating local store:', err);
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
      return true;
    } catch (err) {
      console.warn('Supabase deleteCategory failed:', err);
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
      if (categorySlug && categorySlug !== 'semua') {
        result = result.filter(p => p.category?.slug === categorySlug);
      }
      return result;
    } catch (err) {
      console.warn('Supabase getProducts failed, using local store:', err);
    }
  }

  // Local store fallback
  const categories = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  let list = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);

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

      return data;
    } catch (err) {
      console.warn('Supabase saveProduct failed, updating local store:', err);
    }
  }

  // Local fallback
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
      return true;
    } catch (err) {
      console.warn('Supabase deleteProduct failed:', err);
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
      return data || [];
    } catch (err) {
      console.warn('Supabase getGallery failed, using local store:', err);
    }
  }

  let list = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
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
      return data;
    } catch (err) {
      console.warn('Supabase saveGalleryItem failed:', err);
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
      return true;
    } catch (err) {
      console.warn('Supabase deleteGalleryItem failed:', err);
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
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) return data;
    } catch (err) {
      console.warn('Supabase getBusinessProfile failed, using local store:', err);
    }
  }
  return getLocal<BusinessProfile>(STORAGE_KEYS.PROFILE, INITIAL_BUSINESS_PROFILE);
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
      if (error) throw error;
      if (data) {
        finalResult = data;
      }
    } catch (err) {
      console.warn('Supabase updateBusinessProfile failed:', err);
    }
  }

  setLocal(STORAGE_KEYS.PROFILE, finalResult);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: finalResult }));
  }

  return finalResult;
}

// ---------------- STORAGE / IMAGE UPLOAD ----------------
export async function uploadImage(file: File, bucket: 'products' | 'gallery' | 'business' = 'products'): Promise<string> {
  const isLogo = bucket === 'business';
  const maxWidth = isLogo ? 400 : 1000;
  const maxHeight = isLogo ? 400 : 1000;
  const quality = isLogo ? 0.9 : 0.82;

  // Compress image client-side first to minimize data size and stay well within localStorage limits
  const compressedDataUrl = await compressImageFile(file, maxWidth, maxHeight, quality);

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = isLogo && file.type === 'image/png' ? 'png' : (file.type === 'image/svg+xml' ? 'svg' : 'jpg');
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const res = await fetch(compressedDataUrl);
      const blob = await res.blob();

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: blob.type || 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.warn('Supabase storage upload failed, fallback to compressed data URL:', err);
    }
  }

  return compressedDataUrl;
}

// ---------------- AUTHENTICATION ----------------
export async function getAdminSession() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        return {
          user: session.user,
          isLoggedIn: true,
          email: session.user.email || 'admin@yopankayu.com'
        };
      }
    } catch (e) {
      console.warn('Supabase auth session check failed:', e);
    }
  }

  const demoAuth = getLocal<{ isLoggedIn: boolean; email: string } | null>(STORAGE_KEYS.AUTH, null);
  if (demoAuth && demoAuth.isLoggedIn) {
    return {
      user: { email: demoAuth.email, id: 'demo-admin-id' },
      isLoggedIn: true,
      email: demoAuth.email
    };
  }

  return { user: null, isLoggedIn: false, email: '' };
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: 'Email dan kata sandi wajib diisi.' };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword
      });
      if (error) {
        return { success: false, error: 'Email atau kata sandi tidak valid.' };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Email atau kata sandi tidak valid.' };
    }
  }

  // Local development fallback (only active when Supabase env vars are not set)
  if (cleanEmail === 'admin@yopankayu.com' && cleanPassword === 'admin123') {
    setLocal(STORAGE_KEYS.AUTH, { isLoggedIn: true, email: cleanEmail });
    return { success: true };
  }

  return {
    success: false,
    error: 'Email atau kata sandi tidak valid.'
  };
}

export async function logoutAdmin(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut error:', e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.AUTH);
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
