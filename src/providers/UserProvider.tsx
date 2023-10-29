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
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
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
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
