import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import * as SecureStore from "expo-secure-store";

export default function useLogOut() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn() {
      const { error } = await supabase.auth.signOut();
      await SecureStore.deleteItemAsync("authKeyEmail");
      await SecureStore.deleteItemAsync("authKeyPassword");

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
}
