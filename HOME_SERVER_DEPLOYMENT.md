# 🏠 Home Server Deployment Guide

Complete guide for deploying the Eline PWA to your home server at `eline.manosalvatore.com`

## 📋 Requirements

### Server Requirements
- ✅ **Web server** (Nginx, Apache, or any static file server)
- ✅ **HTTPS** (required for PWA installation on mobile)
- ✅ **Domain** pointing to your home server
- ✅ **Node.js** installed (for building)

### PWA Requirements
- ⚠️ **MUST have HTTPS** - PWAs don't install without it
- ⚠️ **Must serve from root or subdomain** - Not from /subfolder
- ✅ **Single Page App routing** - All routes serve index.html

## 🚀 Step-by-Step Deployment

### Step 1: Build the App

```bash
# From your project folder
npm run build:web
```

This creates a `dist/` folder with:
```
dist/
├── index.html           # Main entry point
├── manifest.json        # PWA manifest
├── _expo/              # Expo assets
│   └── static/
├── assets/             # Your photos, icons
└── ... (bundled JS/CSS)
```

### Step 2: Transfer to Server

**Option A: SCP/SFTP**
```bash
# Upload dist folder to server
scp -r dist/* user@your-server:/var/www/eline.manosalvatore.com/
```

**Option B: Git**
```bash
# On your server
cd /var/www/eline.manosalvatore.com
git clone your-repo-url .
npm install
npm run build:web
```

**Option C: Manual FTP**
- Use FileZilla or WinSCP
- Upload entire `dist/` folder contents
- To: `/var/www/eline.manosalvatore.com/` or your web root

### Step 3: Configure Web Server

Choose your web server:

---

## 🔷 Nginx Configuration

Create config file:
```bash
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com
```

