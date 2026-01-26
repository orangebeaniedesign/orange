import { createClient } from '@supabase/supabase-js';

/* -------------------------------------------
   ENV
------------------------------------------- */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

/* -------------------------------------------
   CLIENT
------------------------------------------- */

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/* -------------------------------------------
   DOMAIN TYPES (DB SHAPE)
------------------------------------------- */

/**
 * NOTE:
 * "all" should NOT live in the database layer.
 * It is a UI concern only.
 */
export type ProjectCategory =
  | 'branding'
  | 'motion'
  | 'photography'
  | 'uiux';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: ProjectCategory;
  image_url: string;
  client: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  logo_url: string | null;
  order_index: number;
  created_at: string;
}

export interface Statistic {
  id: string;
  label: string;
  percentage: number;
  order_index: number;
  created_at: string;
}

/* -------------------------------------------
   FORMS
------------------------------------------- */

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
}
