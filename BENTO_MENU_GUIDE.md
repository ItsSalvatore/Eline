# 🎨 Bento Menu Guide - Visual Chapter Selection

The bento box style menu is a beautiful visual hub for each chapter, letting Eline choose which memory to explore.

## 🎯 What is the Bento Menu?

A **bento box** is a traditional Japanese lunch box divided into compartments. In your app, it's a grid of memory cards that:

- Shows all 10 memories in Chapter 1 at once
- Lets Eline jump to any memory directly
- Maintains visual hierarchy with START indicator
- Uses color, icons, and numbers for clarity
- The 10th memory is the special Valentine's Day reveal!

## 📐 Visual Layout

### Grid Structure
```
┌─────────────────────────────┐
│  Hoofdstuk 1: Het Begin     │ ← Header
│  20 Nov 2025 - 14 Feb 2026  │
├─────────────────────────────┤
│  Kies waar je wilt beginnen │ ← Instruction
│        ... of verder gaan    │
├─────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐  │
│  │  1  │  │  2  │  │  3  │  │ ← Row 1
│  │ 💬  │  │ ✨  │  │ 🎁  │  │
│  │START│  │     │  │     │  │
│  └─────┘  └─────┘  └─────┘  │
│  ┌─────┐  ┌─────┐  ┌─────┐  │
│  │  4  │  │  5  │  │  6  │  │ ← Row 2
│  │ 🎄  │  │ 🐦  │  │ ❄️  │  │
│  └─────┘  └─────┘  └─────┘  │
│  ┌─────┐  ┌─────┐  ┌─────┐  │
│  │  7  │  │  8  │  │  9  │  │ ← Row 3
│  │ ⛄  │  │ 🎅  │  │ 🍣  │  │
│  └─────┘  └─────┘  └─────┘  │
│  ┌─────┐                     │
│  │ 10  │                     │ ← Row 4
│  │ 💝  │   (Valentine's!)    │
│  └─────┘                     │
└─────────────────────────────┘
```

### Memory Card Anatomy
```
┌──────────────────┐
│ 1           [START] │ ← Order # + Badge (first only)
│                   │
│        💬         │ ← Icon (24px)
│                   │
│  Het Eerste       │ ← Title (2 lines max)
│  Bericht          │
│                   │
│  20 november      │ ← Date
└──────────────────┘
   ↑ Gradient background
   ↑ Shadow + border
   ↑ Scale on press
```

## 🎨 Visual Elements

### Colors
Each card has a **unique gradient** from the chapter data:
- Memory 1: Pink (`#FFB6C1`) - Messages
- Memory 2: Purple (`#DDA0DD`) - Sparkle moments
- Memory 3: Light pink (`#FFE4E1`) - Gifts
- Memory 4: Sky blue (`#87CEEB`) - Nature
- And so on...

### Decorative Elements
- **Floating roses** - Top right, animated rotation
- **Floating lilies** - Bottom left, animated rotation  
- **Subtle animations** - Cards appear with stagger effect (100ms apart)

### Typography
- **Header title**: 28px, bold, romantic purple
- **Date**: 16px, italic, muted
- **Instruction**: 18px, center, warm gray
- **Card number**: 16px, bold, white in colored badge
- **Card title**: 15px, semibold, white text
- **Card date**: 12px, white 90% opacity

## 🎯 Interaction Design

### Tap Behavior
```javascript
onPress = (memoryId) => {
  // 1. Find the chapter with this memoryId
  const targetChapter = chapters.find(ch => ch.memoryId === memoryId);
  
  // 2. Animate fade out
  opacity: 1 → 0 (200ms)
  
  // 3. Navigate to that chapter index
  setCurrentIndex(targetChapterIndex);
  
  // 4. Animate fade in
  opacity: 0 → 1 (300ms)
}
```

### Microinteractions
- **Scale on press**: 1 → 0.95 (bounce effect)
- **Shadow depth**: Lifts 2dp on press
- **Stagger enter**: Each card animates in +100ms after previous
- **Hover state** (web): Scale 1 → 1.02

## 📊 Layout Responsiveness

