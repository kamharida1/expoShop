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
     // Check if email is already in use
      const { data: userWithEmail } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", profile.email)
        .single();
      
      if (userWithEmail) { 
        throw new Error("Email already in use");
      }

      const { data: {session}, error: SignUpError, } = await supabase.auth.signUp({
        email: profile.email,
        password: profile.password,
      });

        // await SecureStore.setItemAsync("authKeyEmail", profile.email);
        // await SecureStore.setItemAsync("authKeyPassword", profile.password);

      if (SignUpError) {
        throw new Error(SignUpError.message);
      }

      if (session?.user) {
        // Save user id to secure store
        // Create profile
        const { data: upsertData, error: upsertError } = await supabase
          .from("profiles")
          .upsert({
            id: session.user.id,
            email: profile.email,
          });
        
        if (upsertError) {
          throw new Error(upsertError.message);
        }
        return upsertData;
      }
    },
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries(['signUp', data]);
    // },
  })
 }

// import { useMutation } from "@tanstack/react-query";
// import { supabase } from "../../lib/supabase";

// interface Profile {
//   email: string;
//   password: string;
// }

// const createUser = async (profile: Profile) => { 
//   // Check if email is already in use
//   const { data: userWithEmail } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("email", profile.email)
//     .single();
  
//   if (userWithEmail) { 
//     throw new Error("Email already in use");
//   }

//   const { data: insertData, error: SignUpError } = await supabase.auth.signUp({
//     email: profile.email,
//     password: profile.password,
//   });

//   if (SignUpError) {
//     throw new Error(SignUpError.message);
//   }

//   return insertData;
// }

// export default function useCreateUser(profile: Profile) {
//   return useMutation(() => createUser(profile), {
//     onSuccess: async (data) => {
//       // Create profile
//       if (data?.user) {
//         // const { user, session } = data;
//         // await supabase.from("profiles").insert({
//         //   id: user.id,
//         //   email: user.email,
//         // });
//         const { data: upsertData, error: upsertError } = await supabase
//           .from("profiles")
//           .upsert({
//             id: data.user.id,
//             email: profile.email,
//           });
//         if (upsertError) {
//           throw new Error(upsertError.message);
//         }

//         return upsertData
//       }
//     }
//   })
// }