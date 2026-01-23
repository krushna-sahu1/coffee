import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  leftIcon,
  rightIcon,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  className = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const borderColor = useSharedValue(0);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor:
      borderColor.value === 1 ? "#6F4E37" : error ? "#EF4444" : "#E5E7EB",
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming(0, { duration: 200 });
  };

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-coffee-800 font-medium mb-2 text-sm">
          {label}
        </Text>
      )}
      <AnimatedView
        style={animatedBorderStyle}
        className={`
          flex-row items-center bg-white rounded-xl border-2 px-4
          ${multiline ? "py-3 items-start" : "h-14"}
          ${disabled ? "bg-gray-100" : ""}
        `}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            flex-1 text-coffee-900 text-base
            ${multiline ? "h-24 pt-0" : ""}
          `}
          {...props}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ml-2 p-1"
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#9CA3AF"
            />
          </Pressable>
        )}
        {rightIcon && !secureTextEntry && (
          <View className="ml-2">{rightIcon}</View>
        )}
      </AnimatedView>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
}

export default Input;
