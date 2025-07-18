#!/usr/bin/env python3
"""
Aurora Airways - Deployment Package Creator
Creates a clean deployment package ready for Vercel
"""

import os
import shutil
import zipfile
from pathlib import Path

def create_deployment_package():
    """Create a deployment-ready package"""
    
    print("🛫 Aurora Airways - Creating Deployment Package")
    print("=" * 50)
    
    # Define essential files for deployment
    essential_files = [
        'index.html',
        'styles.css', 
        'script.js',
        'backend.js',
        'package.json',
        'package-lock.json',
        'vercel.json',
        'README.md'
    ]
    
    # Create deployment directory
    deploy_dir = Path('aurora-airways-deploy')
    if deploy_dir.exists():
        shutil.rmtree(deploy_dir)
    deploy_dir.mkdir()
    
    print("📦 Copying essential files...")
    
    # Copy essential files
    copied_files = []
    for file in essential_files:
        if Path(file).exists():
            shutil.copy2(file, deploy_dir / file)
            copied_files.append(file)
            print(f"  ✅ {file}")
        else:
            print(f"  ⚠️  {file} - Not found (skipping)")
    
    # Create deployment instructions
    instructions = """
# 🚀 Aurora Airways - READY TO DEPLOY

## Quick Deploy to Vercel:

1. **Go to**: https://vercel.com/new
2. **Sign up** with GitHub (free)
3. **Drag this entire folder** into Vercel
4. **Click "Deploy"**
5. **🎉 DONE!** - Get your live URL

## What's included:
- ✅ Complete flight booking website
- ✅ Air India integration
- ✅ Working API endpoints  
- ✅ Responsive design
- ✅ Production-ready code

## Your live site will be:
`https://aurora-airways-[random].vercel.app`

## Features working:
- Flight search and booking
- Payment processing simulation
- Mobile check-in system
- Professional UI/UX

## Need help?
See README.md for detailed documentation.

---
**Aurora Airways** - Your Journey Begins Here ✈️
"""
    
    # Write deployment instructions
    with open(deploy_dir / 'DEPLOY.md', 'w') as f:
        f.write(instructions)
    
    print(f"\n📁 Created deployment package: {deploy_dir}")
    print(f"📄 Files included: {len(copied_files)}")
    
    # Create ZIP file for easy download
    zip_path = Path('aurora-airways-deploy.zip')
    if zip_path.exists():
        zip_path.unlink()
    
    print("\n📦 Creating ZIP package...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path in deploy_dir.rglob('*'):
            if file_path.is_file():
                arcname = file_path.relative_to(deploy_dir.parent)
                zipf.write(file_path, arcname)
                print(f"  📄 Added: {arcname}")
    
    print(f"\n✅ Deployment package ready!")
    print(f"📦 ZIP file: {zip_path}")
    print(f"📁 Folder: {deploy_dir}")
    
    print("\n🚀 NEXT STEPS:")
    print("1. Download the ZIP file or use the folder")
    print("2. Go to https://vercel.com/new")
    print("3. Upload/drag the package")
    print("4. Click Deploy")
    print("5. Get your live Aurora Airways website!")
    
    return deploy_dir, zip_path

if __name__ == "__main__":
    create_deployment_package()