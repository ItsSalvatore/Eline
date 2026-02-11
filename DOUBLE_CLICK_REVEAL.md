# 🎁 Double-Click Gift Reveal System

## Overview
Each Valentine's gift now requires **TWO taps** to fully reveal, making the experience more interactive and engaging!

## How It Works

### The Two-Step Reveal

**Step 1: First Tap - Shows the Hint** 👆
- Reveals which present it is (name + description)
- Example: "De Rondste" + "Een mok vol liefde..."
- Card changes to warm peach color
- Shows "👆 Tik nog een keer" (Tap again)

**Step 2: Second Tap - Shows the Message** 💕
- Reveals the full romantic message
- Example: "Voor ieder kopje thee die je drinkt dat je aan ons mag denken..."
- Card changes to bright pink
- Gift is now fully revealed
- Next gift becomes active

## Visual States

### 1. Locked (Gray) 🔒
```
┌─────────────────┐
│       🎁        │
│                 │
│   Cadeau 1      │
│                 │
└─────────────────┘
```
- Gray background
- Gift icon grayed out
- Not clickable

### 2. Active/Ready (Light Pink) ✨
```
┌─────────────────┐
│       🎁        │
│                 │
│   Cadeau 1      │
│                 │
│ 👆 Tik om te    │
│    openen       │
└─────────────────┘
```
- Light pink background
- Red gift icon
- "👆 Tik om te openen" hint
- Clickable

### 3. Hinted (Warm Peach) 🧡
```
┌─────────────────┐
│       ☕         │
│  De Rondste     │
│  ───────────    │
│ Een mok vol     │
│ liefde...       │
│                 │
│ 👆 Tik nog een  │
│    keer         │
└─────────────────┘
```
- Warm peach/pink gradient
- Shows emoji
- Shows name
- Shows description (italic)
- "👆 Tik nog een keer" hint
- Still clickable

### 4. Fully Revealed (Bright Pink) 💝
```
┌─────────────────┐
│       ☕         │
│  De Rondste     │
│  ───────────    │
│ Voor ieder      │
│ kopje thee die  │
│ je drinkt dat   │
│ je aan ons mag  │
│ denken en mijn  │
│ liefde voor     │
│ jou 💕          │
└─────────────────┘
```
- Bright pink gradient
- Shows emoji
- Shows name
- Shows full message
- Not clickable anymore
- Next gift becomes active

## User Flow Example

### Gift 1: De Rondste ☕

**Initial State:**
- Active, light pink
- "👆 Tik om te openen"

**After 1st Tap:**
- Warm peach color
- Shows: "De Rondste"
- Shows: "Een mok vol liefde..."
- Shows: "👆 Tik nog een keer"

**After 2nd Tap:**
- Bright pink color
- Shows: "De Rondste"
- Shows: "Voor ieder kopje thee die je drinkt dat je aan ons mag denken en mijn liefde voor jou 💕"
- Gift 2 becomes active

### Complete Sequence

```
Gift 1: Locked → Active → [Tap] → Hinted → [Tap] → Revealed
           ↓
Gift 2: Locked → Active → [Tap] → Hinted → [Tap] → Revealed
           ↓
Gift 3: Locked → Active → [Tap] → Hinted → [Tap] → Revealed
           ↓
Gift 4: Locked → Active → [Tap] → Hinted → [Tap] → Revealed
           ↓
    Final Message: "Al deze cadeautjes zijn voor jou, lieve Eline. ❤️"
```

## Header Instructions

The header text changes dynamically:

**Before any clicks:**
> "Tik op het volgende cadeautje om te openen..."

**After first click (hinted state):**
> "Tik nog een keer om het bericht te lezen... 💕"

**After all gifts revealed:**
> "Alle cadeautjes geopend! 🎁✨"

## The 4 Gifts

### Gift 1: De Rondste ☕
- **Hint:** "Een mok vol liefde..."
- **Message:** "Voor ieder kopje thee die je drinkt dat je aan ons mag denken en mijn liefde voor jou 💕"

### Gift 2: Het Kaartje 💌
- **Hint:** "Woorden van het hart..."
- **Message:** "Met liefde voor jou geschreven 💌"

### Gift 3: Het Grote Platte Lange 🖼️
- **Hint:** "Een fotolijstje voor onze mooiste herinnering..."
- **Message:** "Voor het vastzetten waar je mij voor het eerst hebt gezien 📸"

### Gift 4: De Platste Naast de Kaart 🧸
- **Hint:** "Een Jellycat knuffel..."
- **Message:** "Voor mijn liefde voor jou en jouw zoetigheid 🧸💕"

## Technical Implementation

### State Management
```typescript
const [hintedGifts, setHintedGifts] = useState<number[]>([]); // First click
const [revealedGifts, setRevealedGifts] = useState<number[]>([]); // Second click
const [currentStep, setCurrentStep] = useState(0); // Which gift is active
```

### Click Handler Logic
```typescript
if (!isHinted) {
  // FIRST CLICK: Show hint
  - Animate scale in
  - Add pulse animation
  - Add to hintedGifts array
} else {
  // SECOND CLICK: Show full message
  - Add to revealedGifts array
  - Move to next gift (currentStep + 1)
}
```

### Animations
- **Scale in:** When first clicked (0 → 1)
- **Pulse:** After first click (1 → 1.1 → 1) to indicate it's clickable again
- **Spring effect:** Smooth, bouncy reveal

## Color Progression

1. **Locked:** `#F0F0F0` → `#E0E0E0` (Gray)
2. **Active:** `#FFE4E1` → `#FFB6C1` (Light pink)
3. **Hinted:** `#FFDAB9` → `#FFB6C1` (Warm peach)
4. **Revealed:** `#FFB6C1` → `#FF69B4` (Bright pink)

The colors gradually get warmer and more vibrant as you progress!

## Why This Works

1. **Builds Anticipation:** Two steps create more excitement
2. **Pacing Control:** She controls the reveal speed
3. **Clear Feedback:** Visual changes show progress
4. **Playful Interaction:** More engaging than single click
5. **Story Telling:** Hint → Message creates narrative flow

## Testing Checklist

- [ ] Gift 1 starts as active (light pink)
- [ ] First tap shows hint + "Tik nog een keer"
- [ ] Card turns warm peach after first tap
- [ ] Second tap shows full message
- [ ] Card turns bright pink after second tap
- [ ] Gift 2 becomes active after Gift 1 is fully revealed
- [ ] Can't skip ahead to later gifts
- [ ] Header text updates correctly
- [ ] All 4 gifts work the same way
- [ ] Final message appears after all gifts revealed
- [ ] Animations are smooth (no jank)

---

**Now each gift is a mini-adventure with two delightful moments of discovery!** 🎁💕✨
