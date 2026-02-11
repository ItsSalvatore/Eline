# 🚀 Quick Start - Add Photos Now!

Fast 3-step guide to add your 8 photos to "Het Begin" chapter.

## ✅ Step 1: Add Photos

Drop these 8 files into `assets/photos/`:

```
kerstgala.jpg
kerstkado.jpg  
kerstbal.jpg
vogel.jpg
sneeuw.jpg
sneeuw1.jpg
kerst.jpg
sushi1.jpg
```

## ✅ Step 2: Edit Chapter

Open `src/data/chapters.ts` and find Chapter 2 (id: 2).

**Add this line** after `content:`:

```typescript
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
```

**Full example:**

```typescript
{
  id: 2,
  title: "Het Begin",
  subtitle: "December 2025 - Januari 2026",
  content: "...", // Your story text
  images: [  // ← ADD THIS!
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

## ✅ Step 3: Refresh

Save the file and refresh your browser!

---

**That's it!** Your photos will show in the chapter. 📸✨

See `PHOTO_SETUP_GUIDE.md` for advanced options!
