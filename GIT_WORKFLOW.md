# 🔄 Git Workflow Quick Reference

Quick commands for your GitKraken + Server workflow.

## 🎯 First Time Setup

### 1. Push to GitHub (GitKraken)
```
1. Open GitKraken
2. File → Init Repo (or Open Repo)
3. Stage all files
4. Commit: "Initial commit: Valentine's PWA for Eline ❤️"
5. Push → Create remote on GitHub (Private!)
```

### 2. Clone to Server
```bash
ssh user@your-server
cd /var/www
git clone git@github.com:YOUR-USERNAME/eline-valentines-pwa.git eline.manosalvatore.com
cd eline.manosalvatore.com
npm install
npm run build:web
```

### 3. Configure & Deploy
```bash
# Configure Nginx (see HOME_SERVER_DEPLOYMENT.md)
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com

# Enable site
sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo systemctl reload nginx

# Get HTTPS
sudo certbot --nginx -d eline.manosalvatore.com
```

---

## 📝 Daily Workflow

### Making Changes

**On Your PC:**

```
1. Edit files in VS Code/Cursor
2. Test locally: npm run web
3. Open GitKraken
4. Stage changed files
5. Commit with message
6. Push to GitHub
```

**On Server:**

```bash
ssh user@server
cd /var/www/eline.manosalvatore.com
git pull
npm run build:web
# Done! Changes are live
```

---

## 🔧 Common Operations

### Update Text in Memory

**Local:**
1. Edit `src/data/chapters.ts`
2. Test: `npm run web`
3. GitKraken: Stage → Commit → Push

**Server:**
```bash
git pull && npm run build:web
```

### Add New Photos

**Local:**
1. Add photos to `assets/photos/`
2. Update `src/data/chapters.ts` with `require()`
3. GitKraken: Stage → Commit → Push

**Server:**
```bash
# Upload photos manually (they're not in git)
scp assets/photos/*.jpg user@server:/var/www/eline.manosalvatore.com/assets/photos/

# Then pull code changes
ssh user@server
cd /var/www/eline.manosalvatore.com
git pull
npm run build:web
```

### Add New Memory/Chapter

**Local:**
1. Edit `src/data/chapters.ts`
2. Test locally
3. GitKraken: Commit & Push

**Server:**
```bash
git pull && npm run build:web
```

### Update Valentine's Gifts

**Local:**
1. Edit `src/components/ValentineGiftReveal.tsx`
2. Test locally
3. GitKraken: Commit & Push

**Server:**
```bash
git pull && npm run build:web
```

---

## 🚨 Emergency Fixes

### Fix Typo FAST

**Local (GitKraken):**
```
1. Fix typo in file
2. Stage → Commit: "Fix typo in Memory 3"
3. Push
```

**Server (1 minute to live):**
```bash
ssh user@server && cd /var/www/eline.manosalvatore.com && git pull && npm run build:web
```

### Rollback to Previous Version

**Server:**
```bash
cd /var/www/eline.manosalvatore.com
git log --oneline  # See recent commits
git reset --hard COMMIT_HASH  # Go back to specific commit
npm run build:web
```

---

## 📊 Status Checks

### Check What Changed

**GitKraken:** 
- Look at unstaged/staged files panel

**Server:**
```bash
cd /var/www/eline.manosalvatore.com
git status
git log --oneline -5  # Last 5 commits
```

### Check if Server is Up to Date

```bash
cd /var/www/eline.manosalvatore.com
git fetch
git status
# Shows: "Your branch is behind 'origin/main' by X commits"
```

### See What Will Change

```bash
git fetch
git diff origin/main
# Shows what will change when you pull
```

---

## 🔄 Common Commands

### Local PC (GitKraken)
| Action | Steps |
|--------|-------|
| Commit changes | Stage files → Write message → Commit |
| Push to GitHub | Click Push button |
| Pull from GitHub | Click Pull button |
| See history | Timeline in center |

### Server (Terminal)
| Task | Command |
|------|---------|
| Get latest code | `git pull` |
| See status | `git status` |
| See recent commits | `git log --oneline -10` |
| Rebuild app | `npm run build:web` |
| Full update | `git pull && npm run build:web` |

---

## 💾 Backup Strategy

### Auto-backup Before Updates

```bash
# Add to server update script
cd /var/www/eline.manosalvatore.com
cp -r dist dist.backup.$(date +%Y%m%d_%H%M%S)
git pull
npm run build:web
```

### Keep Backups of Photos

**On Server:**
```bash
tar -czf ~/eline-photos-backup-$(date +%Y%m%d).tar.gz /var/www/eline.manosalvatore.com/assets/photos/
```

**Download to Local:**
```bash
scp user@server:~/eline-photos-backup-*.tar.gz ./backups/
```

---

## 🎯 Pro Tips

### 1. Commit Messages
```
✅ Good:
"Update Valentine's gift #3 message"
"Fix typo in Memory 5 date"
"Add Memory 11: Valentine's Day 2027"

❌ Bad:
"update"
"fix"
"changes"
```

### 2. Before You Push
```bash
# Always test locally first
npm run web
# Check in browser, test navigation, etc.
# Then commit & push
```

### 3. Server Update Shortcut

Add to your `.bashrc`:
```bash
alias eline-update='cd /var/www/eline.manosalvatore.com && git pull && npm run build:web && echo "✅ Eline app updated!"'
```

Then just run:
```bash
eline-update
```

### 4. Monitor Changes

**Watch for new commits on GitHub:**
- Enable email notifications
- Or use GitHub mobile app

---

## 🆘 Quick Fixes

### "Permission denied" on server
```bash
sudo chown -R $USER:$USER /var/www/eline.manosalvatore.com
```

### "Merge conflict" in GitKraken
```
1. Open conflicted file
2. Choose which version to keep
3. Stage resolved file
4. Commit
```

### Build fails on server
```bash
# Clean and retry
rm -rf node_modules dist
npm install
npm run build:web
```

### Site not updating
```bash
# Clear nginx cache
sudo systemctl reload nginx

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

---

## ✅ Pre-Valentine's Day Checklist

**2 Days Before:**
- [ ] Final test locally
- [ ] Commit & push all changes
- [ ] Pull on server
- [ ] Rebuild: `npm run build:web`
- [ ] Test on real phone
- [ ] Test PWA install
- [ ] Test password
- [ ] Test all memories
- [ ] Test Valentine's gifts

**1 Day Before:**
- [ ] Don't change anything!
- [ ] Just verify site is up
- [ ] QR code ready

**Valentine's Day:**
- [ ] Give her the QR code
- [ ] Watch her reaction! 💝

---

**You're all set up!** 🚀

See full guides:
- `GITHUB_GITKRAKEN_GUIDE.md` - Complete GitHub setup
- `HOME_SERVER_DEPLOYMENT.md` - Server configuration
- `DEPLOYMENT_CHECKLIST.md` - Launch checklist
