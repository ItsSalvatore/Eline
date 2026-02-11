# 📖 Hoofdstukken Gids

Complete handleiding voor het maken van mooie hoofdstukken voor Eline

## 🎨 Hoofdstuk Anatomie

Elk hoofdstuk bestaat uit:

```typescript
{
  id: 1,                          // Uniek nummer (1, 2, 3, ...)
  title: "Hoofdstuk Titel",       // Grote titel bovenaan
  subtitle: "Ondertitel",         // Kleinere tekst onder titel (optioneel)
  content: "De inhoud...",        // De hoofdtekst
  image: "pad/naar/foto.jpg",     // Foto (optioneel)
  backgroundColor: "#FFB6C1",     // Achtergrond kleur
  textColor: "#8B0000",           // Tekst kleur
  unlocked: true,                 // true = beschikbaar, false = vergrendeld
  date: "14 februari 2026"        // Datum badge (optioneel)
}
```

## 🌈 Mooie Kleurencombinaties

### Romantisch & Warm

```typescript
// Zachte roze
backgroundColor: "#FFB6C1", textColor: "#8B0000"

// Diep roze
backgroundColor: "#FF69B4", textColor: "#4B0033"

// Koraalrood
backgroundColor: "#FF7F50", textColor: "#8B0000"

// Perzik
backgroundColor: "#FFDAB9", textColor: "#8B4726"
```

### Rustig & Elegant

```typescript
// Lavendel
backgroundColor: "#DDA0DD", textColor: "#4B0082"

// Mint
backgroundColor: "#98FB98", textColor: "#2F4F2F"

// Hemelsblauw
backgroundColor: "#87CEEB", textColor: "#2F4F4F"

// Crème
backgroundColor: "#FFF5E1", textColor: "#8B4513"
```

### Levendig & Vrolijk

```typescript
// Zonsondergang oranje
backgroundColor: "#FFA07A", textColor: "#8B4513"

// Zacht geel
backgroundColor: "#FFFACD", textColor: "#B8860B"

// Licht turquoise
backgroundColor: "#AFEEEE", textColor: "#2F4F4F"

// Warm roze
backgroundColor: "#FFB6C1", textColor: "#C71585"
```

## ✍️ Content Schrijftips

### Basis formatting

```typescript
// Nieuwe regel
content: "Eerste regel.\n\nTweede paragraaf."

// Emoji gebruiken
content: "Ik hou van je! ❤️\n\nJe bent geweldig! ✨"

// Quotes
content: "\"Liefde is...\" - Iemand wijs\n\nEn dat is waar!"
```

### Voorbeelden van goede content

**Romantisch:**
```typescript
content: `Lieve Eline,

Elk moment met jou voelt als een hoofdstuk uit een prachtig verhaal. 
Een verhaal dat ik elke dag opnieuw wil lezen.

Met alle liefde,
Mano ❤️`
```

**Grappig:**
```typescript
content: `Wist je dat...

...je de mooiste lach hebt? 😊
...je mijn favoriete persoon bent? 💕
...ik dit hoofdstuk speciaal voor jou schreef? ✨

Nu weet je het! 💝`
```

**Herinnering:**
```typescript
content: `Deze foto is van die dag in [plaats]...

Ik zal nooit vergeten hoe [speciale herinnering]. 
Het was een perfecte dag, vooral omdat jij erbij was.

Laten we nog veel meer van zulke dagen maken! 🌹`
```

## 📸 Hoofdstuk met Foto

### Stap 1: Voeg foto toe aan assets/photos/

```
assets/
  photos/
    - valentijn2026.jpg
```

### Stap 2: Update chapter type definitie

In `src/types/index.ts`, verander:
```typescript
export interface Chapter {
  // ... andere velden
  image?: any; // Voeg deze toe als die er niet is
}
```

### Stap 3: Update ChapterPage component

In `src/components/ChapterPage.tsx`, voeg toe na de `titleSection`:

```typescript
import { Image } from 'react-native';

// In de render, na titleSection:
{chapter.image && (
  <View style={styles.imageContainer}>
    <Image
      source={chapter.image}
      style={styles.chapterImage}
      resizeMode="cover"
    />
  </View>
)}

// Voeg styles toe onderaan:
imageContainer: {
  marginVertical: 25,
  borderRadius: 15,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},
chapterImage: {
  width: '100%',
  height: 300,
  borderRadius: 15,
},
```

### Stap 4: Gebruik in chapter

