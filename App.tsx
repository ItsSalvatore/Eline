import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { BookView } from './src/components/BookView';
import { LockScreen } from './src/components/LockScreen';
import { chapters } from './src/data/chapters';
import { loadProgress, saveProgress } from './src/utils/storage';
import { checkIfUnlocked, setUnlocked } from './src/utils/lockStorage';
import { StoryProgress } from './src/types';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<StoryProgress>({
    currentChapter: 0,
    unlockedChapters: [1, 2],
    lastVisited: new Date().toISOString(),
  });

  useEffect(() => {
    checkLockStatus();
  }, []);

  const checkLockStatus = async () => {
    const unlocked = await checkIfUnlocked();
    setIsUnlocked(unlocked);
    
    if (unlocked) {
      await loadInitialProgress();
    }
    
    setIsLoading(false);
  };

  const loadInitialProgress = async () => {
    const savedProgress = await loadProgress();
    if (savedProgress) {
      setProgress(savedProgress);
    }
  };

  const handleUnlock = async () => {
    await setUnlocked();
    setIsUnlocked(true);
    await loadInitialProgress();
  };

  const handleChapterChange = async (chapterIndex: number) => {
    const newProgress: StoryProgress = {
      currentChapter: chapterIndex,
      unlockedChapters: progress.unlockedChapters,
      lastVisited: new Date().toISOString(),
    };
    setProgress(newProgress);
    await saveProgress(newProgress);
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BookView
        chapters={chapters}
        onChapterChange={handleChapterChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
