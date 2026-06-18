import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

export type FlipDirection = 'forward' | 'backward';

interface PageFlipTransitionProps {
  width: number;
  progress: SharedValue<number>;
  direction: FlipDirection;
  underPage: React.ReactNode;
  flipPage: React.ReactNode;
}

export const PageFlipTransition: React.FC<PageFlipTransitionProps> = ({
  width,
  progress,
  direction,
  underPage,
  flipPage,
}) => {
  const isForward = direction === 'forward';
  const halfWidth = width / 2;

  const flipStyle = useAnimatedStyle(() => {
    const rotateY = isForward
      ? interpolate(progress.value, [0, 1], [0, -180], Extrapolation.CLAMP)
      : interpolate(progress.value, [0, 1], [180, 0], Extrapolation.CLAMP);

    const pivotX = isForward ? halfWidth : -halfWidth;

    const flipOpacity = interpolate(
      Math.abs(rotateY),
      [0, 88, 92, 180],
      [1, 1, 0, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: flipOpacity,
      transform: [
        { perspective: 1400 },
        { translateX: pivotX },
        { rotateY: `${rotateY}deg` },
        { translateX: -pivotX },
      ],
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    const rotateY = isForward
      ? interpolate(progress.value, [0, 1], [0, -180], Extrapolation.CLAMP)
      : interpolate(progress.value, [0, 1], [180, 0], Extrapolation.CLAMP);

    return {
      opacity: interpolate(
        Math.abs(rotateY),
        [0, 60, 90, 120, 180],
        [0, 0.1, 0.32, 0.1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.underPage}>{underPage}</View>
      <Animated.View style={[styles.flipPage, flipStyle]}>
        {flipPage}
        <Animated.View
          style={[styles.shadowOverlay, shadowStyle]}
          pointerEvents="none"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  underPage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  flipPage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backfaceVisibility: 'hidden',
  },
  shadowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a0808',
  },
});
