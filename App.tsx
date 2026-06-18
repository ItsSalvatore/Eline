import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { BookView } from './src/components/BookView';
import { LockScreen } from './src/components/LockScreen';
import { LoadingScreen } from './src/components/LoadingScreen';
import { LibraryView } from './src/components/LibraryView';
import { library } from './src/data/library';
import { getBookById } from './src/data/books';
import { loadLibraryProgress, saveLibraryProgress } from './src/utils/storage';
import { checkIfUnlocked, setUnlocked } from './src/utils/lockStorage';
import { Book, Chapter, LibraryProgress } from './src/types';
import {
  createDefaultLibraryProgress,
  ensureBookProgress,
  markBookPageVisited,
  markLibraryActive,
} from './src/utils/progressHelpers';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [progress, setProgress] = useState<LibraryProgress>(
    createDefaultLibraryProgress()
  );

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const unlocked = await checkIfUnlocked();
      if (!mounted) return;

      setIsUnlocked(unlocked);

      if (unlocked) {
        const savedProgress = await loadLibraryProgress();
        if (mounted) {
          setProgress(savedProgress);
          if (savedProgress.activeScreen === 'book' && savedProgress.activeBookId) {
            const savedBook = getBookById(savedProgress.activeBookId);
            if (
              savedBook &&
              !savedBook.locked &&
              savedProgress.unlockedBookIds.includes(savedBook.id)
            ) {
              setActiveBookId(savedBook.id);
            }
          }
        }
      }

      if (mounted) {
        setIsLoading(false);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUnlock = async () => {
    await setUnlocked();
    setIsUnlocked(true);
    const savedProgress = await loadLibraryProgress();
    setProgress(savedProgress);
    if (savedProgress.activeScreen === 'book' && savedProgress.activeBookId) {
      const savedBook = getBookById(savedProgress.activeBookId);
      if (
        savedBook &&
        !savedBook.locked &&
        savedProgress.unlockedBookIds.includes(savedBook.id)
      ) {
        setActiveBookId(savedBook.id);
      }
    }
  };

  const handleOpenBook = useCallback((book: Book) => {
    if (book.locked || !progress.unlockedBookIds.includes(book.id)) return;

    const bookProgress = ensureBookProgress(progress, book.id);
    setActiveBookId(book.id);
    setProgress((prev) => {
      const nextProgress: LibraryProgress = {
        ...prev,
        activeBookId: book.id,
        activePageIndex: bookProgress.lastPageIndex,
        activeScreen: 'book',
        lastVisited: new Date().toISOString(),
      };
      void saveLibraryProgress(nextProgress);
      return nextProgress;
    });
  }, [progress]);

  const handleExitToLibrary = useCallback(() => {
    setActiveBookId(null);
    setProgress((prev) => {
      const nextProgress = markLibraryActive(prev);
      void saveLibraryProgress(nextProgress);
      return nextProgress;
    });
  }, []);

  const handlePageVisited = useCallback(
    (page: Chapter, pageIndex: number) => {
      if (!activeBookId) return;
      const book = getBookById(activeBookId);
      if (!book) return;

      setProgress((prev) => {
        const nextProgress = markBookPageVisited(prev, book, pageIndex);
        void saveLibraryProgress(nextProgress);
        return nextProgress;
      });
    },
    [activeBookId]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  const activeBook = activeBookId ? getBookById(activeBookId) : undefined;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {activeBook ? (
        <BookView
          key={activeBook.id}
          bookId={activeBook.id}
          chapters={activeBook.pages}
          initialChapter={ensureBookProgress(progress, activeBook.id).lastPageIndex}
          openedMemoryIds={
            ensureBookProgress(progress, activeBook.id).visitedMemoryIds
          }
          onExitToLibrary={handleExitToLibrary}
          onPageVisited={handlePageVisited}
        />
      ) : (
        <LibraryView
          library={library}
          progress={progress}
          onOpenBook={handleOpenBook}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
