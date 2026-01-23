import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser = {
          id: "1",
          email,
          name: "Coffee Lover",
          avatar: null,
          phone: "+1 (555) 123-4567",
          rewardPoints: 450,
          tier: "Gold",
        };

        set({
          user: mockUser,
          token: "mock-jwt-token",
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser = {
          id: "1",
          email,
          name,
          avatar: null,
          phone: "",
          rewardPoints: 100,
          tier: "Bronze",
        };

        set({
          user: mockUser,
          token: "mock-jwt-token",
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      addRewardPoints: (points) => {
        const currentUser = get().user;
        if (currentUser) {
          const newPoints = currentUser.rewardPoints + points;
          let tier = "Bronze";
          if (newPoints >= 1000) tier = "Platinum";
          else if (newPoints >= 500) tier = "Gold";
          else if (newPoints >= 200) tier = "Silver";

          set({ user: { ...currentUser, rewardPoints: newPoints, tier } });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
