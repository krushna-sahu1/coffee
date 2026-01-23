import { Card, ProductCard } from "@/components/ui";
import { products, promotions } from "@/constants";
import { useAuthStore, useCartStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const scrollY = useSharedValue(0);

  const featuredProducts = products.filter((p) => p.isFeatured);
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0.9]),
    transform: [
      { translateY: interpolate(scrollY.value, [0, 100], [0, -10], "clamp") },
    ],
  }));

  const handleProductPress = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (product) => {
    addItem(product, "Medium", [], 1);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className="flex-1 bg-coffee-50">
      {/* Header */}
      <Animated.View
        style={[headerStyle, { paddingTop: insets.top }]}
        className="bg-coffee-50 px-4 pb-4"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm">{getGreeting()}</Text>
            <Text className="text-coffee-900 text-xl font-bold mt-0.5">
              {user?.name || "Coffee Lover"} ☕
            </Text>
          </View>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.push("/cart")}
              className="w-11 h-11 rounded-full bg-white items-center justify-center mr-3 shadow-sm"
            >
              <Ionicons name="cart-outline" size={22} color="#6F4E37" />
              {cartItemCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings")}
              className="w-11 h-11 rounded-full bg-white items-center justify-center shadow-sm"
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#6F4E37"
              />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Promotions Carousel */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <FlatList
            data={promotions}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 16}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item, index }) => (
              <Pressable className="mr-4" style={{ width: CARD_WIDTH }}>
                <LinearGradient
                  colors={[item.backgroundColor, "#3E2723"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-3xl p-5 h-44 justify-between"
                >
                  <View>
                    <Text className="text-white/80 text-sm font-medium">
                      Limited Time
                    </Text>
                    <Text className="text-white text-2xl font-bold mt-1">
                      {item.title}
                    </Text>
                    <Text
                      className="text-white/80 text-sm mt-2"
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-white/20 px-3 py-1.5 rounded-full">
                      <Text className="text-white font-semibold text-sm">
                        Use code: {item.code}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </Animated.View>

        {/* Quick Order */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          className="px-4 mt-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-coffee-900 text-lg font-bold">
              Quick Order
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/menu")}>
              <Text className="text-coffee-600 font-medium">See All</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-4"
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {popularProducts.map((product, index) => (
              <View key={product.id} className="mr-3" style={{ width: 160 }}>
                <ProductCard
                  product={product}
                  onPress={handleProductPress}
                  onAddToCart={handleQuickAdd}
                  index={index}
                />
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Section */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          className="px-4 mt-8"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-coffee-900 text-lg font-bold">
              Featured Drinks
            </Text>
          </View>

          {featuredProducts.map((product, index) => (
            <View key={product.id} className="mb-3">
              <ProductCard
                product={product}
                variant="horizontal"
                onPress={handleProductPress}
                onAddToCart={handleQuickAdd}
                index={index}
              />
            </View>
          ))}
        </Animated.View>

        {/* Rewards Card */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          className="px-4 mt-6"
        >
          <Pressable onPress={() => router.push("/(tabs)/rewards")}>
            <Card className="p-5">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-caramel/30 items-center justify-center mr-4">
                  <Ionicons name="star" size={28} color="#FFD59A" />
                </View>
                <View className="flex-1">
                  <Text className="text-coffee-900 font-bold text-base">
                    {user?.rewardPoints || 0} Points
                  </Text>
                  <Text className="text-gray-500 text-sm mt-0.5">
                    {user?.tier || "Bronze"} Member • Earn more rewards
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Card>
          </Pressable>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}
