
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Truck, CreditCard, Banknote, Wallet as WalletIcon } from 'lucide-react';
import { useCart, useData, useAuth } from '../App';
import { Order } from '../types';

export const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Get Discount from navigation state
  const discountAmount = location.state?.discount || 0;
  const appliedCoupon = location.state?.couponCode || '';
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    state: '',
    zip: '',
    phone: user?.phone || '',
    paymentMethod: 'COD' as 'COD' | 'eSewa' | 'Bank Transfer' | 'Wallet'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const tax = subtotalAfterDiscount * 0.13;
  const total = subtotalAfterDiscount + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Wallet Balance Check
    if (formData.paymentMethod === 'Wallet') {
        if (!user) {
            alert("Please login to use wallet.");
            return;
        }
        if (user.walletBalance < total) {
            alert(`Insufficient Wallet Balance. You have Rs. ${user.walletBalance}.`);
            return;
        }
    }

    setLoading(true);
    
    // Create Order Object
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerDetails: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.state}, ${formData.zip}`,
        city: formData.city
      },
      items: cartItems,
      total: total,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      paymentMethod: formData.paymentMethod
    };

    try {
        await addOrder(newOrder);
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          navigate('/');
        }, 4000);
    } catch (err: any) {
        alert("Failed to place order. " + (err.message || ""));
        setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full animate-fade-in-up">
          <div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-stone-500">Thank you for shopping with Himalayan Naturals. You will be redirected to home shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-bold text-stone-800 mb-4">Contact & Shipping Info</h2>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Street Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-stone-700 mb-1">State</label>
                    <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-stone-700 mb-1">ZIP</label>
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-bold text-stone-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                 <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'Wallet' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 hover:bg-stone-50'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Wallet" 
                    checked={formData.paymentMethod === 'Wallet'} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <span className="ml-3 flex-1">
                    <div className="flex items-center font-medium text-stone-800">
                        <WalletIcon className="h-5 w-5 mr-2 text-emerald-600" /> My Wallet
                    </div>
                    {user && (
                        <p className={`text-xs ml-7 mt-1 ${user.walletBalance >= total ? 'text-green-600' : 'text-red-500'}`}>
                            Balance: Rs. {user.walletBalance.toLocaleString()} {user.walletBalance < total && '(Insufficient)'}
                        </p>
                    )}
                  </span>
                </label>

                <label className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={formData.paymentMethod === 'COD'} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <span className="ml-3 flex items-center font-medium text-stone-800">
                    <Truck className="h-5 w-5 mr-2 text-stone-500" /> Cash on Delivery (COD)
                  </span>
                </label>
                <label className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="eSewa" 
                    checked={formData.paymentMethod === 'eSewa'} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <span className="ml-3 flex items-center font-medium text-stone-800">
                    <CreditCard className="h-5 w-5 mr-2 text-green-500" /> eSewa
                  </span>
                </label>
                <label className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Bank Transfer" 
                    checked={formData.paymentMethod === 'Bank Transfer'} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <span className="ml-3 flex items-center font-medium text-stone-800">
                    <Banknote className="h-5 w-5 mr-2 text-blue-500" /> Bank Transfer
                  </span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg disabled:opacity-70"
            >
              {loading ? 'Processing...' : `Place Order (Rs. ${total.toLocaleString()})`}
            </button>
          </form>

          {/* Summary */}
          <div className="md:pl-8">
            <div className="bg-stone-100 p-6 rounded-2xl">
               <h3 className="font-bold text-stone-800 mb-4">In Your Bag</h3>
               <div className="space-y-3 max-h-80 overflow-y-auto pr-2 no-scrollbar">
                 {cartItems.map((item) => (
                   <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3">
                     <div className="h-16 w-16 rounded-lg bg-white overflow-hidden border border-stone-200 relative">
                       <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                       <span className="absolute top-0 right-0 bg-stone-500 text-white text-xs px-1.5 rounded-bl-lg font-bold">{item.quantity}</span>
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-medium text-stone-800 line-clamp-1">{item.name}</p>
                       {item.selectedSize && <p className="text-xs text-stone-500 font-bold bg-white inline-block px-1 rounded border border-stone-200">{item.selectedSize}</p>}
                       <p className="text-sm text-stone-500">Rs. {item.price.toLocaleString()}</p>
                     </div>
                     <div className="text-sm font-bold text-stone-800">
                       Rs. {(item.price * item.quantity).toLocaleString()}
                     </div>
                   </div>
                 ))}
               </div>
               <div className="border-t border-stone-200 mt-6 pt-4 space-y-2">
                 <div className="flex justify-between text-stone-600 text-sm">
                   <span>Subtotal</span>
                   <span>Rs. {subtotal.toLocaleString()}</span>
                 </div>
                 {discountAmount > 0 && (
                   <div className="flex justify-between text-green-600 text-sm font-medium">
                     <span>Discount {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                     <span>- Rs. {discountAmount.toLocaleString()}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-stone-600 text-sm">
                   <span>Tax (13%)</span>
                   <span>Rs. {tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between font-bold text-stone-900 text-lg pt-2">
                   <span>Total</span>
                   <span>Rs. {total.toLocaleString()}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
