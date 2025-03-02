import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface BasketItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface BasketStore {
  items: BasketItem[]
  addItem: (item: BasketItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearBasket: () => void
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
      clearBasket: () => set({ items: [] }),
    }),
    {
      name: "basket-storage",
    },
  ),
)

