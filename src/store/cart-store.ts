"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartState } from "@/interfaces"

export const useCartStore = create<Pick<CartState, 'items' | 'addItem' | 'removeItem' | 'clearCart' | 'getItemsCount'>>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (id: string) => {
        const { items } = get()
        // Solo añadir si no existe ya (un libro por usuario)
        if (!items.includes(id)) {
          set({ items: [...items, id] })
        }
      },

      removeItem: (id: string) => {
        const { items } = get()
        set({ items: items.filter((itemId) => itemId !== id) })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getItemsCount: () => {
        return get().items.length
      },
    }),
    {
      name: "cursumi-cart", // nombre para localStorage
    },
  ),
)
