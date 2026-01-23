import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
  className = "",
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={`-mx-4 ${className}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category.id;
        return (
          <Animated.View key={category.id} entering={FadeIn.delay(index * 50)}>
            <Pressable
              onPress={() => onSelect(category.id)}
              className={`
                flex-row items-center px-4 py-2.5 rounded-full mr-2
                ${isSelected ? "bg-coffee-600" : "bg-coffee-100"}
              `}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={isSelected ? "#FFF" : "#6F4E37"}
              />
              <Text
                className={`
                  ml-2 font-medium text-sm
                  ${isSelected ? "text-white" : "text-coffee-700"}
                `}
              >
                {category.name}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}

export default CategoryTabs;
