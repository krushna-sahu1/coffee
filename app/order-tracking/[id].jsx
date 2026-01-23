import { Button, Card, OrderStatusStepper } from "@/components/ui";
import { orderStatuses } from "@/constants";
import { useOrdersStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { getOrderById, updateOrderStatus } = useOrdersStore();

  const order = getOrderById(id);
  const [currentStatus, setCurrentStatus] = useState(
    order?.status || "confirmed",
  );

  // Simulate order status updates
  useEffect(() => {
    if (!order) return;

    const statusSequence = ["confirmed", "preparing", "ready"];
    const currentIndex = statusSequence.indexOf(currentStatus);

    if (currentIndex < statusSequence.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statusSequence[currentIndex + 1];
        setCurrentStatus(nextStatus);
        updateOrderStatus(order.id, nextStatus);
      }, 8000); // Update every 8 seconds for demo

      return () => clearTimeout(timer);
    }
  }, [currentStatus, order]);

  if (!order) {
    return (
      <View className="flex-1 bg-coffee-50 items-center justify-center">
        <Text className="text-gray-500">Order not found</Text>
        <Button onPress={() => router.replace("/(tabs)")} className="mt-4">
          Go Home
        </Button>
      </View>
    );
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getEstimatedTime = () => {
    const estimated = new Date(order.estimatedDelivery);
    return formatTime(estimated);
  };

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <Ionicons name="close" size={22} color="#6F4E37" />
        </Pressable>
        <Text className="text-coffee-900 text-xl font-bold">Track Order</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Success Header */}
        <Animated.View entering={FadeIn} className="px-4 pt-4">
          <LinearGradient
            colors={["#6F4E37", "#3E2723"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 items-center"
          >
            <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={48} color="#FFF" />
            </View>
            <Text className="text-white text-2xl font-bold">Order Placed!</Text>
            <Text className="text-white/80 text-base mt-2 text-center">
              Your order #{order.id.replace("ORD-", "")} has been confirmed
            </Text>

            <View className="flex-row items-center mt-6 bg-white/10 rounded-xl px-4 py-3">
              <Ionicons name="time-outline" size={20} color="#FFF" />
              <Text className="text-white ml-2">
                Estimated ready by{" "}
                <Text className="font-bold">{getEstimatedTime()}</Text>
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Order Status */}
        <Animated.View entering={FadeInDown.delay(200)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            Order Status
          </Text>
          <Card className="py-6">
            <OrderStatusStepper
              statuses={orderStatuses}
              currentStatus={currentStatus}
            />
          </Card>
        </Animated.View>

        {/* Order Details */}
        <Animated.View entering={FadeInDown.delay(300)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            Order Details
          </Text>
          <Card className="p-4">
            {order.items.map((item) => (
              <View key={item.itemId} className="flex-row items-center mb-3">
                <Image
                  source={{ uri: item.product.image }}
                  className="w-14 h-14 rounded-xl mr-3"
                />
                <View className="flex-1">
                  <Text className="text-coffee-900 font-medium">
                    {item.product.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {item.size} • Qty: {item.quantity}
                  </Text>
                </View>
                <Text className="text-coffee-800 font-medium">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View className="h-px bg-gray-200 my-3" />

            <View className="flex-row justify-between">
              <Text className="text-coffee-900 font-bold">Total</Text>
              <Text className="text-coffee-900 font-bold">
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </Card>
        </Animated.View>

        {/* Delivery Info */}
        <Animated.View entering={FadeInDown.delay(400)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            Pickup Location
          </Text>
          <Card className="p-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-coffee-100 items-center justify-center mr-3">
                <Ionicons name="storefront" size={24} color="#6F4E37" />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">
                  BREW Coffee - Downtown
                </Text>
                <Text className="text-gray-500 text-sm mt-0.5">
                  123 Coffee Street, San Francisco, CA
                </Text>
              </View>
            </View>

            <View className="flex-row mt-4">
              <Button variant="outline" size="sm" className="flex-1 mr-2">
                <Ionicons name="call-outline" size={16} color="#6F4E37" />
                <Text className="text-coffee-600 ml-2">Call</Text>
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Ionicons name="navigate-outline" size={16} color="#6F4E37" />
                <Text className="text-coffee-600 ml-2">Directions</Text>
              </Button>
            </View>
          </Card>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(500)} className="px-4 mt-8">
          <Button onPress={() => router.replace("/(tabs)")} fullWidth size="lg">
            Back to Home
          </Button>
          <Button
            variant="ghost"
            fullWidth
            className="mt-3"
            onPress={() => router.push("/(tabs)/orders")}
          >
            View All Orders
          </Button>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
