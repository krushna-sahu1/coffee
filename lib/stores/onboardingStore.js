import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOnboardingStore = create(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      hasSeenSplash: false,

      completeOnboarding: () => {
        set({ hasSeenOnboarding: true });
      },

      completeSplash: () => {
        set({ hasSeenSplash: true });
      },

      reset: () => {
        set({ hasSeenOnboarding: false, hasSeenSplash: false });
      },
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
