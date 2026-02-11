import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCK_KEY = '@eline_unlocked';

export const checkIfUnlocked = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(LOCK_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking unlock status:', error);
    return false;
  }
};

export const setUnlocked = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(LOCK_KEY, 'true');
  } catch (error) {
    console.error('Error saving unlock status:', error);
  }
};

export const resetLock = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LOCK_KEY);
  } catch (error) {
    console.error('Error resetting lock:', error);
  }
};
