import { Button, Card } from "@/components/ui";
import { useAuthStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const menuItems = [
    {
      id: "favorites",
      icon: "heart-outline",
      label: "Favorite Drinks",
      subtitle: "12 items saved",
    },
    {
      id: "payment",
      icon: "card-outline",
      label: "Payment Methods",
      subtitle: "Manage your cards",
    },
    {
      id: "addresses",
      icon: "location-outline",
      label: "Delivery Addresses",
      subtitle: "2 addresses saved",
    },
    {
      id: "notifications",
      icon: "notifications-outline",
      label: "Notifications",
      subtitle: "Manage preferences",
    },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header */}
        <Animated.View entering={FadeIn} className="px-4 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-coffee-900 text-2xl font-bold">Profile</Text>
            <Pressable
              onPress={() => router.push("/settings")}
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
            >
              <Ionicons name="settings-outline" size={22} color="#6F4E37" />
            </Pressable>
          </View>

          <Card className="p-5">
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full bg-coffee-200 items-center justify-center mr-4">
                {user?.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <Text className="text-coffee-600 text-2xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 text-xl font-bold">
                  {user?.name || "Guest User"}
                </Text>
                <Text className="text-gray-500 text-sm mt-0.5">
                  {user?.email || "Not signed in"}
                </Text>
                <View className="flex-row items-center mt-2">
                  <View
                    className="px-2.5 py-1 rounded-full mr-2"
                    style={{ backgroundColor: "#FFD700" + "30" }}
                  >
                    <Text className="text-coffee-800 text-xs font-semibold">
                      {user?.tier || "Bronze"} Member
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable className="mt-4 pt-4 border-t border-gray-100">
              <View className="flex-row items-center justify-center">
                <Ionicons name="create-outline" size={18} color="#6F4E37" />
                <Text className="text-coffee-600 font-medium ml-2">
                  Edit Profile
                </Text>
              </View>
            </Pressable>
          </Card>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(100)} className="px-4 mb-6">
          <View className="flex-row">
            <Card className="flex-1 p-4 mr-2 items-center">
              <Text className="text-coffee-900 text-2xl font-bold">
                {user?.rewardPoints || 0}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">Points</Text>
            </Card>
            <Card className="flex-1 p-4 mx-1 items-center">
              <Text className="text-coffee-900 text-2xl font-bold">23</Text>
              <Text className="text-gray-500 text-sm mt-1">Orders</Text>
            </Card>
            <Card className="flex-1 p-4 ml-2 items-center">
              <Text className="text-coffee-900 text-2xl font-bold">12</Text>
              <Text className="text-gray-500 text-sm mt-1">Favorites</Text>
            </Card>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View entering={FadeInDown.delay(200)} className="px-4">
          <Card className="overflow-hidden">
            {menuItems.map((item, index) => (
              <Pressable
                key={item.id}
                className={`
                  flex-row items-center px-4 py-4
                  ${index < menuItems.length - 1 ? "border-b border-gray-100" : ""}
                `}
              >
                <View className="w-10 h-10 rounded-full bg-coffee-100 items-center justify-center mr-3">
                  <Ionicons name={item.icon} size={20} color="#6F4E37" />
                </View>
                <View className="flex-1">
                  <Text className="text-coffee-900 font-medium">
                    {item.label}
                  </Text>
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </Pressable>
            ))}
          </Card>
        </Animated.View>

        {/* Support Section */}
        <Animated.View entering={FadeInDown.delay(300)} className="px-4 mt-6">
          <Text className="text-gray-500 text-sm font-medium mb-3 ml-1">
            SUPPORT
          </Text>
          <Card className="overflow-hidden">
            <Pressable className="flex-row items-center px-4 py-4 border-b border-gray-100">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#3B82F6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">Help Center</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable className="flex-row items-center px-4 py-4 border-b border-gray-100">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                <Ionicons name="chatbubble-outline" size={20} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">Contact Us</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable className="flex-row items-center px-4 py-4">
              <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#8B5CF6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">
                  Terms & Privacy
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </Card>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(400)} className="px-4 mt-8">
          <Button
            variant="outline"
            fullWidth
            onPress={handleLogout}
            leftIcon={
              <Ionicons name="log-out-outline" size={20} color="#6F4E37" />
            }
          >
            Sign Out
          </Button>
        </Animated.View>

        {/* App Version */}
        <View className="items-center mt-6">
          <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
