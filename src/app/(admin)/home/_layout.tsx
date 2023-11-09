import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable } from "react-native";
import Colors from "../../../constants/Colors";
import { Text } from "react-native";

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Products",
          headerRight: () => (
            <Link href="/(admin)/home/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Pressable onPress={()=>{}}>
              {({ pressed }) => (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
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
      />
    </Stack>
  );
}
