import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function Header({
  title,
  subtitle,
  showBack = false,
  rightAction,
  transparent = false,
  className = "",
}) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeIn}
      className={`
        flex-row items-center justify-between px-4 py-3
        ${transparent ? "" : "bg-white"}
        ${className}
      `}
    >
      <View className="flex-row items-center flex-1">
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-coffee-100 items-center justify-center mr-3"
            hitSlop={10}
          >
            <Ionicons name="chevron-back" size={22} color="#6F4E37" />
          </Pressable>
        )}

        <View className="flex-1">
          {title && (
            <Text
              className="text-coffee-900 font-bold text-xl"
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-gray-500 text-sm" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightAction && <View className="ml-3">{rightAction}</View>}
    </Animated.View>
  );
}

export default Header;
