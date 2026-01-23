import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],
      activeOrder: null,

      placeOrder: (cartItems, total, paymentMethod, deliveryAddress) => {
        const order = {
          id: `ORD-${Date.now()}`,
          items: cartItems,
          total,
          paymentMethod,
          deliveryAddress,
          status: "confirmed",
          statusHistory: [
            { status: "confirmed", timestamp: new Date().toISOString() },
          ],
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 25 * 60 * 1000,
          ).toISOString(),
        };

        set({
          orders: [order, ...get().orders],
          activeOrder: order,
        });

        return order;
      },

      updateOrderStatus: (orderId, status) => {
        const orders = get().orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              status,
              statusHistory: [
                ...order.statusHistory,
                { status, timestamp: new Date().toISOString() },
              ],
            };
          }
          return order;
        });

        const activeOrder = get().activeOrder;
        if (activeOrder?.id === orderId) {
          set({
            orders,
            activeOrder: { ...activeOrder, status },
          });
        } else {
          set({ orders });
        }
      },

      setActiveOrder: (order) => {
        set({ activeOrder: order });
      },

      clearActiveOrder: () => {
        set({ activeOrder: null });
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
