// update-imports.js
const fs = require('fs');
const path = require('path');

function updateImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && 
        !filePath.includes('node_modules') && 
        !filePath.includes('.next') &&
        !filePath.includes('.git')) {
      updateImports(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Actualizar imports de componentes UI
      content = content.replace(/@\/components\/ui\//g, '@/components/ui/');
      
      // Actualizar imports de otros archivos
      content = content.replace(/@\/components\/dashboard\//g, '@/components/dashboard/');
      content = content.replace(/@\/components\/views\//g, '@/components/views/');
      content = content.replace(/@\/lib\//g, '@/lib/');
      content = content.replace(/@\/hooks\//g, '@/hooks/');
      content = content.replace(/@\/app\//g, '@/app/');
      
      // Solo escribir si hubo cambios
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✓ Updated: ${filePath}`);
      }
    }
  });
}

console.log('🔧 Updating imports...');
updateImports('./src');
console.log('✅ Done!');