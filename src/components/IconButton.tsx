import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { glass, radius } from '../theme/tokens';

interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
  accentColor?: boolean;
  accessibilityLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  icon,
  style,
  accentColor = false,
  accessibilityLabel,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        style={[
          styles.wrapper,
          style,
          accentColor && styles.accent,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <BlurView
          intensity={glass.blurIntensity}
          tint={glass.tint}
          style={[
            styles.blur,
            Platform.OS === 'android' && styles.androidFallback,
          ]}
        >
          {icon}
        </BlurView>
        <Animated.View style={styles.innerBorder} pointerEvents="none" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: glass.border,
  },
  blur: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidFallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.sm,
    borderTopWidth: 1,
    borderTopColor: glass.innerHighlight,
  },
  accent: {
    borderColor: 'rgba(139, 0, 0, 0.3)',
  },
});
