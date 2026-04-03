import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Media management will be disabled.');
}

let supabase: any;
try {
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
  );
} catch (error) {
  console.error('Supabase initialization failed:', error);
  supabase = { from: () => ({ select: () => ({ order: () => Promise.resolve({ data: [] }) }) }) }; 
}
export { supabase };

export type MediaItem = {
  id: string;
  url: string;
  type: 'image' | 'video';
  category?: string;
  created_at: string;
};
