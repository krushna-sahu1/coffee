import { CategoryTabs, ProductCard } from "@/components/ui";
import { categories, products } from "@/constants";
import { useCartStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("hot-coffee");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const addItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.getItemCount());

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductPress = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (product) => {
    addItem(product, "Medium", [], 1);
  };

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 pb-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-coffee-900 text-2xl font-bold">Menu</Text>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2"
            >
              <Ionicons
                name={viewMode === "grid" ? "list" : "grid"}
                size={20}
                color="#6F4E37"
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/cart")}
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
            >
              <Ionicons name="cart-outline" size={20} color="#6F4E37" />
              {cartItemCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      {/* Category Tabs */}
      <Animated.View entering={FadeIn.delay(100)} className="py-3">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </Animated.View>

      {/* Products */}
      <Animated.View entering={FadeInDown.delay(200)} className="flex-1 px-4">
        <FlatList
          data={filteredProducts}
          numColumns={viewMode === "grid" ? 2 : 1}
          key={viewMode}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}
          columnWrapperStyle={
            viewMode === "grid"
              ? { justifyContent: "space-between" }
              : undefined
          }
          renderItem={({ item, index }) => (
            <View
              style={
                viewMode === "grid"
                  ? { width: "48%", marginBottom: 12 }
                  : { marginBottom: 12 }
              }
            >
              <ProductCard
                product={item}
                variant={viewMode === "grid" ? "default" : "horizontal"}
                onPress={handleProductPress}
                onAddToCart={handleQuickAdd}
                index={index}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="cafe-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-400 text-base mt-4">
                No products in this category
              </Text>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
}
