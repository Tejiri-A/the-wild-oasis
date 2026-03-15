import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if(!supabaseUrl || !supabaseKey) throw Error("Supabase url and supabase key are required. Please check the .env file and ensure the credentials are present and correct.")

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseUrl,
  supabaseKey,
);


export default supabase;