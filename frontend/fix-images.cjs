const fs = require('fs');
const path = require('path');

function replaceInFile(file, index) {
  let content = fs.readFileSync(file, 'utf8');
  let matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[^"'\s]+/g);
  if (matches) {
    matches.forEach((match, i) => {
      content = content.replace(match, 'https://picsum.photos/seed/aurora' + index + i + '/1920/1080');
    });
    fs.writeFileSync(file, content);
  }
}

const sectionsDir = path.join(__dirname, 'src', 'sections');
const files = fs.readdirSync(sectionsDir)
  .filter(f => f.endsWith('.jsx'))
  .map(f => path.join(sectionsDir, f));

files.forEach((f, i) => replaceInFile(f, i));
console.log('Images replaced!');

