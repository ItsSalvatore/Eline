import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { DimensionValue } from 'react-native';
import { Book, BookProgressSummary } from '../types';
import { BookIcon, SparkleIcon } from '../icons';
import { colors, radius, shadows, spacing } from '../theme/tokens';

interface BookCardProps {
  book: Book;
  summary: BookProgressSummary;
  index: number;
  isLockedTeaserVisible: boolean;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  summary,
  index,
  isLockedTeaserVisible,
  onPress,
}) => {
  const isLocked = summary.status === 'locked';
  const isComplete = summary.status === 'complete';
  const isInProgress = summary.status === 'in_progress';
  const progressWidth = `${Math.max(4, summary.progressPercent)}%` as DimensionValue;

  return (
    <View style={styles.timelineRow}>
      <View style={styles.threadColumn}>
        <View
          style={[
            styles.node,
            isComplete && styles.nodeComplete,
            isInProgress && styles.nodeActive,
            isLocked && styles.nodeLocked,
          ]}
        >
          <Text style={[styles.nodeText, isLocked && styles.nodeTextLocked]}>
            {book.number}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.card,
          index % 2 === 1 && styles.cardOffset,
          isLocked && styles.cardLocked,
        ]}
        onPress={onPress}
        activeOpacity={0.86}
        accessibilityRole="button"
        accessibilityState={{ expanded: isLocked ? isLockedTeaserVisible : undefined }}
        accessibilityHint={
          isLocked
            ? 'Toont waarom dit hoofdstuk nog gesloten is.'
            : 'Opent dit hoofdstuk.'
        }
        accessibilityLabel={`${book.title}: ${summary.label}. ${summary.detail}`}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconShell, isLocked && styles.iconShellLocked]}>
            {isLocked ? (
              <SparkleIcon size={22} color={colors.textSecondary} />
            ) : (
              <BookIcon size={22} color={colors.rose} />
            )}
          </View>
          <View style={styles.meta}>
            <Text style={styles.kicker}>{book.dateRange}</Text>
            <Text style={[styles.title, isLocked && styles.titleLocked]}>
              {book.title}
            </Text>
            <Text style={styles.subtitle}>{book.subtitle}</Text>
          </View>
        </View>

        <Text style={styles.description}>{book.description}</Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: isLocked ? '0%' : progressWidth },
            ]}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.statusLabel, isLocked && styles.statusLocked]}>
            {summary.label}
          </Text>
          <Text style={styles.statusDetail}>{summary.detail}</Text>
        </View>

        {isLocked && isLockedTeaserVisible && (
          <View style={styles.lockedTeaser}>
            <Text style={styles.lockedTeaserTitle}>Nog even gesloten</Text>
            <Text style={styles.lockedTeaserText}>
              Dit boek blijft zichtbaar in de bibliotheek, zodat er alvast plek is
              voor wat later komt.
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 188,
  },
  threadColumn: {
    width: 42,
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  node: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.roseBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeActive: {
    borderColor: colors.rose,
    backgroundColor: colors.bg,
  },
  nodeComplete: {
    backgroundColor: colors.rose,
    borderColor: colors.rose,
  },
  nodeLocked: {
    borderColor: 'rgba(120, 113, 108, 0.35)',
    backgroundColor: colors.surfaceMuted,
  },
  nodeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.rose,
  },
  nodeTextLocked: {
    color: colors.textSecondary,
  },
  card: {
    flex: 1,
    minHeight: 158,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    ...shadows.card,
  },
  cardOffset: {
    marginTop: spacing.lg,
  },
  cardLocked: {
    backgroundColor: colors.surfaceMuted,
    borderColor: 'rgba(120, 113, 108, 0.28)',
    shadowOpacity: 0.03,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  iconShell: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.roseMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShellLocked: {
    backgroundColor: 'rgba(120, 113, 108, 0.12)',
  },
  meta: {
    flex: 1,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.rose,
    letterSpacing: -0.4,
  },
  titleLocked: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 2,
  },
  description: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.lg,
  },
  progressTrack: {
    height: 3,
    borderRadius: radius.full,
    backgroundColor: colors.roseMuted,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: radius.full,
    backgroundColor: colors.rose,
  },
  footer: {
    marginTop: spacing.md,
    gap: 2,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.rose,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusLocked: {
    color: colors.textSecondary,
  },
  statusDetail: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lockedTeaser: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(120, 113, 108, 0.18)',
  },
  lockedTeaserTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  lockedTeaserText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});
