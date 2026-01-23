import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ProductCard({
  product,
  onPress,
  onAddToCart,
  variant = "default",
  index = 0,
  className = "",
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddToCart?.(product);
  };

  if (variant === "horizontal") {
    return (
      <AnimatedPressable
        onPress={() => onPress?.(product)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
        entering={FadeIn.delay(index * 100)}
        className={`flex-row bg-white rounded-2xl p-3 shadow-sm shadow-black/5 ${className}`}
      >
        <Image
          source={{ uri: product.image }}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text
              className="text-coffee-900 font-semibold text-base"
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <Text className="text-gray-500 text-xs mt-0.5" numberOfLines={2}>
              {product.description}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-coffee-600 font-bold text-base">
              ${product.price.toFixed(2)}
            </Text>
            <Pressable
              onPress={handleAddToCart}
              className="bg-coffee-600 w-8 h-8 rounded-full items-center justify-center"
            >
              <Ionicons name="add" size={18} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={() => onPress?.(product)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      entering={FadeIn.delay(index * 100)}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/5 ${className}`}
    >
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-32"
          resizeMode="cover"
        />
        {product.isPopular && (
          <View className="absolute top-2 left-2 bg-caramel px-2 py-1 rounded-full">
            <Text className="text-coffee-800 text-xs font-semibold">
              Popular
            </Text>
          </View>
        )}
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center">
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text className="text-coffee-800 text-xs font-medium ml-1">
            {product.rating}
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text
          className="text-coffee-900 font-semibold text-sm"
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <Text className="text-gray-500 text-xs mt-1" numberOfLines={1}>
          {product.calories} cal
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-coffee-600 font-bold text-base">
            ${product.price.toFixed(2)}
          </Text>
          <Pressable
            onPress={handleAddToCart}
            className="bg-coffee-600 w-8 h-8 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={18} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default ProductCard;
