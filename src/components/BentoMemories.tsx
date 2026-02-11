import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RoseIcon, LilyIcon } from '../icons/flowers';
import {
  HeartIcon,
  SparkleIcon,
  PhotoIcon,
  MapPinIcon,
  ClockIcon,
  MessageIcon,
  MusicIcon,
  GiftIcon,
} from '../icons';

const { width } = Dimensions.get('window');

interface Memory {
  id: number;
  title: string;
  emoji: string;
  color: string;
  icon: React.ReactNode;
  order: number;
}

interface BentoMemoriesProps {
  onSelectMemory: (memoryId: number) => void;
}

export const BentoMemories: React.FC<BentoMemoriesProps> = ({ onSelectMemory }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Fade in the container
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Stagger animate the memory cards
    const animations = scaleAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: index * 80,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    );

    Animated.stagger(50, animations).start();
  }, []);

  const memories: Memory[] = [
    {
      id: 1,
      title: "Het Eerste Bericht",
      emoji: "💬",
      color: "#FFB6C1",
      icon: <MessageIcon size={28} color="#8B0000" />,
      order: 1,
    },
    {
      id: 2,
      title: "Kerstgala",
      emoji: "✨",
      color: "#DDA0DD",
      icon: <SparkleIcon size={28} color="#4B0082" />,
      order: 2,
    },
    {
      id: 3,
      title: "Jouw Cadeau",
      emoji: "🎁",
      color: "#FFDAB9",
      icon: <GiftIcon size={28} color="#8B4726" />,
      order: 3,
    },
    {
      id: 4,
      title: "Kerstballen",
      emoji: "🎄",
      color: "#FFE4E1",
      icon: <SparkleIcon size={28} color="#8B4513" />,
      order: 4,
    },
    {
      id: 5,
      title: "Oudjaarsavond",
      emoji: "🐦",
      color: "#AFEEEE",
      icon: <ClockIcon size={28} color="#2F4F4F" />,
      order: 5,
    },
    {
      id: 6,
      title: "Eerste Sneeuw",
      emoji: "❄️",
      color: "#F0F8FF",
      icon: <SparkleIcon size={28} color="#4682B4" />,
      order: 6,
    },
    {
      id: 7,
      title: "Sneeuwpret",
      emoji: "⛄",
      color: "#E6F3FF",
      icon: <HeartIcon size={28} color="#1E3A5F" />,
      order: 7,
    },
    {
      id: 8,
      title: "Kerstmarkt",
      emoji: "🎅",
      color: "#FFF5E1",
      icon: <MapPinIcon size={28} color="#8B4513" />,
      order: 8,
    },
    {
      id: 9,
      title: "Die Vraag",
      emoji: "🍣",
      color: "#FFB6C1",
      icon: <HeartIcon size={28} color="#8B0000" />,
      order: 9,
    },
    {
      id: 10,
      title: "Valentine's Dag",
      emoji: "💝",
      color: "#FFE4E1",
      icon: <GiftIcon size={28} color="#C71585" />,
      order: 10,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#FF69B4', '#DDA0DD']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Floating flowers */}
        <View style={[styles.floatingFlower, styles.rose1]}>
          <RoseIcon size={40} color="rgba(139, 0, 0, 0.15)" />
        </View>
        <View style={[styles.floatingFlower, styles.lily1]}>
          <LilyIcon size={35} color="rgba(255, 255, 255, 0.3)" />
        </View>
        <View style={[styles.floatingFlower, styles.rose2]}>
          <RoseIcon size={30} color="rgba(199, 21, 133, 0.2)" />
        </View>
        <View style={[styles.floatingFlower, styles.lily2]}>
          <LilyIcon size={38} color="rgba(255, 182, 193, 0.25)" />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Hoofdstuk 1: Het Begin</Text>
              <Text style={styles.subtitle}>20 Nov 2025 - 14 Feb 2026</Text>
              <View style={styles.divider} />
              <Text style={styles.instruction}>
                Begin met het eerste bericht 💕{'\n'}
                Swipe door al onze herinneringen...
              </Text>
            </View>

            {/* Bento Box Grid */}
            <View style={styles.bentoGrid}>
              {memories.map((memory, index) => (
                <Animated.View
                  key={memory.id}
                  style={[
                    styles.memoryCard,
                    {
                      transform: [{ scale: scaleAnims[index] }],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => onSelectMemory(memory.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[memory.color, `${memory.color}CC`]}
                      style={styles.cardGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      {/* Order badge for first memory */}
                      {memory.order === 1 && (
                        <View style={styles.startBadge}>
                          <Text style={styles.startText}>START</Text>
                        </View>
                      )}

                      {/* Order number */}
                      <Text style={styles.orderNumber}>{memory.order}</Text>

                      {/* Icon */}
                      <View style={styles.iconContainer}>
                        {memory.icon}
                      </View>

                      {/* Emoji */}
                      <Text style={styles.emoji}>{memory.emoji}</Text>

                      {/* Title */}
                      <Text style={styles.memoryTitle}>{memory.title}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
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
    top: 200,
    left: 30,
  },
  rose2: {
    bottom: 150,
    right: 40,
  },
  lily2: {
    bottom: 80,
    left: 20,
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
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C71585',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(139, 0, 0, 0.3)',
    marginBottom: 15,
  },
  instruction: {
    fontSize: 15,
    color: '#8B0000',
    textAlign: 'center',
    lineHeight: 22,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  memoryCard: {
    width: (width - 56) / 2,
    marginBottom: 12,
  },
  cardButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  cardGradient: {
    padding: 20,
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  startBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8B0000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  startText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  orderNumber: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(139, 0, 0, 0.3)',
  },
  iconContainer: {
    marginBottom: 8,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  memoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B0000',
    textAlign: 'center',
    lineHeight: 18,
  },
});
