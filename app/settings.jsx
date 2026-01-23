import { Button, Card } from "@/components/ui";
import { useAuthStore, useOnboardingStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuthStore();
  const { reset: resetOnboarding } = useOnboardingStore();

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    rewards: true,
    newsletter: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    hapticFeedback: true,
  });

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/auth");
        },
      },
    ]);
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      "Reset App",
      "This will show the onboarding screens again on next launch.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          onPress: () => {
            resetOnboarding();
            Alert.alert("Done", "Onboarding has been reset.");
          },
        },
      ],
    );
  };

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
        <Text className="text-coffee-900 text-xl font-bold">Settings</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 16,
        }}
      >
        {/* Notifications */}
        <Animated.View entering={FadeInDown.delay(100)} className="mt-4">
          <Text className="text-gray-500 text-sm font-medium mb-3 ml-1">
            NOTIFICATIONS
          </Text>
          <Card className="overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <Ionicons
                    name="bag-check-outline"
                    size={20}
                    color="#3B82F6"
                  />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">
                    Order Updates
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Get notified about your orders
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.orderUpdates}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, orderUpdates: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>

            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-3">
                  <Ionicons name="pricetag-outline" size={20} color="#F59E0B" />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">
                    Promotions
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Deals and special offers
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.promotions}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, promotions: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>

            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-yellow-100 items-center justify-center mr-3">
                  <Ionicons name="star-outline" size={20} color="#EAB308" />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">Rewards</Text>
                  <Text className="text-gray-500 text-sm">
                    Points and tier updates
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.rewards}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, rewards: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>

            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#8B5CF6" />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">
                    Newsletter
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Weekly coffee tips and news
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.newsletter}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, newsletter: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>
          </Card>
        </Animated.View>

        {/* Appearance */}
        <Animated.View entering={FadeInDown.delay(200)} className="mt-6">
          <Text className="text-gray-500 text-sm font-medium mb-3 ml-1">
            APPEARANCE
          </Text>
          <Card className="overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3">
                  <Ionicons name="moon-outline" size={20} color="#FFF" />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">Dark Mode</Text>
                  <Text className="text-gray-500 text-sm">Use dark theme</Text>
                </View>
              </View>
              <Switch
                value={preferences.darkMode}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, darkMode: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>

            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-pink-100 items-center justify-center mr-3">
                  <Ionicons
                    name="phone-portrait-outline"
                    size={20}
                    color="#EC4899"
                  />
                </View>
                <View>
                  <Text className="text-coffee-900 font-medium">
                    Haptic Feedback
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Vibrations on interactions
                  </Text>
                </View>
              </View>
              <Switch
                value={preferences.hapticFeedback}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, hapticFeedback: value })
                }
                trackColor={{ false: "#E5E7EB", true: "#6F4E37" }}
                thumbColor="#FFF"
              />
            </View>
          </Card>
        </Animated.View>

        {/* About */}
        <Animated.View entering={FadeInDown.delay(300)} className="mt-6">
          <Text className="text-gray-500 text-sm font-medium mb-3 ml-1">
            ABOUT
          </Text>
          <Card className="overflow-hidden">
            <Pressable className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="#10B981"
                  />
                </View>
                <Text className="text-coffee-900 font-medium">App Version</Text>
              </View>
              <Text className="text-gray-500">1.0.0</Text>
            </Pressable>

            <Pressable className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#3B82F6"
                  />
                </View>
                <Text className="text-coffee-900 font-medium">
                  Terms of Service
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>

            <Pressable className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#6366F1"
                  />
                </View>
                <Text className="text-coffee-900 font-medium">
                  Privacy Policy
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>

            <Pressable
              onPress={handleResetOnboarding}
              className="flex-row items-center justify-between px-4 py-4"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-3">
                  <Ionicons name="refresh-outline" size={20} color="#F59E0B" />
                </View>
                <Text className="text-coffee-900 font-medium">
                  Reset Onboarding
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </Card>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInDown.delay(400)} className="mt-8">
          <Button
            variant="outline"
            fullWidth
            onPress={handleLogout}
            leftIcon={
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            }
            className="border-red-200"
          >
            <Text className="text-red-500 font-semibold">Sign Out</Text>
          </Button>
        </Animated.View>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-gray-400 text-sm">Made with ☕ by BREW</Text>
        </View>
      </ScrollView>
    </View>
  );
}
