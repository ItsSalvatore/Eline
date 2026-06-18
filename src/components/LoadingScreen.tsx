import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { HeartIcon } from '../icons';
import { colors, spacing } from '../theme/tokens';

export const LoadingScreen: React.FC = () => {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.container} accessibilityLabel="Laden">
      <Animated.View style={{ opacity: pulse }}>
        <HeartIcon size={48} color={colors.rose} />
      </Animated.View>
      <Text style={styles.title}>Voor Eline</Text>
      <ActivityIndicator size="small" color={colors.rose} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.lg,
    fontSize: 22,
    fontWeight: '600',
    color: colors.rose,
    letterSpacing: -0.3,
  },
  spinner: {
    marginTop: spacing.md,
  },
});
