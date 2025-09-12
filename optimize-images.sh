#!/bin/bash

# Install required tools if not already installed
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    brew install imagemagick
fi

if ! command -v cwebp &> /dev/null; then
    echo "Installing WebP tools..."
    brew install webp
fi

# Create optimized directory if it doesn't exist
mkdir -p assets/img/optimized

# Optimize images
for img in assets/img/*.{jpg,jpeg,png}; do
    if [ -f "$img" ]; then
        filename=$(basename -- "$img")
        name="${filename%.*}"
        ext="${filename##*.}"
        
        echo "Optimizing $filename..."
        
        # Create WebP version
        cwebp -q 80 "$img" -o "assets/img/optimized/${name}.webp"
        
        # Create optimized JPEG/PNG
        if [ "$ext" = "jpg" ] || [ "$ext" = "jpeg" ]; then
            convert "$img" -resize "1200x1200>" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB "assets/img/optimized/${name}.${ext}"
        else
            convert "$img" -resize "1200x1200>" -strip -quality 85 -interlace PNG "assets/img/optimized/${name}.${ext}"
        fi
    fi
done

echo "Image optimization complete. Optimized images are in assets/img/optimized/"
