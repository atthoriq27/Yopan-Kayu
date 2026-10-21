import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatRupiah } from '../lib/dataService';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#ede5d8] shadow-warm-sm hover:shadow-warm-md hover:border-[#d7c2b7] transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Product Image Box */}
        <Link to={`/produk/${product.slug}`} className="block relative aspect-square sm:aspect-[4/3] overflow-hidden bg-[#f0ede9]">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {product.is_featured && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md sm:rounded-full bg-[#6f3c16] text-[#faf7f2] text-[10px] sm:text-[11px] font-bold tracking-wide shadow-sm">
              Unggulan
            </span>
          )}
          {product.category && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#1c1c19]/85 text-white text-[9px] sm:text-[10px] font-medium tracking-wide truncate max-w-[80%]">
              {product.category.name}
            </span>
          )}
        </Link>

        {/* Content Info */}
        <div className="p-3 sm:p-4 flex flex-col gap-1 sm:gap-1.5">
          {product.material && (
            <span className="text-[10px] sm:text-[11px] font-bold text-[#6f3c16] uppercase tracking-wider truncate">
              {product.material}
            </span>
          )}
          
          <Link to={`/produk/${product.slug}`}>
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#1c1c19] group-hover:text-[#6f3c16] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="hidden sm:block text-xs text-[#52443b] line-clamp-2 leading-relaxed mt-0.5">
            {product.description}
          </p>

          <div className="pt-1 sm:pt-2 flex items-baseline">
            <span className="text-xs sm:text-base font-bold text-[#6f3c16]">
              {formatRupiah(product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 sm:p-4 pt-0">
        <Link
          to={`/produk/${product.slug}`}
          className="w-full py-2 px-3 bg-[#faf7f2] hover:bg-[#6f3c16] text-[#1c1c19] hover:text-white border border-[#ede5d8] hover:border-[#6f3c16] text-xs font-semibold rounded-lg text-center transition-all active:scale-98"
        >
          Lihat Spesifikasi
        </Link>
      </div>
    </article>
  );
};
