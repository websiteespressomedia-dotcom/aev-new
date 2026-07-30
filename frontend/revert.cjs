const fs = require('fs');
const path = require('path');

const dir = 'src/sections';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx')) {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Remove ScrollContext imports
    content = content.replace(/import \{ ScrollContext \} from '\.\.\/context\/ScrollContext';\r?\n/g, "");
    content = content.replace(/import \{ ScrollContext \} from '\.\.\/App';\r?\n/g, "");
    
    // Remove scrollTween hook
    content = content.replace(/\s*const scrollTween = useContext\(ScrollContext\);\r?\n/g, "\n");
    
    // Remove horizontal triggers
    content = content.replace(/\s*horizontal:\s*true,\r?\n/g, "\n");
    content = content.replace(/\s*containerAnimation:\s*scrollTween,\r?\n/g, "\n");
    
    // Remove early returns
    content = content.replace(/\s*if \(!scrollTween\) return;\r?\n/g, "\n");
    
    // Fix dependency array
    content = content.replace(/, \[scrollTween\]/g, ", []");
    
    fs.writeFileSync(p, content);
    console.log("Reverted " + file);
  }
});
