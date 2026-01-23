import { MotiView } from "moti";
import { View } from "react-native";

export function Skeleton({ width, height, radius = 8, className = "" }) {
  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 800,
        loop: true,
      }}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
      className={`bg-gray-200 ${className}`}
    />
  );
}

export function ProductCardSkeleton({ className = "" }) {
  return (
    <View
      className={`bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/5 ${className}`}
    >
      <Skeleton width="100%" height={128} radius={0} />
      <View className="p-3">
        <Skeleton width="80%" height={16} />
        <Skeleton width="40%" height={12} className="mt-2" />
        <View className="flex-row items-center justify-between mt-3">
          <Skeleton width={60} height={20} />
          <Skeleton width={32} height={32} radius={16} />
        </View>
      </View>
    </View>
  );
}

export function ListItemSkeleton({ className = "" }) {
  return (
    <View
      className={`flex-row bg-white rounded-2xl p-3 shadow-sm shadow-black/5 ${className}`}
    >
      <Skeleton width={80} height={80} radius={12} />
      <View className="flex-1 ml-3 justify-between py-1">
        <View>
          <Skeleton width="70%" height={18} />
          <Skeleton width="90%" height={12} className="mt-2" />
        </View>
        <View className="flex-row items-center justify-between">
          <Skeleton width={50} height={18} />
          <Skeleton width={32} height={32} radius={16} />
        </View>
      </View>
    </View>
  );
}

export default Skeleton;
