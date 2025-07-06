export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          phone: string | null
          address_line1: string | null
          address_line2: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          price: number
          compare_at_price: number | null
          category_id: string
          brand: string | null
          sku: string
          stock_quantity: number
          is_featured: boolean
          is_new: boolean
          images: string[]
          tags: string[] | null
          rating: number | null
          review_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          price: number
          compare_at_price?: number | null
          category_id: string
          brand?: string | null
          sku: string
          stock_quantity: number
          is_featured?: boolean
          is_new?: boolean
          images: string[]
          tags?: string[] | null
          rating?: number | null
          review_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          price?: number
          compare_at_price?: number | null
          category_id?: string
          brand?: string | null
          sku?: string
          stock_quantity?: number
          is_featured?: boolean
          is_new?: boolean
          images?: string[]
          tags?: string[] | null
          rating?: number | null
          review_count?: number
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          status: string
          total_amount: number
          shipping_address: Json
          billing_address: Json
          payment_intent_id: string | null
          shipping_method: string
          shipping_cost: number
          tax_amount: number
          discount_amount: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          status: string
          total_amount: number
          shipping_address: Json
          billing_address: Json
          payment_intent_id?: string | null
          shipping_method: string
          shipping_cost: number
          tax_amount: number
          discount_amount: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: string
          total_amount?: number
          shipping_address?: Json
          billing_address?: Json
          payment_intent_id?: string | null
          shipping_method?: string
          shipping_cost?: number
          tax_amount?: number
          discount_amount?: number
          notes?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          created_at: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          total: number
          product_name: string
          product_image: string
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          total: number
          product_name: string
          product_image: string
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          total?: number
          product_name?: string
          product_image?: string
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          product_id: string
          rating: number
          title: string | null
          content: string
          is_verified: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          product_id: string
          rating: number
          title?: string | null
          content: string
          is_verified?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          product_id?: string
          rating?: number
          title?: string | null
          content?: string
          is_verified?: boolean
        }
      }
      wishlists: {
        Row: {
          id: string
          created_at: string
          user_id: string
          product_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          product_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          product_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}