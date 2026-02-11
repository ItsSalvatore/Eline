export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  image?: any; // For single image or require() path
  images?: any[]; // For multiple images
  icon?: 'heart' | 'book' | 'sparkle' | 'photo' | 'map' | 'clock' | 'message' | 'music' | 'gift';
  backgroundColor: string;
  textColor: string;
  unlocked: boolean;
  date?: string;
  isBentoMenu?: boolean; // If true, shows bento grid instead of regular page
  memoryId?: number; // For bento menu navigation
  hasValentineReveal?: boolean; // If true, shows interactive gift reveal component
}

export interface StoryProgress {
  currentChapter: number;
  unlockedChapters: number[];
  lastVisited: string;
}
