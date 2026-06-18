import AsyncStorage from '@react-native-async-storage/async-storage';
import { LibraryProgress, StoryProgress } from '../types';
import {
  createDefaultLibraryProgress,
  hydrateMissingBookProgress,
  migrateStoryProgressToLibraryProgress,
} from './progressHelpers';

const STORAGE_KEY_V1 = '@eline_story_progress';
const STORAGE_KEY_V2 = '@eline_library_progress';

export const saveProgress = async (progress: StoryProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_V1, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const loadProgress = async (): Promise<StoryProgress | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY_V1);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};

export const saveLibraryProgress = async (progress: LibraryProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_V2, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving library progress:', error);
  }
};

export const loadLibraryProgress = async (): Promise<LibraryProgress> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY_V2);

    if (value) {
      return hydrateMissingBookProgress(JSON.parse(value));
    }

    const legacyProgress = await loadProgress();
    const migrated = migrateStoryProgressToLibraryProgress(legacyProgress);
    await saveLibraryProgress(migrated);
    return hydrateMissingBookProgress(migrated);
  } catch (error) {
    console.error('Error loading library progress:', error);
    return createDefaultLibraryProgress();
  }
};

export const resetProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEY_V1, STORAGE_KEY_V2]);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};
