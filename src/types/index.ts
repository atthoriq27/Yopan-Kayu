export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  category_id: string;
  category?: Category;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
  material?: string;
  dimensions?: string;
  finish?: string;
  images?: ProductImage[];
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BusinessProfile {
  id: string;
  business_name: string;
  tagline?: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  google_maps_url: string;
  instagram: string;
  email: string;
  logo_url: string;
  opening_hours?: string;
  updated_at?: string;
}
