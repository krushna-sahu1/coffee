import { Button, Card } from "@/components/ui";
import { rewards, rewardTiers } from "@/constants";
import { useAuthStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RewardsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  const currentPoints = user?.rewardPoints || 0;
  const currentTier =
    rewardTiers.find((tier, index) => {
      const nextTier = rewardTiers[index + 1];
      return (
        currentPoints >= tier.minPoints &&
        (!nextTier || currentPoints < nextTier.minPoints)
      );
    }) || rewardTiers[0];

  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1];
  const progressToNextTier = nextTier
    ? ((currentPoints - currentTier.minPoints) /
        (nextTier.minPoints - currentTier.minPoints)) *
      100
    : 100;

  return (
    <View className="flex-1 bg-coffee-50" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Card */}
        <Animated.View entering={FadeIn} className="px-4 pt-2">
          <LinearGradient
            colors={["#6F4E37", "#3E2723"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6"
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white/80 text-base">Your Rewards</Text>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: currentTier.color + "40" }}
              >
                <Text className="text-white font-bold text-sm">
                  {currentTier.name}
                </Text>
              </View>
            </View>

            <Text className="text-white text-5xl font-bold">
              {currentPoints}
            </Text>
            <Text className="text-white/70 text-base mt-1">
              Available Points
            </Text>

            {/* Progress to next tier */}
            {nextTier && (
              <View className="mt-6">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/70 text-sm">
                    {nextTier.minPoints - currentPoints} points to{" "}
                    {nextTier.name}
                  </Text>
                  <Text className="text-white/70 text-sm">
                    {Math.round(progressToNextTier)}%
                  </Text>
                </View>
                <View className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progressToNextTier}%` }}
                  />
                </View>
              </View>
            )}

            {/* Tier benefits */}
            <View className="flex-row items-center mt-6 bg-white/10 rounded-xl p-3">
              <Ionicons name="star" size={20} color="#FFD59A" />
              <Text className="text-white text-sm ml-2">
                Earn {currentTier.multiplier}x points on every purchase
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Tier Progress */}
        <Animated.View entering={FadeInDown.delay(100)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            Membership Tiers
          </Text>
          <Card className="p-4">
            <View className="flex-row justify-between">
              {rewardTiers.map((tier, index) => {
                const isActive = tier.name === currentTier.name;
                const isPast =
                  rewardTiers.indexOf(tier) < rewardTiers.indexOf(currentTier);

                return (
                  <View key={tier.name} className="items-center flex-1">
                    <View
                      className={`
                        w-10 h-10 rounded-full items-center justify-center mb-2
                        ${isActive || isPast ? "" : "opacity-40"}
                      `}
                      style={{ backgroundColor: tier.color }}
                    >
                      {isPast || isActive ? (
                        <Ionicons name="checkmark" size={20} color="#FFF" />
                      ) : (
                        <Ionicons name="lock-closed" size={16} color="#FFF" />
                      )}
                    </View>
                    <Text
                      className={`text-xs font-medium ${isActive ? "text-coffee-800" : "text-gray-400"}`}
                    >
                      {tier.name}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {tier.minPoints}+
                    </Text>
                    {index < rewardTiers.length - 1 && (
                      <View
                        className={`absolute top-5 left-1/2 w-full h-0.5 ${isPast ? "bg-coffee-600" : "bg-gray-200"}`}
                        style={{ transform: [{ translateX: 20 }] }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </Card>
        </Animated.View>

        {/* Available Rewards */}
        <Animated.View entering={FadeInDown.delay(200)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            Redeem Rewards
          </Text>

          {rewards.map((reward, index) => {
            const canRedeem = currentPoints >= reward.points;

            return (
              <Animated.View
                key={reward.id}
                entering={FadeInDown.delay(200 + index * 50)}
              >
                <Card className="mb-3 p-4">
                  <View className="flex-row items-center">
                    <View
                      className={`
                        w-12 h-12 rounded-full items-center justify-center mr-4
                        ${canRedeem ? "bg-coffee-100" : "bg-gray-100"}
                      `}
                    >
                      <Ionicons
                        name={reward.icon}
                        size={24}
                        color={canRedeem ? "#6F4E37" : "#9CA3AF"}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`font-semibold text-base ${canRedeem ? "text-coffee-900" : "text-gray-400"}`}
                      >
                        {reward.name}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {reward.points} points
                      </Text>
                    </View>
                    <Button
                      variant={canRedeem ? "primary" : "outline"}
                      size="sm"
                      disabled={!canRedeem}
                    >
                      Redeem
                    </Button>
                  </View>
                </Card>
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* How to Earn */}
        <Animated.View entering={FadeInDown.delay(400)} className="px-4 mt-6">
          <Text className="text-coffee-900 text-lg font-bold mb-4">
            How to Earn Points
          </Text>
          <Card className="p-4">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                <Ionicons name="cafe" size={20} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">
                  Make a Purchase
                </Text>
                <Text className="text-gray-500 text-sm">
                  Earn 10 points per $1 spent
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="star" size={20} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">
                  Complete Challenges
                </Text>
                <Text className="text-gray-500 text-sm">
                  Bonus points for special activities
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                <Ionicons name="people" size={20} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="text-coffee-900 font-medium">
                  Refer Friends
                </Text>
                <Text className="text-gray-500 text-sm">
                  Get 100 points per referral
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
