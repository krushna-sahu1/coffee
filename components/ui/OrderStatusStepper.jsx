import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function OrderStatusStepper({
  statuses,
  currentStatus,
  className = "",
}) {
  const currentIndex = statuses.findIndex((s) => s.id === currentStatus);

  return (
    <View className={`px-4 ${className}`}>
      {statuses.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === statuses.length - 1;

        return (
          <View key={status.id} className="flex-row">
            {/* Icon and line column */}
            <View className="items-center mr-4">
              <View
                className={`
                  w-10 h-10 rounded-full items-center justify-center
                  ${isCompleted || isActive ? "bg-coffee-600" : "bg-gray-200"}
                `}
              >
                <Ionicons
                  name={isCompleted ? "checkmark" : status.icon}
                  size={20}
                  color={isCompleted || isActive ? "#FFF" : "#9CA3AF"}
                />
              </View>

              {!isLast && (
                <View
                  className={`
                    w-0.5 h-12
                    ${isCompleted ? "bg-coffee-600" : "bg-gray-200"}
                  `}
                />
              )}
            </View>

            {/* Label column */}
            <View className="flex-1 pt-2 pb-8">
              <Text
                className={`
                  font-semibold text-base
                  ${isCompleted || isActive ? "text-coffee-800" : "text-gray-400"}
                `}
              >
                {status.label}
              </Text>
              {isActive && (
                <Text className="text-coffee-600 text-sm mt-1">
                  In progress...
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default OrderStatusStepper;
