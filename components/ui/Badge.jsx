import { Text, View } from "react-native";

const variants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-coffee-600 text-white",
  secondary: "bg-coffee-100 text-coffee-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) {
  const variantParts = variants[variant].split(" ");
  const bgClass = variantParts[0];
  const textColor = variantParts[1];

  return (
    <View
      className={`rounded-full self-start ${bgClass} ${sizes[size]} ${className}`}
    >
      <Text className={`font-medium ${textColor}`}>{children}</Text>
    </View>
  );
}

export default Badge;
