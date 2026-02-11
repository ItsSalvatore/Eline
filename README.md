# Voor Eline ❤️

Een Valentijns PWA (Progressive Web App) voor Eline - een interactief verhalenboek met hoofdstukken.

---

## 🎯 Ready to Deploy?

**👉 See `START_HERE.md` for your next steps!** 🚀

The app is complete and ready to push to GitHub and deploy to your server!

---

## 📱 Functies

- 🎨 Prachtige, vloeiende animaties met microinteracties
- 📖 Hoofdstuksysteem met button/swipe navigatie (arrows op memories, swipe op cover/epilogue)
- 📜 Alle pagina's zijn scrollbaar zonder conflicten
- 🎯 10 romantische iconen voor elk hoofdstuk (heart, book, photo, etc.)
- 🔒 Vergrendelbare hoofdstukken voor toekomstige content
- 📸 Ondersteuning voor foto's
- 💾 Voortgang wordt automatisch opgeslagen
- 🌐 PWA - installeerbaar op iPhone en andere devices
- 🇳🇱 Volledig in het Nederlands
- 🔐 Password-protected entry screen
- 💝 Interactieve Valentine's gift reveal met dubbele-klik systeem (2 taps per cadeau!)

## 🚀 Snel starten

### Installatie

```bash
npm install
```

### Development (Web)

```bash
npm run web
```

De app opent automatisch in je browser op `http://localhost:8081`

### Development (iOS met Expo Go)

```bash
npm run ios
# Scan de QR code met de Expo Go app op je iPhone
```

### Development (Android met Expo Go)

```bash
npm run android
```

## 📖 Hoofdstukken toevoegen

### 1. Bewerk `src/data/chapters.ts`

```typescript
export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Hoofdstuk Titel",
    subtitle: "Een ondertitel (optioneel)",
    content: "De inhoud van je hoofdstuk.\n\nJe kunt nieuwe regels gebruiken!",
    icon: "heart", // Icoon: heart, book, photo, map, clock, message, music, gift, sparkle
    backgroundColor: "#FFB6C1", // Roze
    textColor: "#8B0000", // Donkerrood
    unlocked: true, // true = meteen beschikbaar, false = vergrendeld
    date: "14 februari 2026" // Optioneel
  },
  // Meer hoofdstukken...
];
```

**Beschikbare iconen:** `heart`, `book`, `photo`, `map`, `clock`, `message`, `music`, `gift`, `sparkle`

See **ICONS_GUIDE.md** for complete icon usage guide!

### 2. Kleurenschema's die goed werken

```typescript
// Romantisch roze
backgroundColor: "#FFB6C1", textColor: "#8B0000"

// Zachte lavendel
backgroundColor: "#DDA0DD", textColor: "#4B0082"

// Warme crème
backgroundColor: "#FFF5E1", textColor: "#8B4513"

// Perzik
backgroundColor: "#FFDAB9", textColor: "#8B4726"

// Licht turquoise
backgroundColor: "#AFEEEE", textColor: "#2F4F4F"

// Zacht geel
backgroundColor: "#FFFACD", textColor: "#B8860B"

// Mint
backgroundColor: "#98FB98", textColor: "#2F4F2F"
```

## 📸 Foto's toevoegen

### 1. Plaats foto's in `assets/photos/`

Zorg dat de foto's niet te groot zijn (onder 1MB aanbevolen voor snelle laadtijden).

### 2. Update ChapterPage.tsx om afbeeldingen te ondersteunen

Voeg in `src/components/ChapterPage.tsx` een Image component toe:

```typescript
import { Image } from 'react-native';

// In de render functie, na de title section:
{chapter.image && (
  <View style={styles.imageContainer}>
    <Image
      source={chapter.image}
      style={styles.chapterImage}
      resizeMode="cover"
    />
  </View>
)}
```

### 3. Update chapter definitie om foto te gebruiken

```typescript
{
  id: 2,
  title: "Onze Herinneringen",
  content: "...",
  image: require("../../assets/photos/photo1.jpg"),
  backgroundColor: "#FFE4E1",
  textColor: "#8B4513",
  unlocked: true
}
```

