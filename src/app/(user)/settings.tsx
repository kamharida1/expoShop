import { View, Text, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { Stack } from "expo-router";
import { useAuth } from "@/providers/UserProvider";
import { Avatar } from "@/components/Avatar";
import { useGetProfile, useUpdateProfile } from "@/api/user";


const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { session } = useAuth();
  const userId = session?.user.id;

  const { mutate: updateProfile,  } = useUpdateProfile();
  const { data: profile, isLoading } = useGetProfile();

  console.log("profile", profile);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Account" }} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <View>
          <Avatar
            size={200}
            url={profile?.avatar_url || avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              if (profile) {
                updateProfile({
                  id: profile.id,
                  updatedFields: { avatar_url: url },
                });
              }
            }}
          />
        </View>
        <Input
          placeholder={profile?.email || ""}
          inputMode="email"
          label="Email"
          value={profile?.email || ""}
          disabled
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={isLoading ? "Loading ..." : "Update"}
          onPress={() =>
            profile &&
            updateProfile({
              id: profile.id,
              updatedFields: { username, avatar_url: avatarUrl },
            })
          }
          disabled={isLoading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default ProfileScreen;

// avatar_url: string | null;
// created_at: string;
// email: string | null;
// expo_push_token: string | null;
// group: string | null;
// id: string;
// username: string | null;

// {/* <View style={tw`flex-1 items-center justify-center`}>
//       <Text>Profile</Text>

//       {/* <Button
//         title="Sign out"
//         onPress={logout}
//       /> */}
//       <Button
//         onPress={() => {
//           supabase.auth.signOut();
//           router.push("/");
//         }}
//         text="Sign out"
//       />
//     </View> */}
