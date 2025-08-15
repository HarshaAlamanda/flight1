# Aurora Airways - Deployment Instructions

## 🚀 Deploy to Vercel (Recommended - FREE)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Create a GitHub Repository**
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Name it `aurora-airways` or similar
   - Upload all the project files to this repository

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Select your Aurora Airways repository
   - Vercel will automatically detect it's a Node.js project
   - Click "Deploy"

3. **Your Live URL**
   - Vercel will provide a live URL like: `https://aurora-airways-xyz.vercel.app`
   - Your website will be live in 2-3 minutes!

### Option 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy the project
vercel --prod

# Follow the prompts:
# - Set up and deploy? [Y/n] Y
# - Which scope? [Your account]
# - Link to existing project? [N]
# - Project name? aurora-airways
# - Directory? ./
```

## 🌐 Alternative Deployment Options

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `./`

### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-deploy your Node.js app

### Deploy to Render
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Choose "Web Service"
4. Set start command: `npm start`

## 📋 Pre-Deployment Checklist

✅ **Files Ready for Deployment:**
- `index.html` - Frontend website
- `styles.css` - Styling
- `script.js` - Frontend JavaScript (with production API URLs)
- `backend.js` - Node.js server (Vercel-compatible)
- `package.json` - Dependencies
- `vercel.json` - Vercel configuration
- `README.md` - Documentation

✅ **Configuration:**
- Backend configured for serverless deployment
- API endpoints properly routed
- Frontend updated to use production URLs
- All dependencies included in package.json

## 🎯 Expected Result

After deployment, you'll have:
- **Live Website**: Your Aurora Airways booking site accessible worldwide
- **Working API**: All flight search and booking functionality
- **Professional URL**: Custom domain or platform subdomain
- **HTTPS**: Automatic SSL certificate
- **Global CDN**: Fast loading worldwide

## 🔧 Troubleshooting

### Common Issues:
1. **Build Fails**: Check if all dependencies are in package.json
2. **API Not Working**: Verify vercel.json routing configuration
3. **Frontend Issues**: Ensure API_BASE_URL is correctly set in script.js

### Support:
- Check Vercel logs in the dashboard
- Verify all files are uploaded correctly
- Ensure Node.js version compatibility

## 📊 Performance After Deployment

Expected metrics on free hosting:
- **Load Time**: <2 seconds globally
- **Uptime**: 99.9%
- **API Response**: <500ms
- **Concurrent Users**: Handles hundreds
- **Monthly Requests**: Up to 100k free on Vercel

---

**Status**: Ready for deployment ✅  
**Estimated Deploy Time**: 2-5 minutes  
**Cost**: FREE on all recommended platforms