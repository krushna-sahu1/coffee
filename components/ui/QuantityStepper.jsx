import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  className = "",
}) {
  const scaleDecrease = useSharedValue(1);
  const scaleIncrease = useSharedValue(1);

  const decreaseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDecrease.value }],
  }));

  const increaseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleIncrease.value }],
  }));

  const handleDecrease = () => {
    if (value > min) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scaleDecrease.value = withSpring(0.85, { damping: 15 });
      setTimeout(() => {
        scaleDecrease.value = withSpring(1, { damping: 15 });
      }, 100);
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scaleIncrease.value = withSpring(0.85, { damping: 15 });
      setTimeout(() => {
        scaleIncrease.value = withSpring(1, { damping: 15 });
      }, 100);
      onChange(value + 1);
    }
  };

  const sizeStyles = {
    sm: { button: "w-7 h-7", icon: 16, text: "text-sm w-6" },
    md: { button: "w-9 h-9", icon: 20, text: "text-base w-8" },
    lg: { button: "w-11 h-11", icon: 24, text: "text-lg w-10" },
  };

  const styles = sizeStyles[size];

  return (
    <View className={`flex-row items-center ${className}`}>
      <AnimatedView style={decreaseStyle}>
        <Pressable
          onPress={handleDecrease}
          disabled={value <= min}
          className={`
            ${styles.button} rounded-full items-center justify-center
            ${value <= min ? "bg-gray-200" : "bg-coffee-100"}
          `}
        >
          <Ionicons
            name="remove"
            size={styles.icon}
            color={value <= min ? "#9CA3AF" : "#6F4E37"}
          />
        </Pressable>
      </AnimatedView>

      <Text
        className={`${styles.text} text-center font-semibold text-coffee-800`}
      >
        {value}
      </Text>

      <AnimatedView style={increaseStyle}>
        <Pressable
          onPress={handleIncrease}
          disabled={value >= max}
          className={`
            ${styles.button} rounded-full items-center justify-center
            ${value >= max ? "bg-gray-200" : "bg-coffee-600"}
          `}
        >
          <Ionicons
            name="add"
            size={styles.icon}
            color={value >= max ? "#9CA3AF" : "#FFF"}
          />
        </Pressable>
      </AnimatedView>
    </View>
  );
}

export default QuantityStepper;
