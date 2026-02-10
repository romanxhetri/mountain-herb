
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  image2?: string;
  image3?: string;
  category: string;
  rating: number;
  reviews: number;
  discountBadge?: string;
  botanicalName?: string;
  uses?: string;
  dosage?: string;
  certifications?: string[];
  stock: number;
  bulkPrice?: string;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  joinDate: string;
  phone?: string;
  address?: string;
  // Wallet & Referral
  walletBalance: number;
  referralCode: string;
  referredBy?: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'refund' | 'referral_bonus';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface BlogPost {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  avatar: string;
  title?: string;
}

export interface Order {
  id: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Ongoing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: 'COD' | 'eSewa' | 'Bank Transfer' | 'Wallet';
}

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  keywords: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  referralBonusAmount: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  isActive: boolean;
}
