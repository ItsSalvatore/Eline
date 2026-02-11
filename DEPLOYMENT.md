# 🚀 Deployment Gids

Complete handleiding voor het deployen van de Eline app naar `eline.manosalvatore.com`

## 📋 Voor je begint

- [ ] Alle hoofdstukken zijn toegevoegd in `src/data/chapters.ts`
- [ ] Foto's zijn geoptimaliseerd en toegevoegd (indien gewenst)
- [ ] App werkt lokaal zonder errors (`npm run web`)
- [ ] Domain `eline.manosalvatore.com` is klaar voor gebruik

## 🌐 Optie 1: Netlify (Aanbevolen - Snelst en makkelijkst)

### Stap 1: Build de app

```bash
npm run build:web
```

Dit maakt een `dist/` folder met alle statische bestanden.

### Stap 2: Deploy naar Netlify

**Via Drag & Drop (Makkelijkst):**

1. Ga naar [app.netlify.com](https://app.netlify.com)
2. Log in met je account
3. Klik op "Add new site" → "Deploy manually"
4. Drag & drop de `dist/` folder
5. Wacht 30 seconden - Done! ✅

Je krijgt een URL zoals: `random-name-123.netlify.app`

**Via Netlify CLI (Voor herhaalde updates):**

```bash
# Installeer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
# Kies de dist/ folder wanneer gevraagd
```

### Stap 3: Custom domain instellen

1. Ga naar Site settings → Domain management
2. Klik "Add custom domain"
3. Voer in: `eline.manosalvatore.com`
4. Netlify geeft je DNS instructies:

```
Type: CNAME
Name: eline
Value: random-name-123.netlify.app
```

5. Ga naar je domain provider (bijv. Cloudflare, Namecheap)
6. Voeg de CNAME record toe
7. Wacht 5-60 minuten voor DNS propagatie
8. Done! ✅

### SSL Certificate (HTTPS)

Netlify doet dit automatisch! Na DNS setup krijg je gratis HTTPS via Let's Encrypt. 🎉

---

## 🔷 Optie 2: Vercel

### Stap 1: Installeer Vercel CLI

```bash
npm install -g vercel
```

### Stap 2: Login en deploy

```bash
# Login
vercel login

# Deploy
vercel --prod
```

Volg de prompts:
- Set up and deploy? **Y**
- Which scope? **Je account**
- Link to existing project? **N**
- Project name? **eline**
- Directory? **./dist** (na build)

### Stap 3: Custom domain

```bash
vercel domains add eline.manosalvatore.com
```

Volg de DNS instructies die Vercel geeft.

---

## 🐙 Optie 3: GitHub Pages (Gratis, maar meer stappen)

### Stap 1: Push naar GitHub

```bash
git init
git add .
git commit -m "Initial commit - Voor Eline ❤️"
git branch -M main
git remote add origin https://github.com/jouw-username/eline.git
git push -u origin main
```

### Stap 2: Installeer gh-pages

```bash
npm install -g gh-pages
```

### Stap 3: Build en deploy

```bash
npm run build:web
gh-pages -d dist
```

### Stap 4: Custom domain op GitHub

1. Ga naar repository Settings → Pages
2. Custom domain: `eline.manosalvatore.com`
3. Save
4. Voeg CNAME record toe bij je domain provider:

```
Type: CNAME
Name: eline
Value: jouw-username.github.io
```

---

## 🔧 Optie 4: Eigen server (VPS/cPanel)

### Via FTP/SFTP:

1. Build: `npm run build:web`
2. Upload de hele `dist/` folder naar je server
3. Wijs `eline.manosalvatore.com` naar deze folder
4. Done!

### Via SSH:

```bash
# Op je server
cd /var/www/eline.manosalvatore.com
git clone je-repo-url .
npm install
npm run build:web

# Setup Nginx
sudo nano /etc/nginx/sites-available/eline.manosalvatore.com
```

Nginx config:
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

```bash
sudo ln -s /etc/nginx/sites-available/eline.manosalvatore.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL met Let's Encrypt
sudo certbot --nginx -d eline.manosalvatore.com
```

---

## 📱 Na Deployment: QR Code maken

### Stap 1: Genereer QR code

Gebruik een van deze sites:
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- [qrcode-monkey.com](https://www.qrcode-monkey.com/)

### Stap 2: Personaliseer

- URL: `https://eline.manosalvatore.com`
- Kleur: Gebruik roze (#FFB6C1) of rood (#DC143C)
- Logo: Voeg een hartje toe (optioneel)

### Stap 3: Download en print

- Download als PNG (hoge resolutie)
- Print op mooi papier
- Voeg toe aan je Valentijns verrassing! 💌

---

## 🔄 Updates pushen

### Netlify:

```bash
npm run build:web
netlify deploy --prod
```

### Vercel:

```bash
npm run build:web
vercel --prod
```

### GitHub Pages:

```bash
npm run build:web
gh-pages -d dist
```

---

## ✅ Post-deployment checklist

- [ ] Site opent op `https://eline.manosalvatore.com`
- [ ] HTTPS werkt (slotje in browser)
- [ ] Swipe navigatie werkt soepel
- [ ] Alle hoofdstukken laden correct
- [ ] Foto's laden (indien toegevoegd)
- [ ] Installeerbaar als PWA op iPhone
- [ ] QR code werkt en wijst naar de site
- [ ] Animations draaien smooth
- [ ] Geen console errors

---

## 🆘 Problemen oplossen

### "Site not found"
- Check DNS propagatie: [whatsmydns.net](https://whatsmydns.net)
- Wacht tot 48 uur (meestal binnen 1 uur)

### Images laden niet
- Check paths in chapters.ts
- Gebruik `require()` voor lokale images
- Gebruik URLs voor externe images

### App is traag
- Optimaliseer images (TinyPNG.com)
- Verlaag image resolutie tot max 1000px breed
- Check browser console voor errors

### PWA installeert niet op iPhone
- Moet HTTPS zijn (HTTP werkt niet)
- Moet bezocht worden via Safari
- Check manifest.json configuratie

---

## 💡 Tips

1. **Test eerst lokaal**: `npm run preview` simuleert productie
2. **Cache leegmaken**: Na updates, forceer-refresh met Ctrl+Shift+R / Cmd+Shift+R
3. **Mobile first**: Test altijd op je telefoon na deployment
4. **Backup**: Bewaar een lokale kopie van je chapters.ts

---

Happy deploying! 🚀❤️

Bij vragen, check de [Expo Web docs](https://docs.expo.dev/distribution/publishing-websites/) of [Netlify docs](https://docs.netlify.com/).
