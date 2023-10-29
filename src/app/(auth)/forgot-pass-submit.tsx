// import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
// import { MotiText, MotiView, Text, View } from "moti";
// import { Screen } from "../../components/Screen";
// import { useState } from "react";
// import * as Yup from "yup";
// import tw from "twrnc";
// import { Stack, router, useLocalSearchParams } from "expo-router";
// import AppForm from "../../components/AppForm";
// import { supabase } from "../../lib/supabase";
// import { Alert } from "react-native";
// import { InputField } from "../../components/InputField";
// import { Field } from "formik";
// import { ButtonSubmit } from "../../components/ButtonSubmit";


// const validationSchema = Yup.object().shape({
//   token: Yup.string().min(6).required(),
//   password: Yup.string()
//     .matches(/\w*[a-z]\w*/, "Password must have a small letter")
//     .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
//     .matches(/\d/, "Password must have a number")
//     .min(8, ({ min }) => `Password must be at least ${min} characters`)
//     .required("Password is required")
//     .label("Password"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords do not match")
//     .required("Confirm password is required")
//     .label("Confirm Password"),
// }); 

// export default function ForgotPasswordSubmit() {
//   //const [loading, setLoading] = useState(false);

//   const handlePasswordReset = async (values: {
//     token: string;
//     password: string;
//     confirmPassword: string;
//   }) => {
//    // setLoading(true);
//     const { token, password } = values;
    
//     const { email } = useLocalSearchParams();

//     const { error } = await supabase.auth.verifyOtp({
//       email: email as string,
//       token,
//       type: "email",
//     });
//     if (error) {
//       Alert.alert("Error", error.message);
//       //setLoading(false);
//       return;
//     } else {
//       const { data, error: updateError } = await supabase.auth.updateUser({
//         password,
//       });

//       if (updateError) {
//         Alert.alert("Error", updateError.message);
//         //setLoading(false);
//         return;
//       }
//       Alert.alert("Success", "Password changed successfully");

//       //data && router.replace("/sign-in");
//     }
//     //setLoading(false);
//   }

//   return (
//     // <KeyboardShift style={{ flex: 1 }}>
//     //   <Screen scroll style={tw`p-3`}>
//     //     <MotiView style={tw`mt-4 mb-10`}>
//     //       <MotiText style={tw`text-[17px] font-medium text-stone-800`}>
//     //         Enter the token you received in your email to set a new password.
//     //       </MotiText>
//     //     </MotiView>
//     //     <AppForm
//     //       initialValues={{ token: "", password: "", confirmPassword: "" }}
//     //       validationSchema={validationSchema}
//     //       onSubmit={handlePasswordReset}
//     //     >
//     //       <Field
//     //         component={InputField}
//     //         name="token"
//     //         placeholder="Token"
//     //         keyboardType="number-pad"
//     //         autoCapitalize="none"
//     //         autoCorrect={false}
//     //         textContentType="oneTimeCode"
//     //       />
//     //       <Field
//     //         name="password"
//     //         component={InputField}
//     //         placeholder="Password"
//     //         autoCapitalize="none"
//     //         isPassword
//     //         autoCorrect={false}
//     //         textContentType="password"
//     //       />
//     //       <Field
//     //         name="confirmPassword"
//     //         component={InputField}
//     //         placeholder="Confirm Password"
//     //         autoCapitalize="none"
//     //         isPassword
//     //         autoCorrect={false}
//     //         textContentType="password"
//     //       />
//     //       <ButtonSubmit
//     //         title="Reset Password"
//     //         //loading={loading}
//     //         style={tw`mt-4`}
//     //       />
//     //     </AppForm>
//     //   </Screen>
//     // </KeyboardShift>
//     <>
//     </>
//   );
// }
