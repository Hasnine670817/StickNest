import React from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Stickers() {
  const stickerTypes = [
    { name: 'Die cut stickers', image: 'https://picsum.photos/seed/diecut/200/200' },
    { name: 'Circle stickers', image: 'https://picsum.photos/seed/circle/200/200' },
    { name: 'Rectangle stickers', image: 'https://picsum.photos/seed/rect/200/200' },
    { name: 'Square stickers', image: 'https://picsum.photos/seed/square/200/200' },
    { name: 'Oval stickers', image: 'https://picsum.photos/seed/oval/200/200' },
    { name: 'Bumper stickers', image: 'https://picsum.photos/seed/bumper/200/200' },
    { name: 'Sticker sheets', image: 'https://picsum.photos/seed/sheets/200/200' },
    { name: 'Kiss cut stickers', image: 'https://picsum.photos/seed/kiss/200/200' },
    { name: 'Rounded corner stickers', image: 'https://picsum.photos/seed/rounded/200/200' },
    { name: 'Clear stickers', image: 'https://picsum.photos/seed/clear/200/200' },
    { name: 'Transfer stickers', image: 'https://picsum.photos/seed/transfer/200/200' },
    { name: 'Vinyl lettering', image: 'https://picsum.photos/seed/vinyl/200/200' },
    { name: 'Window clings', image: 'https://picsum.photos/seed/window/200/200' },
    { name: 'Front adhesive stickers', image: 'https://picsum.photos/seed/front/200/200' },
    { name: 'Holographic stickers', image: 'https://picsum.photos/seed/holo/200/200' },
    { name: 'Glitter stickers', image: 'https://picsum.photos/seed/glitter/200/200' },
    { name: 'Fabric stickers', image: 'https://picsum.photos/seed/fabric/200/200' },
    { name: 'Economy stickers', image: 'https://picsum.photos/seed/eco/200/200' },
    { name: 'Sticker packs', image: 'https://picsum.photos/seed/packs/200/200' },
  ];

  const reviews = [
    {
      initials: 'WD',
      bg: 'bg-blue-100',
      title: 'Perfect Quality Every Time!',
      name: 'Wendy Daniels',
      time: '3 hours ago',
      text: 'Sticker Mule never disappoints. I\'ve used them over and over again and they are consistent. The quality is top notch.'
    },
    {
      initials: 'AL',
      bg: 'bg-purple-100',
      title: 'Best stickers ever',
      name: 'Amber Lynch',
      time: '13 hours ago',
      text: 'I ordered 3 sticker packs from 3 different companies at the same time. Sticker mule was the cheapest, fastest delivery, and over all best quality. I have ordered from them multiple times and have never been let down, they will be my go to.'
    },
    {
      initials: 'MT',
      bg: 'bg-green-100',
      title: 'Great stickers',
      name: 'Mary Tran',
      time: '15 hours ago',
      text: 'Good stickers. Nice feel to them and great stickiness.'
    },
    {
      initials: 'MT',
      bg: 'bg-green-100',
      title: 'Excellent stickers',
      name: 'Mary Tran',
      time: '15 hours ago',
      text: 'Stickers are great! Nice feel to them! Good stick to them.'
    },
    {
      initials: 'd',
      bg: 'bg-purple-800 text-white',
      title: 'Perfect quality bigger than expected',
      name: 'draco ots',
      time: '16 hours ago',
      text: 'Awesome will definitely be shopping again'
    }
  ];

  const faqs = [
    'What size sticker should I order?',
    'What is a die cut sticker?',
    'What type of sticker should I order?',
    'What is your minimum order quantity for stickers?',
    'Are your custom stickers weatherproof?'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#f37021] text-white py-12 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-[40px] md:text-[48px] font-bold leading-tight mb-2">Custom stickers</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start text-[15px] font-medium space-y-2 sm:space-y-0">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#ffc107] fill-current" />
                ))}
                <span className="ml-2 font-bold">185,984 reviews</span>
              </div>
              <span className="hidden sm:inline mx-3">•</span>
              <span className="font-bold">Free shipping</span>
            </div>
          </div>
          <Link to="/samples" className="bg-[#e0661e] hover:bg-[#d45b19] transition-colors text-white px-6 py-2.5 rounded font-bold text-[15px]">
            Get samples
          </Link>
        </div>
      </section>

      {/* Grid Section */}
      <section className="bg-[#f4f4f4] py-16 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-12">
            {stickerTypes.map((type, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group cursor-pointer rounded-xl py-4 px-4 hover:bg-[#E8E8E8] transition-all duration-300">
                <div className="w-full flex items-center justify-center mb-4">
                  <img src={type.image} alt={type.name} className="w-full object-cover rounded-xl border-[6px] border-white shadow-md group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-[15px] text-[#333333]">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 relative w-full">
            <div className="w-full h-[250px] sm:h-[300px] rounded-lg shadow-md overflow-hidden bg-black flex items-center justify-center">
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                className="w-full h-full object-cover"
                controls 
                autoPlay 
                loop
                muted
                playsInline
              />
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-[28px] sm:text-[32px] font-bold mb-4 sm:mb-6 text-[#333333] leading-tight">Free shipping, free online proofs, fast turnaround.</h2>
            <p className="text-[#555555] text-[15px] sm:text-[16px] leading-[1.6]">
              Custom stickers are the fastest and easiest way to promote your business, product, or event – and Sticker Mule is the easiest way to buy custom stickers. We'll make beautiful vinyl custom stickers from any artwork, logo, or photo. Order your custom stickers in seconds and receive free online proofs, free worldwide shipping and super fast turnaround.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="py-20 px-4 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#333333] mb-4">Durable, weather resistant vinyl stickers</h2>
            <p className="text-[16px] text-[#333333] leading-relaxed">
              Print custom stickers in any shape or size on premium vinyl. Don't stress about quality and durability. Our custom stickers feature a special laminate that protects them from exposure to wind, rain and sunlight. You can even put them in your dishwasher and have them come out looking brand new.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <img src="https://i.ibb.co.com/QvrPTG5N/gallery-1.jpg" alt="Climbing with sticker" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col gap-4">
              <img src="https://i.ibb.co.com/Q3SLTWWF/gallery-2.jpg" alt="Sandwich sticker" className="w-full h-[calc(50%-0.5rem)] object-cover rounded-lg" />
              <img src="https://i.ibb.co.com/WpHwVx8M/gallery-3.jpg" alt="Triangle sticker" className="w-full h-[calc(50%-0.5rem)] object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[28px] font-bold text-[#333333] mb-10">Reviews for custom stickers</h2>
          
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start text-center mb-12 gap-8 sm:gap-0">
            <div>
              <div className="text-[40px] font-bold text-[#333333] leading-none mb-2">4.8 / 5</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ffc107] fill-current" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-[40px] font-bold text-[#333333] leading-none mb-2">185,984</div>
              <div className="text-[15px] text-[#333333]">Total reviews</div>
            </div>
            <div>
              <div className="text-[40px] font-bold text-[#333333] leading-none mb-2">96%</div>
              <div className="text-[15px] text-[#333333]">Would order again</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mb-8"></div>
          
          <div className="space-y-10">
            {reviews.map((review, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold shrink-0 ${review.bg}`}>
                  {review.initials}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="flex mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#ffc107] fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-[#333333] text-[15px]">{review.title}</span>
                  </div>
                  <div className="text-[13px] text-gray-500 mb-2">
                    <span className="font-bold text-[#333333]">{review.name}</span> {review.time}
                  </div>
                  <p className="text-[15px] text-[#333333] leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-10 mx-auto block bg-[#f4f4f4] hover:bg-[#e8e8e8] text-[#333333] font-bold py-3 px-6 rounded transition-colors text-[15px]">
            See all reviews
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-20 px-4 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[28px] font-bold text-[#333333] mb-6">Frequently asked questions</h2>
          
          <div className="border-t border-gray-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 py-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[16px] text-[#333333]">{faq}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
          
          <a href="#" className="text-[#0066cc] font-bold hover:underline mt-6 inline-block text-[15px]">
            View all FAQs
          </a>
        </div>
      </section> */}

      {/* Related Section */}
      {/* <section className="py-20 px-4 sm:px-8 bg-[#f4f4f4] text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[28px] font-bold text-[#333333] mb-10">Related to custom stickers</h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            <a href="#" className="text-[16px] font-bold text-[#333333] hover:underline">Vinyl stickers</a>
            <a href="#" className="text-[16px] font-bold text-[#333333] hover:underline">Bumper stickers</a>
            <a href="#" className="text-[16px] font-bold text-[#333333] hover:underline">Car decals</a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
