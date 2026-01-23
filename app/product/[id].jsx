import {
  AddonItem,
  Button,
  QuantityStepper,
  SizeSelector,
} from "@/components/ui";
import { addons, products, sizes } from "@/constants";
import { useCartStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.4;

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const addItem = useCartStore((state) => state.addItem);

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(scrollY.value, [-100, 0], [1.3, 1], "clamp") },
      { translateY: interpolate(scrollY.value, [0, 200], [0, -50], "clamp") },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [100, 200], [0, 1], "clamp"),
    backgroundColor: `rgba(253, 248, 243, ${interpolate(scrollY.value, [100, 200], [0, 1], "clamp")})`,
  }));

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const calculatePrice = () => {
    if (!product) return 0;
    const sizePrice =
      sizes.find((s) => s.id === selectedSize)?.priceModifier || 0;
    const addonPrice = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0,
    );
    return (product.price + sizePrice + addonPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (!product) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const sizeName = sizes.find((s) => s.id === selectedSize)?.name || "Medium";
    addItem(product, sizeName, selectedAddons, quantity);
    router.back();
  };

  if (!product) {
    return (
      <View className="flex-1 bg-coffee-50 items-center justify-center">
        <Text className="text-gray-500">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-coffee-50">
      {/* Animated Header */}
      <Animated.View
        style={[headerStyle, { paddingTop: insets.top }]}
        className="absolute top-0 left-0 right-0 z-10 px-4 pb-3"
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center"
          >
            <Ionicons name="chevron-back" size={22} color="#6F4E37" />
          </Pressable>
          <Text className="text-coffee-900 font-bold text-lg" numberOfLines={1}>
            {product.name}
          </Text>
          <View className="w-10" />
        </View>
      </Animated.View>

      {/* Fixed Back Button (visible on image) */}
      <View className="absolute z-20 px-4" style={{ top: insets.top }}>
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm"
        >
          <Ionicons name="chevron-back" size={22} color="#6F4E37" />
        </Pressable>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Product Image */}
        <Animated.View style={imageStyle}>
          <Image
            source={{ uri: product.image }}
            style={{ width, height: IMAGE_HEIGHT }}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Product Info */}
        <View className="bg-coffee-50 -mt-8 rounded-t-4xl px-4 pt-6">
          {/* Name and Rating */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <View className="flex-row items-start justify-between">
              <View className="flex-1 mr-4">
                <Text className="text-coffee-900 text-2xl font-bold">
                  {product.name}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-coffee-800 font-medium ml-1">
                    {product.rating}
                  </Text>
                  <Text className="text-gray-500 ml-1">
                    ({product.reviews} reviews)
                  </Text>
                </View>
              </View>
              <Pressable className="w-12 h-12 rounded-full bg-coffee-100 items-center justify-center">
                <Ionicons name="heart-outline" size={24} color="#6F4E37" />
              </Pressable>
            </View>

            <Text className="text-gray-600 text-base mt-4 leading-6">
              {product.description}
            </Text>

            <View className="flex-row items-center mt-3">
              <Ionicons name="flame-outline" size={16} color="#9CA3AF" />
              <Text className="text-gray-500 ml-1">
                {product.calories} calories
              </Text>
            </View>
          </Animated.View>

          {/* Size Selection */}
          <Animated.View entering={FadeInDown.delay(200)} className="mt-8">
            <Text className="text-coffee-900 text-lg font-bold mb-4">
              Choose Size
            </Text>
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
          </Animated.View>

          {/* Add-ons */}
          <Animated.View entering={FadeInDown.delay(300)} className="mt-8">
            <Text className="text-coffee-900 text-lg font-bold mb-4">
              Add-ons
            </Text>
            {addons.map((addon) => (
              <AddonItem
                key={addon.id}
                addon={addon}
                isSelected={selectedAddons.some((a) => a.id === addon.id)}
                onToggle={toggleAddon}
              />
            ))}
          </Animated.View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <Animated.View
        entering={FadeIn.delay(400)}
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 pt-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
            />
          </View>

          <View className="flex-1 ml-4">
            <Button onPress={handleAddToCart} fullWidth size="lg">
              Add to Cart • ${calculatePrice().toFixed(2)}
            </Button>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
