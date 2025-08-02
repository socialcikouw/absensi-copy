import { Animated } from "react-native";

// ========================================
// ANIMATION UTILITIES
// ========================================
// Centralized animation utilities untuk menghindari duplikasi

/**
 * Greeting animation configuration
 */
export const greetingAnimationConfig = {
  scale: {
    from: 1,
    to: 1.15,
    duration: 1000,
  },
  slide: {
    from: 0,
    to: -10,
    duration: 1000,
  },
  opacity: {
    from: 1,
    to: 0.7,
    duration: 1000,
  },
  delay: 2000,
};

/**
 * Create greeting animation sequence
 */
export const createGreetingAnimation = (
  greetingScale: Animated.Value,
  greetingSlide: Animated.Value,
  greetingOpacity: Animated.Value,
  onComplete?: () => void
) => {
  return Animated.sequence([
    // Animasi pertama: Scale up dan slide up
    Animated.parallel([
      Animated.timing(greetingScale, {
        toValue: greetingAnimationConfig.scale.to,
        duration: greetingAnimationConfig.scale.duration,
        useNativeDriver: true,
      }),
      Animated.timing(greetingSlide, {
        toValue: greetingAnimationConfig.slide.to,
        duration: greetingAnimationConfig.slide.duration,
        useNativeDriver: true,
      }),
      Animated.timing(greetingOpacity, {
        toValue: greetingAnimationConfig.opacity.to,
        duration: greetingAnimationConfig.opacity.duration,
        useNativeDriver: true,
      }),
    ]),
    // Animasi kedua: Kembali ke normal
    Animated.parallel([
      Animated.timing(greetingScale, {
        toValue: greetingAnimationConfig.scale.from,
        duration: greetingAnimationConfig.scale.duration,
        useNativeDriver: true,
      }),
      Animated.timing(greetingSlide, {
        toValue: greetingAnimationConfig.slide.from,
        duration: greetingAnimationConfig.slide.duration,
        useNativeDriver: true,
      }),
      Animated.timing(greetingOpacity, {
        toValue: greetingAnimationConfig.opacity.from,
        duration: greetingAnimationConfig.opacity.duration,
        useNativeDriver: true,
      }),
    ]),
    // Delay sebelum animasi berikutnya
    Animated.delay(greetingAnimationConfig.delay),
  ]);
};

/**
 * Start greeting animation dengan loop
 */
export const startGreetingAnimation = (
  greetingScale: Animated.Value,
  greetingSlide: Animated.Value,
  greetingOpacity: Animated.Value
) => {
  const animation = createGreetingAnimation(
    greetingScale,
    greetingSlide,
    greetingOpacity
  );

  animation.start(() => {
    // Restart animasi setelah selesai untuk loop
    startGreetingAnimation(greetingScale, greetingSlide, greetingOpacity);
  });
};
