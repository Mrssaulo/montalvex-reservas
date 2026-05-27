export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "finished";

export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          primary_color: string | null;
          accent_color: string | null;
          background_color: string | null;
          phone: string | null;
          address: string | null;
          opening_time: string;
          closing_time: string;
          last_reservation_time: string;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          primary_color?: string | null;
          accent_color?: string | null;
          background_color?: string | null;
          phone?: string | null;
          address?: string | null;
          opening_time?: string;
          closing_time?: string;
          last_reservation_time?: string;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["restaurants"]["Insert"]>;
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          restaurant_id: string;
          customer_name: string;
          customer_phone: string;
          reservation_code: string | null;
          public_token: string | null;
          people: number;
          reservation_date: string;
          reservation_time: string;
          notes: string | null;
          status: ReservationStatus;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          customer_name: string;
          customer_phone: string;
          reservation_code?: string | null;
          public_token?: string | null;
          people: number;
          reservation_date: string;
          reservation_time: string;
          notes?: string | null;
          status?: ReservationStatus;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["reservations"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "reservations_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
        ];
      };
      restaurant_settings: {
        Row: {
          id: string;
          restaurant_id: string;
          available_days: number[] | null;
          interval_minutes: number | null;
          max_people_per_slot: number | null;
          allow_large_groups: boolean | null;
          large_group_threshold: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          available_days?: number[] | null;
          interval_minutes?: number | null;
          max_people_per_slot?: number | null;
          allow_large_groups?: boolean | null;
          large_group_threshold?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["restaurant_settings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "restaurant_settings_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: true;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Restaurant = Database["public"]["Tables"]["restaurants"]["Row"];
export type RestaurantSettings =
  Database["public"]["Tables"]["restaurant_settings"]["Row"];
export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
