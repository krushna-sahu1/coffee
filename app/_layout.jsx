import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "#FDF8F3" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
          <Stack.Screen
            name="auth"
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="product/[id]"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="cart"
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="checkout"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="order-tracking/[id]"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="settings"
            options={{ animation: "slide_from_right" }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
