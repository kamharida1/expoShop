import { View, Text} from "react-native";
import { supabase } from "../../lib/supabase";
import tw from 'twrnc'
import { Button } from "@/components/Button";
import { router } from "expo-router";

const ProfileScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Profile</Text>

      {/* <Button
        title="Sign out"
        onPress={logout}
      /> */}
      <Button onPress={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
        text="Sign out"
      />
    </View>
  );
};

export default ProfileScreen;
