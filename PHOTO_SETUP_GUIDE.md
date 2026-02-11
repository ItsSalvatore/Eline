# 📸 Photo Setup Guide - "Het Begin" Chapter

Complete guide for adding your 8 story photos to Chapter 2.

## 📂 Step 1: Organize Your Photos

Place these 8 photos in the `assets/photos/` folder with **exact names**:

```
assets/photos/
├── kerstgala.jpg       # Christmas gala - 19 december
├── kerstkado.jpg       # Christmas gift from her
├── kerstbal.jpg        # Christmas ornaments you made together
├── vogel.jpg           # Date on 31 december
├── sneeuw.jpg          # First snow together - 4 januari
├── sneeuw1.jpg         # Playing in snow together
├── kerst.jpg           # Museumplein Christmas market
└── sushi1.jpg          # Where you asked her to be your girlfriend
```

**Important:** 
- File names must be **lowercase**
- Use `.jpg`, `.jpeg`, or `.png` extension
- Optimize photos to under 1MB each for fast loading (use [TinyPNG.com](https://tinypng.com))

## 🎨 Step 2: Option A - Single Hero Image

If you want **one main photo** for the chapter (like the sushi moment):

### Edit `src/data/chapters.ts`:

```typescript
{
  id: 2,
  title: "Het Begin",
  subtitle: "December 2025 - Januari 2026",
  content: "...",
  image: require("../../assets/photos/sushi1.jpg"), // ← Add this line!
  icon: "clock",
  backgroundColor: "#DDA0DD",
  textColor: "#4B0082",
  unlocked: true
},
```

The image appears **above** the content.

## 📸 Step 2: Option B - Photo Gallery (RECOMMENDED)

To show **all 8 photos** as a scrollable gallery:

### Edit `src/data/chapters.ts`:

```typescript
{
  id: 2,
  title: "Het Begin",
  subtitle: "December 2025 - Januari 2026",
  content: "...",
  images: [  // ← Add this array!
    require("../../assets/photos/kerstgala.jpg"),
    require("../../assets/photos/kerstkado.jpg"),
    require("../../assets/photos/kerstbal.jpg"),
    require("../../assets/photos/vogel.jpg"),
    require("../../assets/photos/sneeuw.jpg"),
    require("../../assets/photos/sneeuw1.jpg"),
    require("../../assets/photos/kerst.jpg"),
    require("../../assets/photos/sushi1.jpg"),
  ],
  icon: "clock",
  backgroundColor: "#DDA0DD",
  textColor: "#4B0082",
  unlocked: true
},
```

Photos appear **below** the content as a vertical gallery.

## 🎯 Step 2: Option C - Both Hero + Gallery

Want the sushi photo featured AND show all others?

```typescript
{
  id: 2,
  title: "Het Begin",
  subtitle: "December 2025 - Januari 2026",
  content: "...",
  image: require("../../assets/photos/sushi1.jpg"), // Hero image on top
  images: [  // Gallery below
    require("../../assets/photos/kerstgala.jpg"),
    require("../../assets/photos/kerstkado.jpg"),
    require("../../assets/photos/kerstbal.jpg"),
    require("../../assets/photos/vogel.jpg"),
    require("../../assets/photos/sneeuw.jpg"),
    require("../../assets/photos/sneeuw1.jpg"),
    require("../../assets/photos/kerst.jpg"),
  ],
  icon: "clock",
  backgroundColor: "#DDA0DD",
  textColor: "#4B0082",
  unlocked: true
},
```

## 📝 Step 3: Add Captions (Optional)

If you want text captions under each photo, update the content:

```typescript
content: `🎄 Kerstgala - 19 december
Onze eerste officiële avond samen...

🎁 Kerstcadeau
Het perfecte cadeau...

[etc...]`,
```

Or make a more narrative version:

```typescript
content: `Deze maand was het begin van alles.

Van die magische avond op het kerstgala tot die spannende vraag bij de sushi...

Elke foto vertelt een deel van ons verhaal. Swipe door de foto's om onze reis te zien. ❤️`,
```

## 🎨 Complete Example - Gallery Version

Here's the full chapter with gallery:

```typescript
{
  id: 2,
  title: "Het Begin",
  subtitle: "December 2025 - Januari 2026",
  content: `Van kerstlichtjes tot sneeuwvlokken, van spanning tot pure blijdschap.

Deze maand was het begin van ons verhaal. Elke foto hieronder is een herinnering die ik altijd zal koesteren.

🎄 Kerstgala • 🎁 Cadeau • 🎨 Kerstballen
🐦 Oudjaar • ❄️ Sneeuw • ⛄ Sneeuwpret  
🎅 Kerstmarkt • 🍣 Die Vraag

Scroll naar beneden om onze momenten te zien... 💕`,
  images: [
    require("../../assets/photos/kerstgala.jpg"),
    require("../../assets/photos/kerstkado.jpg"),
    require("../../assets/photos/kerstbal.jpg"),
    require("../../assets/photos/vogel.jpg"),
    require("../../assets/photos/sneeuw.jpg"),
    require("../../assets/photos/sneeuw1.jpg"),
    require("../../assets/photos/kerst.jpg"),
    require("../../assets/photos/sushi1.jpg"),
  ],
  icon: "photo",
  backgroundColor: "#DDA0DD",
  textColor: "#4B0082",
  unlocked: true
},
```

## 🚀 Step 4: Test It!

1. Save `chapters.ts`
2. Refresh your browser (`Ctrl+R` or `Cmd+R`)
3. Swipe to Chapter 2
4. Photos should appear!

## 🎯 Photo Order Tips

Order photos chronologically for best storytelling:
1. **Kerstgala** - Where it started
2. **Kerstkado** - The gift
3. **Kerstbal** - Making ornaments
4. **Vogel** - New Year's Eve date
5. **Sneeuw** - First snow
6. **Sneeuw1** - Playing in snow
7. **Kerst** - Christmas market
8. **Sushi1** - The big question! (perfect ending)

## 🎨 Different Icon Options

Change the icon to match the vibe:

```typescript
icon: "photo",    // Camera - for photo chapters
icon: "clock",    // Clock - for timeline/memories
icon: "heart",    // Heart - for romantic moments
icon: "sparkle",  // Sparkle - for magical moments
icon: "map",      // Map pin - for location-based stories
```

## 💡 Pro Tips

1. **Photo Quality**: 
   - Max width: 1000px (smaller = faster loading)
   - Compress with TinyPNG.com
   - Keep under 500KB per photo

2. **Vertical Photos Work Better**:
   - Portrait orientation fills mobile screens nicely
   - Landscape works too but shows smaller

3. **Privacy**:
   - Photos are bundled into the app
   - Only visible to people with the URL
   - Can add password protection later if needed

4. **Order Matters**:
   - First photo = first impression
   - Last photo = memorable ending
   - Chronological = easy to follow

---

**Ready to add photos?** Just drop them in `assets/photos/` and update `chapters.ts`! 📸❤️

See `CHAPTERS_GUIDE.md` for more chapter ideas!