## 🔒 Hoofdstukken ontgrendelen

Om hoofdstukken later te ontgrendelen, update `App.tsx`:

```typescript
const [progress, setProgress] = useState<StoryProgress>({
  currentChapter: 0,
  unlockedChapters: [1, 2, 3], // Voeg hoofdstuk IDs toe om ze te ontgrendelen
  lastVisited: new Date().toISOString(),
});
```

## 🐙 Git & GitHub Workflow

### ⚡ Quick Start: Zie **`QUICKSTART_DEPLOYMENT.md`** (30 min setup!)

### Voor je commit: Zie **`PRE_COMMIT_CHECKLIST.md`** ✅

### Push naar GitHub met GitKraken

**Complete guide:** Zie **`GITHUB_GITKRAKEN_GUIDE.md`** 🐙⭐  
**Quick reference:** Zie **`GIT_WORKFLOW.md`** 🔄

**Workflow:**
```
Local PC (GitKraken)
  ↓ Edit files
  ↓ Commit & Push
GitHub (Private Repo)
  ↓ git clone / git pull
Home Server
  ↓ npm run build:web
Live! 🎉
```

**Quick Start:**
1. Open GitKraken
2. Init/Open repo in your Eline folder
3. Stage all files → Commit → Push to GitHub (Private!)
4. On server: `git clone your-repo`
5. `npm install && npm run build:web`

