import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Chapter } from '../types';
import {
  HeartIcon,
  BookIcon,
  SparkleIcon,
  PhotoIcon,
  MapPinIcon,
  ClockIcon,
  MessageIcon,
  MusicIcon,
  GiftIcon,
  HeartFilledIcon,
  SparkleFilledIcon,
} from '../icons';
import { RoseIcon, LilyIcon } from '../icons/flowers';
import { ValentineGiftReveal } from './ValentineGiftReveal';

const { width, height } = Dimensions.get('window');

interface ChapterPageProps {
  chapter: Chapter;
  isActive: boolean;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({ chapter, isActive }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      // Fade in and scale animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Floating animation loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -10,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isActive]);

  const getGradientColors = (baseColor: string): string[] => {
    // Create a subtle gradient based on the base color
    return [baseColor, `${baseColor}CC`, `${baseColor}99`];
  };

  const renderIcon = () => {
    if (!chapter.icon) return null;

    const iconSize = 32;
    const iconColor = chapter.textColor;

    const icons = {
      heart: <HeartIcon size={iconSize} color={iconColor} />,
      book: <BookIcon size={iconSize} color={iconColor} />,
      sparkle: <SparkleIcon size={iconSize} color={iconColor} />,
      photo: <PhotoIcon size={iconSize} color={iconColor} />,
      map: <MapPinIcon size={iconSize} color={iconColor} />,
      clock: <ClockIcon size={iconSize} color={iconColor} />,
      message: <MessageIcon size={iconSize} color={iconColor} />,
      music: <MusicIcon size={iconSize} color={iconColor} />,
      gift: <GiftIcon size={iconSize} color={iconColor} />,
    };

    return icons[chapter.icon] || null;
  };

  return (
    <View style={[styles.container, { backgroundColor: chapter.backgroundColor }]}>
      <LinearGradient
        colors={getGradientColors(chapter.backgroundColor)}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Date badge */}
            {chapter.date && (
              <Animated.View style={styles.dateBadge}>
                <Text style={[styles.dateText, { color: chapter.textColor }]}>
                  {chapter.date}
                </Text>
              </Animated.View>
            )}

            {/* Icon badge */}
            {chapter.icon && (
              <Animated.View style={[styles.iconBadge, { backgroundColor: chapter.textColor + '15' }]}>
                {renderIcon()}
              </Animated.View>
            )}

            {/* Title section */}
            <View style={styles.titleSection}>
              <Text style={[styles.title, { color: chapter.textColor }]}>
                {chapter.title}
              </Text>
              {chapter.subtitle && (
                <Text style={[styles.subtitle, { color: chapter.textColor }]}>
                  {chapter.subtitle}
                </Text>
              )}
            </View>

            {/* Single Image */}
            {chapter.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={chapter.image}
                  style={styles.chapterImage}
                  resizeMode="cover"
                />
              </View>
            )}

            {/* Content with decorative elements */}
            <View style={styles.contentSection}>
              <View style={[styles.decorativeLine, { backgroundColor: chapter.textColor + '40' }]} />
              
              <Text style={[styles.contentText, { color: chapter.textColor }]}>
                {chapter.content}
              </Text>

              <View style={[styles.decorativeLine, { backgroundColor: chapter.textColor + '40' }]} />
            </View>

            {/* Valentine's Gift Reveal - Special interactive component */}
            {chapter.hasValentineReveal && (
              <ValentineGiftReveal textColor={chapter.textColor} />
            )}

            {/* Multiple Images Gallery */}
            {chapter.images && chapter.images.length > 0 && (
              <View style={styles.galleryContainer}>
                {chapter.images.map((img, index) => (
                  <View key={index} style={styles.galleryImageContainer}>
                    <Image
                      source={img}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Locked indicator */}
            {!chapter.unlocked && (
              <View style={styles.lockedContainer}>
                <Text style={[styles.lockedIcon, { color: chapter.textColor }]}>🔒</Text>
                <Text style={[styles.lockedText, { color: chapter.textColor }]}>
                  Dit hoofdstuk is nog vergrendeld
                </Text>
              </View>
            )}

            {/* Swipe hint */}
            {chapter.id === 1 && (
              <Animated.View style={styles.swipeHint}>
                <Text style={[styles.swipeText, { color: chapter.textColor }]}>
                  ← Veeg om verder te gaan
                </Text>
              </Animated.View>
            )}
          </ScrollView>
        </Animated.View>

        {/* Floating decorations - hearts and flowers */}
        <Animated.View
          style={[
            styles.floatingDecoration,
            styles.decoration1,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <RoseIcon size={35} color={`${chapter.textColor}30`} />
        </Animated.View>
        
        <Animated.Text
          style={[
            styles.floatingHeart,
            styles.heart1,
            { transform: [{ translateY: Animated.multiply(floatAnim, -0.8) }] },
          ]}
        >
          ❤️
        </Animated.Text>

        <Animated.View
          style={[
            styles.floatingDecoration,
            styles.decoration2,
            { transform: [{ translateY: Animated.multiply(floatAnim, -1.2) }] },
          ]}
        >
          <LilyIcon size={32} color={`${chapter.textColor}25`} />
        </Animated.View>

        <Animated.Text
          style={[
            styles.floatingHeart,
            styles.heart2,
            { transform: [{ translateY: Animated.multiply(floatAnim, 0.6) }] },
          ]}
        >
          💕
        </Animated.Text>

        <Animated.View
          style={[
            styles.floatingDecoration,
            styles.decoration3,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <RoseIcon size={28} color={`${chapter.textColor}20`} />
        </Animated.View>

        <Animated.Text
          style={[
            styles.floatingHeart,
            styles.heart3,
            { transform: [{ translateY: Animated.multiply(floatAnim, -0.5) }] },
          ]}
        >
          💝
        </Animated.Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 60,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingBottom: 60,
    paddingTop: 10,
  },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  iconBadge: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  contentSection: {
    marginBottom: 30,
  },
  decorativeLine: {
    height: 2,
    width: 60,
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 1,
  },
  contentText: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  lockedContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  lockedIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  lockedText: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  swipeHint: {
    marginTop: 40,
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.6,
  },
  floatingDecoration: {
    position: 'absolute',
    opacity: 0.8,
  },
  decoration1: {
    top: 80,
    right: 25,
  },
  decoration2: {
    top: 250,
    left: 20,
  },
  decoration3: {
    bottom: 200,
    right: 35,
  },
  floatingHeart: {
    position: 'absolute',
    fontSize: 28,
    opacity: 0.25,
  },
  heart1: {
    top: 140,
    right: 45,
  },
  heart2: {
    bottom: 180,
    left: 30,
  },
  heart3: {
    top: 320,
    left: 50,
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chapterImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  galleryContainer: {
    marginTop: 20,
    gap: 15,
  },
  galleryImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 10,
  },
  galleryImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
});
