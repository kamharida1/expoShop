import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { Link, Redirect,} from "expo-router";
import { Button } from "../components/Button";
import { useAuth } from "@/providers/UserProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();
  console.warn("session", session);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
