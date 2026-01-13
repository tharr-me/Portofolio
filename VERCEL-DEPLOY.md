# 🚀 Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Deploy via Web (Easiest)

1. **Go to [vercel.com](https://vercel.com/new)**

2. **Sign in with GitHub**
   - Use your GitHub account (tharr-me)

3. **Import Repository**
   - Click "Add New..." → "Project"
   - Select **tharr-me/Portofolio**
   - Click "Import"

4. **Configure Project**
   - **Project Name:** `portfolio` (or keep default)
   - **Framework Preset:** Vite (auto-detected ✅)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (auto-detected ✅)
   - **Output Directory:** `dist` (auto-detected ✅)

5. **Click "Deploy"** 🎉

   Your site will be live at: `https://portfolio-your-username.vercel.app`

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd c:\Users\Tharr-me\Desktop\Portofolio\Portofolio
vercel

# Follow the prompts:
# ? Set up and deploy? Y
# ? Which scope? Your GitHub account
# ? Link to existing project? N
# ? What's your project's name? portfolio
# ? In which directory is your code located? ./
# ? Want to override settings? N

# Deploy to production
vercel --prod
```

## 🌐 Custom Domain Setup (tharr.me)

### Step 1: Add Domain in Vercel

1. Go to your project on Vercel
2. Click **Settings** → **Domains**
3. Add: `tharr.me`
4. Add: `www.tharr.me` (optional)

### Step 2: Configure DNS

Vercel will show you DNS records to add. Go to your domain registrar and add:

**Option A: A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21

Type: A
Name: www
Value: 76.76.21.21
```

**Option B: CNAME Record**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify

- DNS propagation takes 5-60 minutes
- Check status on Vercel dashboard
- Once verified, https://tharr.me will work! ✅

## 🎛️ Admin Dashboard Setup on Vercel

### For Git Gateway (Easier than GitHub OAuth):

1. **Enable Netlify Identity** (works with Vercel too):
   - Deploy to Netlify in addition (free): `npm run build && netlify deploy`
   - Enable Identity in Netlify dashboard
   - Enable Git Gateway

2. **Update CMS Config** in `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

3. **Access Admin**: `https://tharr.me/admin/`

### For GitHub OAuth (Current setup):

1. **Create GitHub OAuth App**:
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - New OAuth App
   - **Homepage URL:** `https://tharr.me`
   - **Callback URL:** `https://api.netlify.com/auth/done`

2. **Save Client ID and Secret**

3. **Use Netlify to handle auth**:
   - Deploy to Netlify too (free)
   - Add GitHub OAuth credentials in Netlify
   - CMS will work on both Vercel (main) and Netlify (auth)

## 🔄 Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel will **automatically rebuild and redeploy** in ~1 minute! 🚀

## ✅ Benefits of Vercel

- ⚡ **Lightning fast** (edge network)
- 🔄 **Auto-deploy** on git push
- 🆓 **Free SSL** (https automatic)
- 🌐 **Custom domains** (free)
- 📊 **Analytics** built-in
- 🔙 **Easy rollbacks**
- 🎯 **No config needed** (works out of the box)

## 🎓 Student Benefits

If you have GitHub Student Pack:
- **Vercel Pro** - Free while student
- **Unlimited** personal projects
- **Custom domains** via Namecheap (free .me domain)
- **Advanced analytics**

## 📝 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
npm run preview
```

### Domain Not Working
- Wait 30-60 min for DNS
- Check DNS records are correct
- Verify domain ownership

### Admin Can't Login
- Use Netlify Identity (easier)
- Or set up GitHub OAuth correctly
- Check callback URL matches

## 🎉 You're Done!

Your portfolio will be live at:
- **Temporary:** `https://portfolio-tharr-me.vercel.app`
- **Custom:** `https://tharr.me` (after DNS setup)

**Admin Dashboard:** `https://tharr.me/admin/`

All changes auto-deploy on git push! 🚀
