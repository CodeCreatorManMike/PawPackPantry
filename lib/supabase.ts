import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Only create the real client when env vars are properly configured
const isConfigured =
  supabaseUrl.startsWith("https://") && supabaseAnonKey.length > 0;

export const supabase: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (createClient("https://placeholder.supabase.co", "placeholder") as SupabaseClient);

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  body: string;
  date: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string | null;
  image_url: string | null;
  active: boolean;
};

export type GalleryItem = {
  id: string;
  name: string;
  story: string | null;
  image_url: string | null;
  type: "pack" | "testimony" | "mission";
  active: boolean;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

export type Review = {
  id: string;
  name: string;
  stars: number;
  body: string;
  approved: boolean;
  created_at: string;
};

export type InvoiceRow = {
  id: string;
  invoice_no: number;
  customer_name: string;
  pet_name: string | null;
  contact_number: string | null;
  address: string | null;
  delivery_date: string | null;
  issue_date: string;
  items: { id: string; description: string; size: string; unitPrice: number; qty: number }[];
  delivery_fee: number;
  is_preorder: boolean;
  reference: string | null;
  source: "manual" | "whatsapp";
  created_at: string;
};
