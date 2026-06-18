import { Book, Chapter } from '../types';

export const getMemoryChapters = (chapters: Chapter[]): Chapter[] =>
  chapters
    .filter((ch): ch is Chapter & { memoryId: number } => ch.memoryId != null)
    .sort((a, b) => a.memoryId - b.memoryId);

export const clampChapterIndex = (index: number, chaptersLength: number): number =>
  Math.max(0, Math.min(index, chaptersLength - 1));

export const flattenBookPages = (book: Book): Chapter[] => book.pages;

export const getMemoryCount = (book: Book): number =>
  book.pages.filter((page) => page.memoryId != null).length;
