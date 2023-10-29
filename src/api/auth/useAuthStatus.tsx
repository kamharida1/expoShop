import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import useProfile from "./useProfile";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
    
  const { data, isLoading } = useProfile();
  if (data) setLoggedIn(true);
 
  return { data, loggedIn, isLoading };
};
