import { Button, Input } from "@/components/ui";
import { useAuthStore } from "@/lib/stores";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser, isLoading } = useAuthStore();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  const handleRegister = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-coffee-50"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-8">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center mb-8"
          >
            <Ionicons name="close" size={22} color="#6F4E37" />
          </Pressable>

          <Animated.View entering={FadeIn}>
            <Text className="text-coffee-900 text-3xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text className="text-gray-500 text-base mt-2">
              {isLogin
                ? "Sign in to continue ordering your favorite drinks"
                : "Join us and start earning rewards today"}
            </Text>
          </Animated.View>
        </View>

        {/* Form */}
        <View className="flex-1 bg-white rounded-t-4xl px-6 pt-8">
          {isLogin ? (
            <Animated.View
              key="login"
              entering={SlideInRight.duration(300)}
              exiting={SlideOutLeft.duration(300)}
            >
              <Controller
                control={loginForm.control}
                name="email"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    keyboardType="email-address"
                    leftIcon={
                      <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                    }
                  />
                )}
              />

              <Controller
                control={loginForm.control}
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    secureTextEntry
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                )}
              />

              <Pressable className="self-end mb-6">
                <Text className="text-coffee-600 font-medium">
                  Forgot Password?
                </Text>
              </Pressable>

              <Button
                onPress={loginForm.handleSubmit(handleLogin)}
                loading={isLoading}
                fullWidth
                size="lg"
              >
                Sign In
              </Button>
            </Animated.View>
          ) : (
            <Animated.View
              key="register"
              entering={SlideInRight.duration(300)}
              exiting={SlideOutLeft.duration(300)}
            >
              <Controller
                control={registerForm.control}
                name="name"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    autoCapitalize="words"
                    leftIcon={
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                )}
              />

              <Controller
                control={registerForm.control}
                name="email"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    keyboardType="email-address"
                    leftIcon={
                      <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                    }
                  />
                )}
              />

              <Controller
                control={registerForm.control}
                name="password"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Password"
                    placeholder="Create a password"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    secureTextEntry
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                )}
              />

              <Controller
                control={registerForm.control}
                name="confirmPassword"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    secureTextEntry
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                )}
              />

              <Button
                onPress={registerForm.handleSubmit(handleRegister)}
                loading={isLoading}
                fullWidth
                size="lg"
                className="mt-2"
              >
                Create Account
              </Button>
            </Animated.View>
          )}

          {/* Social Login */}
          <View className="mt-8">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="text-gray-400 px-4">or continue with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <View className="flex-row justify-center space-x-4">
              <Pressable className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
                <Ionicons name="logo-google" size={24} color="#6F4E37" />
              </Pressable>
              <Pressable className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center ml-4">
                <Ionicons name="logo-apple" size={24} color="#6F4E37" />
              </Pressable>
            </View>
          </View>

          {/* Switch Mode */}
          <View className="flex-row justify-center mt-8 pb-8">
            <Text className="text-gray-500">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <Pressable onPress={switchMode}>
              <Text className="text-coffee-600 font-semibold">
                {isLogin ? "Sign Up" : "Sign In"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
