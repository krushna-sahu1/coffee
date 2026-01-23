import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, addons = [], quantity = 1) => {
        const items = get().items;
        const itemId = `${product.id}-${size}-${addons.map((a) => a.id).join(",")}`;

        const existingIndex = items.findIndex((item) => item.itemId === itemId);

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          const addonTotal = addons.reduce(
            (sum, addon) => sum + addon.price,
            0,
          );
          const sizePrice = size === "Small" ? 0 : size === "Medium" ? 0.5 : 1;
          const itemPrice = product.price + sizePrice + addonTotal;

          set({
            items: [
              ...items,
              {
                itemId,
                product,
                size,
                addons,
                quantity,
                unitPrice: itemPrice,
              },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.itemId !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const items = get().items.map((item) =>
          item.itemId === itemId ? { ...item, quantity } : item,
        );
        set({ items });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0,
        );
      },

      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
