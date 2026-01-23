import { Button, Card, CartItem } from "@/components/ui";
import { useCartStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTax,
    getTotal,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <Ionicons name="close" size={22} color="#6F4E37" />
        </Pressable>
        <Text className="text-coffee-900 text-xl font-bold">My Cart</Text>
        {items.length > 0 ? (
          <Pressable onPress={clearCart} className="px-3 py-2">
            <Text className="text-red-500 font-medium">Clear</Text>
          </Pressable>
        ) : (
          <View className="w-16" />
        )}
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-32 h-32 rounded-full bg-coffee-100 items-center justify-center mb-6">
            <Ionicons name="cart-outline" size={64} color="#6F4E37" />
          </View>
          <Text className="text-coffee-900 text-xl font-bold mb-2">
            Your cart is empty
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Looks like you have not added any drinks yet
          </Text>
          <Button onPress={() => router.push("/(tabs)/menu")}>
            Browse Menu
          </Button>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1 px-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Cart Items */}
            <Animated.View entering={FadeInDown}>
              {items.map((item) => (
                <CartItem
                  key={item.itemId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Animated.View>

            {/* Promo Code */}
            <Animated.View entering={FadeInDown.delay(100)} className="mt-4">
              <Card className="p-4">
                <Pressable className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="pricetag-outline"
                      size={20}
                      color="#6F4E37"
                    />
                    <Text className="text-coffee-800 font-medium ml-3">
                      Add promo code
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </Pressable>
              </Card>
            </Animated.View>

            {/* Order Summary */}
            <Animated.View entering={FadeInDown.delay(200)} className="mt-4">
              <Card className="p-4">
                <Text className="text-coffee-900 font-bold text-lg mb-4">
                  Order Summary
                </Text>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-600">Subtotal</Text>
                  <Text className="text-coffee-900 font-medium">
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-600">Tax (8%)</Text>
                  <Text className="text-coffee-900 font-medium">
                    ${tax.toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-600">Delivery</Text>
                  <Text className="text-green-600 font-medium">Free</Text>
                </View>

                <View className="h-px bg-gray-200 my-3" />

                <View className="flex-row justify-between">
                  <Text className="text-coffee-900 font-bold text-lg">
                    Total
                  </Text>
                  <Text className="text-coffee-900 font-bold text-lg">
                    ${total.toFixed(2)}
                  </Text>
                </View>
              </Card>
            </Animated.View>
          </ScrollView>

          {/* Checkout Button */}
          <Animated.View
            entering={FadeIn.delay(300)}
            className="px-4 pt-4 bg-white border-t border-gray-100"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <Button
              onPress={handleCheckout}
              fullWidth
              size="lg"
              rightIcon={
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              }
            >
              Proceed to Checkout
            </Button>
          </Animated.View>
        </>
      )}
    </View>
  );
}