**Complete Nginx Config:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name eline.manosalvatore.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name eline.manosalvatore.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/eline.manosalvatore.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eline.manosalvatore.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Root directory
    root /var/www/eline.manosalvatore.com/dist;
    index index.html;

    # SPA routing - always serve index.html for app routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Expo assets with correct MIME types
    location ~ \.js$ {
        add_header Content-Type application/javascript;
    }

    location ~ \.json$ {
        add_header Content-Type application/json;
    }

    location ~ \.(jpg|jpeg|png|gif|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # PWA manifest
    location /manifest.json {
        add_header Content-Type application/manifest+json;
        add_header Cache-Control "no-cache";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    gzip_min_length 1000;
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo nginx -t                    # Test config
sudo systemctl reload nginx      # Apply changes
```

---

## 🟧 Apache Configuration

Create `.htaccess` in your dist folder:

```apache
# /var/www/eline.manosalvatore.com/dist/.htaccess

# Enable Rewrite Engine
RewriteEngine On
RewriteBase /

# SPA routing - serve index.html for all routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# MIME types
AddType application/javascript .js
AddType application/json .json
AddType application/manifest+json .webmanifest

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

**Apache Virtual Host:**
```apache
<VirtualHost *:80>
    ServerName eline.manosalvatore.com
    DocumentRoot /var/www/eline.manosalvatore.com/dist

    <Directory /var/www/eline.manosalvatore.com/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/eline_error.log
    CustomLog ${APACHE_LOG_DIR}/eline_access.log combined
</VirtualHost>
```

**Enable and restart:**
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

---

## 🔒 HTTPS Setup (REQUIRED for PWA!)

**Using Let's Encrypt (Free):**

### For Nginx:
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d eline.manosalvatore.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Redirect HTTP to HTTPS: Yes

# Auto-renewal (already set up by certbot)
sudo certbot renew --dry-run
```

### For Apache:
```bash
# Install certbot
sudo apt install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d eline.manosalvatore.com
```

**Certificate will auto-renew every 90 days!**

---

## 🧪 Testing Before Deployment

### Test Build Locally
```bash
# Build
npm run build:web

# Serve locally with HTTPS simulator
npx serve dist -s

# Open in browser
# http://localhost:3000

# Test:
# ✅ All pages load
# ✅ Navigation works
# ✅ Images show
# ✅ No console errors
```

### Test on Local Network
```bash
# Find your local IP
# Windows: ipconfig
# Linux/Mac: ifconfig

# Serve on network
npx serve dist -s -l 3000

# Test from phone on same WiFi
# http://YOUR-LOCAL-IP:3000
```

---

## 🔍 Troubleshooting

### Issue: Site shows "404 Not Found"
**Solution:**
- Check web server is running: `sudo systemctl status nginx`
- Check dist folder path: `ls -la /var/www/eline.manosalvatore.com/dist`
- Check nginx/apache logs: `sudo tail -f /var/log/nginx/error.log`

### Issue: PWA doesn't install on iPhone
**Cause:** Not using HTTPS  
**Solution:** 
- MUST have valid SSL certificate
- Use Let's Encrypt (free)
- Test: Browser should show 🔒 lock icon

### Issue: Images don't load
**Solution:**
```bash
# Check file permissions
sudo chown -R www-data:www-data /var/www/eline.manosalvatore.com/dist
sudo chmod -R 755 /var/www/eline.manosalvatore.com/dist
```

### Issue: "Failed to load resource" in console
**Cause:** Incorrect MIME types  
**Solution:** Use provided nginx/apache config with correct MIME types

### Issue: Blank page after navigation
**Cause:** SPA routing not configured  
**Solution:** Ensure `try_files` (nginx) or `.htaccess` (apache) is set up

### Issue: CSS/JS not loading
**Solution:**
```bash
# Check file paths in browser console
# Ensure all files are in dist folder
ls -R /var/www/eline.manosalvatore.com/dist/_expo/
```

---

## 📱 DNS Configuration

Point your domain to your home server:

**At your domain registrar (Cloudflare, Namecheap, etc.):**

```
Type: A
Name: eline
Value: YOUR-HOME-IP-ADDRESS
TTL: 3600
```

**Or if using dynamic IP:**
```
Type: CNAME
Name: eline
Value: your-ddns-hostname.duckdns.org
```

**Wait for DNS propagation** (5 minutes - 48 hours, usually < 1 hour)

**Check propagation:**
```bash
nslookup eline.manosalvatore.com
# Should return your home IP
```

---

## 🔄 Updating the App

### Quick Update Process:
```bash
# On development machine
npm run build:web

# Transfer to server
scp -r dist/* user@server:/var/www/eline.manosalvatore.com/dist/

# Or if using git:
ssh user@server
cd /var/www/eline.manosalvatore.com
git pull
npm run build:web
```

**No server restart needed!** Just upload new files.

---

## ✅ Final Checklist

Before showing to Eline:

- [ ] Build completes without errors
- [ ] Site loads at https://eline.manosalvatore.com
- [ ] 🔒 HTTPS working (lock icon in browser)
- [ ] All pages navigate correctly
- [ ] Images load
- [ ] Password screen works
- [ ] Arrow buttons navigate memories
- [ ] "Menu" button returns to bento
- [ ] Valentine's gifts reveal works (double-click)
- [ ] PWA install prompt shows on mobile
- [ ] After install, app runs full-screen
- [ ] QR code links to correct URL
- [ ] No console errors (F12 in browser)

---

## 🎯 Quick Start Summary

```bash
# 1. Build
npm run build:web

# 2. Upload to server
scp -r dist/* user@server:/var/www/eline.manosalvatore.com/

# 3. Configure nginx
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com
# (paste config from above)

# 4. Enable site
sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. Get SSL certificate
sudo certbot --nginx -d eline.manosalvatore.com

# 6. Test
# Open https://eline.manosalvatore.com in browser
```

**Done! Your PWA is live!** 🚀💝

---

## 💡 Pro Tips

1. **Dynamic IP?** Use DuckDNS or No-IP for free dynamic DNS
2. **Port forwarding:** Open ports 80 and 443 on your router
3. **Firewall:** Allow HTTP/HTTPS
   ```bash
   sudo ufw allow 'Nginx Full'  # or
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```
4. **Monitor:** Check logs regularly
   ```bash
   sudo tail -f /var/log/nginx/access.log
   ```
5. **Backup:** Keep dist folder backed up
6. **Testing:** Always test on actual phone before Valentine's Day!

---

## 🆘 Need Help?

**Common resources:**
- Nginx docs: https://nginx.org/en/docs/
- Let's Encrypt: https://letsencrypt.org/getting-started/
- Expo web docs: https://docs.expo.dev/distribution/publishing-websites/

**Your app is now ready to amaze Eline!** ❤️✨
