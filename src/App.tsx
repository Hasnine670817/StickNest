import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Star, Play, Gift, Target, Store, Image as ImageIcon, Instagram, Youtube, Menu, X } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productCategories = [
    { name: 'Stickers', icon: 'https://picsum.photos/seed/stk/40/40' },
    { name: 'Labels', icon: 'https://picsum.photos/seed/lbl/40/40' },
    { name: 'Magnets', icon: 'https://picsum.photos/seed/mag/40/40' },
    { name: 'Buttons', icon: 'https://picsum.photos/seed/btn/40/40' },
    { name: 'Packaging', icon: 'https://picsum.photos/seed/pkg/40/40' },
    { name: 'Apparel', icon: 'https://picsum.photos/seed/app/40/40' },
    { name: 'Acrylics', icon: 'https://picsum.photos/seed/acr/40/40' },
    { name: 'More products', icon: 'https://picsum.photos/seed/more/40/40' },
    { name: 'Samples', icon: 'https://picsum.photos/seed/sam/40/40' },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col">
      {/* Header Container */}
      <div className="relative z-50">
        {/* Navbar */}
        <nav className="bg-[#333333] text-white px-4 flex items-center justify-between text-[15px] font-bold relative z-50">
          <div className="flex items-center space-x-6">
            <div className="flex items-center py-3">
              {/* Horse Logo Placeholder */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
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
              <a href="#" className="hover:text-gray-300 py-4">Samples</a>
              <a href="#" className="hover:text-gray-300 py-4">Marketplace</a>
              <a href="#" className="hover:text-gray-300 py-4">Deals</a>
              <a href="#" className="border border-white/30 px-3 py-1.5 rounded hover:bg-white/10">Get PRO</a>
            </div>
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <a href="#" className="hover:text-gray-300 py-4"><Search className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gray-300 py-4"><ShoppingCart className="w-5 h-5" /></a>
            <a href="#" className="hidden lg:block hover:text-gray-300 py-4">Log in</a>
            <a href="#" className="hidden lg:block hover:text-gray-300 py-4">Sign up</a>
            <button className="lg:hidden hover:text-gray-300 py-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-[#333333] text-white absolute w-full z-40 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 visible border-t border-white/10' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
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
            <a href="#" className="py-2 font-bold hover:text-gray-300">Log in</a>
            <a href="#" className="py-2 font-bold hover:text-gray-300">Sign up</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f37021] text-white px-4 sm:px-8 py-12 md:py-20 overflow-hidden">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-[55%] z-10 md:pr-8 text-center md:text-left">
            <h1 className="text-[40px] sm:text-[48px] md:text-[40px] font-bold mb-4 leading-[1.1] tracking-tight">Buy and sell<br className="hidden sm:block"/> custom products</h1>
            <p className="text-[18px] sm:text-[20px] md:text-lg mb-8 font-medium">Free worldwide shipping. Fast turnaround. 24/7 support.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 justify-center md:justify-start">
              <button className="bg-[#0066cc] hover:bg-[#005bb5] text-white px-8 py-3.5 md:px-7 lg:px-8 md:py-2.5 lg:py-3.5 rounded text-lg md:text-base lg:text-lg font-bold transition-colors w-full sm:w-auto">Shop now</button>
              <button className="bg-[#cc5a1b] hover:bg-[#b85118] text-white px-8 py-3.5 md:px-7 lg:px-8 md:py-2.5 lg:py-3.5 rounded text-lg md:text-base lg:text-lg font-bold transition-colors w-full sm:w-auto">Start selling</button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start text-[14px] sm:text-[15px] md:text-xs lg:text-[15px] font-medium space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-[#ffc107] fill-current mr-1.5" />
                <span>4.7 from <a href="#" className="underline hover:text-gray-200">350,314 reviews</a></span>
              </div>
              <span className="hidden sm:inline mx-3">•</span>
              <span>Trusted by <a href="#" className="underline hover:text-gray-200">28,527 sellers</a></span>
            </div>
          </div>
          <div className="md:w-[45%] mt-12 md:mt-0 relative w-full max-w-md mx-auto md:max-w-none">
            {/* Collage Placeholder */}
            <img src="https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Stickers Collage" className="w-full h-auto object-cover rounded-xl transform md:rotate-2 shadow-2xl mix-blend-luminosity opacity-80 hover:mix-blend-normal hover:opacity-100 transition-all duration-500" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#f4f4f4] pt-12 pb-16">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap justify-center gap-x-8 gap-y-8">
            {[
              { name: 'Stickers', icon: 'https://picsum.photos/seed/stk/120/120' },
              { name: 'Labels', icon: 'https://picsum.photos/seed/lbl/120/120' },
              { name: 'Magnets', icon: 'https://picsum.photos/seed/mag/120/120' },
              { name: 'Buttons', icon: 'https://picsum.photos/seed/btn/120/120' },
              { name: 'Packaging', icon: 'https://picsum.photos/seed/pkg/120/120' },
              { name: 'Apparel', icon: 'https://picsum.photos/seed/app/120/120' },
              { name: 'Acrylics', icon: 'https://picsum.photos/seed/acr/120/120' },
            ].map((cat) => (
              <div key={cat.name} className="flex flex-col items-center cursor-pointer group">
                <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-white rounded-full shadow-sm mb-3 sm:mb-4 overflow-hidden border-2 border-transparent group-hover:border-gray-300 transition-all duration-200 transform group-hover:-translate-y-1">
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-medium text-[#333333]">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 relative w-full">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Feature Video" className="w-full rounded-lg shadow-md object-cover h-[250px] sm:h-[300px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-[60px] h-[40px] sm:w-[72px] sm:h-[48px] bg-[#cc5a1b]/90 hover:bg-[#cc5a1b] rounded-lg flex items-center justify-center transition-colors shadow-lg">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-current ml-1" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 sm:mb-6 text-[#333333] leading-tight">Free shipping, free online proofs, fast turnaround.</h2>
            <p className="text-[#555555] text-[15px] sm:text-[16px] leading-[1.6]">
              Sticker Mule is the easiest way to buy custom stickers & decals, labels, and other printing online. Order in 60 seconds and we'll turn your designs and illustrations into custom stickers, magnets, buttons, labels and packaging in days. We offer free online proofs, free worldwide shipping and super fast turnaround.
            </p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-16 md:pb-20 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto bg-[#f4f4f4] rounded-xl p-6 md:p-8 lg:px-10 lg:py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-4 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center w-full md:w-auto">
            <div className="flex -space-x-3 lg:mr-8 mb-4 md:mb-3 lg:mb-0">
              <div className="w-12 h-12 rounded-full bg-[#0066cc] flex items-center justify-center text-white border-2 border-[#f4f4f4] z-40 shadow-sm"><Gift className="w-6 h-6" /></div>
              <div className="w-12 h-12 rounded-full bg-[#6633cc] flex items-center justify-center text-white border-2 border-[#f4f4f4] z-30 shadow-sm"><Target className="w-6 h-6" /></div>
              <div className="w-12 h-12 rounded-full bg-[#f37021] flex items-center justify-center text-white border-2 border-[#f4f4f4] z-20 shadow-sm"><Store className="w-6 h-6" /></div>
              <div className="w-12 h-12 rounded-full bg-[#00cc66] flex items-center justify-center text-white border-2 border-[#f4f4f4] z-10 shadow-sm"><ImageIcon className="w-6 h-6" /></div>
            </div>
            <div className="md:text-left">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#333333] flex flex-wrap justify-center md:justify-start items-center mb-1 gap-2">
                Sell, publish, and get paid with <span className="bg-[#777777] text-white text-[11px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">PRO</span>
              </h3>
              <p className="text-[#555555] text-[14px] sm:text-[15px]">Everything you need to run your business for just $9/mo.</p>
            </div>
          </div>
          <button className="bg-[#0066cc] hover:bg-[#005bb5] text-white px-8 py-3.5 rounded text-[15px] font-bold whitespace-nowrap transition-colors w-full sm:w-auto shrink-0 md:mt-0 mt-2">Upgrade to Pro</button>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-10">
          {/* Logos approximated with text/colors */}
          <div className="flex items-center text-[#d50032] font-bold text-lg sm:text-xl tracking-tighter"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#d50032] mr-2"></div>lululemon</div>
          <div className="text-2xl sm:text-3xl font-black italic tracking-tighter text-black">NIKE</div>
          <div className="text-xl sm:text-2xl font-bold tracking-tighter"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></div>
          <div className="flex items-center text-[#0061FF] font-bold text-xl sm:text-2xl tracking-tight"><div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0061FF] mr-2 transform rotate-45"></div>Dropbox</div>
          <div className="text-2xl sm:text-3xl font-black text-[#E50914] tracking-tighter" style={{fontFamily: 'Arial Black, sans-serif'}}>NETFLIX</div>
          <div className="text-xl sm:text-2xl font-bold text-[#1877F2] tracking-tight">facebook</div>
          <div className="flex items-center text-[#737373] font-bold text-xl sm:text-2xl tracking-tight">
            <div className="grid grid-cols-2 gap-0.5 mr-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#F25022]"></div><div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#7FBA00]"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#00A4EF]"></div><div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FFB900]"></div>
            </div>
            Microsoft
          </div>
          <div className="text-xl sm:text-2xl font-bold text-black tracking-tight">GitHub</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f4f4f4] pt-12 md:pt-16 pb-8 md:pb-12 px-4 mt-auto">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12 md:mb-16">
            <div>
              <h4 className="font-bold text-[#333333] mb-4 md:mb-5 text-[14px] md:text-[15px]">Products</h4>
              <ul className="space-y-2 md:space-y-3 text-[#0066cc] text-[13px] md:text-[14px]">
                <li><a href="#" className="hover:underline">Stickers</a></li>
                <li><a href="#" className="hover:underline">Labels</a></li>
                <li><a href="#" className="hover:underline">Magnets</a></li>
                <li><a href="#" className="hover:underline">Buttons</a></li>
                <li><a href="#" className="hover:underline">Packaging</a></li>
                <li><a href="#" className="hover:underline">Apparel</a></li>
                <li><a href="#" className="hover:underline">Acrylics</a></li>
                <li><a href="#" className="hover:underline">More products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#333333] mb-4 md:mb-5 text-[14px] md:text-[15px]">Pro</h4>
              <ul className="space-y-2 md:space-y-3 text-[#0066cc] text-[13px] md:text-[14px]">
                <li><a href="#" className="hover:underline">Studio</a></li>
                <li><a href="#" className="hover:underline">Give</a></li>
                <li><a href="#" className="hover:underline">Ship</a></li>
                <li><a href="#" className="hover:underline">Notify</a></li>
                <li><a href="#" className="hover:underline">More pro tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#333333] mb-4 md:mb-5 text-[14px] md:text-[15px]">Company</h4>
              <ul className="space-y-2 md:space-y-3 text-[#0066cc] text-[13px] md:text-[14px]">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Stats</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#333333] mb-4 md:mb-5 text-[14px] md:text-[15px]">Resources</h4>
              <ul className="space-y-2 md:space-y-3 text-[#0066cc] text-[13px] md:text-[14px]">
                <li><a href="#" className="hover:underline">Deals</a></li>
                <li><a href="#" className="hover:underline">Teams</a></li>
                <li><a href="#" className="hover:underline">Templates</a></li>
                <li><a href="#" className="hover:underline">Uses</a></li>
                <li><a href="#" className="hover:underline">Marketplace</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#333333] mb-4 md:mb-5 text-[14px] md:text-[15px]">Support</h4>
              <ul className="space-y-2 md:space-y-3 text-[#0066cc] text-[13px] md:text-[14px]">
                <li><a href="#" className="hover:underline">Help</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
                <li><a href="#" className="hover:underline">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#e0e0e0] pt-6 md:pt-8 flex flex-col lg:flex-row items-center justify-between text-[#555555] text-[12px] md:text-[13px] gap-4 lg:gap-0">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
              <span>© 2026 Sticker Mule</span>
              <a href="#" className="text-[#0066cc] hover:underline">Site map</a>
              <a href="#" className="text-[#0066cc] hover:underline">Privacy</a>
              <a href="#" className="text-[#0066cc] hover:underline">Terms</a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex items-center space-x-5">
                <a href="#" className="hover:text-gray-900">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-900 font-bold text-lg leading-none">X</a>
                <a href="#" className="hover:text-gray-900"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gray-900"><Youtube className="w-5 h-5" /></a>
              </div>
              <button className="flex items-center space-x-1.5 hover:text-gray-900 text-[#0066cc]">
                <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="w-4 h-auto" />
                <span>English (EN) $USD</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
