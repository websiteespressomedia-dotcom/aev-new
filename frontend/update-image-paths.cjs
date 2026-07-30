
const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'sections');

const replacements = {
  'Hero.jsx': (content) => {
    content = content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, (match, offset, str) => {
      if (str.substring(0, offset).includes('exterior-bg')) return 'src="/images/hero_exterior.jpg"';
      return 'src="/images/hero_interior.jpg"';
    });
    return content;
  },
  'FloorTiles.jsx': (content) => content.replace(/image:\s*'https:\/\/picsum\.photos[^']+'/g, "image: '/images/marble_slab.jpg'"),
  'WallTiles.jsx': (content) => content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, 'src="/images/marble_slab.jpg"'),
  'BathroomTiles.jsx': (content) => content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, 'src="/images/bathroom_tiles.jpg"'),
  'KitchenTiles.jsx': (content) => content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, 'src="/images/kitchen_tiles.jpg"'),
  'OutdoorTiles.jsx': (content) => {
    let count = 0;
    return content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, () => {
      count++;
      return count === 1 ? 'src="/images/hero_exterior.jpg"' : 'src="/images/marble_slab.jpg"';
    });
  },
  'LargeFormatSlabs.jsx': (content) => content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, 'src="/images/marble_slab.jpg"'),
  'InteriorGallery.jsx': (content) => {
    const imgs = ['/images/bathroom_tiles.jpg', '/images/kitchen_tiles.jpg', '/images/hero_interior.jpg', '/images/marble_slab.jpg', '/images/hero_exterior.jpg'];
    let count = 0;
    return content.replace(/image:\s*'https:\/\/picsum\.photos[^']+'/g, () => {
      return `image: '${imgs[count++ % imgs.length]}'`;
    });
  },
  'ManufacturingStory.jsx': (content) => content.replace(/src="https:\/\/picsum\.photos[^"]+"/g, 'src="/images/marble_slab.jpg"')
};

for (const [file, replaceFn] of Object.entries(replacements)) {
  const filePath = path.join(sectionsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = replaceFn(content);
    fs.writeFileSync(filePath, content);
  }
}
console.log('Images updated to local tile images!');




