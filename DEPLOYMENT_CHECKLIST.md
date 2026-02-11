# ✅ Deployment Checklist - Home Server

Quick checklist to deploy to your home server successfully.

## Pre-Deployment ✅

- [ ] **App works locally**
  ```bash
  npm run web
  # Test everything in browser
  ```

- [ ] **All content ready**
  - [ ] All 10 memories have content
  - [ ] All photos added and working
  - [ ] Valentine's gift reveal works
  - [ ] Password screen works ("Fest")

- [ ] **Domain ready**
  - [ ] DNS points to your home server IP
  - [ ] Port forwarding set up (80, 443)
  - [ ] Firewall allows HTTP/HTTPS

## Build & Upload ✅

- [ ] **Build the app**
  ```bash
  npm run build:web
  ```
  ✅ Check `dist/` folder is created

- [ ] **Upload to server**
  ```bash
  # Choose one:
  
  # Option A: SCP
  scp -r dist/* user@server:/var/www/eline.manosalvatore.com/
  
  # Option B: Git
  ssh user@server
  cd /var/www/eline.manosalvatore.com
  git pull
  npm run build:web
  
  # Option C: FTP (FileZilla/WinSCP)
  # Upload dist/* to web root
  ```

## Server Configuration ✅

- [ ] **Web server configured**
  - [ ] Nginx or Apache config created
  - [ ] SPA routing enabled (`try_files` or `.htaccess`)
  - [ ] MIME types set correctly
  - [ ] Root points to dist folder

- [ ] **HTTPS configured** (REQUIRED!)
  ```bash
  sudo certbot --nginx -d eline.manosalvatore.com
  ```
  ✅ Check: Browser shows 🔒 lock icon

- [ ] **Permissions set**
  ```bash
  sudo chown -R www-data:www-data /var/www/eline.manosalvatore.com
  sudo chmod -R 755 /var/www/eline.manosalvatore.com
  ```

## Testing ✅

### On Desktop
- [ ] Open `https://eline.manosalvatore.com`
- [ ] ✅ Site loads
- [ ] ✅ HTTPS (lock icon)
- [ ] ✅ Password screen works
- [ ] ✅ Can navigate to bento menu
- [ ] ✅ Can open memories
- [ ] ✅ Arrow buttons work
- [ ] ✅ Images load
- [ ] ✅ No console errors (F12)

### On Mobile (Critical!)
- [ ] Open in Safari (iPhone) or Chrome (Android)
- [ ] ✅ Site loads
- [ ] ✅ Password screen works
- [ ] ✅ Touch navigation works
- [ ] ✅ Scrolling works
- [ ] ✅ Arrow buttons large enough to tap
- [ ] ✅ Valentine's gifts tap to reveal
- [ ] ✅ All images load

### PWA Installation
- [ ] **iPhone (Safari)**
  - [ ] Install prompt shows or manual install available
  - [ ] Share → Add to Home Screen works
  - [ ] App icon appears on home screen
  - [ ] Opens full-screen (no browser bars)

- [ ] **Android (Chrome)**
  - [ ] Install banner shows
  - [ ] Three dots → Install app works
  - [ ] App appears in app drawer

## Final Checks ✅

- [ ] **QR Code ready**
  - [ ] Generated at qr-code-generator.com
  - [ ] Points to `https://eline.manosalvatore.com`
  - [ ] Scanned and tested
  - [ ] Printed on nice paper

- [ ] **Content review**
  - [ ] All text is correct (no typos)
  - [ ] All dates are correct
  - [ ] Photos are the right ones
  - [ ] Valentine's messages are perfect

- [ ] **Privacy**
  - [ ] Only she knows the password ("Fest")
  - [ ] Domain is not indexed by Google (yet)

## Launch Day (Valentine's) 💝

- [ ] Server is running
- [ ] Site is accessible
- [ ] Phone is charged (for scanning QR)
- [ ] You're ready to see her reaction!

---

## Quick Command Reference

**Build:**
```bash
npm run build:web
```

**Upload (SCP):**
```bash
scp -r dist/* user@server:/var/www/eline.manosalvatore.com/
```

**Reload Nginx:**
```bash
sudo systemctl reload nginx
```

**Check Logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Test HTTPS:**
```bash
curl -I https://eline.manosalvatore.com
# Should return: 200 OK
```

---

## If Something Goes Wrong 🆘

### Site won't load
1. Check server is running: `sudo systemctl status nginx`
2. Check DNS: `nslookup eline.manosalvatore.com`
3. Check firewall: `sudo ufw status`
4. Check logs: `sudo tail -f /var/log/nginx/error.log`

### PWA won't install
1. MUST have HTTPS (🔒 in browser)
2. Must use Safari on iPhone
3. Check manifest: `https://eline.manosalvatore.com/manifest.json`

### Images missing
1. Check file paths in console (F12)
2. Check permissions: `ls -la /var/www/eline.manosalvatore.com/dist/assets/`
3. Re-upload photos

---

**When everything is ✅, you're ready to surprise Eline! 🎉💝**

See `HOME_SERVER_DEPLOYMENT.md` for detailed instructions.
