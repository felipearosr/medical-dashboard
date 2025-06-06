// fix-classes.js
const fs = require('fs');
const path = require('path');

function fixTailwindClasses(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && 
        !filePath.includes('node_modules') && 
        !filePath.includes('.next')) {
      fixTailwindClasses(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Reemplazar clases problemáticas
      content = content.replace(/bg-background/g, 'bg-white');
      content = content.replace(/text-foreground/g, 'text-gray-900');
      content = content.replace(/bg-card/g, 'bg-white');
      content = content.replace(/text-card-foreground/g, 'text-gray-900');
      content = content.replace(/bg-popover/g, 'bg-white');
      content = content.replace(/text-popover-foreground/g, 'text-gray-900');
      content = content.replace(/bg-muted/g, 'bg-gray-100');
      content = content.replace(/text-muted-foreground/g, 'text-gray-600');
      content = content.replace(/bg-accent/g, 'bg-gray-50');
      content = content.replace(/text-accent-foreground/g, 'text-gray-900');
      content = content.replace(/border-input/g, 'border-gray-300');
      content = content.replace(/bg-input/g, 'bg-gray-50');
      content = content.replace(/ring-ring/g, 'ring-gray-400');
      content = content.replace(/outline-ring/g, 'outline-gray-400');
      content = content.replace(/border-ring/g, 'border-gray-400');
      content = content.replace(/text-primary-foreground/g, 'text-white');
      content = content.replace(/bg-primary/g, 'bg-[#667eea]');
      content = content.replace(/text-primary/g, 'text-[#667eea]');
      content = content.replace(/placeholder:text-muted-foreground/g, 'placeholder:text-gray-400');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✓ Fixed: ${filePath}`);
      }
    }
  });
}

console.log('🔧 Fixing Tailwind classes...');
fixTailwindClasses('./src');
console.log('✅ Done!');