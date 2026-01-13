# 🎛️ Admin Dashboard Setup Guide

## Access Your Admin Dashboard

Once deployed, visit: **https://tharr.me/admin/**

## Setup Steps

### 1. Enable GitHub OAuth

1. Go to your GitHub account → **Settings** → **Developer settings** → **OAuth Apps**
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** Portfolio CMS
   - **Homepage URL:** `https://tharr.me`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
4. Click **Register application**
5. Copy the **Client ID** and generate a **Client Secret**

### 2. For GitHub Pages + Decap CMS

Since you're using GitHub Pages (not Netlify), use GitHub Backend:

The current config uses:
```yaml
backend:
  name: github
  repo: tharr-me/Portofolio
  branch: main
```

**Authentication will happen via GitHub OAuth.**

### Alternative: Use Netlify Identity (Easier)

If you want easier authentication:

1. Deploy to Netlify instead (or in addition to GitHub Pages):
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

2. In Netlify dashboard:
   - Go to **Site settings** → **Identity**
   - Click **Enable Identity**
   - Under **Registration**, select "Invite only"
   - Under **External providers**, enable GitHub
   - Under **Services**, enable Git Gateway

3. Update `config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

## What You Can Manage

### ✅ Projects
- Add/Edit/Delete projects
- Update descriptions, links, technologies
- Change project icons

### ✅ Designs
- Upload design images
- Categorize work
- Add new design pieces

### ✅ Skills
- Update tech stack
- Add new skills/frameworks/tools
- Organize by categories

### ✅ Site Settings
- Change name and tagline
- Update contact info
- Modify typewriter phrases
- Edit about section

## Current Admin Features

**Dashboard URL:** `https://tharr.me/admin/`

**Collections Available:**
1. **Projects** - Manage portfolio projects
2. **Designs** - Upload and categorize design work
3. **Skills** - Tech stack management
4. **Settings** - Personal info and site content

## Usage

1. Visit `https://tharr.me/admin/`
2. Click "Login with GitHub"
3. Authorize the app
4. Start editing!

All changes will create commits to your GitHub repo and auto-deploy.

## For Local Development

To test the CMS locally:

```bash
npm install -g decap-server
decap-server
```

Then visit `http://localhost:8080/admin/`

## Security

- ✅ GitHub OAuth authentication
- ✅ Only you can edit (private repo access)
- ✅ All changes tracked in Git
- ✅ Easy rollback via Git history

## Need Help?

If GitHub OAuth is complex, I recommend:
1. Deploy to Netlify (keeps GitHub Pages too)
2. Use Netlify Identity (much simpler)
3. 1-click authentication setup
