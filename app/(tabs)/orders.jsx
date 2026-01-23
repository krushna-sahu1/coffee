import { Badge, Button, Card } from "@/components/ui";
import { orderStatuses } from "@/constants";
import { useCartStore, useOrdersStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orders, activeOrder } = useOrdersStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleTrackOrder = (order) => {
    router.push(`/order-tracking/${order.id}`);
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addItem(item.product, item.size, item.addons, item.quantity);
    });
    router.push("/cart");
  };

  const getStatusInfo = (status) => {
    const statusInfo = orderStatuses.find((s) => s.id === status);
    return statusInfo || { label: status, icon: "help-circle" };
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "primary";
      case "preparing":
        return "warning";
      case "ready":
        return "success";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const renderOrder = ({ item: order, index }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <Card className="mb-4 p-4">
        {/* Order Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-coffee-900 font-bold text-base">
              {order.id}
            </Text>
            <Text className="text-gray-500 text-sm mt-0.5">
              {formatDate(order.createdAt)}
            </Text>
          </View>
          <Badge variant={getStatusVariant(order.status)}>
            {getStatusInfo(order.status).label}
          </Badge>
        </View>

        {/* Order Items Preview */}
        <View className="flex-row items-center mb-3">
          {order.items.slice(0, 3).map((item, idx) => (
            <Image
              key={item.itemId}
              source={{ uri: item.product.image }}
              className="w-12 h-12 rounded-xl"
              style={{
                marginLeft: idx > 0 ? -8 : 0,
                borderWidth: 2,
                borderColor: "#FFF",
              }}
            />
          ))}
          {order.items.length > 3 && (
            <View
              className="w-12 h-12 rounded-xl bg-coffee-100 items-center justify-center"
              style={{ marginLeft: -8, borderWidth: 2, borderColor: "#FFF" }}
            >
              <Text className="text-coffee-600 font-bold text-sm">
                +{order.items.length - 3}
              </Text>
            </View>
          )}
          <View className="ml-3 flex-1">
            <Text className="text-gray-600 text-sm" numberOfLines={1}>
              {order.items.map((i) => i.product.name).join(", ")}
            </Text>
          </View>
        </View>

        {/* Order Footer */}
        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <Text className="text-coffee-800 font-bold text-lg">
            ${order.total.toFixed(2)}
          </Text>
          <View className="flex-row">
            {order.status !== "completed" && (
              <Button
                variant="secondary"
                size="sm"
                onPress={() => handleTrackOrder(order)}
                className="mr-2"
              >
                Track
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onPress={() => handleReorder(order)}
            >
              Reorder
            </Button>
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 pb-4">
        <Text className="text-coffee-900 text-2xl font-bold">My Orders</Text>
      </View>

      {/* Active Order Banner */}
      {activeOrder && activeOrder.status !== "completed" && (
        <Animated.View entering={FadeIn} className="px-4 mb-4">
          <Pressable onPress={() => handleTrackOrder(activeOrder)}>
            <Card variant="filled" className="p-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-coffee-600 items-center justify-center mr-3">
                  <Ionicons name="cafe" size={24} color="#FFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-coffee-900 font-bold">
                    Order in Progress
                  </Text>
                  <Text className="text-coffee-600 text-sm mt-0.5">
                    {getStatusInfo(activeOrder.status).label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6F4E37" />
              </View>
            </Card>
          </Pressable>
        </Animated.View>
      )}

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-24 h-24 rounded-full bg-coffee-100 items-center justify-center mb-4">
              <Ionicons name="receipt-outline" size={48} color="#6F4E37" />
            </View>
            <Text className="text-coffee-900 font-bold text-lg mb-2">
              No orders yet
            </Text>
            <Text className="text-gray-500 text-center">
              Your order history will appear here
            </Text>
            <Button
              onPress={() => router.push("/(tabs)/menu")}
              className="mt-6"
            >
              Start Ordering
            </Button>
          </View>
        }
      />
    </View>
  );
}
