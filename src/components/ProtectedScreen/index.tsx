import { PropsWithChildren } from "react";
import useProfile from "../../api/auth/useProfile";
import { ActivityIndicator } from "react-native";
import { Redirect, router } from "expo-router";
import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
import { Screen } from "../Screen";
import tw from "twrnc";
import { useAuthStatus } from "../../api/auth/useAuthStatus";

export default function ProtectedScreen({children}: PropsWithChildren) {
  const { loggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return <ActivityIndicator style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    
    }} />;
  }

  return loggedIn  ? (
    <KeyboardShift style={{ flex: 1 }}>
        <Screen style={tw`p-4`} scroll>
          {children}
          </Screen>
      </KeyboardShift>
    ) : (
        <Redirect href="/(auth)/sign-in" />
    )
}