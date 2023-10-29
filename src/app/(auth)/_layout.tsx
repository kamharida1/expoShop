import { Redirect, Stack } from "expo-router";
//import { useAuth } from "../../providers/AuthProvider";

export default function AuthLayout() {
  // const { session } = useAuth();

  // if (session) {
  //   return <Redirect href={"/"} />;
  // }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerLargeTitle: true,
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerLargeTitle: true,
          headerTitle: "Sign Up",
        }}
      />
      {/* <Stack.Screen
        name="forgot-password"
        options={{
          headerLargeTitle: true,
          headerTitle: "Password Recovery",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="forgot-pass-submit"
        options={{
          headerLargeTitle: true,
          headerTitle: "Password Recovery",
          headerBackTitleVisible: false,
        }}
      /> */}
    </Stack>
  );
}
