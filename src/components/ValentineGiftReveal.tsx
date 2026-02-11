import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GiftIcon } from '../icons';

const { width } = Dimensions.get('window');

interface Gift {
  id: number;
  name: string;
  description: string;
  message: string;
  emoji: string;
}

interface ValentineGiftRevealProps {
  textColor: string;
}

export const ValentineGiftReveal: React.FC<ValentineGiftRevealProps> = ({ textColor }) => {
  const [hintedGifts, setHintedGifts] = useState<number[]>([]); // First click - shows hint
  const [revealedGifts, setRevealedGifts] = useState<number[]>([]); // Second click - shows full message
  const [currentStep, setCurrentStep] = useState(0);
  const scaleAnims = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0))
  ).current;
  const pulseAnims = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(1))
  ).current;

  const gifts: Gift[] = [
    {
      id: 1,
      name: "De Rondste",
      description: "Een mok vol liefde...",
      message: "Voor ieder kopje thee die je drinkt dat je aan ons mag denken en mijn liefde voor jou 💕",
      emoji: "☕",
    },
    {
      id: 2,
      name: "Het Kaartje",
      description: "Woorden van het hart...",
      message: "Met liefde voor jou geschreven 💌",
      emoji: "💌",
    },
    {
      id: 3,
      name: "Het Grote Platte Lange",
      description: "Een fotolijstje voor onze mooiste herinnering...",
      message: "Voor het vastzetten waar je mij voor het eerst hebt gezien 📸",
      emoji: "🖼️",
    },
    {
      id: 4,
      name: "De Platste Naast de Kaart",
      description: "Een Jellycat knuffel...",
      message: "Voor mijn liefde voor jou en jouw zoetigheid 🧸💕",
      emoji: "🧸",
    },
  ];

  const handleRevealGift = (index: number) => {
    // Only process if this is the current active gift
    if (index !== currentStep) return;

    const isHinted = hintedGifts.includes(index);
    const isFullyRevealed = revealedGifts.includes(index);

    if (isFullyRevealed) {
      // Already fully revealed, do nothing
      return;
    }

    if (!isHinted) {
      // FIRST CLICK: Show hint/description
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Add pulse animation to indicate it's clickable again
      Animated.sequence([
        Animated.timing(pulseAnims[index], {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnims[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setHintedGifts([...hintedGifts, index]);
    } else {
      // SECOND CLICK: Show full message and move to next gift
      setRevealedGifts([...revealedGifts, index]);
      setCurrentStep(currentStep + 1);
    }
  };

  const allRevealed = revealedGifts.length === gifts.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Valentine's Verrassing 💝
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Vandaag, 14 februari 2026
        </Text>
        <Text style={[styles.instruction, { color: textColor }]}>
          {allRevealed 
            ? "Alle cadeautjes geopend! 🎁✨" 
            : hintedGifts.includes(currentStep)
            ? "Tik nog een keer om het bericht te lezen... 💕"
            : "Tik op het volgende cadeautje om te openen..."}
        </Text>
      </View>

      {/* Gifts Grid */}
      <View style={styles.giftsContainer}>
        {gifts.map((gift, index) => {
          const isHinted = hintedGifts.includes(index);
          const isFullyRevealed = revealedGifts.includes(index);
          const isActive = index === currentStep;
          const isLocked = index > currentStep;

          return (
            <TouchableOpacity
              key={gift.id}
              style={[
                styles.giftCard,
                isActive && styles.giftCardNext,
              ]}
              onPress={() => handleRevealGift(index)}
              disabled={isFullyRevealed || isLocked}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={
                  isFullyRevealed
                    ? ['#FFB6C1', '#FF69B4'] // Fully revealed - bright pink
                    : isHinted
                    ? ['#FFDAB9', '#FFB6C1'] // Hinted - warm peach
                    : isActive
                    ? ['#FFE4E1', '#FFB6C1'] // Active - light pink
                    : ['#F0F0F0', '#E0E0E0'] // Locked - gray
                }
                style={styles.giftGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {!isHinted && !isFullyRevealed ? (
                  // LOCKED STATE
                  <View style={styles.unrevealedContent}>
                    <View style={styles.giftIconContainer}>
                      <GiftIcon size={40} color={isActive ? "#8B0000" : "#CCCCCC"} />
                    </View>
                    <Text style={[styles.giftNumber, { color: isActive ? "#8B0000" : "#999999" }]}>
                      Cadeau {index + 1}
                    </Text>
                    {isActive && (
                      <Animated.Text style={styles.tapHint}>
                        👆 Tik om te openen
                      </Animated.Text>
                    )}
                  </View>
                ) : isHinted && !isFullyRevealed ? (
                  // HINTED STATE - Shows name + description, clickable for second reveal
                  <Animated.View
                    style={[
                      styles.revealedContent,
                      { 
                        transform: [
                          { scale: scaleAnims[index] },
                          { scale: pulseAnims[index] }
                        ] 
                      },
                    ]}
                  >
                    <Text style={styles.giftEmoji}>{gift.emoji}</Text>
                    <Text style={styles.giftName}>{gift.name}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.giftDescription}>{gift.description}</Text>
                    <Animated.Text style={styles.tapAgainHint}>
                      👆 Tik nog een keer
                    </Animated.Text>
                  </Animated.View>
                ) : (
                  // FULLY REVEALED STATE - Shows name + full message
                  <Animated.View
                    style={[
                      styles.revealedContent,
                      { transform: [{ scale: scaleAnims[index] }] },
                    ]}
                  >
                    <Text style={styles.giftEmoji}>{gift.emoji}</Text>
                    <Text style={styles.giftName}>{gift.name}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.giftMessage}>{gift.message}</Text>
                  </Animated.View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Final Message */}
      {allRevealed && (
        <Animated.View style={styles.finalMessage}>
          <Text style={[styles.finalText, { color: textColor }]}>
            Al deze cadeautjes zijn voor jou, lieve Eline. ❤️
          </Text>
          <Text style={[styles.finalText, { color: textColor }]}>
            Happy Valentine's Day! 💕✨
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 15,
  },
  instruction: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  giftsContainer: {
    gap: 20,
  },
  giftCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  giftCardNext: {
    shadowColor: '#FF69B4',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  giftGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  unrevealedContent: {
    alignItems: 'center',
  },
  giftIconContainer: {
    marginBottom: 10,
  },
  giftNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  tapHint: {
    fontSize: 14,
    color: '#8B0000',
    marginTop: 10,
    fontWeight: '500',
  },
  revealedContent: {
    alignItems: 'center',
    width: '100%',
  },
  giftEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  giftName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginVertical: 10,
  },
  giftDescription: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    fontStyle: 'italic',
    opacity: 0.95,
  },
  giftMessage: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  tapAgainHint: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 12,
    fontWeight: '600',
    opacity: 0.9,
  },
  finalMessage: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 182, 193, 0.2)',
    borderRadius: 15,
  },
  finalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});
