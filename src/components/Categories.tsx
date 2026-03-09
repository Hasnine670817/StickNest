import React from 'react';

export default function Categories() {
  return (
    <section className="bg-[#f4f4f4] pt-12 pb-16">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap justify-center gap-x-8 lg:gap-x-0 gap-y-8">
          {[
            { name: 'Stickers', icon: 'https://picsum.photos/seed/stk/120/120' },
            { name: 'Labels', icon: 'https://picsum.photos/seed/lbl/120/120' },
            { name: 'Magnets', icon: 'https://picsum.photos/seed/mag/120/120' },
            { name: 'Buttons', icon: 'https://picsum.photos/seed/btn/120/120' },
            { name: 'Packaging', icon: 'https://picsum.photos/seed/pkg/120/120' },
            { name: 'Apparel', icon: 'https://picsum.photos/seed/app/120/120' },
            { name: 'Acrylics', icon: 'https://picsum.photos/seed/acr/120/120' },
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center cursor-pointer group py-6 px-6 rounded-md hover:bg-[#E8E8E8] transition-all duration-300">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-white rounded-full shadow-sm mb-3 sm:mb-4 overflow-hidden border-2 border-transparent group-hover:border-gray-300 transition-all duration-200 transform group-hover:-translate-y-1">
                <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#333333]">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
