import { Button } from "@/components/ui";
import { useOnboardingStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Discover Premium Coffee",
    description:
      "Explore our handcrafted selection of specialty coffees from around the world.",
    icon: "cafe",
    color: "#6F4E37",
  },
  {
    id: "2",
    title: "Order in Seconds",
    description:
      "Customize your drink exactly how you like it and order with just a few taps.",
    icon: "flash",
    color: "#8B5A2B",
  },
  {
    id: "3",
    title: "Earn Rewards",
    description:
      "Collect points with every purchase and unlock exclusive perks and free drinks.",
    icon: "gift",
    color: "#5C4033",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const { completeOnboarding } = useOnboardingStore();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    completeOnboarding();
    router.replace("/auth");
  };

  const renderSlide = ({ item, index }) => {
    return (
      <View style={{ width }} className="items-center justify-center px-8">
        {/* Icon Circle */}
        <View
          className="w-40 h-40 rounded-full items-center justify-center mb-12"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <View
            className="w-28 h-28 rounded-full items-center justify-center"
            style={{ backgroundColor: item.color }}
          >
            <Ionicons name={item.icon} size={56} color="#FFF" />
          </View>
        </View>

        {/* Text Content */}
        <Text className="text-coffee-900 text-3xl font-bold text-center mb-4">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-base text-center leading-6 px-4">
          {item.description}
        </Text>
      </View>
    );
  };

  const PaginationDot = ({ index }) => {
    const dotStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];
      const dotWidth = interpolate(
        scrollX.value,
        inputRange,
        [8, 24, 8],
        "clamp",
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.4, 1, 0.4],
        "clamp",
      );
      return {
        width: dotWidth,
        opacity,
      };
    });

    return (
      <Animated.View
        style={dotStyle}
        className="h-2 bg-coffee-600 rounded-full mx-1"
      />
    );
  };

  const Pagination = () => (
    <View className="flex-row justify-center items-center mb-8">
      {slides.map((_, index) => (
        <PaginationDot key={index} index={index} />
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Skip Button */}
      <View
        className="absolute top-0 right-0 z-10"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Pressable onPress={handleSkip} className="px-6 py-3">
          <Text className="text-coffee-600 font-semibold">Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <View className="flex-1 justify-center">
        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-8" style={{ paddingBottom: insets.bottom + 24 }}>
        <Pagination />

        <Button
          onPress={handleNext}
          size="lg"
          fullWidth
          rightIcon={
            <Ionicons
              name={
                currentIndex === slides.length - 1
                  ? "arrow-forward"
                  : "chevron-forward"
              }
              size={20}
              color="#FFF"
            />
          }
        >
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Button>
      </View>
    </View>
  );
}
