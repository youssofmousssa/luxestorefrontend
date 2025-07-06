import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  category: string
  slug: string
}

type WishlistStore = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  syncWithDatabase: (userId: string) => Promise<void>
}

const useWishlistStore = create<WishlistStore>(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items, isInWishlist } = get()
        
        if (!isInWishlist(item.id)) {
          set({ items: [...items, item] })
        }
      },
      
      removeItem: (id) => {
        const { items } = get()
        set({ items: items.filter((item) => item.id !== id) })
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      isInWishlist: (id) => {
        const { items } = get()
        return items.some((item) => item.id === id)
      },
      
      syncWithDatabase: async (userId) => {
        try {
          // Get current wishlist items
          const { items } = get()
          
          // Fetch user's wishlist from database
          const { data: dbWishlist, error } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', userId)
          
          if (error) throw error
          
          // Get product details for database wishlist items
          if (dbWishlist && dbWishlist.length > 0) {
            const productIds = dbWishlist.map(item => item.product_id)
            
            const { data: products, error: productsError } = await supabase
              .from('products')
              .select('id, name, price, images, category_id, slug')
              .in('id', productIds)
            
            if (productsError) throw productsError
            
            if (products) {
              // Convert database products to wishlist items
              const dbItems: WishlistItem[] = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0] || '',
                category: product.category_id,
                slug: product.slug,
              }))
              
              // Merge local and database wishlist items (avoiding duplicates)
              const localOnlyItems = items.filter(
                item => !dbItems.some(dbItem => dbItem.id === item.id)
              )
              
              // Update local wishlist with merged items
              set({ items: [...dbItems, ...localOnlyItems] })
              
              // Add local-only items to database
              if (localOnlyItems.length > 0) {
                const newDbItems = localOnlyItems.map(item => ({
                  user_id: userId,
                  product_id: item.id,
                }))
                
                await supabase.from('wishlists').insert(newDbItems)
              }
            }
          } else {
            // If no database wishlist, add all local items to database
            if (items.length > 0) {
              const newDbItems = items.map(item => ({
                user_id: userId,
                product_id: item.id,
              }))
              
              await supabase.from('wishlists').insert(newDbItems)
            }
          }
        } catch (error) {
          console.error('Error syncing wishlist with database:', error)
        }
      },
    }),
    {
      name: 'luxestore-wishlist',
    }
  )
)

export default function useWishlist() {
  return useWishlistStore()
}