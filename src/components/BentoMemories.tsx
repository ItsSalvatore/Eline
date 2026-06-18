import React, { useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RoseIcon, LilyIcon } from '../icons/flowers';
import {
  HeartIcon,
  SparkleIcon,
  MapPinIcon,
  ClockIcon,
  MessageIcon,
  GiftIcon,
} from '../icons';
import { Chapter } from '../types';
import { getMemoryChapters } from '../utils/chapterHelpers';
import { colors, spacing, radius, shadows } from '../theme/tokens';

interface BentoMemoriesProps {
  chapters: Chapter[];
  openedMemoryIds?: number[];
  onSelectMemory: (memoryId: number) => void;
}

const renderChapterIcon = (chapter: Chapter, size = 28) => {
  const iconColor = chapter.textColor;
  switch (chapter.icon) {
    case 'message':
      return <MessageIcon size={size} color={iconColor} />;
    case 'sparkle':
      return <SparkleIcon size={size} color={iconColor} />;
    case 'gift':
      return <GiftIcon size={size} color={iconColor} />;
    case 'clock':
      return <ClockIcon size={size} color={iconColor} />;
    case 'heart':
      return <HeartIcon size={size} color={iconColor} />;
    case 'map':
      return <MapPinIcon size={size} color={iconColor} />;
    default:
      return <SparkleIcon size={size} color={iconColor} />;
  }
};

type CardLayout = 'hero' | 'wide' | 'narrow' | 'tall' | 'stackItem' | 'featured';

const getCardLayout = (memoryId: number): CardLayout => {
  if (memoryId === 1) return 'hero';
  if (memoryId === 2) return 'wide';
  if (memoryId === 3) return 'narrow';
  if (memoryId === 6) return 'tall';
  if (memoryId === 7 || memoryId === 8) return 'stackItem';
  if (memoryId === 10) return 'featured';
  return 'narrow';
};

