import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { Menu, X, ShoppingBag, Facebook, Instagram, Linkedin, Lock, Unlock } from 'lucide-react';

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-brand-green bg-brand-lightGreen' 
          : 'text-stone-600 hover:text-brand-green hover:bg-stone-100'
      }`}
    >
      {children}
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content, isAdminMode, toggleAdminMode } = useContent();
  const { toggleCart, items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans text-stone-800">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold">K</div>
                <span className="font-bold text-xl text-brand-green tracking-tight">Kairos Natural</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/testimonials">Testimonials</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {isAdminMode && (
                <Link to="/admin" className="ml-4 px-3 py-1 bg-brand-blue text-white text-xs uppercase font-bold rounded tracking-wider hover:bg-cyan-700">
                  Dashboard
                </Link>
              )}
            </div>

            {/* Mobile Menu Button & Cart Trigger */}
            <div className="flex items-center gap-2">
                <button onClick={toggleCart} className="relative text-stone-600 hover:text-brand-green p-2 rounded-full hover:bg-stone-100 transition">
                    <ShoppingBag size={24} />
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                            {cartItemCount}
                        </span>
                    )}
                </button>

                <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-stone-500 hover:text-brand-green p-2"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
              <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</NavLink>
              <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
              <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
              <NavLink to="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</NavLink>
              <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
              {isAdminMode && (
                 <NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</NavLink>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Bio */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Kairos Natural</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              {content.about.mission}
            </p>
            <div className="flex space-x-4">
              <a href={content.companyInfo.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-green transition"><Facebook size={20} /></a>
              <a href={content.companyInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-green transition"><Instagram size={20} /></a>
              <a href={content.companyInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-green transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Shop Blends</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Book Consultation</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Health Tips</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Email: {content.companyInfo.email}</li>
              <li>Phone: {content.companyInfo.phone}</li>
              <li>{content.companyInfo.address}</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-stone-800">
                <button 
                  onClick={toggleAdminMode}
                  className="flex items-center gap-2 text-xs text-stone-600 hover:text-brand-green transition-colors"
                >
                  {isAdminMode ? <Unlock size={12} /> : <Lock size={12} />}
                  {isAdminMode ? 'Exit Admin Mode' : 'Admin Access'}
                </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Kairos Natural. All rights reserved.
        </div>
      </footer>
      
      {/* Cart Drawer Component */}
      <CartDrawer />
    </div>
  );
};

export default Layout;