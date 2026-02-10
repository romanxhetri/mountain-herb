
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Heart, Share2, MessageCircle, Beaker } from 'lucide-react';
import { useData, useCart, useWishlist } from '../App';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';

const OIL_SIZES = {
    'Essential Oils': [
        { label: '10ml', multiplier: 1 },
        { label: '30ml', multiplier: 2.8 },
        { label: '50ml', multiplier: 4.5 }
    ],
    'Carrier Oils': [
        { label: '100ml', multiplier: 1 },
        { label: '200ml', multiplier: 1.9 },
        { label: '500ml', multiplier: 4.5 }
    ]
};

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useData();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // Size selection state
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const product = products.find(p => p.id === id);

  // Related Products Logic
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      
      // Initialize Size for Oils
      if (product.category === 'Essential Oils') {
          setSelectedSize('10ml');
          setCurrentPrice(product.price);
      } else if (product.category === 'Carrier Oils') {
          setSelectedSize('100ml');
          setCurrentPrice(product.price);
      } else {
          setSelectedSize('');
          setCurrentPrice(product.price);
      }
    }
    window.scrollTo(0,0);
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-emerald-400 hover:underline font-bold">Return to Shop</button>
      </div>
    );
  }

  const handleSizeChange = (size: string, multiplier: number) => {
      setSelectedSize(size);
      setCurrentPrice(Math.round(product.price * multiplier));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined, currentPrice);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize || undefined, currentPrice);
    navigate('/cart');
  };

  const toggleWishlist = () => {
      if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product);
      }
  };

  const images = [product.image, product.image2, product.image3].filter(Boolean) as string[];

  // Determine available sizes if applicable
  const availableSizes = OIL_SIZES[product.category as keyof typeof OIL_SIZES];

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <Seo title={product.name} description={product.description} keywords={product.tags?.join(', ')} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-stone-200 mb-8 font-medium">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <span className="mx-2 text-stone-400">/</span>
          <Link to="/shop" className="hover:text-emerald-400 transition-colors">Shop</Link>
          <span className="mx-2 text-stone-400">/</span>
          <span className="text-white truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="p-6 lg:p-10 bg-stone-50/50">
              <div className="aspect-[4/4] rounded-2xl overflow-hidden bg-white shadow-sm mb-4 relative group">
                <img 
                  src={selectedImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                />
                {product.discountBadge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                    {product.discountBadge}
                  </span>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImage === img 
                          ? 'border-emerald-500 ring-2 ring-emerald-100' 
                          : 'border-transparent hover:border-emerald-200'
                      }`}
                    >
                       <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full transition-colors ${isInWishlist(product.id) ? 'text-red-500 bg-red-50' : 'text-stone-400 hover:text-red-500 hover:bg-red-50'}`}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-200'}`} />
                  ))}
                </div>
                <span className="text-stone-400">|</span>
                <span className="text-sm font-medium text-emerald-600">{product.reviews} verified reviews</span>
              </div>

              <div className="flex items-baseline space-x-4 mb-8">
                 <span className="text-4xl font-bold text-stone-900">Rs. {currentPrice.toLocaleString()}</span>
                 {product.discountBadge && (
                   <span className="text-xl text-stone-400 line-through">Rs. {(currentPrice * 1.15).toFixed(0)}</span>
                 )}
              </div>

              <p className="text-stone-600 leading-relaxed mb-8 text-lg font-light">{product.longDescription}</p>

              {/* Size Selector for Oils */}
              {availableSizes && (
                  <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-100">
                      <div className="flex items-center gap-2 mb-3 text-sm font-bold text-stone-700">
                          <Beaker className="h-4 w-4" /> Select Volume
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {availableSizes.map((size) => (
                              <button
                                  key={size.label}
                                  onClick={() => handleSizeChange(size.label, size.multiplier)}
                                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                      selectedSize === size.label 
                                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105' 
                                          : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-500 hover:text-emerald-600'
                                  }`}
                              >
                                  {size.label}
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* Actions */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border-2 border-stone-200 rounded-xl h-14 w-full sm:w-auto">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 h-full hover:bg-stone-50 transition-colors rounded-l-xl text-stone-500"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 h-full hover:bg-stone-50 transition-colors rounded-r-xl text-stone-500"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 h-14 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <button 
                  onClick={handleBuyNow}
                  className="w-full h-16 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all hover:scale-[1.01] shadow-xl shadow-emerald-200 text-lg flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="h-6 w-6" /> Buy Now - Rs. {(currentPrice * quantity).toLocaleString()}
                </button>

                <a
                  href={`https://wa.me/9779823376110?text=${encodeURIComponent(`Hi, I am interested in ${product.name} (${selectedSize || 'Standard'})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl font-bold transition-all text-lg flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" /> Inquire via WhatsApp
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-start">
                    <Truck className="h-6 w-6 text-emerald-600 mr-3 mt-1" />
                    <div>
                       <h4 className="font-bold text-stone-900">Fast Delivery</h4>
                       <p className="text-sm text-stone-500">Within 24hrs in Kathmandu</p>
                    </div>
                 </div>
                 <div className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-emerald-600 mr-3 mt-1" />
                    <div>
                       <h4 className="font-bold text-stone-900">Authenticity Guaranteed</h4>
                       <p className="text-sm text-stone-500">100% Original Himalayan Sourced</p>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 font-serif drop-shadow-md">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                 <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
