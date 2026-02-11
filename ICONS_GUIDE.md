# 🎨 Icon System Guide

Beautiful, minimal icons for your Valentine's storybook.

## 📐 Design Specs

- **24px grid** with 2px stroke
- **Rounded caps + joins** for soft, romantic feel
- **currentColor** - automatically adapts to your chapter's textColor
- **Filled variants** for special moments (heart, sparkle)

## 🎯 Available Icons

### Story Icons

| Icon | Name | Best Used For |
|------|------|--------------|
| ❤️ | `heart` | Love declarations, romantic moments |
| 📖 | `book` | Story chapters, beginnings |
| ✨ | `sparkle` | Special moments, magic, surprises |
| 📸 | `photo` | Photo galleries, memories |
| 📍 | `map` | Places you've been together |
| 🕐 | `clock` | Timeline, "that day", anniversaries |
| 💬 | `message` | Cute texts, conversations, quotes |
| 🎵 | `music` | Songs that remind you of her |
| 🎁 | `gift` | Surprises, final reveals |

## 💡 How to Use Icons in Chapters

### Basic Usage

Simply add `icon: "iconname"` to your chapter:

```typescript
{
  id: 1,
  title: "Our First Date",
  subtitle: "The beginning of everything",
  content: "Remember when we...",
  icon: "heart",  // ← Add this!
  backgroundColor: "#FFB6C1",
  textColor: "#8B0000",
  unlocked: true
}
```

### Icon appears as a badge above the title with a subtle background.

## 🎨 Icon + Color Combinations

### Romantic Moments
```typescript
icon: "heart"
backgroundColor: "#FFB6C1"
textColor: "#8B0000"
```

### Photo Memories
```typescript
icon: "photo"
backgroundColor: "#FFDAB9"
textColor: "#8B4726"
```

### Special Places
```typescript
icon: "map"
backgroundColor: "#AFEEEE"
textColor: "#2F4F4F"
```

### Timeline / "That Day"
```typescript
icon: "clock"
backgroundColor: "#DDA0DD"
textColor: "#4B0082"
```

### Love Messages
```typescript
icon: "message"
backgroundColor: "#FFE4E1"
textColor: "#8B4513"
```

### Your Song
```typescript
icon: "music"
backgroundColor: "#98FB98"
textColor: "#2F4F2F"
```

### Final Surprise
```typescript
icon: "gift"
backgroundColor: "#FF69B4"
textColor: "#4B0033"
```

### Story Beginning
```typescript
icon: "book"
backgroundColor: "#DDA0DD"
textColor: "#4B0082"
```

### Magic Moments
```typescript
icon: "sparkle"
backgroundColor: "#FFFACD"
textColor: "#B8860B"
```

## 📖 Example Chapter with Icon

```typescript
{
  id: 5,
  title: "Onze Eerste Reis",
  subtitle: "Amsterdam, 17 December",
  content: `Die dag zal ik nooit vergeten...
  
  We liepen langs de grachten, hand in hand.
  De stad was prachtig, maar jij was mooier.
  
  📍 Vondelpark
  📍 Museumplein
  📍 Die kleine koffiebar waar we uren zaten
  
  Laten we binnenkort terug gaan! 💕`,
  icon: "map",
  backgroundColor: "#AFEEEE",
  textColor: "#2F4F4F",
  unlocked: true,
  date: "17 december 2025"
}
```

## 🎯 Icon Strategy Tips

### Keep it Meaningful
- Use icons that match the chapter theme
- Don't overuse - not every chapter needs an icon
- Reserve filled hearts ❤️ for extra special moments

### Visual Flow
- Start with `book` for opening chapter
- Use `heart` for main love declarations
- Use `sparkle` for surprise chapters
- End with `gift` for final reveal

### Example Story Arc

1. **Cover** - `heart` (Voor Eline)
2. **Chapter 1** - `book` (Het Begin)
3. **Memories** - `photo` (Onze Herinneringen)
4. **Places** - `map` (Onze Plekjes)
5. **Our Song** - `music` (Dit Liedje...)
6. **Messages** - `message` (Lieve Woorden)
7. **Special Day** - `clock` (Die Dag...)
8. **Surprise** - `sparkle` (Een Verrassing)
9. **Final Chapter** - `gift` (Voor Jou)

## 🚀 Adding Icons to Existing Chapters

Just edit `src/data/chapters.ts`:

```typescript
// Before
{
  id: 2,
  title: "Hoofdstuk 1",
  content: "...",
  backgroundColor: "#FFB6C1",
  textColor: "#8B0000",
  unlocked: true
}

// After
{
  id: 2,
  title: "Hoofdstuk 1",
  content: "...",
  icon: "book",  // ← Add this line!
  backgroundColor: "#FFB6C1",
  textColor: "#8B0000",
  unlocked: true
}
```

Save and the icon appears instantly! ✨

## 🎨 Navigation Icons

The app also includes left/right arrow icons for page navigation:
- Appear on sides when you can swipe
- Smooth scale (0.98) + opacity microinteraction
- Soft background with subtle glass effect

## 💡 Pro Tips

1. **First Chapter**: Use `heart` for immediate emotional impact
2. **Photo Chapters**: Always use `photo` icon
3. **Location Stories**: `map` makes it clear it's about a place
4. **Timeline/Dates**: `clock` for anniversary or "remember when"
5. **Future Chapters**: Use `sparkle` for "coming soon"
6. **Final Chapter**: `gift` creates anticipation

## 🎯 No Icon?

Leave the `icon` field out entirely:

```typescript
{
  id: 3,
  title: "Simple Chapter",
  content: "Sometimes simplicity is beautiful too.",
  // no icon property = no icon shown
  backgroundColor: "#FFE4E1",
  textColor: "#8B4513",
  unlocked: true
}
```

---

The icons are designed to be **soft, romantic, and minimal** so they enhance your story without distracting from the photos and text. 💕

Use them thoughtfully and your storybook will be even more special! ✨
