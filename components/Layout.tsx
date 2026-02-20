
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Mountain, User, LogOut } from 'lucide-react';
import { useCart, useAuth } from '../App';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    // Only scroll to top if not navigating to a hash link (handled in Support.tsx)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Yoga', path: '/yoga' },
    { name: 'Retreat', path: '/retreat' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }, // Visible in menu
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" 
          alt="Galaxy Background" 
          className="w-full h-full object-cover"
        />
        {/* Very light dark overlay to keep image vibrant and visible */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[0px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Navbar with Glassmorphism */}
        <nav 
          className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
            scrolled 
              ? 'bg-black/60 backdrop-blur-lg border-white/10 shadow-lg py-2' 
              : 'bg-transparent border-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30 group-hover:bg-emerald-500/40 transition-colors">
                  <Mountain className="h-6 w-6 text-emerald-400 transition-transform group-hover:scale-110 duration-300" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors drop-shadow-md">
                  Mountain Herbs
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' 
                        : 'text-stone-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Icons & Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-3 mr-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    <Link to="/profile" className="text-sm font-bold text-stone-100 flex items-center border-r border-white/20 pr-3 mr-2 hover:text-emerald-300">
                      <User className="h-4 w-4 mr-2" />
                      {user.name.split(' ')[0]}
                    </Link>
                    
                    <button 
                      onClick={handleLogout} 
                      className="text-stone-300 hover:text-red-400 transition-colors flex items-center text-sm font-semibold" 
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4 mr-1" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                      <Link 
                        to="/login" 
                        className="px-4 py-2 text-stone-200 hover:text-white font-bold transition-colors text-sm"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all border border-emerald-500/50"
                      >
                        Sign Up
                      </Link>
                  </div>
                )}
                
                <Link to="/cart" className="relative p-2 text-stone-200 hover:text-emerald-400 hover:bg-white/10 rounded-full transition-all group">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-stone-900 transform group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <Link to={user ? "/profile" : "/login"} className="p-2 text-white hover:text-emerald-400 transition-colors">
                  <User className="h-6 w-6" />
                </Link>

                <Link to="/cart" className="relative p-2">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-stone-900">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-emerald-400 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-xl z-[60] overflow-y-auto animate-fade-in-up border-t border-white/10">
              <div className="px-4 pt-4 pb-8 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.path)
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-stone-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-white/10 my-4 pt-4"></div>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-stone-300 hover:bg-white/10"
                    >
                      My Profile ({user.name})
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-bold text-stone-200 bg-white/10 border border-white/10 hover:bg-white/20 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center px-4 py-3 rounded-xl text-base font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-colors"
                      >
                        Sign Up
                      </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content Spacer for Fixed Nav */}
        <div className={`${scrolled ? 'h-20' : 'h-24'} transition-all duration-300`}></div>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/9779823376110" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-float hover:scale-110 transition-transform"
          title="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.575 1.973.899 3.295.899 5.253 0 8.163-4.148 5.748-8.162-1.127-1.875-3.14-3.686-6.237-3.686zm-12.031 6.09c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm16.892 4.414c-.161-.265-2.029-1.025-2.316-1.134-.239-.092-.519-.115-.758.261-.24.375-.858 1.137-1.096 1.374-.24.24-.48.277-.817.111-1.488-.733-2.618-1.748-3.473-3.219-.193-.332.062-.439.421-1.036.082-.136.174-.337.039-.597-.133-.259-.974-2.458-1.385-3.264-.326-.639-.773-.559-1.066-.559-.267 0-.586.012-.907.035-.916.066-1.838.748-1.84 2.37.001 1.849 1.341 3.551 1.464 3.738.163.245 2.628 3.996 6.307 5.586 2.35 1.016 2.827.814 3.332.762.817-.084 2.028-.828 2.316-1.628.287-.798.287-1.484.202-1.628z"/>
          </svg>
        </a>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-xl text-stone-300 py-16 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <Mountain className="h-6 w-6 text-emerald-500" />
                  <span className="text-xl font-bold text-stone-100 tracking-tight">Mountain Herbs</span>
                </div>
                <p className="text-sm leading-relaxed text-stone-400">
                  Sourcing the purest organic treasures from the high Himalayas. Sustainable, ethical, and potent.
                </p>
              </div>
              
              <div className="col-span-1">
                <h4 className="text-white font-bold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">All Products</Link></li>
                  <li><Link to="/wishlist" className="hover:text-emerald-400 transition-colors">Wishlist</Link></li>
                  <li><Link to="/cart" className="hover:text-emerald-400 transition-colors">My Cart</Link></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                  <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                  <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors">Yoga & Meditation</Link></li>
                  <li><Link to="/retreat" className="hover:text-emerald-400 transition-colors">Retreats</Link></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/support#shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
                  <li><Link to="/support#returns" className="hover:text-emerald-400 transition-colors">Returns & Refunds</Link></li>
                  <li><Link to="/support#faqs" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
              <p>&copy; {new Date().getFullYear()} Mountain Herbs Nepal. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
