
import { supabase } from './supabase';
import { Product, BlogPost, Order, User, SiteSettings, ContactMessage, WalletTransaction, PromoCode } from '../types';

// Helper to map DB columns (snake_case) to Frontend types (camelCase)
const mapProduct = (data: any): Product => ({
  id: data.id,
  name: data.name,
  price: Number(data.price),
  description: data.description,
  longDescription: data.long_description,
  image: data.image,
  image2: data.image2,
  image3: data.image3,
  category: data.category,
  rating: Number(data.rating),
  reviews: data.reviews,
  discountBadge: data.discount_badge,
  botanicalName: data.botanical_name,
  uses: data.uses,
  dosage: data.dosage,
  certifications: data.certifications ? data.certifications : [],
  stock: data.stock !== undefined ? Number(data.stock) : 10,
  bulkPrice: data.bulk_price,
  tags: data.tags || []
});

const mapPost = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  author: data.author,
  content: data.content,
  image: data.image,
  avatar: data.avatar,
  likes: data.likes,
  comments: data.comments,
  timestamp: new Date(data.timestamp).toLocaleDateString(),
});

const mapOrder = (data: any): Order => ({
  id: data.id,
  customerDetails: data.customer_details,
  items: data.items,
  total: Number(data.total),
  status: data.status,
  date: data.date,
  paymentMethod: data.payment_method,
});

const mapUser = (data: any): User => ({
  id: data.id,
  name: data.name || 'User', // Fallback for name to prevent crashes
  email: data.email,
  role: data.role as 'admin' | 'user' | 'guest',
  joinDate: new Date(data.join_date).toLocaleDateString(),
  phone: data.phone,
  address: data.address,
  walletBalance: Number(data.wallet_balance || 0),
  referralCode: data.referral_code,
  referredBy: data.referred_by
});

const mapSettings = (data: any): SiteSettings => ({
  id: data.id,
  siteName: data.site_name,
  siteDescription: data.site_description,
  keywords: data.keywords,
  contactEmail: data.contact_email,
  contactPhone: data.contact_phone,
  currency: data.currency,
  referralBonusAmount: Number(data.referral_bonus_amount || 200)
});

const mapMessage = (data: any): ContactMessage => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phone: data.phone || '',
  subject: data.subject || '',
  message: data.message,
  createdAt: new Date(data.created_at).toLocaleDateString() + ' ' + new Date(data.created_at).toLocaleTimeString()
});

const mapTransaction = (data: any): WalletTransaction => ({
  id: data.id,
  userId: data.user_id,
  type: data.type,
  amount: Number(data.amount),
  description: data.description,
  date: new Date(data.created_at).toLocaleDateString(),
  status: data.status
});

const mapPromoCode = (data: any): PromoCode => ({
  id: data.id,
  code: data.code,
  type: data.type,
  value: Number(data.value),
  isActive: data.is_active
});

