import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Book, Library, LibraryProgress } from '../types';
import { BookCard } from './BookCard';
import { RoseIcon } from '../icons/flowers';
import { colors, spacing } from '../theme/tokens';
import { getBookProgressSummary } from '../utils/progressHelpers';

interface LibraryViewProps {
  library: Library;
  progress: LibraryProgress;
  onOpenBook: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  library,
  progress,
  onOpenBook,
}) => {
  const [lockedTeaserId, setLockedTeaserId] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(translateAnim, {
        toValue: 0,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
    ]);

    entrance.start();
    return () => entrance.stop();
  }, [fadeAnim, translateAnim]);

  const summaries = useMemo(
    () =>
      library.books.reduce(
        (acc, book) => ({
          ...acc,
          [book.id]: getBookProgressSummary(book, progress),
        }),
        {} as Record<string, ReturnType<typeof getBookProgressSummary>>
      ),
    [library.books, progress]
  );

  const handleBookPress = (book: Book) => {
    const summary = summaries[book.id];
    if (summary.status === 'locked') {
      setLockedTeaserId((current) => (current === book.id ? null : book.id));
      return;
    }

    onOpenBook(book);
  };

  return (
    <LinearGradient
      colors={[colors.bg, colors.tintCream, colors.tintBlush]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.flowerMark} pointerEvents="none">
        <RoseIcon size={110} color="rgba(139, 0, 0, 0.08)" />
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.kicker}>{library.subtitle}</Text>
            <Text style={styles.title}>{library.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.dedication}>{library.dedication}</Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.threadLine} pointerEvents="none" />
            {library.books.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                summary={summaries[book.id]}
                index={index}
                isLockedTeaserVisible={lockedTeaserId === book.id}
                onPress={() => handleBookPress(book)}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flowerMark: {
    position: 'absolute',
    top: 72,
    right: -18,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 72,
    paddingHorizontal: spacing.lg,
    paddingBottom: 56,
  },
  header: {
    width: '88%',
    marginBottom: spacing.xl,
  },
  kicker: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1.4,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '700',
    color: colors.rose,
    letterSpacing: -1,
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: colors.roseBorder,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  dedication: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.textSecondary,
  },
  timeline: {
    position: 'relative',
    gap: spacing.md,
  },
  threadLine: {
    position: 'absolute',
    left: 20,
    top: 28,
    bottom: 42,
    width: 2,
    backgroundColor: colors.roseBorder,
    borderRadius: 1,
  },
});
