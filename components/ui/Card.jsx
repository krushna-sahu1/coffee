import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Card({
  children,
  onPress,
  variant = "elevated",
  className = "",
  ...props
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const variantStyles = {
    elevated: "bg-white shadow-lg shadow-black/10",
    outlined: "bg-white border border-gray-200",
    filled: "bg-coffee-50",
  };

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
        className={`
          rounded-2xl overflow-hidden
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View
      className={`
        rounded-2xl overflow-hidden
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  );
}

export default Card;
