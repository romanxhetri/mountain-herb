
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../App';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-black/40 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden border border-white/10 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-900/50">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
        </Link>
        
        {/* Badges */}
        {product.discountBadge && (
          <span className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide z-10">
            {product.discountBadge}
          </span>
        )}
        
        {/* Quick Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
           <Link 
             to={`/product/${product.id}`}
             className="bg-black/60 backdrop-blur-md p-3 rounded-full shadow-lg text-white hover:bg-emerald-600 transition-colors border border-white/10"
             title="View Details"
           >
             <Eye className="h-5 w-5" />
           </Link>
           <a
             href={`https://wa.me/9779823376110?text=${encodeURIComponent(`Hi, I am interested in ${product.name}`)}`}
             target="_blank"
             rel="noopener noreferrer"
             className="bg-[#25D366] p-3 rounded-full shadow-lg text-white hover:bg-[#128C7E] transition-all hover:scale-110"
             title="Inquire on WhatsApp"
             onClick={(e) => e.stopPropagation()}
           >
             <MessageCircle className="h-5 w-5" />
           </a>
           <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="bg-emerald-600 p-3 rounded-full shadow-lg text-white hover:bg-emerald-500 transition-all hover:scale-110"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
           <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{product.category}</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-stone-100 group-hover:text-emerald-400 transition-colors leading-tight line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
               <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-stone-600'}`} />
            ))}
          </div>
          <span className="text-xs text-stone-400 ml-2">({product.reviews})</span>
        </div>
        
        <p className="text-stone-400 text-sm mb-5 line-clamp-2 leading-relaxed font-light">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Rs. {product.price.toLocaleString()}</span>
          <button 
            onClick={() => addToCart(product, 1)}
            className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors relative group/link"
          >
            Add to Cart
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover/link:w-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
