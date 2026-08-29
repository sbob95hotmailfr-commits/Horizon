export type VehicleCategory =
  | "citadine"
  | "berline"
  | "suv"
  | "utilitaire"
  | "cabriolet"
  | "electrique";

export type Transmission = "manuelle" | "automatique";
export type FuelType = "essence" | "diesel" | "electrique" | "hybride";
export type BookingStatus = "en_attente" | "confirmee" | "refusee" | "annulee";
export type ProfileRole = "user" | "admin";

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string;
          name: string;
          brand: string;
          category: VehicleCategory;
          price_per_day: number;
          images: string[];
          transmission: Transmission;
          fuel_type: FuelType;
          seats: number;
          mileage_included_km: number;
          description: string;
          location: string;
          available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: string;
          category: VehicleCategory;
          price_per_day: number;
          images?: string[];
          transmission: Transmission;
          fuel_type: FuelType;
          seats: number;
          mileage_included_km?: number;
          description?: string;
          location?: string;
          available?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          vehicle_id: string;
          start_date: string;
          end_date: string;
          pickup_location: string;
          pickup_time: string;
          return_time: string;
          return_location: string | null;
          status: BookingStatus;
          full_name: string;
          phone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vehicle_id: string;
          start_date: string;
          end_date: string;
          pickup_location: string;
          pickup_time?: string;
          return_time?: string;
          return_location?: string | null;
          status?: BookingStatus;
          full_name: string;
          phone: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          phone: string | null;
          preferred_brands: string[];
          avoided_brands: string[];
          role: ProfileRole;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          phone?: string | null;
          preferred_brands?: string[];
          avoided_brands?: string[];
          role?: ProfileRole;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          author: string;
          rating: number;
          comment: string;
          review_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          author: string;
          rating: number;
          comment: string;
          review_date?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_unavailable_vehicle_ids: {
        Args: { p_start: string; p_end: string };
        Returns: string[];
      };
      get_vehicle_booked_ranges: {
        Args: { p_vehicle_id: string };
        Returns: { start_date: string; end_date: string }[];
      };
    };
    Enums: {
      vehicle_category: VehicleCategory;
      transmission_type: Transmission;
      fuel_type: FuelType;
      booking_status: BookingStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
