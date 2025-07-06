'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  attributes?: Record<string, string>
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
}

export const useCart = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(
          (i) => i.id === item.id && JSON.stringify(i.attributes) === JSON.stringify(item.attributes)
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex].quantity += item.quantity
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, item] })
        }
      },
      
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      
      updateQuantity: (id: string, quantity: number) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity }
          }
          return item
        })
        set({ items: updatedItems })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'luxestore-cart',
    }
  )
)