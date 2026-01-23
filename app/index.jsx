import { useAuthStore, useOnboardingStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const { hasSeenOnboarding } = useOnboardingStore();
  const { isAuthenticated } = useAuthStore();

  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  const navigateNext = () => {
    if (!hasSeenOnboarding) {
      router.replace("/onboarding");
    } else if (!isAuthenticated) {
      router.replace("/auth");
    } else {
      router.replace("/(tabs)");
    }
  };

  useEffect(() => {
    // Animate logo
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 600, easing: Easing.out(Easing.back) }),
      withTiming(1, { duration: 200 }),
    );
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Animate text
    textOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    textTranslateY.value = withDelay(400, withTiming(0, { duration: 500 }));

    // Navigate after animation
    const timer = setTimeout(() => {
      navigateNext();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <LinearGradient
      colors={["#6F4E37", "#3E2723"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 items-center justify-center">
        {/* Animated Logo */}
        <Animated.View
          style={logoAnimatedStyle}
          className="w-32 h-32 bg-white/10 rounded-full items-center justify-center mb-6"
        >
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center">
            <Ionicons name="cafe" size={48} color="#6F4E37" />
          </View>
        </Animated.View>

        {/* Animated Text */}
        <Animated.View style={textAnimatedStyle} className="items-center">
          <Text className="text-white text-4xl font-bold tracking-wider">
            BREW
          </Text>
          <Text className="text-cream-100 text-lg tracking-widest mt-1">
            Premium Coffee
          </Text>
        </Animated.View>

        {/* Bottom tagline */}
        <Animated.View style={textAnimatedStyle} className="absolute bottom-16">
          <Text className="text-white/60 text-sm">Crafted with passion</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
