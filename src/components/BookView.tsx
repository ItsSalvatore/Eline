import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import { ChapterPage } from './ChapterPage';
import { BentoMemories } from './BentoMemories';
import { IconButton } from './IconButton';
import { Chapter } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';
import { clampChapterIndex } from '../utils/chapterHelpers';
import { colors } from '../theme/tokens';

interface BookViewProps {
  bookId: string;
  chapters: Chapter[];
  initialChapter?: number;
  onChapterChange?: (chapter: number) => void;
  onExitToLibrary?: () => void;
  onPageVisited?: (page: Chapter, pageIndex: number) => void;
  openedMemoryIds?: number[];
}

export const BookView: React.FC<BookViewProps> = ({
  bookId,
  chapters,
  initialChapter = 0,
  onChapterChange,
  onExitToLibrary,
  onPageVisited,
  openedMemoryIds = [],
}) => {
  const { width } = useWindowDimensions();
  const swipeThreshold = width * 0.25;

  const [currentIndex, setCurrentIndex] = useState(() =>
    clampChapterIndex(initialChapter, chapters.length)
  );
  const currentIndexRef = useRef(currentIndex);
  const pan = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const currentChapter = chapters[currentIndex];
    if (currentChapter) {
      onPageVisited?.(currentChapter, currentIndex);
    }
  }, [chapters, currentIndex, onPageVisited]);

  const setVisitedIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      currentIndexRef.current = index;
      onChapterChange?.(index);
    },
    [onChapterChange]
  );

  const snapBack = useCallback(() => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [pan]);

  const goToNextChapter = useCallback(() => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        onChapterChange?.(next);
        currentIndexRef.current = next;
        return next;
      });
      pan.setValue(width);
      Animated.parallel([
        Animated.timing(pan, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [width, pan, opacity, onChapterChange]);

  const goToPreviousChapter = useCallback(() => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex((prev) => {
        const next = prev - 1;
        onChapterChange?.(next);
        currentIndexRef.current = next;
        return next;
      });
      pan.setValue(-width);
      Animated.parallel([
        Animated.timing(pan, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [width, pan, opacity, onChapterChange]);

  const navigationRef = useRef({ goToNextChapter, goToPreviousChapter, snapBack });
  navigationRef.current = { goToNextChapter, goToPreviousChapter, snapBack };

  const goToChapterMenu = useCallback(() => {
    const menuIndex = chapters.findIndex((ch) => ch.isBentoMenu);
    if (menuIndex === -1) return;

    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisitedIndex(menuIndex);
      pan.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [chapters, opacity, pan, setVisitedIndex]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return (
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
            Math.abs(gestureState.dx) > 10
          );
        },
        onPanResponderMove: (_, gestureState) => {
          const idx = currentIndexRef.current;
          if (
            (gestureState.dx < 0 && idx < chapters.length - 1) ||
            (gestureState.dx > 0 && idx > 0)
          ) {
            pan.setValue(gestureState.dx);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          const idx = currentIndexRef.current;
          const swipeLeft = gestureState.dx < -swipeThreshold;
          const swipeRight = gestureState.dx > swipeThreshold;
          const { goToNextChapter: next, goToPreviousChapter: prev, snapBack: snap } =
            navigationRef.current;

          if (swipeLeft && idx < chapters.length - 1) {
            const nextChapter = chapters[idx + 1];
            if (nextChapter.unlocked) {
              next();
            } else {
              snap();
              Alert.alert(
                'Vergrendeld',
                'Dit hoofdstuk is nog niet beschikbaar. Kom binnenkort terug voor meer!',
                [{ text: 'Oké', style: 'default' }]
              );
            }
          } else if (swipeRight && idx > 0) {
            prev();
          } else {
            snap();
          }
        },
      }),
    [chapters, pan, swipeThreshold]
  );

  const goToMemory = useCallback(
    (memoryId: number) => {
      const targetIndex = chapters.findIndex((ch) => ch.memoryId === memoryId);
      if (targetIndex === -1) return;

      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setVisitedIndex(targetIndex);
        pan.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    },
    [chapters, opacity, pan, setVisitedIndex]
  );

  const currentChapter = chapters[currentIndex];

  const memoryPages = useMemo(
    () => chapters.filter((ch) => ch.memoryId),
    [chapters]
  );

  const showBackArrow = useMemo(() => {
    if (currentChapter.isBentoMenu || currentIndex === 0) return false;
    const previousChapter = chapters[currentIndex - 1];
    if (currentChapter.memoryId && !previousChapter.memoryId) return false;
    return true;
  }, [currentChapter, currentIndex, chapters]);

  const showForwardArrow = useMemo(() => {
    if (currentChapter.isBentoMenu || currentIndex >= chapters.length - 1) return false;
    return chapters[currentIndex + 1].unlocked;
  }, [currentChapter, currentIndex, chapters]);

  const currentMemoryIndex = currentChapter.memoryId
    ? memoryPages.findIndex((ch) => ch.id === currentChapter.id)
    : -1;

  return (
    <View style={styles.container} testID={`book-view-${bookId}`}>
      <Animated.View
        style={[
          styles.pageContainer,
          {
            transform: [{ translateX: pan }],
            opacity,
          },
        ]}
        {...(!currentChapter.isBentoMenu && !currentChapter.memoryId
          ? panResponder.panHandlers
          : {})}
      >
        {currentChapter.isBentoMenu ? (
          <BentoMemories
            chapters={chapters}
            openedMemoryIds={openedMemoryIds}
            onSelectMemory={goToMemory}
          />
        ) : (
          <ChapterPage chapter={currentChapter} isActive />
        )}
      </Animated.View>

      {onExitToLibrary && (
        <View
          style={[
            styles.libraryButton,
            currentChapter.memoryId
              ? styles.libraryButtonOnMemory
              : styles.libraryButtonDefault,
          ]}
        >
          <IconButton
            onPress={onExitToLibrary}
            accessibilityLabel="Terug naar bibliotheek"
            icon={
              <View style={styles.backIconContainer}>
                <ArrowLeftIcon size={16} color={colors.rose} />
                <Text style={styles.backText}>Bibliotheek</Text>
              </View>
            }
          />
        </View>
      )}

      {currentChapter.memoryId && (
        <View style={styles.backButton}>
          <IconButton
            onPress={goToChapterMenu}
            accessibilityLabel="Terug naar menu"
            icon={
              <View style={styles.backIconContainer}>
                <ArrowLeftIcon size={16} color={colors.rose} />
                <Text style={styles.backText}>Menu</Text>
              </View>
            }
          />
        </View>
      )}

      {showBackArrow && (
        <View style={styles.navButtonLeft}>
          <IconButton
            onPress={goToPreviousChapter}
            accessibilityLabel="Vorige pagina"
            icon={<ArrowLeftIcon size={20} color="rgba(139, 0, 0, 0.8)" />}
          />
        </View>
      )}

      {showForwardArrow && (
        <View style={styles.navButtonRight}>
          <IconButton
            onPress={goToNextChapter}
            accessibilityLabel="Volgende pagina"
            icon={<ArrowRightIcon size={20} color="rgba(139, 0, 0, 0.8)" />}
          />
        </View>
      )}

      {currentChapter.memoryId && currentMemoryIndex >= 0 && (
        <View style={styles.indicatorContainer} accessibilityRole="tablist">
          {memoryPages.map((chapter, index) => (
            <View
              key={chapter.id}
              style={[
                styles.indicator,
                index === currentMemoryIndex && styles.activeIndicator,
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: index === currentMemoryIndex }}
              accessibilityLabel={`Herinnering ${index + 1} van ${memoryPages.length}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  libraryButton: {
    position: 'absolute',
    top: 50,
    zIndex: 12,
  },
  libraryButtonDefault: {
    left: 20,
  },
  libraryButtonOnMemory: {
    right: 20,
  },
  backIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.rose,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -24 }],
    zIndex: 10,
  },
  navButtonRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -24 }],
    zIndex: 10,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
  },
});
