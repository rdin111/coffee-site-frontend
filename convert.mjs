import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/images';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.jpeg|\.jpg/, '.webp'));
    
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Converted ${file} to WebP`);
        // We'll keep the JPGs as well just in case, but the app will point to .webp
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  }
}
