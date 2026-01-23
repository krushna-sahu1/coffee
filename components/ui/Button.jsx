import * as Haptics from "expo-haptics";
import { ActivityIndicator, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const variants = {
  primary: "bg-coffee-600 active:bg-coffee-700",
  secondary: "bg-coffee-100 active:bg-coffee-200",
  outline: "border-2 border-coffee-600 bg-transparent",
  ghost: "bg-transparent",
};

const textVariants = {
  primary: "text-white",
  secondary: "text-coffee-800",
  outline: "text-coffee-600",
  ghost: "text-coffee-600",
};

const sizes = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8",
};

const textSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={animatedStyle}
      className={`
        flex-row items-center justify-center rounded-2xl
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFF" : "#6F4E37"}
          size="small"
        />
      ) : (
        <>
          {leftIcon}
          <Text
            className={`
              font-semibold
              ${textVariants[variant]}
              ${textSizes[size]}
              ${leftIcon ? "ml-2" : ""}
              ${rightIcon ? "mr-2" : ""}
            `}
          >
            {children}
          </Text>
          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
}

export default Button;
