import { Button, Card, Input } from "@/components/ui";
import { paymentMethods } from "@/constants";
import { useAuthStore, useCartStore, useOrdersStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, getTotal, clearCart } = useCartStore();
  const { placeOrder } = useOrdersStore();
  const { user, addRewardPoints } = useAuthStore();

  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Confirm
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "123 Coffee Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    instructions: "",
  });

  const total = getTotal();

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order = placeOrder(items, total, selectedPayment, deliveryAddress);

    // Add reward points (10 points per dollar)
    addRewardPoints(Math.floor(total * 10));

    // Clear cart
    clearCart();

    setIsProcessing(false);

    // Navigate to order tracking
    router.replace(`/order-tracking/${order.id}`);
  };

  const renderStep1 = () => (
    <Animated.View entering={FadeInRight}>
      <Text className="text-coffee-900 text-lg font-bold mb-4">
        Delivery Address
      </Text>

      <Card className="p-4 mb-4">
        <Pressable className="flex-row items-center mb-4">
          <View className="w-10 h-10 rounded-full bg-coffee-100 items-center justify-center mr-3">
            <Ionicons name="location" size={20} color="#6F4E37" />
          </View>
          <View className="flex-1">
            <Text className="text-coffee-900 font-medium">Home</Text>
            <Text className="text-gray-500 text-sm">
              {deliveryAddress.street}, {deliveryAddress.city}
            </Text>
          </View>
          <View className="w-6 h-6 rounded-full border-2 border-coffee-600 items-center justify-center">
            <View className="w-3 h-3 rounded-full bg-coffee-600" />
          </View>
        </Pressable>

        <Pressable className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Ionicons name="briefcase" size={20} color="#9CA3AF" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-600 font-medium">Work</Text>
            <Text className="text-gray-400 text-sm">Add work address</Text>
          </View>
          <View className="w-6 h-6 rounded-full border-2 border-gray-300" />
        </Pressable>
      </Card>

      <Input
        label="Delivery Instructions (Optional)"
        placeholder="E.g., Leave at door, call on arrival..."
        value={deliveryAddress.instructions}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, instructions: text })
        }
        multiline
        numberOfLines={3}
      />

      <Button
        onPress={() => setStep(2)}
        fullWidth
        size="lg"
        className="mt-6"
        rightIcon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
      >
        Continue to Payment
      </Button>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View entering={FadeInRight}>
      <Text className="text-coffee-900 text-lg font-bold mb-4">
        Payment Method
      </Text>

      <Card className="overflow-hidden mb-4">
        {paymentMethods.map((method, index) => (
          <Pressable
            key={method.id}
            onPress={() => setSelectedPayment(method.id)}
            className={`
              flex-row items-center p-4
              ${index < paymentMethods.length - 1 ? "border-b border-gray-100" : ""}
            `}
          >
            <View className="w-12 h-12 rounded-xl bg-coffee-100 items-center justify-center mr-3">
              <Ionicons name={method.icon} size={24} color="#6F4E37" />
            </View>
            <Text className="flex-1 text-coffee-900 font-medium">
              {method.name}
            </Text>
            <View
              className={`
                w-6 h-6 rounded-full border-2 items-center justify-center
                ${selectedPayment === method.id ? "border-coffee-600" : "border-gray-300"}
              `}
            >
              {selectedPayment === method.id && (
                <View className="w-3 h-3 rounded-full bg-coffee-600" />
              )}
            </View>
          </Pressable>
        ))}
      </Card>

      {selectedPayment === "card" && (
        <Animated.View entering={FadeIn}>
          <Card className="p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-8 bg-blue-600 rounded items-center justify-center mr-3">
                  <Text className="text-white font-bold text-xs">VISA</Text>
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">•••• 4242</Text>
                  <Text className="text-gray-500 text-sm">Expires 12/26</Text>
                </View>
              </View>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
          </Card>
        </Animated.View>
      )}

      <View className="flex-row mt-4">
        <Button
          variant="outline"
          onPress={() => setStep(1)}
          className="mr-2"
          leftIcon={<Ionicons name="arrow-back" size={20} color="#6F4E37" />}
        >
          Back
        </Button>
        <Button
          onPress={() => setStep(3)}
          className="flex-1"
          size="lg"
          rightIcon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
        >
          Review Order
        </Button>
      </View>
    </Animated.View>
  );

  const renderStep3 = () => (
    <Animated.View entering={FadeInRight}>
      <Text className="text-coffee-900 text-lg font-bold mb-4">
        Review Order
      </Text>

      {/* Delivery Info */}
      <Card className="p-4 mb-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-gray-500">Delivery to</Text>
          <Pressable onPress={() => setStep(1)}>
            <Text className="text-coffee-600 font-medium">Edit</Text>
          </Pressable>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={20} color="#6F4E37" />
          <Text className="text-coffee-900 ml-2">
            {deliveryAddress.street}, {deliveryAddress.city}
          </Text>
        </View>
      </Card>

      {/* Payment Info */}
      <Card className="p-4 mb-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-gray-500">Payment</Text>
          <Pressable onPress={() => setStep(2)}>
            <Text className="text-coffee-600 font-medium">Edit</Text>
          </Pressable>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            name={paymentMethods.find((m) => m.id === selectedPayment)?.icon}
            size={20}
            color="#6F4E37"
          />
          <Text className="text-coffee-900 ml-2">
            {paymentMethods.find((m) => m.id === selectedPayment)?.name}
          </Text>
        </View>
      </Card>

      {/* Order Items */}
      <Card className="p-4 mb-4">
        <Text className="text-gray-500 mb-3">Order Items ({items.length})</Text>
        {items.map((item) => (
          <View
            key={item.itemId}
            className="flex-row items-center justify-between mb-2"
          >
            <Text className="text-coffee-900 flex-1">
              {item.quantity}x {item.product.name} ({item.size})
            </Text>
            <Text className="text-coffee-800 font-medium">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View className="h-px bg-gray-200 my-3" />
        <View className="flex-row items-center justify-between">
          <Text className="text-coffee-900 font-bold">Total</Text>
          <Text className="text-coffee-900 font-bold text-lg">
            ${total.toFixed(2)}
          </Text>
        </View>
      </Card>

      {/* Rewards */}
      <Card variant="filled" className="p-4 mb-6">
        <View className="flex-row items-center">
          <Ionicons name="star" size={20} color="#FFD59A" />
          <Text className="text-coffee-800 ml-2">
            You'll earn{" "}
            <Text className="font-bold">{Math.floor(total * 10)} points</Text>{" "}
            with this order
          </Text>
        </View>
      </Card>

      <View className="flex-row">
        <Button
          variant="outline"
          onPress={() => setStep(2)}
          className="mr-2"
          leftIcon={<Ionicons name="arrow-back" size={20} color="#6F4E37" />}
        >
          Back
        </Button>
        <Button
          onPress={handlePlaceOrder}
          loading={isProcessing}
          className="flex-1"
          size="lg"
        >
          Place Order
        </Button>
      </View>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3"
        >
          <Ionicons name="chevron-back" size={22} color="#6F4E37" />
        </Pressable>
        <Text className="text-coffee-900 text-xl font-bold">Checkout</Text>
      </View>

      {/* Progress Steps */}
      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          {[1, 2, 3].map((s) => (
            <View key={s} className="flex-row items-center flex-1">
              <View
                className={`
                  w-8 h-8 rounded-full items-center justify-center
                  ${step >= s ? "bg-coffee-600" : "bg-gray-200"}
                `}
              >
                {step > s ? (
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                ) : (
                  <Text
                    className={
                      step >= s ? "text-white font-bold" : "text-gray-400"
                    }
                  >
                    {s}
                  </Text>
                )}
              </View>
              {s < 3 && (
                <View
                  className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-coffee-600" : "bg-gray-200"}`}
                />
              )}
            </View>
          ))}
        </View>
        <View className="flex-row justify-between mt-2">
          <Text
            className={`text-xs ${step >= 1 ? "text-coffee-600" : "text-gray-400"}`}
          >
            Delivery
          </Text>
          <Text
            className={`text-xs ${step >= 2 ? "text-coffee-600" : "text-gray-400"}`}
          >
            Payment
          </Text>
          <Text
            className={`text-xs ${step >= 3 ? "text-coffee-600" : "text-gray-400"}`}
          >
            Confirm
          </Text>
        </View>
      </View>

      {/* Step Content */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
    </View>
  );
}