export const api = {
  // --- Storage ---
  uploadImage: async (file: File, bucket: string = 'product-images'): Promise<string | null> => {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
        
      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // --- Products ---
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Supabase Error (getProducts):", error);
        throw error;
    }
    return data.map(mapProduct);
  },

  addProduct: async (product: Partial<Product>) => {
    const dbProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      long_description: product.longDescription,
      image: product.image,
      image2: product.image2,
      image3: product.image3,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      discount_badge: product.discountBadge,
      botanical_name: product.botanicalName,
      uses: product.uses,
      dosage: product.dosage,
      certifications: product.certifications,
      stock: product.stock,
      bulk_price: product.bulkPrice,
      tags: product.tags
    };
    const { error } = await supabase.from('products').insert([dbProduct]);
    if (error) {
        console.error("Supabase Error (addProduct):", error);
        throw error;
    }
  },

  updateProduct: async (product: Product) => {
    const dbProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      long_description: product.longDescription,
      image: product.image,
      image2: product.image2,
      image3: product.image3,
      category: product.category,
      discount_badge: product.discountBadge,
      botanical_name: product.botanicalName,
      uses: product.uses,
      dosage: product.dosage,
      certifications: product.certifications,
      stock: product.stock,
      bulk_price: product.bulkPrice,
      tags: product.tags
    };
    const { error } = await supabase.from('products').update(dbProduct).eq('id', product.id);
    if (error) {
        console.error("Supabase Error (updateProduct):", error);
        throw error;
    }
  },

  deleteProduct: async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        console.error("Supabase Error (deleteProduct):", error);
        throw error;
    }
  },

  // --- Blog ---
  getPosts: async () => {
    const { data, error } = await supabase.from('posts').select('*').order('timestamp', { ascending: false });
    if (error) {
        console.error("Supabase Error (getPosts):", error);
        throw error;
    }
    return data.map(mapPost);
  },

  addPost: async (post: Partial<BlogPost>) => {
    const dbPost = {
      title: post.title,
      author: post.author,
      content: post.content,
      image: post.image,
      avatar: post.avatar,
      likes: post.likes,
      comments: post.comments
    };
    const { error } = await supabase.from('posts').insert([dbPost]);
    if (error) {
        console.error("Supabase Error (addPost):", error);
        throw error;
    }
  },

  updatePost: async (post: BlogPost) => {
    const dbPost = {
      title: post.title,
      content: post.content,
      image: post.image,
      author: post.author
    };
    const { error } = await supabase.from('posts').update(dbPost).eq('id', post.id);
    if (error) {
        console.error("Supabase Error (updatePost):", error);
        throw error;
    }
  },

  deletePost: async (id: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
        console.error("Supabase Error (deletePost):", error);
        throw error;
    }
  },

  // --- Orders ---
  getOrders: async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Supabase Error (getOrders):", error);
        throw error;
    }
    return data.map(mapOrder);
  },

  getUserOrders: async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
        console.error("Supabase Error (getUserOrders):", error);
        throw error;
    }
    return data.map(mapOrder);
  },

  addOrder: async (order: Order, userId?: string) => {
    const dbOrder = {
      id: order.id,
      user_id: userId || null,
      customer_details: order.customerDetails,
      items: order.items,
      total: order.total,
      status: order.status,
      date: order.date,
      payment_method: order.paymentMethod
    };
    const { error } = await supabase.from('orders').insert([dbOrder]);
    if (error) {
        console.error("Supabase Error (addOrder):", error);
        throw error;
    }

    // Handle Wallet Payment Deduction
    if (userId && order.paymentMethod === 'Wallet') {
        const { error: txError } = await api.withdrawWallet(userId, order.total, `Order Payment: ${order.id}`);
        if (txError) throw txError;
    }
  },

  updateOrder: async (order: Order) => {
    const dbOrder = {
      status: order.status,
      payment_method: order.paymentMethod
    };
    const { error } = await supabase.from('orders').update(dbOrder).eq('id', order.id);
    if (error) {
        console.error("Supabase Error (updateOrder):", error);
        throw error;
    }
  },

  deleteOrder: async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
        console.error("Supabase Error (deleteOrder):", error);
        throw error;
    }
  },

  // --- Users & Wallet ---
  createProfile: async (id: string, email: string, name: string) => {
    // Check if exists first to avoid duplicate key error
    const { data } = await supabase.from('profiles').select('id').eq('id', id).single();
    if (data) return;

    const { error } = await supabase.from('profiles').insert([{
      id,
      email,
      name,
      join_date: new Date().toISOString(),
      wallet_balance: 0,
      role: 'user'
    }]);
    if (error) {
        console.error("Supabase Error (createProfile):", error);
        throw error;
    }
  },

  getUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error("Supabase Error (getUsers):", error);
        throw error;
    }
    return data.map(mapUser);
  },

  updateUser: async (user: User) => {
    const { error } = await supabase.from('profiles').update({
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      address: user.address
    }).eq('id', user.id);
    if (error) {
        console.error("Supabase Error (updateUser):", error);
        throw error;
    }
  },
  
  deleteUser: async (id: string) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
        console.error("Supabase Error (deleteUser):", error);
        throw error;
    }
  },
  
  getCurrentUserProfile: async (id: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) return null;
    return mapUser(data);
  },

  // --- Wallet & Referral ---
  getWalletTransactions: async (userId: string) => {
    const { data, error } = await supabase.from('wallet_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) {
        console.error("Supabase Error (getWalletTransactions):", error);
        throw error;
    }
    return data.map(mapTransaction);
  },

  getReferredUsers: async (referrerId: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('referred_by', referrerId);
    if (error) {
        console.error("Supabase Error (getReferredUsers):", error);
        throw error;
    }
    return data.map(mapUser);
  },

  topUpWallet: async (userId: string, amount: number, description: string = 'Wallet Top-up', type: 'deposit' | 'referral_bonus' | 'signup_bonus' = 'deposit') => {
     // 1. Create Transaction Record
     const { error: txError } = await supabase.from('wallet_transactions').insert([{
         user_id: userId,
         type: type,
         amount: amount,
         description: description
     }]);
     if (txError) return { error: txError };

     // 2. Update Profile Balance
     const { data: user, error: fetchError } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
     if (fetchError) return { error: fetchError };
     
     const newBalance = (Number(user.wallet_balance) || 0) + amount;
     const { error: updateError } = await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', userId);
     return { error: updateError };
  },

  withdrawWallet: async (userId: string, amount: number, description: string = 'Withdrawal') => {
      const { data: user, error: fetchError } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
      if (fetchError) return { error: fetchError };

      if ((Number(user.wallet_balance) || 0) < amount) {
          return { error: { message: "Insufficient balance" } };
      }

      const { error: txError } = await supabase.from('wallet_transactions').insert([{
        user_id: userId,
        type: description.includes('Order') ? 'purchase' : 'withdrawal',
        amount: amount,
        description: description
      }]);
      if (txError) return { error: txError };

      const newBalance = Number(user.wallet_balance) - amount;
      const { error: updateError } = await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', userId);
      return { error: updateError };
  },

  applyReferral: async (newUserId: string, referralCode: string) => {
      // 1. Check if referral code exists
      const { data: referrer, error } = await supabase.from('profiles').select('*').eq('referral_code', referralCode).single();
      if (error || !referrer) return { error: "Invalid Referral Code" };
      if (referrer.id === newUserId) return { error: "Cannot refer yourself" };

      // 2. Link user to referrer
      await supabase.from('profiles').update({ referred_by: referrer.id }).eq('id', newUserId);

      // 3. Get Bonus Amount from Settings (Dynamic)
      let bonusAmount = 200; // Default fallback
      try {
          const { data: settings } = await supabase.from('site_settings').select('referral_bonus_amount').single();
          if (settings && settings.referral_bonus_amount) {
              bonusAmount = Number(settings.referral_bonus_amount);
          }
      } catch (e) {
          console.error("Failed to fetch referral settings, using default.", e);
      }

      // 4. Give Bonus to Referrer
      await api.topUpWallet(referrer.id, bonusAmount, `Bonus for referring user ${newUserId.slice(0,5)}...`, 'referral_bonus');

      return { success: true };
  },

  generateReferralCode: async (userId: string, name: string) => {
      const safeName = name && name.trim().length > 0 ? name : 'USER';
      const code = (safeName.slice(0, 3) + Math.floor(1000 + Math.random() * 9000)).toUpperCase().replace(/\s/g, '');
      const { error } = await supabase.from('profiles').update({ referral_code: code }).eq('id', userId);
      if (error) console.error("Error generating code:", error);
      return code;
  },

  // --- Messages ---
  getMessages: async () => {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Supabase Error (getMessages):", error);
        throw error;
    }
    return data.map(mapMessage);
  },

  addMessage: async (msg: Partial<ContactMessage>) => {
    const { error } = await supabase.from('contact_messages').insert([{
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message
    }]);
    if (error) {
        console.error("Supabase Error (addMessage):", error);
        throw error;
    }
  },

  deleteMessage: async (id: string) => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) {
        console.error("Supabase Error (deleteMessage):", error);
        throw error;
    }
  },

  // --- Promo Codes ---
  getPromoCodes: async () => {
    const { data, error } = await supabase.from('promo_codes').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Supabase Error (getPromoCodes):", error);
        throw error;
    }
    return data.map(mapPromoCode);
  },

  addPromoCode: async (promo: Partial<PromoCode>) => {
    const { error } = await supabase.from('promo_codes').insert([{
      code: promo.code,
      type: promo.type,
      value: promo.value,
      is_active: promo.isActive
    }]);
    if (error) throw error;
  },

  updatePromoCode: async (promo: PromoCode) => {
    const { error } = await supabase.from('promo_codes').update({
      code: promo.code,
      type: promo.type,
      value: promo.value,
      is_active: promo.isActive
    }).eq('id', promo.id);
    if (error) throw error;
  },

  deletePromoCode: async (id: string) => {
    const { error } = await supabase.from('promo_codes').delete().eq('id', id);
    if (error) throw error;
  },

  // --- SEO Settings ---
  getSiteSettings: async () => {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (error) return null;
    return mapSettings(data);
  },

  updateSiteSettings: async (settings: SiteSettings) => {
    const dbSettings = {
       site_name: settings.siteName,
       site_description: settings.siteDescription,
       keywords: settings.keywords,
       contact_email: settings.contactEmail,
       contact_phone: settings.contactPhone,
       currency: settings.currency,
       referral_bonus_amount: settings.referralBonusAmount
    };
    
    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).single();
    
    if (existing) {
       const { error } = await supabase.from('site_settings').update(dbSettings).eq('id', existing.id);
       if (error) throw error;
    } else {
       const { error } = await supabase.from('site_settings').insert([dbSettings]);
       if (error) throw error;
    }
  }
};
