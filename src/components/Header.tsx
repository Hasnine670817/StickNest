import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const productCategories = [
    { name: 'Stickers', icon: 'https://i.ibb.co.com/CKJ76LNx/stickres.png' },
    { name: 'Labels', icon: 'https://i.ibb.co.com/PvbtDxXf/labels.png' },
    { name: 'Magnets', icon: 'https://i.ibb.co.com/LhvTv3dv/magnets.png' },
    { name: 'Buttons', icon: 'https://i.ibb.co.com/JW7DWdJh/buttons.png' },
    { name: 'Packaging', icon: 'https://i.ibb.co.com/FkxSdt7B/packaging.png' },
    { name: 'Apparel', icon: 'https://i.ibb.co.com/wrjF6ynr/apparel.png' },
    { name: 'Acrylics', icon: 'https://i.ibb.co.com/4ndRCLBY/acrylics.png' },
    { name: 'More products', icon: 'https://picsum.photos/seed/more/40/40' },
    { name: 'Samples', icon: 'https://picsum.photos/seed/sam/40/40' },
  ];

  return (
    <div className="relative z-50">
      {/* Navbar */}
      <nav className="bg-[#333333] text-white px-4 flex items-center justify-between text-[15px] font-bold relative z-50">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center py-3">
            {/* Horse Logo Placeholder */}
            <img className="max-w-[40px] hover:opacity-80" src="https://i.ibb.co.com/MxqJdQgy/horse.png" alt="horse" />
          </Link>
          <div className="hidden lg:flex items-center space-x-6 h-full">
            {/* Products Dropdown */}
            <div 
              className="relative group h-full flex items-center" 
              onMouseEnter={() => setIsProductsOpen(true)} 
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <a href="#" className="flex items-center hover:text-gray-300 py-4">Products <ChevronDown className="w-4 h-4 ml-1" /></a>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-[100%] left-0 w-[280px] bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.2)] text-gray-800 transition-all duration-200 z-50 ${isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                {/* Caret */}
                <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.05)]"></div>
                
                <div className="py-2 relative bg-white rounded-lg z-10">
                  {productCategories.map((cat, idx) => (
                    <a key={idx} href="#" className="flex items-center px-5 py-2.5 hover:bg-gray-50 transition-colors">
                      <img src={cat.icon} alt={cat.name} className="w-10 h-10 mr-4 object-contain drop-shadow-sm rounded-md" />
                      <span className="text-[16px] font-normal text-[#333333]">{cat.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/samples" className="hover:text-gray-300 py-4">Samples</Link>
            <a href="#" className="hover:text-gray-300 py-4">Marketplace</a>
            <a href="#" className="hover:text-gray-300 py-4">Deals</a>
            <a href="#" className="border border-white/30 px-3 py-1.5 rounded hover:bg-white/10">Get PRO</a>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <a href="#" className="hover:text-gray-300 py-4"><Search className="w-5 h-5" /></a>
          <a href="#" className="hover:text-gray-300 py-4"><ShoppingCart className="w-5 h-5" /></a>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hidden lg:block hover:text-gray-300 py-4">Dashboard</Link>
              <button onClick={logout} className="hidden lg:block hover:text-gray-300 py-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden lg:block hover:text-gray-300 py-4">Log in</Link>
              <Link to="/signup" className="hidden lg:block hover:text-gray-300 py-4">Sign up</Link>
            </>
          )}
          <button className="lg:hidden hover:text-gray-300 py-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-[#333333] text-white absolute w-full z-40 transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'max-h-[calc(100vh-60px)] opacity-100 visible border-t border-white/10' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="px-4 py-2 flex flex-col space-y-2 pb-6">
          <div className="py-2">
            <button className="flex items-center justify-between w-full font-bold" onClick={() => setIsProductsOpen(!isProductsOpen)}>
              Products <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mt-2 space-y-1 pl-4 transition-all duration-300 ${isProductsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {productCategories.map((cat, idx) => (
                <a key={idx} href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <img src={cat.icon} alt={cat.name} className="w-6 h-6 mr-3 object-contain rounded" />
                  <span className="text-[15px]">{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="py-2 font-bold hover:text-gray-300">Samples</a>
          <a href="#" className="py-2 font-bold hover:text-gray-300">Marketplace</a>
          <a href="#" className="py-2 font-bold hover:text-gray-300">Deals</a>
          <a href="#" className="py-2 font-bold hover:text-gray-300">Get PRO</a>
          <div className="h-px bg-white/10 my-2"></div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="py-2 font-bold hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="py-2 font-bold hover:text-gray-300 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2 font-bold hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="py-2 font-bold hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
