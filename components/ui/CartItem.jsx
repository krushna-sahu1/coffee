import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { QuantityStepper } from "./QuantityStepper";

export function CartItem({ item, onUpdateQuantity, onRemove, className = "" }) {
  const { product, size, addons, quantity, unitPrice } = item;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
      className={`flex-row bg-white rounded-2xl p-3 shadow-sm shadow-black/5 mb-3 ${className}`}
    >
      <Image
        source={{ uri: product.image }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />

      <View className="flex-1 ml-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-2">
            <Text
              className="text-coffee-900 font-semibold text-base"
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <Text className="text-gray-500 text-sm mt-0.5">{size}</Text>
            {addons.length > 0 && (
              <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>
                +{addons.map((a) => a.name).join(", ")}
              </Text>
            )}
          </View>

          <Pressable
            onPress={() => onRemove(item.itemId)}
            className="p-1"
            hitSlop={10}
          >
            <Ionicons name="close-circle" size={22} color="#9CA3AF" />
          </Pressable>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <QuantityStepper
            value={quantity}
            onChange={(newQty) => onUpdateQuantity(item.itemId, newQty)}
            size="sm"
          />

          <Text className="text-coffee-600 font-bold text-base">
            ${(unitPrice * quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

export default CartItem;
