import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import * as SecureStore from 'expo-secure-store';


interface Profile { 
  email: string;
  password: string;
}

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(profile: Profile) {

      const { data: insertData, error: SignUpError, } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: profile.password,
      });

      // if (insertData) {
      //   await SecureStore.setItemAsync("authKeyEmail", profile.email);
      //   await SecureStore.setItemAsync("authKeyPassword", profile.password);
      // }

      if (SignUpError) {
        throw new Error(SignUpError.message);
      }
    },
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries(['signUp', data]);
    // },
  })
 }


