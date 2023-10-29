import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseUrl = 'https://hsmgkpxexgatqvzkjrue.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzbWdrcHhleGdhdHF2emtqcnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2NjUzMzEsImV4cCI6MjAxMjI0MTMzMX0.BC_ZXZmPcHyFRGz_yxXsOjVDp7Nh2JJQttYM21I6n9E';
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});