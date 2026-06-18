import { Book, BookProgress, BookProgressSummary, LibraryProgress, StoryProgress } from '../types';
import { getAllBooks } from '../data/books';

const HOOFDSTUK_1 = 'hoofdstuk-1';

export const createEmptyBookProgress = (): BookProgress => ({
  lastPageIndex: 0,
  visitedMemoryIds: [],
});

export const createDefaultLibraryProgress = (): LibraryProgress => ({
  version: 2,
  activeBookId: null,
  activePageIndex: 0,
  activeScreen: 'library',
  unlockedBookIds: [HOOFDSTUK_1],
  books: {
    [HOOFDSTUK_1]: createEmptyBookProgress(),
  },
  lastVisited: new Date().toISOString(),
});

const uniqueSorted = (values: number[]) =>
  Array.from(new Set(values)).sort((a, b) => a - b);

export const migrateStoryProgressToLibraryProgress = (
  progress: StoryProgress | null
): LibraryProgress => {
  if (!progress) return createDefaultLibraryProgress();

  const oldIndex = Math.max(0, progress.currentChapter);
  const pageIndex =
    oldIndex <= 1 ? 0 : oldIndex >= 12 ? 11 : Math.max(1, oldIndex - 1);
  const visitedMemoryIds =
    oldIndex >= 12
      ? Array.from({ length: 10 }, (_, index) => index + 1)
      : oldIndex >= 2
        ? Array.from({ length: oldIndex - 1 }, (_, index) => index + 1)
        : [];

  return {
    version: 2,
    activeBookId: HOOFDSTUK_1,
    activePageIndex: pageIndex,
    activeScreen: 'library',
    unlockedBookIds: [HOOFDSTUK_1],
    books: {
      [HOOFDSTUK_1]: {
        lastPageIndex: pageIndex,
        visitedMemoryIds,
        completedAt: oldIndex >= 12 ? progress.lastVisited : undefined,
      },
    },
    lastVisited: progress.lastVisited,
  };
};

export const ensureBookProgress = (
  progress: LibraryProgress,
  bookId: string
): BookProgress => progress.books[bookId] ?? createEmptyBookProgress();

export const markBookPageVisited = (
  progress: LibraryProgress,
  book: Book,
  pageIndex: number
): LibraryProgress => {
  const nextBookProgress = ensureBookProgress(progress, book.id);
  const page = book.pages[pageIndex];
  const isEpilogue = pageIndex === book.pages.length - 1 && book.pages.length > 1;
  const visitedMemoryIds =
    page?.memoryId != null
      ? uniqueSorted([...nextBookProgress.visitedMemoryIds, page.memoryId])
      : nextBookProgress.visitedMemoryIds;

  return {
    ...progress,
    activeBookId: book.id,
    activePageIndex: pageIndex,
    activeScreen: 'book',
    lastVisited: new Date().toISOString(),
    books: {
      ...progress.books,
      [book.id]: {
        ...nextBookProgress,
        lastPageIndex: pageIndex,
        visitedMemoryIds,
        completedAt: isEpilogue ? new Date().toISOString() : nextBookProgress.completedAt,
      },
    },
  };
};

export const markMemoryVisited = (
  progress: LibraryProgress,
  bookId: string,
  memoryId: number
): LibraryProgress => {
  const bookProgress = ensureBookProgress(progress, bookId);

  return {
    ...progress,
    lastVisited: new Date().toISOString(),
    books: {
      ...progress.books,
      [bookId]: {
        ...bookProgress,
        visitedMemoryIds: uniqueSorted([...bookProgress.visitedMemoryIds, memoryId]),
      },
    },
  };
};

export const markLibraryActive = (progress: LibraryProgress): LibraryProgress => ({
  ...progress,
  activeScreen: 'library',
  activeBookId: null,
  lastVisited: new Date().toISOString(),
});

export const getBookProgressSummary = (
  book: Book,
  progress: LibraryProgress
): BookProgressSummary => {
  const bookProgress = ensureBookProgress(progress, book.id);
  const memoryCount = book.pages.filter((page) => page.memoryId != null).length;
  const visitedCount = bookProgress.visitedMemoryIds.length;
  const progressPercent = memoryCount > 0 ? Math.round((visitedCount / memoryCount) * 100) : 0;
  const isUnlocked = progress.unlockedBookIds.includes(book.id) && !book.locked;
  const lastPage = book.pages[bookProgress.lastPageIndex];

  if (!isUnlocked) {
    return {
      status: 'locked',
      progressPercent: 0,
      visitedCount: 0,
      memoryCount,
      label: 'Nog niet geschreven',
      detail: 'Dit hoofdstuk blijft nog even gesloten.',
    };
  }

  if (bookProgress.completedAt) {
    return {
      status: 'complete',
      progressPercent: 100,
      visitedCount,
      memoryCount,
      label: 'Afgerond',
      detail: `${visitedCount} herinneringen gelezen`,
    };
  }

  if (visitedCount > 0 || bookProgress.lastPageIndex > 0) {
    return {
      status: 'in_progress',
      progressPercent,
      visitedCount,
      memoryCount,
      label: 'Verder lezen',
      detail: lastPage ? `Verder bij: ${lastPage.title}` : `${visitedCount} herinneringen gelezen`,
    };
  }

  return {
    status: 'available',
    progressPercent,
    visitedCount,
    memoryCount,
    label: 'Beginnen',
    detail: `${memoryCount} herinneringen wachten op je`,
  };
};

export const hydrateMissingBookProgress = (progress: LibraryProgress): LibraryProgress => {
  const books = getAllBooks();
  const nextBooks = books.reduce<Record<string, BookProgress>>(
    (acc, book) => ({
      ...acc,
      [book.id]: acc[book.id] ?? createEmptyBookProgress(),
    }),
    { ...progress.books }
  );

  return {
    ...progress,
    books: nextBooks,
    unlockedBookIds: uniqueSortedString([
      ...progress.unlockedBookIds,
      HOOFDSTUK_1,
    ]),
  };
};

const uniqueSortedString = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
