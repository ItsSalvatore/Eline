import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import { ChapterPage } from './ChapterPage';
import { BentoMemories } from './BentoMemories';
import { IconButton } from './IconButton';
import { Chapter } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

interface BookViewProps {
  chapters: Chapter[];
  onChapterChange?: (chapter: number) => void;
}

export const BookView: React.FC<BookViewProps> = ({ chapters, onChapterChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const goToChapterMenu = () => {
    // Go back to the chapter's bento menu (page 2 for Chapter 1)
    const menuIndex = chapters.findIndex(ch => ch.isBentoMenu);
    if (menuIndex !== -1) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(menuIndex);
        pan.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        onChapterChange?.(menuIndex);
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture horizontal swipes (more horizontal than vertical)
        const isHorizontalSwipe = Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
        return isHorizontalSwipe;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow swipe if not at boundaries
        if (
          (gestureState.dx < 0 && currentIndex < chapters.length - 1) ||
          (gestureState.dx > 0 && currentIndex > 0)
        ) {
          pan.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const swipeLeft = gestureState.dx < -SWIPE_THRESHOLD; // Swipe left = next page
        const swipeRight = gestureState.dx > SWIPE_THRESHOLD; // Swipe right = previous page
        const currentChapter = chapters[currentIndex];

        if (swipeLeft && currentIndex < chapters.length - 1) {
          // Swiping LEFT = going to NEXT chapter (forward →)
          const nextChapter = chapters[currentIndex + 1];
          
          // Allow if next chapter is unlocked
          if (nextChapter.unlocked) {
            goToNextChapter();
          } else {
            // Show locked message
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: true,
              tension: 50,
              friction: 7,
            }).start();
            Alert.alert(
              '🔒 Vergrendeld',
              'Dit hoofdstuk is nog niet beschikbaar. Kom binnenkort terug voor meer!',
              [{ text: 'Oké', style: 'default' }]
            );
          }
        } else if (swipeRight && currentIndex > 0) {
          // Swiping RIGHT = going to PREVIOUS chapter (back ←)
          // Note: Swipe is disabled on memory pages via panHandlers check
          goToPreviousChapter();
        } else {
          // Snap back - didn't swipe far enough or at boundary
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  const goToNextChapter = () => {
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
      setCurrentIndex(currentIndex + 1);
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
      onChapterChange?.(currentIndex + 1);
    });
  };

  const goToPreviousChapter = () => {
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
      setCurrentIndex(currentIndex - 1);
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
      onChapterChange?.(currentIndex - 1);
    });
  };

  const goToMemory = (memoryId: number) => {
    // Find the chapter with this memoryId
    const targetIndex = chapters.findIndex(ch => ch.memoryId === memoryId);
    if (targetIndex !== -1) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(targetIndex);
        pan.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        onChapterChange?.(targetIndex);
      });
    }
  };

  const currentChapter = chapters[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pageContainer,
          {
            transform: [{ translateX: pan }],
            opacity,
          },
        ]}
        {...(!currentChapter.isBentoMenu && !currentChapter.memoryId && panResponder.panHandlers)}
      >
        {currentChapter.isBentoMenu ? (
          <BentoMemories onSelectMemory={goToMemory} />
        ) : (
          <ChapterPage
            chapter={currentChapter}
            isActive={true}
          />
        )}
      </Animated.View>

      {/* Back to Menu button - shown on memory pages */}
      {currentChapter.memoryId && (
        <View style={styles.backButton}>
          <IconButton
            onPress={goToChapterMenu}
            icon={
              <View style={styles.backIconContainer}>
                <ArrowLeftIcon size={16} color="rgba(139, 0, 0, 0.9)" />
                <Text style={styles.backText}>Menu</Text>
              </View>
            }
          />
        </View>
      )}

      {/* Navigation arrows - match swipe behavior exactly */}
      {/* LEFT arrow: Only show if we can actually go back */}
      {(() => {
        // Don't show on bento menu
        if (currentChapter.isBentoMenu) return null;
        // Don't show if we're at the beginning
        if (currentIndex === 0) return null;
        
        const previousChapter = chapters[currentIndex - 1];
        
        // If we're on a memory, only show if previous is also a memory
        if (currentChapter.memoryId) {
          if (!previousChapter.memoryId) return null; // Previous is not a memory, don't show arrow
        }
        
        // Show the arrow
        return (
          <View style={styles.navButtonLeft}>
            <IconButton
              onPress={goToPreviousChapter}
              icon={<ArrowLeftIcon size={20} color="rgba(139, 0, 0, 0.8)" />}
            />
          </View>
        );
      })()}

      {/* RIGHT arrow: Only show if we can actually go forward */}
      {(() => {
        // Don't show on bento menu
        if (currentChapter.isBentoMenu) return null;
        // Don't show if we're at the end
        if (currentIndex >= chapters.length - 1) return null;
        
        const nextChapter = chapters[currentIndex + 1];
        
        // Only show if next chapter is unlocked
        if (!nextChapter.unlocked) return null;
        
        // Show the arrow
        return (
          <View style={styles.navButtonRight}>
            <IconButton
              onPress={goToNextChapter}
              icon={<ArrowRightIcon size={20} color="rgba(139, 0, 0, 0.8)" />}
            />
          </View>
        );
      })()}

      {/* Page indicator dots - only show on memory pages */}
      {currentChapter.memoryId && (() => {
        // Get only the memory pages (chapters with memoryId)
        const memoryPages = chapters.filter(ch => ch.memoryId);
        const currentMemoryIndex = memoryPages.findIndex(ch => ch.id === currentChapter.id);
        
        return (
          <View style={styles.indicatorContainer}>
            {memoryPages.map((chapter, index) => (
              <View
                key={chapter.id}
                style={[
                  styles.indicator,
                  index === currentMemoryIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        );
      })()}
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
  backIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(139, 0, 0, 0.9)',
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
  lockedIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
