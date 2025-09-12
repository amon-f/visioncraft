const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  try {
    const imgDir = path.join(__dirname, 'assets/img');
    const optimizedDir = path.join(imgDir, 'optimized');
    
    // Create optimized directory if it doesn't exist
    await fs.mkdir(optimizedDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(imgDir);
    const imageFiles = files.filter(file => 
      /.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(imgDir, file);
      const outputPath = path.join(optimizedDir, file);
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);
      
      try {
        console.log(`Optimizing ${file}...`);
        
        // Create a sharp instance
        const image = sharp(inputPath);
        
        // Resize and optimize based on file type
        const metadata = await image.metadata();
        const isTransparent = metadata.hasAlpha;
        
        // Resize if width is greater than 2000px
        if (metadata.width > 2000) {
          image.resize(2000);
        }
        
        // Optimize based on file type
        if (ext === '.png' || isTransparent) {
          await image.png({
            quality: 85,
            compressionLevel: 9,
            adaptiveFiltering: true,
            force: false
          }).toFile(outputPath);
          
          // Also create WebP version
          await sharp(inputPath)
            .resize(metadata.width > 2000 ? 2000 : null)
            .webp({ quality: 85 })
            .toFile(path.join(optimizedDir, `${name}.webp`));
        } else {
          // For JPEG/JPG
          await image.jpeg({
            quality: 85,
            mozjpeg: true,
            chromaSubsampling: '4:4:4',
            force: false
          }).toFile(outputPath);
          
          // Also create WebP version
          await sharp(inputPath)
            .resize(metadata.width > 2000 ? 2000 : null)
            .webp({ quality: 85 })
            .toFile(path.join(optimizedDir, `${name}.webp`));
        }
        
        console.log(`✓ Optimized ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err.message);
      }
    }
    
    console.log('\nImage optimization complete!');
    console.log(`Optimized images saved to: ${optimizedDir}`);
  } catch (err) {
    console.error('Error during optimization:', err);
    process.exit(1);
  }
}

optimizeImages();