export const BentoMemories: React.FC<BentoMemoriesProps> = ({
  chapters,
  openedMemoryIds = [],
  onSelectMemory,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const memories = useMemo(() => getMemoryChapters(chapters), [chapters]);
  const scaleAnims = useRef(memories.map(() => new Animated.Value(0))).current;

  const bentoChapter = chapters.find((ch) => ch.isBentoMenu);

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    fadeIn.start();

    const animations = scaleAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: index * 80,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    );

    const stagger = Animated.stagger(50, animations);
    stagger.start();
    return () => {
      fadeIn.stop();
      stagger.stop();
    };
  }, [fadeAnim, scaleAnims]);

  const renderCard = (memory: Chapter, index: number, layout: CardLayout) => {
    const memoryId = memory.memoryId!;
    const isOpened = openedMemoryIds.includes(memoryId);
    const layoutStyle =
      layout === 'hero'
        ? styles.heroCard
        : layout === 'wide'
          ? styles.wideCard
          : layout === 'tall'
            ? styles.tallCard
            : layout === 'featured'
              ? styles.featuredCard
              : layout === 'stackItem'
                ? styles.stackItem
                : styles.narrowCard;

    return (
      <Animated.View
        key={memory.id}
        style={[
          layoutStyle,
          { transform: [{ scale: scaleAnims[index] ?? scaleAnims[0] }] },
        ]}
      >
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => onSelectMemory(memoryId)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`${memory.title}, herinnering ${memoryId}`}
        >
          <View
            style={[
              styles.cardSurface,
              { backgroundColor: memory.backgroundColor },
              isOpened && styles.cardSurfaceOpened,
              memory.hasValentineReveal && styles.valentineBorder,
            ]}
          >
            {memoryId === 1 && !isOpened && (
              <View style={styles.startBadge}>
                <Text style={styles.startText}>START</Text>
              </View>
            )}
            {isOpened && (
              <View style={styles.readBadge}>
                <Text style={styles.readBadgeText}>GELEZEN</Text>
              </View>
            )}
            {memory.hasValentineReveal && !isOpened && (
              <View style={styles.valentineBadge}>
                <Text style={styles.startText}>14 FEB</Text>
              </View>
            )}
            <Text style={styles.orderNumber}>{memoryId}</Text>
            <View style={styles.iconContainer}>{renderChapterIcon(memory)}</View>
            <Text style={[styles.memoryTitle, { color: memory.textColor }]}>
              {memory.title}
            </Text>
            {memory.date && (
              <Text style={[styles.memoryDate, { color: memory.textColor }]}>
                {memory.date}
              </Text>
            )}
            {isOpened && <View style={styles.readUnderline} />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const row2 = memories.filter((m) => m.memoryId === 2 || m.memoryId === 3);
  const row3 = memories.filter((m) => m.memoryId === 4 || m.memoryId === 5);
  const row4Left = memories.find((m) => m.memoryId === 6);
  const row4Right = memories.filter((m) => m.memoryId === 7 || m.memoryId === 8);
  const row5 = memories.filter((m) => m.memoryId === 9 || m.memoryId === 10);
  const hero = memories.find((m) => m.memoryId === 1);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.bg, colors.tintBlush, colors.tintPeach]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.floatingFlower, styles.rose1]}>
          <RoseIcon size={36} color="rgba(139, 0, 0, 0.12)" />
        </View>
        <View style={[styles.floatingFlower, styles.lily1]}>
          <LilyIcon size={32} color="rgba(139, 0, 0, 0.08)" />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>
                {bentoChapter?.title ?? 'Hoofdstuk 1: Het Begin'}
              </Text>
              <Text style={styles.subtitle}>
                {bentoChapter?.date ?? '20 Nov 2025 - 14 Feb 2026'}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.instruction}>
                Begin met het eerste bericht.{'\n'}
                Kies een herinnering om te openen.
              </Text>
            </View>

            <View style={styles.bentoGrid}>
              {hero && renderCard(hero, 0, 'hero')}

              <View style={styles.row}>
                {row2.map((m) =>
                  renderCard(m, m.memoryId! - 1, getCardLayout(m.memoryId!))
                )}
              </View>

              <View style={styles.row}>
                {row3.map((m) =>
                  renderCard(m, m.memoryId! - 1, getCardLayout(m.memoryId!))
                )}
              </View>

              <View style={styles.row}>
                {row4Left && renderCard(row4Left, 5, 'tall')}
                <View style={styles.stack}>
                  {row4Right.map((m) =>
                    renderCard(m, m.memoryId! - 1, 'stackItem')
                  )}
                </View>
              </View>

              <View style={styles.row}>
                {row5.map((m) =>
                  renderCard(m, m.memoryId! - 1, getCardLayout(m.memoryId!))
                )}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  floatingFlower: {
    position: 'absolute',
    zIndex: 0,
  },
  rose1: {
    top: 80,
    right: 20,
  },
  lily1: {
    bottom: 120,
    left: 24,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    paddingRight: spacing.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.rose,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: colors.roseBorder,
    marginBottom: spacing.md,
  },
  instruction: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  bentoGrid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  stack: {
    flex: 1,
    gap: 12,
  },
  heroCard: {
    width: '100%',
    minHeight: 110,
  },
  wideCard: {
    flex: 1.2,
    minHeight: 130,
  },
  narrowCard: {
    flex: 1,
    minHeight: 130,
  },
  tallCard: {
    flex: 1,
    minHeight: 200,
  },
  stackItem: {
    flex: 1,
    minHeight: 94,
  },
  featuredCard: {
    flex: 1.15,
    minHeight: 150,
  },
  cardButton: {
    flex: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardSurface: {
    flex: 1,
    padding: spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    position: 'relative',
  },
  cardSurfaceOpened: {
    borderColor: colors.rose,
  },
  valentineBorder: {
    borderColor: colors.rose,
    borderWidth: 1.5,
  },
  startBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.rose,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  valentineBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.roseLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  startText: {
    color: colors.textOnRose,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  readBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  readBadgeText: {
    color: colors.rose,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  orderNumber: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(139, 0, 0, 0.2)',
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  memoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  memoryDate: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'center',
  },
  readUnderline: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.md,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.rose,
  },
});
