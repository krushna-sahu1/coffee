import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AddonItem({ addon, isSelected, onToggle, className = "" }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.95, { damping: 15 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15 });
    }, 100);
    onToggle(addon);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={animatedStyle}
      className={`
        flex-row items-center justify-between py-3 px-4 rounded-xl mb-2
        ${isSelected ? "bg-coffee-100 border-2 border-coffee-600" : "bg-gray-50 border-2 border-transparent"}
        ${className}
      `}
    >
      <View className="flex-row items-center flex-1">
        <View
          className={`
            w-6 h-6 rounded-full items-center justify-center mr-3
            ${isSelected ? "bg-coffee-600" : "bg-gray-200"}
          `}
        >
          {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
        </View>
        <Text
          className={`
            font-medium text-base
            ${isSelected ? "text-coffee-800" : "text-gray-700"}
          `}
        >
          {addon.name}
        </Text>
      </View>
      <Text
        className={`
          font-semibold
          ${isSelected ? "text-coffee-600" : "text-gray-500"}
        `}
      >
        +${addon.price.toFixed(2)}
      </Text>
    </AnimatedPressable>
  );
}

export default AddonItem;
