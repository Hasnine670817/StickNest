import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  
  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
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
  );
}