```typescript
{
  id: 4,
  title: "Onze Dag in Amsterdam",
  subtitle: "17 december 2025",
  content: "Dit was zo'n mooie dag...",
  image: require("../../assets/photos/amsterdam.jpg"),
  backgroundColor: "#FFDAB9",
  textColor: "#8B4726",
  unlocked: true
}
```

## 🔒 Vergrendelde Hoofdstukken

Maak hoofdstukken die later ontgrendeld worden:

```typescript
// Hoofdstuk voor later
{
  id: 10,
  title: "Onze Zomervakantie",
  subtitle: "Binnenkort beschikbaar",
  content: "Deze herinnering wordt binnenkort ontgrendeld! 🌴",
  backgroundColor: "#FFE4E1",
  textColor: "#8B4513",
  unlocked: false, // Vergrendeld!
  date: "Juli 2026"
}
```

Later ontgrendelen in `App.tsx`:

```typescript
const [progress, setProgress] = useState<StoryProgress>({
  currentChapter: 0,
  unlockedChapters: [1, 2, 3, 4, 5, 10], // Voeg 10 toe om te ontgrendelen!
  lastVisited: new Date().toISOString(),
});
```

## 🎁 Speciale Hoofdstukken

### Verjaardagshoofdstuk

```typescript
{
  id: 5,
  title: "🎂 Gefeliciteerd! 🎂",
  subtitle: "Voor de mooiste verjaardag",
  content: `Lieve Eline,

Op deze speciale dag wil ik je laten weten hoe 
belangrijk je voor mij bent. 

Ik hoop dat al je wensen uitkomen! 🎉

Veel liefs,
Mano ❤️`,
  backgroundColor: "#FFB6C1",
  textColor: "#C71585",
  unlocked: true,
  date: "Jouw Verjaardag"
}
```

### Mijlpaal Hoofdstuk

```typescript
{
  id: 6,
  title: "Eén Jaar Samen",
  subtitle: "365 dagen geluk",
  content: `Wow, een heel jaar!

Elke dag met jou is speciaal. 
Van koffie in de ochtend tot sterren kijken 's avonds.

Op naar nog veel meer jaren samen! 💕`,
  backgroundColor: "#DDA0DD",
  textColor: "#4B0082",
  unlocked: true,
  date: "14 februari 2027"
}
```

### "Zomaar" Liefde Hoofdstuk

```typescript
{
  id: 7,
  title: "Zomaar",
  subtitle: "Omdat ik van je hou",
  content: `Geen speciale reden, geen speciale dag.

Gewoon even zeggen: je bent geweldig! ✨

En ik vind het fijn dat je er bent. 💝`,
  backgroundColor: "#AFEEEE",
  textColor: "#2F4F4F",
  unlocked: true
}
```

## 📝 Template voor Snel Kopiëren

```typescript
{
  id: X, // Verander naar volgend nummer
  title: "",
  subtitle: "",
  content: ``,
  backgroundColor: "#FFB6C1",
  textColor: "#8B0000",
  unlocked: true,
  date: ""
},
```

## 🚀 Workflow: Nieuw Hoofdstuk Toevoegen

1. **Open** `src/data/chapters.ts`
2. **Kopieer** het template hierboven
3. **Plak** onderaan de chapters array
4. **Vul in**:
   - Uniek ID nummer
   - Titel en content
   - Kies kleuren
   - Besluit of het unlocked is
5. **Save** het bestand
6. **Refresh** de app in je browser
7. **Test** door te swipen naar het nieuwe hoofdstuk!

## 💡 Pro Tips

1. **Spaties en enters** zijn belangrijk voor leesbaarheid
2. **Emoji's** maken het persoonlijker (maar niet te veel!)
3. **Korte zinnen** lezen makkelijker op mobiel
4. **Mix het**: wissel romantische met grappige hoofdstukken
5. **Test kleuren**: soms zien kleuren er anders uit op mobiel
6. **Foto's optimaliseren**: gebruik TinyPNG.com voor kleinere bestanden
7. **Backup**: copy/paste chapters.ts naar een veilige plek voor je updates

## 🎨 Inspiratie Bronnen

- Gedeelde herinneringen
- Inside jokes
- Favoriete plekken
- Speciale datums
- Toekomstplannen
- Redenen waarom je van haar houdt
- Grappige momenten
- Romantische gedachten
- Dankbaarheid
- Complimenten

---

Veel plezier met het maken van mooie hoofdstukken! ❤️

**Onthoud:** Het gaat om de gedachte en de moeite, niet om perfectie. 
Eline zal het prachtig vinden! 💕
