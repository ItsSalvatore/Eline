import { Chapter } from './index';

export type StoryPage = Chapter;

export type BookStatus = 'locked' | 'available' | 'in_progress' | 'complete';

export interface Book {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  dateRange: string;
  description: string;
  coverColor: string;
  textColor: string;
  locked: boolean;
  sortOrder: number;
  pages: StoryPage[];
}

export interface Library {
  id: 'eline-library';
  title: string;
  subtitle: string;
  dedication: string;
  books: Book[];
}

export interface BookProgress {
  lastPageIndex: number;
  visitedMemoryIds: number[];
  completedAt?: string;
}

export interface LibraryProgress {
  version: 2;
  activeBookId: string | null;
  activePageIndex: number;
  activeScreen: 'library' | 'book';
  unlockedBookIds: string[];
  books: Record<string, BookProgress>;
  lastVisited: string;
}

export interface BookProgressSummary {
  status: BookStatus;
  progressPercent: number;
  visitedCount: number;
  memoryCount: number;
  label: string;
  detail: string;
}
