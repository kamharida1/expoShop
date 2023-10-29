// import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
// import { MotiText, MotiView, Text, View } from "moti";
// import * as Yup from "yup";
// import { Field } from "formik";
// import { Screen } from "../../components/Screen";
// import { useState } from "react";
// import tw from "t";
// import AppForm from "../../components/AppForm";
// import { supabase } from "../../lib/supabase";
// import { Alert } from "react-native";
// import { router } from "expo-router";
// import { InputField } from "../../components/InputField";
// import { ButtonSubmit } from "../../components/ButtonSubmit";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email().required(),
// });

// export default function ForgotPassword() {
//   //const [loading, setLoading] = useState(false);

//   return (
//     // <KeyboardShift style={{ flex: 1 }}>
//     //   <Screen scroll style={tw`p-3`}>
//     //     <MotiView style={tw`mt-4 mb-10`}>
//     //       <MotiText style={tw`text-[17px] font-medium text-stone-800`}>
//     //         Enter your email addresss.
//     //       </MotiText>
//     //     </MotiView>
//     //     <AppForm
//     //       initialValues={{ email: "" }}
//     //       validationSchema={validationSchema}
//     //       onSubmit={async (values: { email: string }) => {
//     //         //setLoading(true);
//     //         const { email } = values;
//     //         const { data, error } = await supabase.auth.resetPasswordForEmail(
//     //           email
//     //         );
//     //         data && router.push({
//     //           pathname: "/auth/forgot-password-submit",
//     //           params: { email },
//     //         });
//     //         if (error) {
//     //           Alert.alert("Error", error.message);
//     //         }
//     //         //setLoading(false);
//     //       }}
//     //     >
//     //       <Field
//     //         component={InputField}
//     //         name="email"
//     //         placeholder="Email"
//     //         keyboardType="email-address"
//     //         autoCapitalize="none"
//     //         autoCorrect={false}
//     //         textContentType="emailAddress"
//     //         autoFocus
//     //       />
//     //       <ButtonSubmit
//     //         title="Send Reset Link"
//     //         //loading={loading}
//     //         style={tw`mt-4`}
//     //       />
//     //     </AppForm>
//     //   </Screen>
//     // </KeyboardShift>
//     <></>
//   );
// }
