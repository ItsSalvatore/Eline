import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { HeartIcon } from '../icons';
import { RoseIcon, LilyIcon } from '../icons/flowers';

const { width, height } = Dimensions.get('window');

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Heart beat animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeat, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartBeat, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shake = () => {
    setShaking(true);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
      setShaking(false);
      setError(false);
    });
  };

  const checkAnswer = () => {
    const normalized = answer.toLowerCase().trim();
    const correctAnswers = ['fest', 'cafe fest', 'cafefest', 'café fest'];
    
    if (correctAnswers.includes(normalized)) {
      // Correct! Fade out and unlock
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onUnlock();
      });
    } else {
      // Wrong answer - shake
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
        {/* Overlay for better text readability */}
        <LinearGradient
          colors={['rgba(255, 182, 193, 0.85)', 'rgba(255, 105, 180, 0.85)', 'rgba(199, 21, 133, 0.85)']}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Floating flowers on lock screen */}
          <View style={[styles.floatingFlower, { top: 60, left: 20 }]}>
            <RoseIcon size={40} color="rgba(255, 255, 255, 0.4)" />
          </View>
          <View style={[styles.floatingFlower, { top: 150, right: 30 }]}>
            <LilyIcon size={35} color="rgba(255, 255, 255, 0.35)" />
          </View>
          <View style={[styles.floatingFlower, { bottom: 120, left: 35 }]}>
            <LilyIcon size={38} color="rgba(255, 255, 255, 0.3)" />
          </View>
          <View style={[styles.floatingFlower, { bottom: 60, right: 25 }]}>
            <RoseIcon size={32} color="rgba(255, 255, 255, 0.4)" />
          </View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateX: shakeAnim }],
              },
            ]}
          >
          {/* Heart Icon */}
          <Animated.View
            style={[
              styles.heartContainer,
              { transform: [{ scale: heartBeat }] },
            ]}
          >
            <HeartIcon size={60} color="#8B0000" />
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Voor Eline</Text>
          <Text style={styles.subtitle}>Een Speciale Verrassing</Text>

          {/* Decorative line */}
          <View style={styles.divider} />

          {/* Question */}
          <Text style={styles.question}>
            Waar heb jij mij{'\n'}voor het eerst gezien?
          </Text>

          {/* Input */}
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
          />

          {error && (
            <Animated.Text style={styles.errorText}>
              Probeer het nog eens... 💭
            </Animated.Text>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={checkAnswer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B0000', '#DC143C']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Ontgrendel ❤️</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Hint */}
          <Text style={styles.hint}>
            Denk terug aan onze eerste ontmoeting... ✨
          </Text>
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
    alignItems: 'center',
  },
  content: {
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heartContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 182, 193, 0.3)',
    borderRadius: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#C71585',
    marginBottom: 25,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#FFB6C1',
    marginBottom: 30,
    borderRadius: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 30,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB6C1',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#8B0000',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#DC143C',
    backgroundColor: '#FFE4E1',
  },
  errorText: {
    color: '#DC143C',
    fontSize: 14,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#8B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  hint: {
    fontSize: 13,
    color: '#C71585',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.7,
  },
  floatingFlower: {
    position: 'absolute',
    zIndex: 1,
  },
});
