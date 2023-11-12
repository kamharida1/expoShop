import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  signOut: () =>{},
});

export default function AuthProvider({ children }: PropsWithChildren) {
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
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event);
      console.log("Auth session:", session);
      console.log("Profile:", profile);
      if (event === 'SIGNED_IN') {
        setSession(session)
        setLoading(false)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        setLoading(false)
      }
    });

    return () => {
      unsubscribe.data.subscription.unsubscribe();
    };
  }, []);

  const signOut = () => { 
    supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ session, loading, signOut, profile, isAdmin: profile?.group === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
