import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  className = "",
}) {
  return (
    <View className={`flex-row justify-between ${className}`}>
      {sizes.map((size) => {
        const isSelected = selectedSize === size.id;
        return (
          <Pressable
            key={size.id}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSelect(size.id);
            }}
            className={`
              flex-1 mx-1 py-4 rounded-2xl items-center border-2
              ${
                isSelected
                  ? "bg-coffee-600 border-coffee-600"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <Text
              className={`
                text-2xl mb-1
                ${isSelected ? "text-white" : "text-coffee-400"}
              `}
            >
              {size.id === "small" ? "☕" : size.id === "medium" ? "☕️" : "☕️"}
            </Text>
            <Text
              className={`
                font-semibold text-sm
                ${isSelected ? "text-white" : "text-coffee-800"}
              `}
            >
              {size.name}
            </Text>
            <Text
              className={`
                text-xs mt-0.5
                ${isSelected ? "text-coffee-100" : "text-gray-500"}
              `}
            >
              {size.label}
            </Text>
            {size.priceModifier > 0 && (
              <Text
                className={`
                  text-xs mt-1 font-medium
                  ${isSelected ? "text-white" : "text-coffee-600"}
                `}
              >
                +${size.priceModifier.toFixed(2)}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export default SizeSelector;
