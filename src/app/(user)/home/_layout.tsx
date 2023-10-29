import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable } from "react-native";
import Colors from "../../../constants/Colors";
import { Text, View } from "moti";
import tw from 'twrnc'
import { useAuth } from "@/providers/AuthProvider";

export default function HomeStack() {
  const { logout } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        headerLeft: () => (
          <Pressable
            onPress={logout}>
            {({ pressed }) => (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "500",
                  color: Colors.light.tint,
                  opacity: pressed ? 0.5 : 1,
                }}
              >
                {" "}
                Sign out
              </Text>
            )}
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
