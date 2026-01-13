# Portfolio Deployment Guide

## 🚀 Free Deployment Options (Student Pack Compatible)

### Option 1: Vercel (Recommended - Easiest)

**Steps:**
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tharr-me/Portfolio.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub (use student email for perks)
4. Click "New Project"
5. Import your GitHub repository
6. Vercel auto-detects Vite settings ✅
7. Click "Deploy"

**Your site will be live at:** `https://your-project.vercel.app`

### Option 2: Netlify

**Steps:**
1. Push code to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Netlify auto-detects settings ✅
6. Click "Deploy site"

**Your site will be live at:** `https://your-project.netlify.app`

### Option 3: GitHub Pages (100% Free)

**Steps:**
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Add to vite.config.js:
   ```js
   base: '/Portfolio/'
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

**Your site will be live at:** `https://tharr-me.github.io/Portfolio/`

### Option 4: Cloudflare Pages

**Steps:**
1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

## 🎓 GitHub Student Developer Pack Benefits

If you have the Student Pack:
- **Vercel Pro** - Free for students
- **Netlify Pro** - Enhanced features
- **DigitalOcean Credits** - $200 credit
- **Heroku Credits** - Platform credits
- **Custom domain** via Namecheap

## 📝 Before Deploying

1. **Build test:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Environment Variables** (if needed later):
   - Don't commit API keys to GitHub
   - Add them in your hosting platform's dashboard

## 🌐 Custom Domain (Optional)

After deploying, you can add a custom domain:
1. Get free domain from Namecheap (Student Pack)
2. Add domain in your hosting dashboard
3. Update DNS settings

## ⚡ Recommended: Vercel

Vercel is the best choice because:
- ✅ Automatic deployments on git push
- ✅ Built-in CI/CD
- ✅ Great performance (CDN)
- ✅ Free SSL certificate
- ✅ Easy rollbacks
- ✅ Preview deployments for branches
