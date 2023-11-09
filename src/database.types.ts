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
      addresses: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_selected: boolean | null
          last_name: string | null
          phone: string | null
          state: string | null
          street: string | null
          street2: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_selected?: boolean | null
          last_name?: string | null
          phone?: string | null
          state?: string | null
          street?: string | null
          street2?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_selected?: boolean | null
          last_name?: string | null
          phone?: string | null
          state?: string | null
          street?: string | null
          street2?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          status: string | null
          total: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          total: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          total?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          avg_rating: number | null
          brand: string | null
          category: string | null
          count: number | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          images: string[] | null
          old_price: number | null
          price: number | null
          product_details: Json | null
          ratings: number | null
          sub_category: string | null
          title: string | null
        }
        Insert: {
          avg_rating?: number | null
          brand?: string | null
          category?: string | null
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          old_price?: number | null
          price?: number | null
          product_details?: Json | null
          ratings?: number | null
          sub_category?: string | null
          title?: string | null
        }
        Update: {
          avg_rating?: number | null
          brand?: string | null
          category?: string | null
          count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          old_price?: number | null
          price?: number | null
          product_details?: Json | null
          ratings?: number | null
          sub_category?: string | null
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          expo_push_token: string | null
          group: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          expo_push_token?: string | null
          group?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          expo_push_token?: string | null
          group?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      OrderStatus: "New" | "Preparing" | "Delivering" | "Delivered"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