**⚠️ Important:**
- Keep repo **Private** (it's a surprise!)
- Photos are NOT committed (privacy)
- Upload photos manually to server

---

## 🚀 Deployment naar eline.manosalvatore.com

### 🏠 Home Server (jouw situatie!)

**Complete guide:** Zie **`HOME_SERVER_DEPLOYMENT.md`** ⭐  
**Snelle checklist:** Zie **`DEPLOYMENT_CHECKLIST.md`** ✅

**Quick start:**
```bash
# 1. Build
npm run build:web

# 2. Upload to server
scp -r dist/* user@server:/var/www/eline.manosalvatore.com/

# 3. Configure Nginx/Apache (see HOME_SERVER_DEPLOYMENT.md)

# 4. Setup HTTPS (REQUIRED for PWA!)
sudo certbot --nginx -d eline.manosalvatore.com

# Done! Test at https://eline.manosalvatore.com
```

**🔒 Key Requirements:**
- ✅ **HTTPS is REQUIRED** (PWA won't install without it)
- ✅ Web server must serve `index.html` for all routes (SPA)
- ✅ Correct MIME types for .js, .json files
- ✅ Port forwarding (80, 443) if behind router

---

### Alternatieve Cloud Opties

**Als je geen home server wilt gebruiken:**

**Netlify** - Gratis, makkelijk, auto-SSL  
**Vercel** - Gratis, snel, auto-SSL  
**GitHub Pages** - Gratis, via Git  

Zie **`DEPLOYMENT.md`** voor complete instructies voor alle cloud opties

## 📱 QR Code maken

Na deployment, maak een QR code:

1. Ga naar [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Voer je URL in (bijv. `https://eline.manosalvatore.com`)
3. Style de QR code met leuke kleuren
4. Download en print!

## 🎨 Animaties aanpassen

Alle animaties zijn in `src/components/ChapterPage.tsx` en `BookView.tsx`.

### Snelheid aanpassen:

```typescript
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 600, // Verhoog voor langzamer, verlaag voor sneller
  useNativeDriver: true,
})
```

### Nieuwe animaties toevoegen:

```typescript
const myAnim = useRef(new Animated.Value(0)).current;

Animated.spring(myAnim, {
  toValue: 1,
  tension: 50,    // Hogere waarde = strakker
  friction: 7,    // Hogere waarde = minder bounce
  useNativeDriver: true,
}).start();
```

## 🎯 iOS Installatie instructies voor Eline

1. Open Safari op je iPhone
2. Ga naar `https://eline.manosalvatore.com`
3. Tik op het "Share" icoon (vierkant met pijl omhoog)
4. Scroll naar beneden en tik op "Voeg toe aan beginscherm"
5. Tik op "Voeg toe"
6. De app verschijnt nu als een icoon op je beginscherm! 📱❤️

## 📁 Project Structuur

```
Eline/
├── App.tsx                      # Main app component
├── src/
│   ├── components/
│   │   ├── ChapterPage.tsx      # Hoofdstuk pagina met animaties
│   │   ├── BookView.tsx         # Swipeable boek navigatie
│   │   ├── IconButton.tsx       # Button met microinteracties
│   │   ├── BentoMemories.tsx    # Bento menu voor hoofdstuk selectie
│   │   ├── LockScreen.tsx       # Password entry screen
│   │   └── ValentineGiftReveal.tsx  # Interactive gift reveal 💝
│   ├── icons/
│   │   └── index.tsx            # 10 romantische iconen
│   ├── data/
│   │   └── chapters.ts          # Alle hoofdstukken data ⭐
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   └── utils/
│       └── storage.ts           # AsyncStorage functies
├── assets/
│   └── photos/                  # Plaats hier je foto's
├── public/
│   └── manifest.json            # PWA manifest
├── README.md                    # Deze file
├── START_HERE.md               # 👉 BEGIN HIER! Next steps
│
├── 📘 Content & Features:
│   ├── CHAPTERS_GUIDE.md           # Hoofdstukken maken
│   ├── ICONS_GUIDE.md              # Icon system uitleg
│   ├── VALENTINE_REVEAL_GUIDE.md  # Valentine's gift reveal 💝
│   └── DOUBLE_CLICK_REVEAL.md     # Dubbele-klik systeem 🎁
│
├── 🎮 Navigation & UX:
│   ├── NAVIGATION_GUIDE.md         # Navigatie flow uitleg
│   ├── MEMORY_NAVIGATION_FINAL.md # Memory navigatie oplossing
│   ├── BENTO_MENU_GUIDE.md        # Bento menu design
│   └── GESTURE_FIX.md              # Swipe & scroll uitleg
│
├── 🚀 Deployment:
│   ├── QUICKSTART_DEPLOYMENT.md    # ⚡ 30-min setup guide (START HERE!)
│   ├── DEPLOYMENT_FLOW.md         # Visual deployment flow diagram
│   ├── PRE_COMMIT_CHECKLIST.md    # Before pushing to Git ✅
│   ├── GITHUB_GITKRAKEN_GUIDE.md  # GitHub + GitKraken 🐙
│   ├── GIT_WORKFLOW.md            # Git workflow reference 🔄
│   ├── HOME_SERVER_DEPLOYMENT.md  # Home server complete guide 🏠
│   ├── DEPLOYMENT_CHECKLIST.md    # Launch checklist ✅
│   └── DEPLOYMENT.md               # Cloud options (Netlify, Vercel)
│
└── 🔧 Technical:
    ├── SETUP_COMPLETE.md           # Setup verificatie
    └── CONFIGURATION_SUMMARY.md    # Config overzicht
```

## 💡 Tips

- **Voeg regelmatig nieuwe hoofdstukken toe** om het boek levend te houden
- **Gebruik emoji's** in je content voor extra flair (❤️ 💕 ✨ 🌹)
- **Voeg iconen toe** aan hoofdstukken voor visuele flair
- **Test de swipe navigatie** op een echte mobiele device voor de beste ervaring
- **Optimaliseer foto's** voordat je ze toevoegt (gebruik bijv. TinyPNG.com)
- **Backup je hoofdstukken** door chapters.ts regelmatig te kopiëren

## 🔧 Technical Details

- **Styling**: React Native StyleSheet (no CSS/Tailwind)
- **Icons**: react-native-svg (12 custom icons)
- **Animations**: react-native-reanimated (60fps)
- **Gestures**: PanResponder (horizontal swipe = page change, vertical swipe = scroll)
- **Storage**: AsyncStorage for progress & unlock status
- **Platform**: Expo (Web, iOS, Android)
- **All pages scrollable**: Every page has ScrollView for long content

## ❤️ Voor Eline

Deze app is gemaakt met liefde. Veel plezier met het ontdekken van alle hoofdstukken! 

Happy Valentine's Day! 💕

---

Gemaakt met React Native, Expo, en veel liefde 🚀❤️
