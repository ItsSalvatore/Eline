import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { HeartIcon } from '../icons';
import { RoseIcon, LilyIcon } from '../icons/flowers';
import { colors, spacing, radius, shadows, glass } from '../theme/tokens';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const heartLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeat, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartBeat, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    heartLoop.start();

    return () => {
      heartLoop.stop();
    };
  }, [fadeAnim, heartBeat]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
      setError(false);
    });
  };

  const checkAnswer = () => {
    if (!answer.trim()) {
      setError(true);
      shake();
      return;
    }

    const normalized = answer.toLowerCase().trim();
    const correctAnswers = ['fest', 'cafe fest', 'cafefest', 'café fest'];

    if (correctAnswers.includes(normalized)) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onUnlock();
      });
    } else {
      setError(true);
      shake();
      setAnswer('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/photos/us.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(28, 25, 23, 0.55)', 'rgba(139, 0, 0, 0.35)']}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.floatingFlower, { top: 60, left: 20 }]}>
            <RoseIcon size={40} color="rgba(255, 255, 255, 0.35)" />
          </View>
          <View style={[styles.floatingFlower, { bottom: 80, right: 25 }]}>
            <LilyIcon size={32} color="rgba(255, 255, 255, 0.3)" />
          </View>

          <Animated.View
            style={[
              styles.panelWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateX: shakeAnim }],
              },
            ]}
          >
            <View style={styles.panelOuter}>
              <BlurView
                intensity={glass.blurIntensity}
                tint={glass.tint}
                style={[
                  styles.panelBlur,
                  Platform.OS === 'android' && styles.panelAndroid,
                ]}
              >
                <View style={styles.roseWash} pointerEvents="none" />

                <Animated.View
                  style={[styles.heartContainer, { transform: [{ scale: heartBeat }] }]}
                >
                  <HeartIcon size={52} color={colors.rose} />
                </Animated.View>

                <Text style={styles.title}>Voor Eline</Text>
                <Text style={styles.subtitle}>Een Speciale Verrassing</Text>
                <View style={styles.divider} />

                <Text style={styles.question}>
                  Waar heb jij mij{'\n'}voor het eerst gezien?
                </Text>

                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  value={answer}
                  onChangeText={(text) => {
                    setAnswer(text);
                    if (error) setError(false);
                  }}
                  placeholder="Type je antwoord..."
                  placeholderTextColor="rgba(139, 0, 0, 0.4)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={checkAnswer}
                  accessibilityLabel="Antwoord op de vraag"
                />

                {error && (
                  <Text style={styles.errorText}>
                    Probeer het nog eens...
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.button}
                  onPress={checkAnswer}
                  activeOpacity={0.9}
                  accessibilityRole="button"
                  accessibilityLabel="Ontgrendel"
                >
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>Ontgrendel</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.hint}>
                  Denk terug aan onze eerste ontmoeting...
                </Text>
              </BlurView>
              <View style={styles.innerBorder} pointerEvents="none" />
            </View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
  },
  panelWrapper: {
    width: '88%',
    maxWidth: 380,
    marginLeft: spacing.sm,
    ...shadows.diffusion,
  },
  panelOuter: {
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  panelBlur: {
    padding: spacing.xl,
    alignItems: 'flex-start',
  },
  panelAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  roseWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.roseMuted,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: glass.border,
    borderTopColor: glass.innerHighlight,
  },
  heartContainer: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.roseMuted,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.rose,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: colors.roseBorder,
    marginBottom: spacing.xl,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    lineHeight: 30,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.roseBorder,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    fontSize: 17,
    color: colors.rose,
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.errorMuted,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  buttonInner: {
    flex: 1,
    backgroundColor: colors.rose,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textOnRose,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hint: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    opacity: 0.85,
  },
  floatingFlower: {
    position: 'absolute',
    zIndex: 1,
  },
});
