# ✅ Pre-Commit Checklist

Before you push to GitHub, make sure everything is perfect!

## 🔍 Code Quality

- [ ] **App runs locally without errors**
  ```bash
  npm run web
  # Open in browser, test everything
  ```

- [ ] **No console errors**
  - Press F12 in browser
  - Check Console tab
  - Should have no red errors

- [ ] **All dependencies installed**
  ```bash
  npm install
  # Should complete without errors
  ```

## 📝 Content Review

- [ ] **All memory texts are correct**
  - No typos
  - Dates are accurate
  - Names spelled correctly
  - Messages convey the right emotion

- [ ] **Valentine's gift messages are perfect**
  - Read each gift message
  - Make sure they're heartfelt and accurate

- [ ] **Password is set correctly**
  - Check `LockScreen.tsx`
  - Should accept "Fest" or "Cafe Fest" (case-insensitive)

## 🖼️ Images & Assets

- [ ] **Photos are added locally** 
  - Check `assets/photos/` folder
  - All 8 memory photos present
  - `us.jpg` for lock screen present

- [ ] **Photos will NOT be committed**
  - `.gitignore` has `assets/photos/*.jpg`
  - This is correct - upload photos to server manually

- [ ] **Icons are working**
  - All pages show correct icons
  - No broken icon references

## 🔐 Privacy & Security

- [ ] **Repository will be PRIVATE**
  - Keep it a surprise!
  - Don't make it public

- [ ] **No sensitive data in code**
  - No API keys
  - No passwords (except the app password which is fine)
  - No personal email addresses

- [ ] **Photos NOT in git**
  - Personal photos stay private
  - Only committed to server, not GitHub

## 📱 Mobile Testing

- [ ] **Tested on actual phone** (if possible)
  - Use `npm run web` and access from phone on same WiFi
  - Or test after deploying

- [ ] **Navigation works**
  - Arrow buttons tap correctly
  - "Menu" button returns to bento
  - Swipe is disabled on memories (correct)

- [ ] **Scrolling works**
  - Can scroll long memory pages
  - No conflicts with navigation

## 🎯 Feature Checklist

- [ ] **Lock screen works**
  - Password "Fest" unlocks app
  - Wrong password shakes and stays locked
  - Background photo shows

- [ ] **Bento menu works**
  - Shows 10 memory cards
  - Cards are tappable
  - "START" badge on first card

- [ ] **Memory navigation works**
  - Arrow buttons navigate between memories
  - Can't go back to bento via arrows (correct)
  - "Menu" button returns to bento

- [ ] **Valentine's reveal works**
  - Memory #10 has gift cards
  - First click shows hint
  - Second click shows full message
  - All 4 gifts can be opened

## 🗂️ Files & Structure

- [ ] **`.gitignore` is correct**
  ```bash
  # Check these lines exist:
  node_modules/
  dist/
  .expo/
  assets/photos/*.jpg
  ```

- [ ] **All docs are up to date**
  - README.md reflects current state
  - No outdated information in guides

- [ ] **No temporary test files**
  - No `test.txt`, `debug.js`, etc.
  - Clean project structure

## 🚀 Build Test

- [ ] **Production build works**
  ```bash
  npm run build:web
  # Should complete without errors
  # Check dist/ folder is created
  ```

- [ ] **Built app works**
  ```bash
  npx serve dist -s
  # Open http://localhost:3000
  # Test the built version
  ```

## 📋 Git Checklist

- [ ] **Meaningful commit message ready**
  ```
  ✅ Good:
  "Initial commit: Valentine's PWA for Eline ❤️"
  
  ❌ Bad:
  "first commit"
  "initial"
  ```

- [ ] **Know what you're committing**
  - Review files in GitKraken
  - Make sure photos are NOT staged
  - Verify only code files are included

## ⚠️ Critical Reminders

### DO Commit:
- ✅ All `.ts` and `.tsx` files
- ✅ `package.json` and `package-lock.json`
- ✅ All `.md` documentation
- ✅ `app.json`, configs
- ✅ `assets/icon.png` (app icons)
- ✅ `assets/photos/README.md`

### DON'T Commit:
- ❌ `node_modules/` folder
- ❌ `dist/` folder
- ❌ `.expo/` folder
- ❌ Personal photos (`assets/photos/*.jpg`)
- ❌ `.env` files

## 🎉 Ready to Commit?

If all boxes are checked:

1. **Open GitKraken**
2. **Stage all changes**
3. **Write commit message:**
   ```
   Initial commit: Valentine's PWA for Eline ❤️
   
   - 10 interactive memory chapters
   - Password-protected entry
   - Interactive Valentine's gift reveal
   - Bento box navigation menu
   - PWA installable on mobile
   - Complete documentation
   ```
4. **Commit**
5. **Push to GitHub** (make sure it's PRIVATE!)

## 📤 After Pushing

- [ ] **Verify on GitHub**
  - Go to your repository
  - Check files are there
  - Verify photos are NOT there (correct!)

- [ ] **Clone to server**
  - Follow `QUICKSTART_DEPLOYMENT.md`
  - Or `GITHUB_GITKRAKEN_GUIDE.md`

---

## 🆘 If Something is Wrong

**Don't panic!** You can always:

1. **Fix locally and commit again**
   ```
   Fix issue → Stage → Commit → Push
   ```

2. **Rollback if needed**
   ```
   GitKraken → Right-click commit → Reset to this commit
   ```

3. **Delete and recreate repo**
   - Only if really messed up
   - Your local files are still safe

---

**Everything checked?** 🎯

**Ready to make this Valentine's surprise a reality!** 💝🚀

See also:
- `QUICKSTART_DEPLOYMENT.md` - Next steps after commit
- `GITHUB_GITKRAKEN_GUIDE.md` - Complete GitHub guide
- `GIT_WORKFLOW.md` - Daily Git workflow
