import { Chapter } from '../types';

export const chapters: Chapter[] = [
  // ============================================
  // COVER PAGE
  // ============================================
  {
    id: 1,
    title: "Voor Eline",
    subtitle: "Ons Verhaal",
    content: "Lieve Eline,\n\nDit is ons verhaal. Geschreven in herinneringen, momenten, en liefde.\n\nElk hoofdstuk is een mijlpaal in onze reis samen.\n\nVeeg naar links om Hoofdstuk 1 te beginnen... ❤️",
    icon: "heart",
    backgroundColor: "#FFB6C1",
    textColor: "#8B0000",
    unlocked: true,
    date: "14 februari 2026"
  },

  // ============================================
  // HOOFDSTUK 1: HET BEGIN
  // November 2025 - Januari 2026
  // ============================================
  {
    id: 2,
    title: "Hoofdstuk 1: Het Begin",
    subtitle: "Waar alles begon",
    content: "20 november 2025 - 14 februari 2026\n\nVan een random berichtje tot de mooiste liefde...\n\nDit hoofdstuk vertelt hoe wij 'wij' werden.\n\nVan dat eerste bericht, tot die belangrijke vraag, tot Valentine's Day.\n\nKies een herinnering om te beginnen... 💫",
    icon: "book",
    backgroundColor: "#DDA0DD",
    textColor: "#4B0082",
    unlocked: true,
    date: "20 Nov 2025 - 14 Feb 2026",
    isBentoMenu: true
  },
  {
    id: 3,
    title: "Het Eerste Bericht",
    subtitle: "Hoofdstuk 1 • 20 november 2025",
    content: "20 november 2025.\n\nEen WhatsApp bericht:\n\n\"Hey, dit is echt super random maar was vorige week bij Cafe Fest en zag je daar, vond je er leuk uitzien en heb je nummer via via gekregen!\"\n\nHet begon meer als nieuwsgierigheid en gevleid voelen door het appen. Nog geen butterflies hoor.\n\nMaar wat begon als nieuwsgierigheid... groeide uit tot iets wat ik nooit had verwacht.\n\nDit bericht was het begin. 💬",
    icon: "message",
    backgroundColor: "#FFB6C1",
    textColor: "#8B0000",
    unlocked: true,
    date: "20 november",
    memoryId: 1
  },
  {
    id: 4,
    title: "Kerstgala",
    subtitle: "Hoofdstuk 1 • 19 december 2025",
    content: "Onze eerste officiële avond samen.\n\nJe zag er prachtig uit die avond. Tijd samen doorbrengen, praten, lachen...\n\nDit was het moment waarop ik wist dat dit het begin was van iets speciaals.\n\nJe maakte die avond onvergetelijk. 💫",
    image: require("../../assets/photos/kerstgala.jpg"),
    icon: "sparkle",
    backgroundColor: "#DDA0DD",
    textColor: "#4B0082",
    unlocked: true,
    date: "19 december",
    memoryId: 2
  },
  {
    id: 5,
    title: "Jouw Cadeau",
    subtitle: "Hoofdstuk 1 • Kerst 2025",
    content: "Het perfecte cadeau dat je me gaf.\n\nNiet alleen omdat het mooi was, maar omdat je echt luisterde, echt wist wat ik wilde.\n\nElke keer dat ik ernaar kijk, denk ik aan jou en die magische kerst samen.\n\nDankjewel voor dit mooie moment. 🎁",
    image: require("../../assets/photos/kerstkado.jpg"),
    icon: "gift",
    backgroundColor: "#FFDAB9",
    textColor: "#8B4726",
    unlocked: true,
    date: "Kerst 2025",
    memoryId: 3
  },
  {
    id: 6,
    title: "Onze Kerstballen",
    subtitle: "Hoofdstuk 1 • Eerste kerst samen",
    content: "Onze eerste kerst samen, en we maakten iets dat voor altijd blijft.\n\nDeze kerstballen zijn meer dan decoratie - ze zijn een symbool van ons.\n\nElk jaar als ik ze ophang, zal ik terugdenken aan dit moment, aan jou, aan ons begin.\n\nEen traditie voor altijd. 🎄",
    image: require("../../assets/photos/kerstbal.jpg"),
    icon: "sparkle",
    backgroundColor: "#FFE4E1",
    textColor: "#8B4513",
    unlocked: true,
    date: "Kerst 2025",
    memoryId: 4
  },
  {
    id: 7,
    title: "Oudjaarsavond",
    subtitle: "Hoofdstuk 1 • 31 december 2025",
    content: "Onze date samen op de laatste dag van het jaar.\n\nNog geen officieel samen, maar het voelde al zo goed. Praten, lachen, dromen over wat komen ging...\n\nIk wilde het nieuwe jaar met jou ingaan. En dat gevoel bleek juist te zijn.\n\n2026 zou ons jaar worden. 🐦",
    image: require("../../assets/photos/vogel.jpg"),
    icon: "clock",
    backgroundColor: "#AFEEEE",
    textColor: "#2F4F4F",
    unlocked: true,
    date: "31 december",
    memoryId: 5
  },
  {
    id: 8,
    title: "Eerste Sneeuw",
    subtitle: "Hoofdstuk 1 • 4 januari 2026",
    content: "Onze eerste sneeuw samen.\n\nIk weet nog hoe koud het was, maar hoe warm ik me voelde bij jou.\n\nDe manier waarop je naar de sneeuwvlokken keek, je lach...\n\nEen perfect moment in een witte wereld. ❄️",
    image: require("../../assets/photos/sneeuw.jpg"),
    icon: "sparkle",
    backgroundColor: "#F0F8FF",
    textColor: "#4682B4",
    unlocked: true,
    date: "4 januari",
    memoryId: 6
  },
  {
    id: 9,
    title: "Sneeuwpret",
    subtitle: "Hoofdstuk 1 • Onze speelse dag",
    content: "Spelen in de sneeuw als kleine kinderen.\n\nSneeuwballen gooien, lachen tot we niet meer konden, samen in de kou maar warm van binnen.\n\nDit is wat ik zo leuk vind aan jou - hoe je het kind in mij naar boven haalt.\n\nPure, ongecompliceerde blijdschap. ⛄",
    image: require("../../assets/photos/sneeuw1.jpg"),
    icon: "heart",
    backgroundColor: "#E6F3FF",
    textColor: "#1E3A5F",
    unlocked: true,
    date: "Januari 2026",
    memoryId: 7
  },
  {
    id: 10,
    title: "Kerstmarkt",
    subtitle: "Hoofdstuk 1 • Museumplein",
    content: "Hand in hand door de kerstmarkt.\n\nDe lichtjes, de geuren, de warmte van jouw hand in de mijne...\n\nGeen chocolademelk maar glühwein, oh oh oh! 🍷\n\nEen perfecte winteravond, vol magie en warmte.\n\nBij jou. 🎅✨",
    image: require("../../assets/photos/kerst.jpg"),
    icon: "map",
    backgroundColor: "#FFF5E1",
    textColor: "#8B4513",
    unlocked: true,
    date: "December 2025",
    memoryId: 8
  },
  {
    id: 11,
    title: "Die Vraag",
    subtitle: "Hoofdstuk 1 • Het belangrijkste moment",
    content: "Sushi. Spanning. Zenuwen.\n\nEn toen vroeg ik het:\n\"Wil je mijn vriendin zijn?\"\n\nJe zei ja.\n\nOp dat moment veranderde alles. Die avond, die plek, die vraag - het was het begin van ons.\n\nDe beste beslissing van mijn leven.\n\nVan ons leven. 🍣❤️",
    image: require("../../assets/photos/sushi1.jpg"),
    icon: "heart",
    backgroundColor: "#FFB6C1",
    textColor: "#8B0000",
    unlocked: true,
    date: "Januari 2026",
    memoryId: 9
  },
  {
    id: 12,
    title: "Voor Jou, Vandaag",
    subtitle: "14 Februari 2026 • Valentine's Day",
    content: "En nu... vandaag.\n\n14 februari 2026.\n\nDit is het eerste cadeau dat ik je geef voor Valentine's Day.\n\nElk cadeautje vertelt een verhaal. Elk stukje is gekozen met liefde.\n\nOpen ze één voor één en voel hoeveel je voor mij betekent.\n\nIk hou van jou. 💝",
    icon: "gift",
    backgroundColor: "#FFE4E1",
    textColor: "#C71585",
    unlocked: true,
    date: "14 Februari 2026",
    memoryId: 10,
    hasValentineReveal: true
  },
  {
    id: 13,
    title: "Het Einde van Het Begin",
    subtitle: "Hoofdstuk 1 • Epiloog",
    content: "En zo eindigt Hoofdstuk 1 van ons verhaal.\n\nVan vreemden tot geliefden.\nVan de eerste blik tot de eerste kus.\nVan 'wie ben jij?' tot 'wil je mijn vriendin zijn?'\n\nMaar dit is slechts het begin.\n\nEr komen nog veel meer hoofdstukken...\nMeer avonturen, meer herinneringen, meer liefde.\n\nElk nieuw hoofdstuk schrijven we samen.\n\nTot Hoofdstuk 2, mijn liefste. 💕",
    icon: "book",
    backgroundColor: "#FFB6C1",
    textColor: "#8B0000",
    unlocked: true
  },

  // ============================================
  // HOOFDSTUK 2: Coming Soon...
  // ============================================
  {
    id: 14,
    title: "Hoofdstuk 2",
    subtitle: "Binnenkort...",
    content: "Ons verhaal gaat door.\n\nMeer momenten, meer herinneringen, meer mijlpalen samen.\n\nDit hoofdstuk komt binnenkort...\n\n✨ Stay tuned ✨",
    icon: "sparkle",
    backgroundColor: "#DDA0DD",
    textColor: "#4B0082",
    unlocked: false
  }
];
