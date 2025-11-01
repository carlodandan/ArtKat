#!/usr/bin/env python3
"""
Advanced WebP Batch Converter
"""

import os
from PIL import Image
from pathlib import Path
import threading
from concurrent.futures import ThreadPoolExecutor
import time

class WebPConverter:
    def __init__(self, quality=80, max_workers=4):
        self.quality = quality
        self.max_workers = max_workers
        self.supported_formats = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
    
    def convert_single(self, input_path, output_path, resize=None):
        """Convert single image with error handling"""
        try:
            with Image.open(input_path) as img:
                # Convert to RGB
                if img.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize if needed
                if resize:
                    img.thumbnail(resize, Image.Resampling.LANCZOS)
                
                # Save as WebP
                img.save(output_path, 'WEBP', quality=self.quality, optimize=True)
                
                original_size = os.path.getsize(input_path)
                new_size = os.path.getsize(output_path)
                compression = (1 - new_size / original_size) * 100
                
                return {
                    'success': True,
                    'original_size': original_size,
                    'new_size': new_size,
                    'compression': compression
                }
                
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def process_batch(self, file_list, output_dir, resize=None):
        """Process multiple files in parallel"""
        results = []
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            futures = []
            
            for input_path in file_list:
                output_path = output_dir / input_path.with_suffix('.webp').name
                output_path.parent.mkdir(parents=True, exist_ok=True)
                
                future = executor.submit(self.convert_single, input_path, output_path, resize)
                futures.append((input_path, future))
            
            for input_path, future in futures:
                result = future.result()
                result['file'] = input_path.name
                results.append(result)
                
                if result['success']:
                    print(f"✅ {input_path.name} - {result['compression']:.1f}% smaller")
                else:
                    print(f"❌ {input_path.name} - {result['error']}")
        
        return results

def find_images(directory, recursive=True):
    """Find all images in directory"""
    directory = Path(directory)
    formats = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
    
    if recursive:
        return [f for f in directory.rglob('*') if f.is_file() and f.suffix.lower() in formats]
    else:
        return [f for f in directory.glob('*') if f.is_file() and f.suffix.lower() in formats]

# Quick usage function
def quick_convert(input_dir, output_dir=None, quality=75, resize=None):
    """Quick conversion function for common use cases"""
    if output_dir is None:
        output_dir = Path(input_dir) / 'webp_converted'
    
    converter = WebPConverter(quality=quality)
    images = find_images(input_dir, recursive=True)
    
    print(f"🖼️  Found {len(images)} images to convert...")
    
    start_time = time.time()
    results = converter.process_batch(images, Path(output_dir), resize)
    
    successful = [r for r in results if r['success']]
    total_original = sum(r['original_size'] for r in successful)
    total_new = sum(r['new_size'] for r in successful)
    total_compression = (1 - total_new / total_original) * 100
    
    print(f"\n🎉 Conversion completed in {time.time() - start_time:.1f}s")
    print(f"📊 Results: {len(successful)}/{len(images)} successful")
    print(f"💾 Total size: {total_original/1024/1024:.1f}MB → {total_new/1024/1024:.1f}MB")
    print(f"📉 Overall compression: {total_compression:.1f}%")

if __name__ == "__main__":
    # Example usage
    quick_convert('./artkat/public/personal', './artkat/public/personal_webp', quality=75)