const fs = require('fs');
const path = require('path');

const stickersContent = fs.readFileSync(path.join(__dirname, 'src/pages/Stickers.tsx'), 'utf8');

const pages = [
  { name: 'Labels', title: 'Custom labels', lower: 'custom labels', single: 'label' },
  { name: 'Magnets', title: 'Custom magnets', lower: 'custom magnets', single: 'magnet' },
  { name: 'Buttons', title: 'Custom buttons', lower: 'custom buttons', single: 'button' },
  { name: 'Packaging', title: 'Custom packaging', lower: 'custom packaging', single: 'packaging' },
  { name: 'Apparel', title: 'Custom apparel', lower: 'custom apparel', single: 'apparel' },
  { name: 'Acrylics', title: 'Custom acrylics', lower: 'custom acrylics', single: 'acrylic' },
  { name: 'MoreProducts', title: 'More products', lower: 'more products', single: 'product' }
];

pages.forEach(page => {
  let content = stickersContent;
  
  // Replace component name
  content = content.replace(/export default function Stickers\(\)/g, `export default function ${page.name}()`);
  
  // Replace titles and texts
  content = content.replace(/Custom stickers/g, page.title);
  content = content.replace(/custom stickers/g, page.lower);
  content = content.replace(/Sticker Mule/g, 'Our Store'); // Optional, but good to keep it generic or leave it
  
  // Replace stickerTypes with generic productTypes
  content = content.replace(/const stickerTypes = \[/g, `const productTypes = [`);
  content = content.replace(/stickerTypes\.map/g, `productTypes.map`);
  
  // Replace some specific texts if needed, but simple replace is fine for now
  
  fs.writeFileSync(path.join(__dirname, `src/pages/${page.name}.tsx`), content);
  console.log(`Created ${page.name}.tsx`);
});
