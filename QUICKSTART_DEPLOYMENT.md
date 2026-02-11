# ⚡ Quick Start: GitHub → Server Deployment

Ultra-quick guide to get your app from local machine to live server.

## 🎯 The Complete Flow

```
Your PC → GitKraken → GitHub → Your Server → Live!
  (edit)   (commit)    (store)    (build)     (eline.manosalvatore.com)
```

Time to complete: **~30 minutes**

---

## Part 1: Push to GitHub (10 min)

### Step 1: GitKraken Setup
```
1. Open GitKraken
2. File → Open Repo → Select your Eline folder
3. See all files in right panel
```

### Step 2: First Commit
```
1. Click "Stage all changes"
2. Bottom box, type: "Initial commit: Valentine's PWA for Eline ❤️"
3. Click "Commit"
```

### Step 3: Push to GitHub
```
1. Click "Push" button (top toolbar)
2. Click "GitHub.com"
3. Name: eline-valentines-pwa
4. ✅ Make it PRIVATE
5. Click "Create Remote and Push"
6. Wait ~30 seconds
7. Done! ✅
```

**Verify:** Go to github.com and see your repo

---

## Part 2: Clone to Server (15 min)

### SSH to Server
```bash
ssh user@your-server-ip
```

### Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/YOUR-USERNAME/eline-valentines-pwa.git eline.manosalvatore.com

# If private, you'll need SSH key or token
# See GITHUB_GITKRAKEN_GUIDE.md for SSH setup

sudo chown -R $USER:$USER eline.manosalvatore.com
cd eline.manosalvatore.com
```

### Install & Build
```bash
npm install     # Takes 2-3 minutes
npm run build:web   # Takes 30 seconds
```

### Upload Photos (from your local PC)
```bash
# On your LOCAL machine:
scp assets/photos/*.jpg user@server:/var/www/eline.manosalvatore.com/assets/photos/
```

---

## Part 3: Configure Server (5 min)

### Quick Nginx Config
```bash
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com
```

Paste this minimal config:
```nginx
server {
    listen 80;
    server_name eline.manosalvatore.com;
    root /var/www/eline.manosalvatore.com/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save and enable:
```bash
sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Get HTTPS (Required!)
```bash
sudo certbot --nginx -d eline.manosalvatore.com
```

---

## ✅ Test It!

Open browser: **https://eline.manosalvatore.com**

**Checklist:**
- [ ] Site loads
- [ ] 🔒 HTTPS working
- [ ] Password "Fest" works
- [ ] Can navigate memories
- [ ] Images load
- [ ] On phone: Install prompt shows

**All good?** 🎉 **You're live!**

---

## 🔄 Making Updates Later

### On Your PC:
```
1. Edit files
2. GitKraken: Stage → Commit → Push
```

### On Server:
```bash
ssh user@server
cd /var/www/eline.manosalvatore.com
git pull
npm run build:web
```

**Done!** Updates live in ~1 minute.

---

## 🆘 Quick Troubleshooting

### Site won't load
```bash
sudo systemctl status nginx  # Check if running
sudo tail -f /var/log/nginx/error.log  # Check errors
```

### Images missing
```bash
ls -la /var/www/eline.manosalvatore.com/assets/photos/
# Should show your .jpg files
```

### PWA won't install
- ✅ Must have HTTPS (🔒 in browser)
- ✅ Use Safari on iPhone
- ✅ Check: https://eline.manosalvatore.com/manifest.json

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build:web
```

---

## 📚 Full Guides

For detailed information:

- **`GITHUB_GITKRAKEN_GUIDE.md`** - Complete GitHub setup
- **`GIT_WORKFLOW.md`** - Daily workflow & commands  
- **`HOME_SERVER_DEPLOYMENT.md`** - Full server config
- **`DEPLOYMENT_CHECKLIST.md`** - Complete checklist

---

## 🎯 Summary

**What you did:**
1. ✅ Pushed code to GitHub (private repo)
2. ✅ Cloned to your server
3. ✅ Built the app
4. ✅ Configured web server
5. ✅ Got HTTPS certificate
6. ✅ App is LIVE!

**Time spent:** ~30 minutes  
**Result:** Professional PWA live on your domain! 🚀💝

**Ready for Valentine's Day!** 🎉❤️
