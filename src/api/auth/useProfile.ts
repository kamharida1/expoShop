import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const getUserProfile = async (userId: string) => { 
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if(!data) {
    throw new Error("User not found")
  }

  return data;
}

export default function useProfile () {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      //console.log(session);
      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });
    
  },[session])


  return useQuery(
    ["profile",],
    () => getUserProfile(profile.id),
  );
}