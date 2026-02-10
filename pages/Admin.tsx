
import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Package, Users, Plus, Trash, DollarSign, Edit, FileText, ShoppingBag, Loader, Lock, MapPin, Phone, Mail, User as UserIcon, AlertTriangle, Check, X, Settings as SettingsIcon, Globe, Image as ImageIcon, MessageSquare, Banknote, ArrowRight, Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Ticket, Upload } from 'lucide-react';
import { useData, useAuth } from '../App';
import { Product, BlogPost, User, Order, SiteSettings, PromoCode } from '../types';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'posts' | 'orders' | 'settings' | 'messages' | 'coupons'>('dashboard');
  const { products, users, posts, orders, messages, settings, promoCodes, loading, fetchAdminData, addProduct, updateProduct, deleteProduct, addPost, updatePost, deletePost, updateUser, deleteUser, updateOrder, deleteOrder, updateSettings, deleteMessage, addPromoCode, updatePromoCode, deletePromoCode } = useData();
  
  // -- Auth State --
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // -- State for Editing/Adding Products --
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '', price: 0, category: 'Wellness', description: '', longDescription: '', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9af908?auto=format&fit=crop&w=800', image2: '', image3: '',
    stock: 10, botanicalName: '', uses: '', dosage: '', bulkPrice: '', tags: []
  });
  const [isProductEditMode, setIsProductEditMode] = useState(false);

  // -- State for Editing/Adding Posts --
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '', content: '', author: user?.name || 'Admin', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800', avatar: 'https://ui-avatars.com/api/?name=Admin&background=random'
  });
  const [isPostEditMode, setIsPostEditMode] = useState(false);
  const postTextareaRef = useRef<HTMLTextAreaElement>(null);

  // -- State for Editing Users --
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);

  // -- State for Top Up (Send Funds) --
  const [topUpUser, setTopUpUser] = useState<User | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpReason, setTopUpReason] = useState('');
  const [isTopUpLoading, setIsTopUpLoading] = useState(false);

  // -- State for Editing Orders --
  const [editingOrder, setEditingOrder] = useState<Partial<Order> | null>(null);
  
  // -- State for Editing Coupons --
  const [editingPromo, setEditingPromo] = useState<Partial<PromoCode>>({
    code: '', type: 'fixed', value: 0, isActive: true
  });
  const [isPromoEditMode, setIsPromoEditMode] = useState(false);

  // -- State for Site Settings --
  const [editingSettings, setEditingSettings] = useState<SiteSettings>({
      siteName: '', siteDescription: '', keywords: '', contactEmail: '', contactPhone: '', currency: 'NPR', referralBonusAmount: 200
  });

  // Load settings into form when tab active or data loaded
  useEffect(() => {
    if (settings) {
        setEditingSettings(settings);
    }
  }, [settings]);

  // -- State for Delete Modal --
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'product' | 'post' | 'user' | 'order' | 'message' | 'promo' } | null>(null);

  // -- PIN Auth Handler --
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setAdminLoading(true);
      await fetchAdminData();
      setAdminLoading(false);
    } else {
      alert('Incorrect Password');
      setPin('');
    }
  };

  const handleDbError = (err: any) => {
    console.error(err);
    if (err.message && (err.message.includes('row-level security') || err.message.includes('policy'))) {
        alert("PERMISSION ERROR: You must disable Row Level Security (RLS) in your Supabase Database for the PIN-based admin to work.\n\nPlease check the 'supabase_setup.sql' file in your project for the commands to run in your Supabase SQL Editor.");
    } else {
        alert('Error: ' + err.message);
    }
  };

  // -- Helper for Product Image Upload --
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'image2' | 'image3') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        setAdminLoading(true);
        const url = await api.uploadImage(file);
        if (url) {
            setEditingProduct(prev => ({ ...prev, [field]: url }));
        }
    } catch (error: any) {
        alert('Upload failed: ' + error.message + '\n\nMake sure the "product-images" bucket exists in your Supabase Storage and is set to Public.');
    } finally {
        setAdminLoading(false);
    }
  };

  // -- Helper for Blog Image Upload --
  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        setAdminLoading(true);
        // Using existing bucket for now
        const url = await api.uploadImage(file, 'product-images');
        if (url) {
            setEditingPost(prev => ({ ...prev, image: url }));
        }
    } catch (error: any) {
        alert('Upload failed: ' + error.message);
    } finally {
        setAdminLoading(false);
    }
  };

  // -- Rich Text Formatting for Blog --
  const applyPostFormat = (type: string) => {
    if (!postTextareaRef.current) return;
    
    const textarea = postTextareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editingPost.content || '';
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    let newText = text;
    let newSelectionStart = start;
    let newSelectionEnd = end;

    if (type === 'bold' || type === 'italic') {
        const marker = type === 'bold' ? '**' : '*';
        const markerLen = marker.length;

        // Multiline support
        if (selected.includes('\n')) {
            const lines = selected.split('\n');
            const formattedLines = lines.map(line => line.trim() ? `${marker}${line}${marker}` : line);
            const formattedBlock = formattedLines.join('\n');
            newText = before + formattedBlock + after;
            newSelectionStart = start;
            newSelectionEnd = start + formattedBlock.length;
        }
        else if (selected.startsWith(marker) && selected.endsWith(marker) && selected.length >= 2 * markerLen) {
            newText = before + selected.substring(markerLen, selected.length - markerLen) + after;
            newSelectionStart = start;
            newSelectionEnd = end - (2 * markerLen);
        } else if (before.endsWith(marker) && after.startsWith(marker)) {
            newText = before.substring(0, before.length - markerLen) + selected + after.substring(markerLen);
            newSelectionStart = start - markerLen;
            newSelectionEnd = end - markerLen;
        } else {
            newText = before + marker + selected + marker + after;
            newSelectionStart = start + markerLen;
            newSelectionEnd = end + markerLen;
        }
    } else {
        let prefix = '';
        switch (type) {
            case 'list': prefix = '\n- '; break;
            case 'ordered': prefix = '\n1. '; break;
            case 'quote': prefix = '\n> '; break;
            case 'h1': prefix = '\n# '; break;
            case 'h2': prefix = '\n## '; break;
            case 'h3': prefix = '\n### '; break;
        }
        newText = before + prefix + selected + after;
        newSelectionStart = start + prefix.length;
        newSelectionEnd = end + prefix.length;
    }

    setEditingPost({ ...editingPost, content: newText });
    
    setTimeout(() => {
        if(postTextareaRef.current) {
            postTextareaRef.current.focus();
            postTextareaRef.current.setSelectionRange(newSelectionStart, newSelectionEnd);
        }
    }, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-sm animate-fade-in-up border border-white/50">
           <div className="flex justify-center mb-6">
              <div className="p-4 bg-emerald-100 rounded-full shadow-inner">
                 <Lock className="h-8 w-8 text-emerald-600" />
              </div>
           </div>
           <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Admin Access</h2>
           <form onSubmit={handlePinSubmit}>
             <input 
               type="password" 
               value={pin}
               onChange={(e) => setPin(e.target.value)}
               className="w-full p-4 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-center text-lg mb-6 bg-white/50 text-stone-900"
               placeholder="Enter Password"
               autoFocus
             />
             <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all">
               {adminLoading ? 'Unlocking...' : 'Unlock Dashboard'}
             </button>
           </form>
           <p className="text-center mt-6 text-sm text-stone-400">
             (Hint: 1234)
           </p>
        </div>
      </div>
    );
  }

  // ... (Previous Handlers for Product, Post, User, Order remain same) ...
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price) return;
    try {
      const certs = editingProduct.certifications || ['Organic'];
      if (isProductEditMode && editingProduct.id) {
         await updateProduct({ ...editingProduct, certifications: certs } as Product);
         alert('Product updated successfully!');
      } else {
        const productToAdd: Product = {
          ...editingProduct as Product,
          id: '', 
          rating: 5.0,
          reviews: 0,
          longDescription: editingProduct.longDescription || editingProduct.description || 'No description provided.',
          certifications: certs,
          stock: editingProduct.stock || 10
        };
        await addProduct(productToAdd);
        alert('Product added successfully!');
      }
      setEditingProduct({ name: '', price: 0, category: 'Wellness', description: '', longDescription: '', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9af908?auto=format&fit=crop&w=800', image2: '', image3: '', stock: 10, botanicalName: '', uses: '', dosage: '', bulkPrice: '', tags: [] });
      setIsProductEditMode(false);
    } catch (err: any) { handleDbError(err); }
  };
  const startEditProduct = (p: Product) => { setEditingProduct(p); setIsProductEditMode(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost.content) return;
    try {
      if (isPostEditMode && editingPost.id) { await updatePost(editingPost as BlogPost); alert('Post updated!'); } 
      else {
          const postToAdd: BlogPost = { ...editingPost as BlogPost, id: '', likes: 0, comments: 0, timestamp: new Date().toLocaleDateString() };
          await addPost(postToAdd);
          alert('Post created!');
      }
      setEditingPost({ title: '', content: '', author: user?.name || 'Admin', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800', avatar: 'https://ui-avatars.com/api/?name=Admin&background=random' });
      setIsPostEditMode(false);
    } catch (err: any) { handleDbError(err); }
  };
  const startEditPost = (p: BlogPost) => { setEditingPost(p); setIsPostEditMode(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleUserUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      if(editingUser && editingUser.id) {
          try { 
              await updateUser(editingUser as User); 
              setEditingUser(null); 
              alert('User details updated.'); 
          } catch (err: any) { 
              handleDbError(err); 
          }
      }
  };
  
  // Promo Code Handlers
  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isPromoEditMode && editingPromo.id) {
        await updatePromoCode(editingPromo as PromoCode);
        alert('Coupon updated!');
      } else {
        await addPromoCode(editingPromo);
        alert('Coupon created!');
      }
      setEditingPromo({ code: '', type: 'fixed', value: 0, isActive: true });
      setIsPromoEditMode(false);
    } catch (err: any) { handleDbError(err); }
  };
  
  const startEditPromo = (p: PromoCode) => { setEditingPromo(p); setIsPromoEditMode(true); window.scrollTo({top: 0, behavior: 'smooth'}); };

  const handleOrderUpdate = async () => {
      if (editingOrder && editingOrder.id) {
          try { await updateOrder(editingOrder as Order); setEditingOrder(null); alert('Order Status Updated'); } catch (err: any) { handleDbError(err); }
      }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await updateSettings(editingSettings);
          alert('Site Settings & SEO Updated!');
      } catch (err: any) {
          handleDbError(err);
      }
  };

  const handleSendFunds = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!topUpUser || !topUpAmount) return;
      setIsTopUpLoading(true);
      try {
          const result = await api.topUpWallet(
              topUpUser.id, 
              Number(topUpAmount), 
              topUpReason || 'Admin Top-up',
              'deposit'
          );
          if (result.error) throw result.error;
          
          alert(`Successfully sent Rs. ${topUpAmount} to ${topUpUser.name}`);
          setTopUpUser(null);
          setTopUpAmount('');
          setTopUpReason('');
          await fetchAdminData(); // Refresh list to show new balance
      } catch (err: any) {
          handleDbError(err);
      } finally {
          setIsTopUpLoading(false);
      }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (itemToDelete.type === 'product') await deleteProduct(itemToDelete.id);
      else if (itemToDelete.type === 'post') await deletePost(itemToDelete.id);
      else if (itemToDelete.type === 'user') await deleteUser(itemToDelete.id);
      else if (itemToDelete.type === 'order') await deleteOrder(itemToDelete.id);
      else if (itemToDelete.type === 'message') await deleteMessage(itemToDelete.id);
      else if (itemToDelete.type === 'promo') await deletePromoCode(itemToDelete.id);
      setItemToDelete(null);
    } catch (err: any) { handleDbError(err); setItemToDelete(null); }
  };

  if (loading || adminLoading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin h-8 w-8 text-emerald-600"/></div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">Admin<span className="text-emerald-500">Panel</span></h1>
          <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto no-scrollbar">
            {[
                {id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard'},
                {id: 'orders', icon: ShoppingBag, label: 'Orders'},
                {id: 'messages', icon: MessageSquare, label: 'Messages'},
                {id: 'products', icon: Package, label: 'Products'},
                {id: 'posts', icon: FileText, label: 'Blog'},
                {id: 'users', icon: Users, label: 'Users'},
                {id: 'coupons', icon: Ticket, label: 'Coupons'},
                {id: 'settings', icon: SettingsIcon, label: 'Settings & SEO'},
            ].map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)} 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg' : 'hover:bg-stone-800'}`}
                 >
                  <tab.icon className="h-5 w-5" /> <span>{tab.label}</span>
                </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen bg-stone-50/95 backdrop-blur-sm relative">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-stone-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                  {icon: DollarSign, val: `Rs. ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}`, label: 'Total Revenue', color: 'blue'},
                  {icon: ShoppingBag, val: orders.length, label: 'Total Orders', color: 'orange'},
                  {icon: MessageSquare, val: messages.length, label: 'Messages', color: 'emerald'},
                  {icon: Users, val: users.length, label: 'Users', color: 'purple'},
              ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`bg-${stat.color}-100 p-3 rounded-2xl text-${stat.color}-600`}><stat.icon className="h-6 w-6"/></div>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800">{stat.val}</h3>
                    <p className="text-stone-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ... (Coupons, Messages, Settings tabs remain roughly the same) ... */}
        {/* ... (Previous Tabs Code hidden for brevity) ... */}
        {activeTab === 'coupons' && (
          <div className="space-y-8 animate-fade-in">
             <div>
                <h1 className="text-3xl font-bold text-stone-800">Discount Coupons</h1>
                <p className="text-stone-500 mt-1">Create and manage promo codes.</p>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm">
               <h2 className="text-lg font-bold text-stone-800 mb-4">{isPromoEditMode ? 'Edit Coupon' : 'Create Coupon'}</h2>
               <form onSubmit={handlePromoSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <input 
                   className="p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400 font-bold uppercase" 
                   value={editingPromo.code} 
                   onChange={e => setEditingPromo({...editingPromo, code: e.target.value.toUpperCase()})} 
                   placeholder="CODE (e.g. SAVE10)" 
                   required
                 />
                 <select 
                   className="p-3 border rounded-lg bg-stone-50 text-stone-900" 
                   value={editingPromo.type} 
                   onChange={e => setEditingPromo({...editingPromo, type: e.target.value as any})}
                 >
                   <option value="fixed">Fixed Amount (Rs.)</option>
                   <option value="percent">Percentage (%)</option>
                 </select>
                 <input 
                   className="p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" 
                   type="number"
                   step="0.01" 
                   value={editingPromo.value || ''} 
                   onChange={e => setEditingPromo({...editingPromo, value: parseFloat(e.target.value)})} 
                   placeholder={editingPromo.type === 'percent' ? "0.10 (for 10%)" : "500"} 
                   required
                 />
                 <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={editingPromo.isActive}
                      onChange={e => setEditingPromo({...editingPromo, isActive: e.target.checked})}
                      className="w-5 h-5 accent-emerald-600"
                    />
                    <label htmlFor="isActive" className="text-stone-700 font-medium">Active</label>
                 </div>
                 
                 <div className="col-span-1 md:col-span-4 flex justify-end gap-2">
                    {isPromoEditMode && <button type="button" onClick={() => {setEditingPromo({ code: '', type: 'fixed', value: 0, isActive: true }); setIsPromoEditMode(false)}} className="px-4 py-2 bg-stone-200 rounded-lg">Cancel</button>}
                    <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">{isPromoEditMode ? 'Update' : 'Create'}</button>
                 </div>
               </form>
             </div>
             <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-bold mb-4 text-stone-800">Active Coupons</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                           <tr className="border-b border-stone-100 text-stone-500 text-sm uppercase">
                               <th className="pb-3 pl-2">Code</th>
                               <th className="pb-3">Discount</th>
                               <th className="pb-3">Status</th>
                               <th className="pb-3 text-right pr-2">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-stone-50">
                        {promoCodes.map(c => (
                            <tr key={c.id} className="hover:bg-stone-50 transition-colors">
                                <td className="py-4 pl-2 font-bold text-stone-800 font-mono text-lg">{c.code}</td>
                                <td className="py-4 text-stone-600">
                                    {c.type === 'percent' ? `${(c.value * 100).toFixed(0)}%` : `Rs. ${c.value}`}
                                </td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {c.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <button onClick={() => startEditPromo(c)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-2"><Edit className="h-4 w-4"/></button>
                                    <button onClick={() => setItemToDelete({id: c.id, type: 'promo'})} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash className="h-4 w-4"/></button>
                                </td>
                            </tr>
                        ))}
                       </tbody>
                    </table>
                </div>
             </div>
          </div>
        )}

        {/* ... (Messages, Settings, Orders - standard) ... */}
        {/* ... (Hidden standard tabs) ... */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-2xl font-bold text-stone-800">Customer Messages</h2>
             {messages.length === 0 ? (
                 <p className="text-stone-500">No messages found.</p>
             ) : (
                 <div className="grid grid-cols-1 gap-4">
                     {messages.map(msg => (
                         <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row justify-between items-start gap-4">
                             <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                     <h3 className="font-bold text-lg text-stone-900">{msg.subject}</h3>
                                     <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded-full">{msg.createdAt}</span>
                                 </div>
                                 <p className="text-stone-600 mb-4 whitespace-pre-line">{msg.message}</p>
                                 <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                                     <div className="flex items-center gap-1"><UserIcon className="h-4 w-4 text-emerald-500"/> {msg.name}</div>
                                     <div className="flex items-center gap-1"><Mail className="h-4 w-4 text-emerald-500"/> {msg.email}</div>
                                     {msg.phone && <div className="flex items-center gap-1"><Phone className="h-4 w-4 text-emerald-500"/> {msg.phone}</div>}
                                 </div>
                             </div>
                             <button 
                                onClick={() => setItemToDelete({ id: msg.id, type: 'message' })}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                title="Delete Message"
                             >
                                 <Trash className="h-5 w-5" />
                             </button>
                         </div>
                     ))}
                 </div>
             )}
          </div>
        )}

        {activeTab === 'settings' && (
            <div className="max-w-4xl animate-fade-in space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                    <form onSubmit={handleSettingsUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">Website Name</label>
                                <input 
                                    className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
                                    value={editingSettings.siteName}
                                    onChange={e => setEditingSettings({...editingSettings, siteName: e.target.value})}
                                />
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                <label className="block text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                    <Users className="h-4 w-4"/> Referral Bonus Amount (Rs.)
                                </label>
                                <input 
                                    type="number"
                                    min="0"
                                    className="w-full p-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-stone-900 font-bold"
                                    value={editingSettings.referralBonusAmount}
                                    onChange={e => setEditingSettings({...editingSettings, referralBonusAmount: Number(e.target.value)})}
                                    placeholder="200"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold text-stone-700 mb-2">Global Meta Description</label>
                                <textarea 
                                    className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none h-24 text-stone-900"
                                    value={editingSettings.siteDescription}
                                    onChange={e => setEditingSettings({...editingSettings, siteDescription: e.target.value})}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold text-stone-700 mb-2">Global Keywords</label>
                                <input 
                                    className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
                                    value={editingSettings.keywords}
                                    onChange={e => setEditingSettings({...editingSettings, keywords: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700">
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-stone-800">Order Management</h2>
                <div className="space-y-4">
                    {orders.length === 0 ? <p className="text-stone-500">No orders found.</p> : orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                            {editingOrder && editingOrder.id === order.id ? (
                                <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-blue-900">Editing Order {order.id}</h3>
                                        <button onClick={() => setEditingOrder(null)}><X className="h-5 w-5 text-blue-500" /></button>
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        <label className="text-sm font-bold text-stone-700">Status</label>
                                        <select 
                                            value={editingOrder.status}
                                            onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value as any})}
                                            className="p-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-stone-900"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button onClick={handleOrderUpdate} className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center">
                                            <Check className="h-4 w-4 mr-2" /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                            <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-stone-100 pb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
                                        {order.id} 
                                        <span className="text-sm font-normal text-stone-500">({order.date})</span>
                                        <button onClick={() => setEditingOrder(order)} className="text-blue-500 hover:text-blue-700"><Edit className="h-4 w-4" /></button>
                                        <button onClick={(e) => { e.stopPropagation(); setItemToDelete({ id: order.id, type: 'order' }); }} className="text-red-500 hover:text-red-700"><Trash className="h-4 w-4 pointer-events-none" /></button>
                                    </h3>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-bold mt-1 ${
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                        order.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        'bg-stone-100 text-stone-700'
                                    }`}>{order.status}</span>
                                    <span className="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-700 font-bold">{order.paymentMethod}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-emerald-600">Rs. {order.total.toLocaleString()}</p>
                                </div>
                            </div>
                            )}
                            {/* Order Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                                    <h4 className="font-bold text-sm text-stone-600 mb-3 uppercase flex items-center"><UserIcon className="h-4 w-4 mr-2" /> Customer Details</h4>
                                    <div className="space-y-2 text-sm text-stone-700">
                                      <p><span className="font-semibold">Name:</span> {order.customerDetails.name}</p>
                                      <p><span className="font-semibold">Email:</span> {order.customerDetails.email}</p>
                                      <p><span className="font-semibold">Phone:</span> {order.customerDetails.phone}</p>
                                      <p><span className="font-semibold">Address:</span> {order.customerDetails.address}, {order.customerDetails.city}</p>
                                    </div>
                                </div>
                                <div>
                                     <h4 className="font-bold text-sm text-stone-500 mb-3 uppercase">Order Items</h4>
                                     <ul className="text-sm space-y-2 text-stone-800">
                                         {order.items.map(item => (
                                             <li key={item.id} className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-100">
                                                 <div className="flex items-center">
                                                    <span className="font-bold bg-white w-6 h-6 rounded flex items-center justify-center border border-stone-200 text-xs mr-3">{item.quantity}x</span>
                                                    <span>{item.name}</span>
                                                 </div>
                                                 <span className="font-mono">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                             </li>
                                         ))}
                                     </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* ... (Products Tab - unchanged) ... */}
        {/* ... (Previous Tab Code hidden) ... */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-fade-in">
             {/* ... Products Content ... */}
             <div>
                <h1 className="text-3xl font-bold text-stone-800">Product Options</h1>
                <p className="text-stone-500 mt-1">Manage your product inventory and details.</p>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm">
               <h2 className="text-lg font-bold text-stone-800 mb-4">{isProductEditMode ? 'Edit Product' : 'Add New Product'}</h2>
               <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input className="p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} placeholder="Name" />
                 <input className="p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" type="number" value={editingProduct.price || ''} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} placeholder="Price" />
                 <select className="p-3 border rounded-lg bg-stone-50 text-stone-900" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                   <option value="Wellness">Wellness</option>
                   <option value="Clothing">Clothing</option>
                   <option value="Food">Food</option>
                   <option value="Oils">Oils</option>
                   <option value="Personal Care">Personal Care</option>
                   <option value="Pet Care">Pet Care</option>
                 </select>
                 <input className="p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" value={editingProduct.stock || ''} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} placeholder="Stock" />
                 
                 {/* Tags Input */}
                 <input 
                    className="p-3 border rounded-lg bg-stone-50 col-span-1 md:col-span-2 text-stone-900 placeholder-stone-400" 
                    value={editingProduct.tags?.join(', ') || ''} 
                    onChange={e => setEditingProduct({...editingProduct, tags: e.target.value.split(',').map(t => t.trim())})} 
                    placeholder="Tags (comma separated) for SEO" 
                 />

                 {/* Image 1 Upload */}
                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-stone-700 mb-1">Main Image</label>
                    <div className="flex gap-2">
                        <input className="flex-1 p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} placeholder="Image URL" />
                        <label className="cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
                            <Upload className="h-5 w-5" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} />
                        </label>
                    </div>
                 </div>

                 {/* Image 2 Upload */}
                 <div className="col-span-1">
                    <label className="block text-sm font-bold text-stone-700 mb-1">Image 2 (Optional)</label>
                    <div className="flex gap-2">
                        <input className="flex-1 p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" value={editingProduct.image2 || ''} onChange={e => setEditingProduct({...editingProduct, image2: e.target.value})} placeholder="Image URL" />
                        <label className="cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
                            <Upload className="h-5 w-5" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image2')} />
                        </label>
                    </div>
                 </div>

                 {/* Image 3 Upload */}
                 <div className="col-span-1">
                    <label className="block text-sm font-bold text-stone-700 mb-1">Image 3 (Optional)</label>
                    <div className="flex gap-2">
                        <input className="flex-1 p-3 border rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400" value={editingProduct.image3 || ''} onChange={e => setEditingProduct({...editingProduct, image3: e.target.value})} placeholder="Image URL" />
                        <label className="cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
                            <Upload className="h-5 w-5" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image3')} />
                        </label>
                    </div>
                 </div>

                 <textarea className="p-3 border rounded-lg bg-stone-50 col-span-1 md:col-span-2 text-stone-900 placeholder-stone-400" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} placeholder="Short Description" />
                 <textarea className="p-3 border rounded-lg bg-stone-50 col-span-1 md:col-span-2 h-32 text-stone-900 placeholder-stone-400" value={editingProduct.longDescription} onChange={e => setEditingProduct({...editingProduct, longDescription: e.target.value})} placeholder="Long Description / Details" />
                 
                 <div className="col-span-1 md:col-span-2">
                    <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold">{isProductEditMode ? 'Update' : 'Add'}</button>
                 </div>
               </form>
             </div>
             {/* Product Table */}
             <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-bold mb-4 text-stone-800">Products</h2>
                {products.map(p => (
                    <div key={p.id} className="flex justify-between items-center border-b border-stone-100 p-3 hover:bg-stone-50 transition-colors">
                        <span className="text-stone-800 font-medium">{p.name}</span>
                        <div className="flex items-center">
                             <button 
                                type="button"
                                onClick={() => startEditProduct(p)} 
                                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-2 transition-colors"
                                title="Edit Product"
                             >
                                <Edit className="h-4 w-4"/>
                             </button>
                             <button 
                                type="button"
                                onClick={() => setItemToDelete({id: p.id, type: 'product'})} 
                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                title="Delete Product"
                             >
                                <Trash className="h-4 w-4"/>
                             </button>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}
        
        {/* ... (Users Tab - unchanged) ... */}
        {/* ... (Previous Tab Code hidden) ... */}
        {activeTab === 'users' && (
             <div className="space-y-6 animate-fade-in">
                 {/* ... Users content ... */}
                 {/* Users List Table */}
                 <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
                     <h2 className="font-bold text-xl mb-4 text-stone-800">Registered Users ({users.length})</h2>
                     <table className="w-full text-left min-w-[900px]">
                       <thead>
                           <tr className="border-b border-stone-100 text-stone-500 text-sm uppercase tracking-wider">
                               <th className="pb-3 pl-2">Name</th>
                               <th className="pb-3">Email</th>
                               <th className="pb-3">Wallet</th>
                               <th className="pb-3">Referred By</th>
                               <th className="pb-3">Role</th>
                               <th className="pb-3 text-right pr-2">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-stone-50">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                                <td className="py-4 pl-2 font-bold text-stone-800">
                                    {u.name}
                                    <div className="text-xs text-stone-400 font-normal">{u.phone}</div>
                                </td>
                                <td className="py-4 text-stone-600">{u.email}</td>
                                <td className="py-4">
                                    <span className="font-bold text-emerald-600">Rs. {u.walletBalance.toLocaleString()}</span>
                                </td>
                                <td className="py-4">
                                    {u.referredBy ? (
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                            {users.find(ref => ref.id === u.referredBy)?.name || u.referredBy.substring(0,8)}
                                        </span>
                                    ) : (
                                        <span className="text-stone-400 text-xs">Direct</span>
                                    )}
                                </td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-600'
                                    }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <button
                                        onClick={() => setTopUpUser(u)}
                                        className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg mr-2 transition-colors"
                                        title="Send Funds / Top Up Wallet"
                                    >
                                        <Banknote className="h-4 w-4" />
                                    </button>
                                    <button 
                                        onClick={() => { setEditingUser(u); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-2 transition-colors"
                                        title="Edit User"
                                    >
                                        <Edit className="h-4 w-4"/>
                                    </button>
                                    <button 
                                        onClick={() => setItemToDelete({id: u.id, type: 'user'})} 
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        title="Delete User"
                                    >
                                        <Trash className="h-4 w-4"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                       </tbody>
                     </table>
                 </div>
             </div>
        )}
        
        {/* ... (Posts Tab - UPDATED) ... */}
        {activeTab === 'posts' && (
            <div className="animate-fade-in space-y-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="font-bold mb-4 text-stone-800">Blog Posts</h2>
                    <form onSubmit={handlePostSubmit} className="grid gap-4">
                        <input className="p-3 border rounded-lg text-stone-900" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} placeholder="Title" />
                        
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input 
                                    className="p-3 pl-10 border rounded-lg w-full text-stone-900" 
                                    value={editingPost.image} 
                                    onChange={e => setEditingPost({...editingPost, image: e.target.value})} 
                                    placeholder="Image URL (Optional)" 
                                />
                                <ImageIcon className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
                            </div>
                            <label className="cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-lg flex items-center justify-center transition-colors" title="Upload Image">
                                <Upload className="h-5 w-5" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleBlogImageUpload} />
                            </label>
                        </div>

                        {/* Rich Text Toolbar - Updated with onMouseDown preventDefault */}
                        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-stone-100 rounded-lg border border-stone-200">
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('bold')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Bold"><Bold className="h-4 w-4" /></button>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('italic')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Italic"><Italic className="h-4 w-4" /></button>
                           <div className="w-px h-5 bg-stone-300 self-center mx-1"></div>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('list')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Bullet List"><List className="h-4 w-4" /></button>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('ordered')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Numbered List"><ListOrdered className="h-4 w-4" /></button>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('quote')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Quote"><Quote className="h-4 w-4" /></button>
                           <div className="w-px h-5 bg-stone-300 self-center mx-1"></div>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('h1')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Heading 1"><Heading1 className="h-4 w-4" /></button>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('h2')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Heading 2"><Heading2 className="h-4 w-4" /></button>
                           <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyPostFormat('h3')} className="p-1.5 hover:bg-white rounded text-stone-600 transition-colors" title="Heading 3"><Heading3 className="h-4 w-4" /></button>
                        </div>

                        <textarea 
                            ref={postTextareaRef}
                            className="p-3 border rounded-lg h-48 text-stone-900 font-mono text-sm leading-relaxed" 
                            value={editingPost.content} 
                            onChange={e => setEditingPost({...editingPost, content: e.target.value})} 
                            placeholder="Write your post content here... (Markdown is supported)" 
                        />
                        <button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg font-bold">Save Post</button>
                    </form>
                 </div>
                 {posts.map(post => (
                     <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-stone-100">
                         <div className="flex items-center gap-3">
                            {post.image && <img src={post.image} alt={post.title} className="h-10 w-10 rounded-lg object-cover" />}
                            <span className="font-bold text-stone-800">{post.title || 'Untitled'}</span>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => startEditPost(post)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4"/></button>
                             <button onClick={() => setItemToDelete({id: post.id, type: 'post'})} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash className="h-4 w-4"/></button>
                         </div>
                     </div>
                 ))}
            </div>
        )}

      </main>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-center text-stone-900 mb-2">Confirm Delete</h3>
            <p className="text-center text-stone-500 mb-6">Are you sure?</p>
            <div className="flex space-x-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 px-4 py-2 bg-stone-100 rounded-xl font-bold text-stone-700">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Send Funds / Top Up Modal */}
      {topUpUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-stone-900">Send Funds</h3>
                    <button onClick={() => setTopUpUser(null)}><X className="h-5 w-5 text-stone-400" /></button>
                </div>
                
                <div className="bg-stone-50 p-4 rounded-xl mb-4 border border-stone-100">
                    <p className="text-sm text-stone-500">Recipient:</p>
                    <p className="font-bold text-stone-900">{topUpUser.name}</p>
                    <p className="text-xs text-stone-400">{topUpUser.email}</p>
                </div>

                <form onSubmit={handleSendFunds}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-stone-700 mb-1">Amount (Rs.)</label>
                        <input 
                            type="number" 
                            min="1" 
                            required
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-stone-700 mb-1">Description / Reason</label>
                        <input 
                            type="text" 
                            value={topUpReason}
                            onChange={(e) => setTopUpReason(e.target.value)}
                            className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
                            placeholder="e.g. Refund, Bonus, Manual Deposit"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isTopUpLoading}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-70 flex justify-center items-center"
                    >
                        {isTopUpLoading ? <Loader className="animate-spin h-5 w-5" /> : 'Confirm Transfer'}
                    </button>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};