### Mobile (<400px width)
- **2 column grid** (for symmetry with 9 cards, center last row)
- Card: ~160px × ~140px
- Gap: 16px
- Padding: 24px sides

### Tablet (400-768px)
- **3 column grid**
- Card: ~180px × ~160px  
- Gap: 20px
- Padding: 32px sides

### Desktop (>768px)
- Same 3 column grid, centered
- Max width: 700px
- Larger touch targets

## 🔧 Technical Implementation

### In `chapters.ts`
```typescript
{
  id: 2,
  title: "Hoofdstuk 1: Het Begin",
  content: "...",
  isBentoMenu: true, // 👈 THIS MAKES IT A BENTO MENU
  date: "20 Nov 2025 - Jan 2026",
  // ... rest of properties
}
```

### In `BentoMemories.tsx`
```typescript
const memories = [
  { 
    id: 1, 
    memoryId: 1, // Links to chapter.memoryId
    icon: MessageIcon,
    emoji: "💬",
    title: "Het Eerste Bericht",
    date: "20 november",
    badge: "START" // Only first card
  },
  // ... 8 more memories
];
```

### In `BookView.tsx`
```typescript
// Conditionally render based on isBentoMenu flag
{currentChapter.isBentoMenu ? (
  <BentoMemories onSelectMemory={goToMemory} />
) : (
  <ChapterPage chapter={currentChapter} />
)}

// Navigation function
const goToMemory = (memoryId: number) => {
  const targetIndex = chapters.findIndex(ch => ch.memoryId === memoryId);
  // Animate transition to that page
};
```

## 🎨 Styling Tips

### Color Palette Strategy
For future chapters, follow this pattern:

**Chapter 1 (Het Begin)** - Soft pastels
- Pink, purple, peach, sky blue, mint

**Chapter 2 (Next milestone)** - Warmer tones
- Coral, amber, gold, terracotta

**Chapter 3 (Adventures)** - Rich colors
- Emerald, sapphire, ruby, teal

### Icon Selection
Match icons to memory themes:
- Messages → 💬 `MessageIcon`
- Dates → ✨ `SparkleIcon`  
- Gifts → 🎁 `GiftIcon`
- Places → 🗺️ `MapPinIcon`
- Photos → 📷 `PhotoIcon`
- Time → ⏰ `ClockIcon`
- Music → 🎵 `MusicIcon`

## ⚡ Performance

### Optimization
- All gradients use `expo-linear-gradient` (native)
- Icons are inline SVG (no HTTP requests)
- Images lazy load
- Animations use `useNativeDriver: true`
- FlatList not needed (only 9 cards, render all)

### Load Time
- Instant (no data fetching)
- Stagger animation: 900ms total (9 × 100ms)
- Feels smooth, not sluggish

## 🔮 Future Chapter Templates

When adding Hoofdstuk 2, 3, etc., follow this pattern:

```typescript
// Epilogue of Chapter 1
{
  id: 12,
  title: "Tot Zover...",
  content: "End of chapter 1, tease chapter 2",
  // Regular chapter page
},

// Bento menu for Chapter 2
{
  id: 13,
  title: "Hoofdstuk 2: Title",
  isBentoMenu: true, // 👈
  // ... chapter 2 intro
},

// Memory pages 14-22 with memoryId: 1-9
{
  id: 14,
  memoryId: 1, // Chapter 2, Memory 1
  // ...
},
```

## 💡 UX Best Practices

### Visual Hierarchy
1. **START badge** draws eye to first memory
2. **Numbers** establish order
3. **Icons + emoji** provide visual anchors
4. **Colors** differentiate memories

### Accessibility
- Large touch targets (140×160px min)
- High contrast text (white on colored backgrounds)
- Clear order indication (numbers)
- Descriptive titles

### Discoverability
- Instruction text guides first-time users
- START badge suggests beginning point
- Grid shows complete scope (not hidden)
- Can still swipe from cover → this menu → first memory

---

**The bento menu is the heart of your storybook navigation!** 🎨📖

See `NAVIGATION_GUIDE.md` for complete flow!
