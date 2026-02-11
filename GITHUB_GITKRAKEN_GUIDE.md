# 🐙 GitHub + GitKraken Deployment Guide

Complete guide to push your code to GitHub using GitKraken, then deploy to your home server.

## 📋 Prerequisites

- [x] GitKraken installed
- [x] GitHub account created
- [x] Code is working locally

## 🚀 Part 1: Push to GitHub with GitKraken

### Step 1: Initialize Repository

1. **Open GitKraken**
2. **File** → **Init Repo**
3. Select:
   - **Local Only** (we'll add remote later)
   - **Path**: `C:\Users\mano\Desktop\manosalvatore\Eline`
   - Leave other options default

**Or if already initialized:**
- File → Open Repo
- Navigate to your Eline folder

### Step 2: Review Files to Commit

In GitKraken, you'll see **Unstaged Files** in the right panel.

**✅ Files you SHOULD commit:**
- All `.md` documentation files
- All `.ts` and `.tsx` source files
- `package.json` and `package-lock.json`
- `app.json`, `babel.config.js`, `metro.config.js`
- `tsconfig.json`
- `assets/icon.png`, `assets/splash-icon.png`, etc.
- `assets/photos/README.md` (template)

**❌ Files you should NOT commit (already ignored):**
- `node_modules/` - Too large, will be installed on server
- `dist/` - Build output, will be created on server
- `.expo/` - Expo cache
- `assets/photos/*.jpg` - Your personal photos (privacy!)
- `.env` files - Sensitive data

**Good news:** Your `.gitignore` is already set up correctly! ✅

### Step 3: Stage All Files

1. In GitKraken, right panel shows **Unstaged Files**
2. Click **Stage all changes** button
3. Review that only appropriate files are staged
4. If you see personal photos, they should already be ignored

### Step 4: Make Initial Commit

1. At the bottom, in **Commit Message** box:
   ```
   Initial commit: Valentine's PWA for Eline ❤️
   
   - React Expo PWA with 10 memory chapters
   - Interactive Valentine's gift reveal
   - Bento box navigation menu
   - Password-protected entry
   - PWA installable on mobile
   - Complete documentation
   ```

2. Click **Commit changes to 1 file** (or however many files)

### Step 5: Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to [github.com](https://github.com)
2. Click **+** → **New repository**
3. Settings:
   - **Repository name**: `eline-valentines-pwa`
   - **Description**: `A Valentine's Day surprise PWA for Eline`
   - **Private** ✅ (Keep it private so it stays a surprise!)
   - **Don't** initialize with README (you already have one)
4. Click **Create repository**

**Option B: Via GitKraken**
1. In GitKraken, click **Push** button (top toolbar)
2. Click **GitHub.com**
3. Name: `eline-valentines-pwa`
4. Description: `A Valentine's Day surprise PWA for Eline`
5. **Private** ✅
6. Click **Create Remote and Push**

### Step 6: Connect Remote (if using Option A)

If you created repo on GitHub website:

1. Copy the SSH or HTTPS URL from GitHub:
   ```
   https://github.com/YOUR-USERNAME/eline-valentines-pwa.git
   ```

2. In GitKraken:
   - Click **+** on **REMOTE** in left sidebar
   - Name: `origin`
   - URL: Paste your GitHub URL
   - Click **Add Remote**

3. Push your code:
   - Click **Push** button (top toolbar)
   - Select `origin/main`
   - Click **Submit**

### Step 7: Verify on GitHub

1. Go to your repository on GitHub
2. Check that all files are there (except ignored ones)
3. Verify `assets/photos/` only has `README.md` ✅

---

## 🏠 Part 2: Deploy to Your Server from GitHub

### Step 1: SSH to Your Server

```bash
ssh user@your-server-ip
```

### Step 2: Install Node.js (if not installed)

```bash
# Check if Node is installed
node --version

# If not installed (Ubuntu/Debian):
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Step 3: Clone Repository

```bash
# Navigate to web directory
cd /var/www

# Clone from GitHub
sudo git clone https://github.com/YOUR-USERNAME/eline-valentines-pwa.git eline.manosalvatore.com

# If private repo, you'll need to authenticate:
# Option 1: HTTPS with Personal Access Token
# Option 2: SSH key (recommended)

# Set ownership
sudo chown -R $USER:$USER /var/www/eline.manosalvatore.com
cd /var/www/eline.manosalvatore.com
```

**If using Private Repo (recommended):**

**Setup SSH Key:**
```bash
# On your server
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter for all prompts

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# 1. Go to GitHub → Settings → SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste the key
# 4. Save

# Clone using SSH
sudo git clone git@github.com:YOUR-USERNAME/eline-valentines-pwa.git eline.manosalvatore.com
```

### Step 4: Install Dependencies

```bash
cd /var/www/eline.manosalvatore.com
npm install
```

This will take a few minutes. It downloads all packages from `package.json`.

### Step 5: Add Your Photos

```bash
# Upload your photos to the server
# Using SCP from your local machine:

# On your LOCAL machine (PowerShell):
scp assets/photos/*.jpg user@server:/var/www/eline.manosalvatore.com/assets/photos/
```

### Step 6: Build the App

```bash
cd /var/www/eline.manosalvatore.com
npm run build:web
```

This creates the `dist/` folder with your production app.

### Step 7: Configure Web Server

Follow the Nginx/Apache configuration from **`HOME_SERVER_DEPLOYMENT.md`**

Quick Nginx setup:
```bash
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com
# Paste config from HOME_SERVER_DEPLOYMENT.md

sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 8: Setup HTTPS

```bash
sudo certbot --nginx -d eline.manosalvatore.com
```

### Step 9: Test

Open browser: `https://eline.manosalvatore.com`

---

## 🔄 Part 3: Updating the App

### When You Make Changes Locally

**In GitKraken:**

1. Make your changes (edit files)
2. Stage changed files
3. Commit with descriptive message:
   ```
   Update Valentine's gift messages
   ```
4. Click **Push** to send to GitHub

**On Your Server:**

```bash
ssh user@server
cd /var/www/eline.manosalvatore.com

# Pull latest changes
git pull origin main

# Rebuild
npm run build:web

# No server restart needed!
```

**That's it!** Changes are live in ~1 minute.

---

## 📂 Repository Structure on GitHub

What gets committed:
```
eline-valentines-pwa/
├── .gitignore                  ✅ Committed
├── README.md                   ✅ Committed
├── package.json                ✅ Committed
├── app.json                    ✅ Committed
├── src/                        ✅ Committed (all code)
├── assets/
│   ├── icon.png               ✅ Committed
│   ├── splash-icon.png        ✅ Committed
│   └── photos/
│       └── README.md          ✅ Committed
│       └── *.jpg              ❌ NOT committed (private!)
├── node_modules/              ❌ NOT committed (too large)
├── dist/                      ❌ NOT committed (build output)
└── .expo/                     ❌ NOT committed (cache)
```

---

## 🔐 Security Best Practices

### Keep Private

- ✅ Keep repository **Private** on GitHub
- ✅ Don't commit personal photos
- ✅ Don't commit `.env` files
- ✅ Don't share GitHub URL publicly

### Use Deploy Keys (Optional but Recommended)

Create a deploy key for your server:
```bash
# On server
ssh-keygen -t ed25519 -C "deploy-key-eline" -f ~/.ssh/deploy_eline
cat ~/.ssh/deploy_eline.pub

# Add to GitHub:
# Repo → Settings → Deploy keys → Add deploy key
# ✅ Check "Allow write access" if you want to push from server
```

---

## 🐛 Troubleshooting

### GitKraken: "Authentication Failed"

**Solution:** 
1. GitKraken → Preferences → Authentication
2. Connect GitHub account
3. Authorize GitKraken

### Git Clone: "Permission Denied"

**Solution:**
```bash
# Make sure SSH key is added to GitHub
ssh -T git@github.com
# Should say: "Hi USERNAME! You've successfully authenticated"
```

### Server: "npm: command not found"

**Solution:** Install Node.js (see Step 2 above)

### Build Fails on Server

**Check:**
```bash
# Enough disk space?
df -h

# Enough memory?
free -h

# Check error logs
cat /var/log/nginx/error.log
```

---

## ✅ Deployment Checklist

### Before First Push to GitHub

- [ ] Code works locally (`npm run web`)
- [ ] `.gitignore` is correct (don't commit photos)
- [ ] Repository is **Private** on GitHub
- [ ] All documentation is ready

### After Push to GitHub

- [ ] Repository shows all files (except ignored)
- [ ] No personal photos are visible
- [ ] README is readable

### On Server

- [ ] Repository cloned successfully
- [ ] `npm install` completed
- [ ] Photos uploaded manually
- [ ] `npm run build:web` succeeded
- [ ] Nginx/Apache configured
- [ ] HTTPS certificate installed
- [ ] Site loads at https://eline.manosalvatore.com
- [ ] PWA installable on mobile

---

## 💡 Quick Reference Commands

**Local (GitKraken):**
- Stage → Commit → Push

**Server (Initial Setup):**
```bash
git clone <your-repo>
npm install
npm run build:web
```

**Server (Updates):**
```bash
git pull
npm run build:web
```

---

## 🎉 You're Done!

Your workflow is now:

```
Local PC (GitKraken)
  ↓ Make changes
  ↓ Commit & Push
GitHub (Code Storage)
  ↓ git pull
Home Server
  ↓ npm run build:web
Live at eline.manosalvatore.com ✨
```

**Ready to surprise Eline!** 💝🎉

---

See also:
- `HOME_SERVER_DEPLOYMENT.md` - Complete server setup
- `DEPLOYMENT_CHECKLIST.md` - Quick checklist
