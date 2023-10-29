import { Profile } from "@/types"
import React, { createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { router } from "expo-router";

type AuthData = {
  user: Profile | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  supabase: SupabaseClient;
  children: React.ReactNode;
};

export const AuthContext = createContext<Partial<AuthData>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ supabase, children }:AuthProviderProps) => {
  const [user, setUser] = React.useState<Profile | null>(null);

  const login = async (email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error);
      return;
    }

    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
      .single();
    
    if (userError) {
      console.error('Error fetching user:', userError);
      return;
    }

    const profile = user as Profile;
    setUser(profile);
  };

  const signup = async (email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Error signing up:', error);
      return;
    }

    const profile: Profile = {
      id: session?.user?.id || '',
      avatar_url: '',
      email: session?.user?.email || '',
      full_name: '',
      phone: '',
    }

    const { data, error: profileError } = await supabase.from('profiles').upsert([profile]);
    
    if (profileError) {
      console.error('Error creating profile:', profileError);
      return;
    }

    setUser(profile);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    // router.push("/(auth)/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

