import { Alert, Text } from "react-native";
import React, { useState } from "react";
import { MotiText, MotiView } from "moti";
import tw from "twrnc";
import * as Yup from "yup";
import { Field } from "formik";
import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
import { Screen } from "../../components/Screen";
import AppForm from "../../components/AppForm";
import { InputField } from "../../components/InputField";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { Link, router } from "expo-router";
import useLogin from "../../api/auth/useLogin";
import { AppContainer } from "@/components/AppContainer";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email")
    .label("Email"),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
});

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const { mutate, error, isPending, isSuccess } = useLogin();

  // const { login, user } = useAuth();

  const handleSignIn = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("User logged in successfully");
          router.push("/");
        },
      }
    );
    // if (login) {
    //   login(email, password);
    //   if (user?.group === "admin") {
    //     router.push("/(admin)");
    //   } else {
    //     router.push("/(user)");
    //   }
    // }
  };

  return (
    <AppContainer safe>
      <MotiView style={tw`mt-4 mb-10 `}>
        <MotiText style={tw`text-[20px] font-medium text-stone-600`}>
          Enter your Credentials
        </MotiText>
      </MotiView>

      <AppForm
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        <Field
          component={InputField}
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          isPassword={false}
          style={{ borderBottomColor: "#ccc" }}
          // onBlur={() => setFieldTouched("email")}
          // onChangeText={handleChange("email")}
        />
        <Field
          name="password"
          component={InputField}
          placeholder="Password"
          autoCapitalize="none"
          isPassword
          autoCorrect={false}
          textContentType="password"
          // onBlur={() => setFieldTouched("password")}
          // onChangeText={handleChange("password")}
        />
        <MotiView style={tw`flex-row items-center justify-between my-4`}>
          <Link href="/forgot-password" style={tw`text-base text-sky-600`}>
            Forgot Password?
          </Link>
          {/* <Link href="/forgot-pass-submit" style={tw`text-base text-sky-600`}>
              Forgot Password?
            </Link> */}
          <Link href="/sign-up" style={tw`text-base text-sky-600`}>
            Create an account
          </Link>
        </MotiView>
        <ButtonSubmit
          title={isPending ? "Signing in..." : "Sign In"}
          disabled={isPending}
        />
      </AppForm>
    </AppContainer>
  );
}
