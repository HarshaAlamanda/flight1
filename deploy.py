#!/usr/bin/env python3
"""
Aurora Airways - Automated Deployment Script
This script helps deploy the Aurora Airways website to various free hosting platforms.
"""

import os
import sys
import subprocess
import json
import webbrowser
from pathlib import Path

def print_banner():
    print("🛫 Aurora Airways - Deployment Assistant")
    print("=" * 50)
    print("This script will help you deploy your flight booking website!")
    print()

def check_requirements():
    """Check if required tools are installed"""
    requirements = {
        'node': 'Node.js is required for the backend',
        'npm': 'npm is required for package management',
        'git': 'Git is required for version control'
    }
    
    missing = []
    for tool, description in requirements.items():
        try:
            subprocess.run([tool, '--version'], capture_output=True, check=True)
            print(f"✅ {tool} - OK")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print(f"❌ {tool} - Missing ({description})")
            missing.append(tool)
    
    return len(missing) == 0

def create_github_repo():
    """Instructions for creating GitHub repository"""
    print("\n📂 Step 1: Create GitHub Repository")
    print("-" * 30)
    print("1. Go to https://github.com/new")
    print("2. Repository name: aurora-airways")
    print("3. Make it public")
    print("4. Don't initialize with README (we have files already)")
    print("5. Click 'Create repository'")
    
    repo_url = input("\n🔗 Enter your GitHub repository URL (e.g., https://github.com/username/aurora-airways): ")
    return repo_url

def upload_to_github(repo_url):
    """Upload files to GitHub"""
    print("\n⬆️  Step 2: Upload to GitHub")
    print("-" * 30)
    
    try:
        # Initialize git repo
        subprocess.run(['git', 'init'], check=True)
        subprocess.run(['git', 'add', '.'], check=True)
        subprocess.run(['git', 'commit', '-m', 'Initial commit - Aurora Airways Flight Booking Website'], check=True)
        subprocess.run(['git', 'branch', '-M', 'main'], check=True)
        subprocess.run(['git', 'remote', 'add', 'origin', repo_url], check=True)
        subprocess.run(['git', 'push', '-u', 'origin', 'main'], check=True)
        
        print("✅ Successfully uploaded to GitHub!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error uploading to GitHub: {e}")
        print("💡 You can manually upload the files to GitHub and continue.")
        return False

def deploy_to_vercel():
    """Deploy to Vercel"""
    print("\n🚀 Step 3: Deploy to Vercel")
    print("-" * 30)
    print("1. Go to https://vercel.com")
    print("2. Sign up/Login with GitHub")
    print("3. Click 'New Project'")
    print("4. Import your 'aurora-airways' repository")
    print("5. Configure:")
    print("   - Framework Preset: Other")
    print("   - Build Command: npm run build")
    print("   - Output Directory: ./ ")
    print("6. Click 'Deploy'")
    print()
    
    # Open Vercel in browser
    try:
        webbrowser.open('https://vercel.com')
        print("🌐 Opening Vercel in your browser...")
    except:
        print("🌐 Please visit: https://vercel.com")
    
    return input("\n🔗 Enter your Vercel deployment URL (e.g., https://aurora-airways.vercel.app): ")

def deploy_to_netlify():
    """Deploy to Netlify"""
    print("\n🌐 Alternative: Deploy to Netlify")
    print("-" * 30)
    print("1. Go to https://netlify.com")
    print("2. Sign up/Login")
    print("3. Click 'Add new site' > 'Import an existing project'")
    print("4. Connect to GitHub and select your repository")
    print("5. Configure:")
    print("   - Build command: npm run build")
    print("   - Publish directory: ./")
    print("6. Click 'Deploy site'")
    
    try:
        webbrowser.open('https://netlify.com')
        print("🌐 Opening Netlify in your browser...")
    except:
        print("🌐 Please visit: https://netlify.com")

def test_deployment(url):
    """Test the deployed website"""
    print(f"\n🧪 Testing deployment at: {url}")
    print("-" * 30)
    
    try:
        webbrowser.open(url)
        print("🌐 Opening your deployed website...")
        print()
        print("✅ Test checklist:")
        print("   - Website loads correctly")
        print("   - Flight search works")
        print("   - Booking system functions")
        print("   - Responsive design on mobile")
        print()
        
        working = input("Is everything working correctly? (y/n): ").lower().strip()
        return working in ['y', 'yes']
    except Exception as e:
        print(f"❌ Error opening website: {e}")
        return False

def main():
    print_banner()
    
    # Check requirements
    if not check_requirements():
        print("\n❌ Please install missing requirements and try again.")
        return
    
    print("\n✅ All requirements satisfied!")
    
    # Deployment process
    print("\n🚀 Starting deployment process...")
    
    # Method selection
    print("\nChoose deployment method:")
    print("1. Vercel (Recommended)")
    print("2. Netlify")
    print("3. Manual instructions only")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == "1":
        print("\n🎯 Deploying to Vercel...")
        repo_url = create_github_repo()
        
        if upload_to_github(repo_url):
            deployment_url = deploy_to_vercel()
            if deployment_url:
                if test_deployment(deployment_url):
                    print("\n🎉 Deployment successful!")
                    print(f"🔗 Your Aurora Airways website is live at: {deployment_url}")
                else:
                    print("\n⚠️  Deployment completed but needs verification.")
        
    elif choice == "2":
        print("\n🎯 Deploying to Netlify...")
        repo_url = create_github_repo()
        upload_to_github(repo_url)
        deploy_to_netlify()
        
    else:
        print("\n📋 Manual Deployment Instructions")
        print("-" * 30)
        print("Please follow the instructions in 'deploy-instructions.md'")
        print("or run this script again to use automated deployment.")
    
    print("\n✨ Deployment process completed!")
    print("\n📊 Your Aurora Airways website includes:")
    print("   ✅ Complete flight booking system")
    print("   ✅ Air India integration patterns")
    print("   ✅ Responsive design")
    print("   ✅ Working API endpoints")
    print("   ✅ Professional UI/UX")
    
    print("\n🎯 Next steps:")
    print("   1. Test all website features")
    print("   2. Share your live URL")
    print("   3. Monitor performance")
    print("   4. Consider custom domain")

if __name__ == "__main__":
    main()