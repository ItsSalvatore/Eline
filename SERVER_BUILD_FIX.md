# 🔧 Server Build Fix

## The Issue
You got this error on the server:
```
CommandError: expo export:web can only be used with Webpack. Use expo export for other bundlers.
```

## ✅ Fixed!

I've updated the build script in `package.json` to use the correct command for Metro bundler.

## 🚀 What to Do on Your Server

### Step 1: Pull the Updated package.json
```bash
cd /home/apps/eline
git pull
```

### Step 2: Build with the New Command
```bash
npm run build:web
```

**This now runs:** `npx expo export -p web`

The output will be in the `dist/` folder.

---

## 📝 What Changed

### Before (Broken):
```json
"build:web": "expo export:web"
```
❌ Only works with Webpack bundler

### After (Fixed):
```json
"build:web": "npx expo export -p web"
```
✅ Works with Metro bundler (what you're using)

---

## ⚡ Alternative Commands

If `npm run build:web` still has issues, try:

### Option 1: Direct npx command
```bash
npx expo export -p web
```

### Option 2: With clear cache
```bash
npx expo export -p web --clear
```

### Option 3: Install expo-cli globally
```bash
npm install -g @expo/cli
expo export -p web
```

---

## 🎯 Expected Output

When build succeeds, you should see:
```
Starting Metro Bundler
Bundle  Android (dev)  node_modules/expo/AppEntry.js ░░░░░░░░░░░░░░░░ 100.0%
Bundle  iOS (dev)      node_modules/expo/AppEntry.js ░░░░░░░░░░░░░░░░ 100.0%
Bundle  web (prod)     node_modules/expo/AppEntry.js ░░░░░░░░░░░░░░░░ 100.0%
Exporting web
Export completed
```

And the `dist/` folder will be created with your production build!

---

## 📂 Verify Build

After build completes:
```bash
ls -la dist/
# Should show:
# - index.html
# - manifest.json
# - _expo/
# - assets/
```

---

## 🔄 Next Steps After Build

1. **Make sure photos are uploaded:**
   ```bash
   ls -la assets/photos/
   # Should show your .jpg files
   ```

2. **Copy photos to dist if needed:**
   ```bash
   mkdir -p dist/assets/photos
   cp assets/photos/*.jpg dist/assets/photos/
   ```

3. **Configure Nginx to serve dist/ folder**
   ```nginx
   root /home/apps/eline/dist;
   ```

4. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

5. **Test:**
   Open `https://eline.manosalvatore.com` in browser

---

## 🆘 If npm run build:web Still Fails

### Check Node/npm versions:
```bash
node --version   # Should be v18+
npm --version    # Should be v9+
```

### Update if needed:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Clear everything and retry:
```bash
rm -rf node_modules dist
npm install
npm run build:web
```

### Check package.json was pulled:
```bash
cat package.json | grep build:web
# Should show: "build:web": "npx expo export -p web",
```

---

## ✅ Summary

**Fixed:** `package.json` build script updated  
**Action:** `git pull` on server, then `npm run build:web`  
**Result:** Production build in `dist/` folder ready to serve!

**Now try the build again on your server!** 🚀
