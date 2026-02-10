
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Info } from 'lucide-react';
import { useCart, useData } from '../App';

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { promoCodes } = useData();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  
  // Coupon State
  const [activeCoupon, setActiveCoupon] = useState<{
    code: string;
    type: 'percent' | 'fixed';
    value: number;
  } | null>(null);

  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Calculate Discount
  let discountAmount = 0;
  if (activeCoupon) {
      if (activeCoupon.type === 'percent') {
          discountAmount = subtotal * activeCoupon.value;
      } else {
          discountAmount = activeCoupon.value;
      }
  }
  // Ensure discount doesn't exceed subtotal
  if (discountAmount > subtotal) discountAmount = subtotal;

  const subtotalAfterDiscount = subtotal - discountAmount;
  const tax = subtotalAfterDiscount * 0.13; // 13% VAT
  const total = subtotalAfterDiscount + tax;

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (!code) return;

    const coupon = promoCodes.find(c => c.code === code && c.isActive);

    if (coupon) {
      setActiveCoupon({ code: coupon.code, type: coupon.type, value: coupon.value });
      if (coupon.type === 'percent') {
        setCouponSuccess(`${coupon.value * 100}% Discount Applied!`);
      } else {
        setCouponSuccess(`Rs. ${coupon.value} Discount Applied!`);
      }
      setCouponError('');
    } else {
      setActiveCoupon(null);
      setCouponError('Invalid or expired coupon code');
      setCouponSuccess('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-full shadow-md mb-6">
          <ShoppingBag className="h-12 w-12 text-stone-300" />
        </div>
        <h2 className="text-2xl font-bold text-stone-100 mb-2">Your cart is empty</h2>
        <p className="text-stone-300 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-4 rounded-2xl shadow-sm flex items-center space-x-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-stone-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="hover:text-emerald-600 transition-colors">
                    <h3 className="text-lg font-bold text-stone-800 truncate">{item.name}</h3>
                  </Link>
                  {item.selectedSize && (
                      <span className="inline-block px-2 py-0.5 bg-stone-100 text-stone-500 text-xs rounded font-bold mb-1">
                          {item.selectedSize}
                      </span>
                  )}
                  <p className="text-emerald-600 font-semibold">Rs. {item.price.toLocaleString()}</p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center bg-stone-100 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-2 text-stone-600 hover:text-emerald-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-stone-600 hover:text-emerald-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center"
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>

                {/* Promo Code Hint */}
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-800 leading-relaxed">
                    <p className="font-bold mb-1 flex items-center text-blue-900"><Info className="h-3 w-3 mr-1"/> Treasure Hunt Alert!</p>
                    <p>We have hidden discount codes throughout our website.</p> 
                    <p className="mt-2 text-blue-700">Register an account and search every option (like Support, Policies, FAQs) to find them!</p>
                </div>
                
                {/* Coupon Input */}
                <div className="py-2">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo Code"
                        className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                      <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-stone-800 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-stone-900"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1 ml-1">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-green-600 mt-1 ml-1">{couponSuccess}</p>}
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount {activeCoupon?.code ? `(${activeCoupon.code})` : ''}</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Tax (13%)</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { discount: discountAmount, couponCode: activeCoupon?.code } })}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center group"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
