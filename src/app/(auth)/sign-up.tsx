import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from "yup";
import { Field } from "formik";
import KeyboardShift from  "@fullstackcraft/react-native-keyboard-shift";

import { Screen } from '../../components/Screen';
import { MotiText, MotiView } from 'moti';
import tw from 'twrnc';
import { Link, router } from 'expo-router';
import AppForm from '../../components/AppForm';
import { InputField } from '../../components/InputField';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import useCreateUser from '../../api/auth/useCreateUser';
import { AppContainer } from '../../components/AppContainer';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  //name: Yup.string().required("Name is required").label("Name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required")
    .label("Confirm Password"),
});

const SignUp = () => {
  const { mutate, isPending } = useCreateUser();

  const handleSignUp = async (values: FormValues) => { 
    const { email, password } = values;
    mutate({ email, password }, {
      onSuccess: () => router.push('/(user)')
    });
    // if (signup) {
    //   signup(email, password);
    //   if (user?.group === "admin") {
    //     router.push("/(admin)");
    //   } else {
    //     router.push("/(user)");
    //   }
    // }
  }

  return (
    <AppContainer safe>
      <MotiView style={tw`mt-4 mb-10`}>
        <MotiText style={tw`text-[20px] font-medium text-stone-600`}>
          Enter your sign up credentials
        </MotiText>
      </MotiView>
      <AppForm
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
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
        <Field
          name="confirmPassword"
          component={InputField}
          placeholder="Confirm Password"
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
        />
        <MotiView style={tw`flex-row items-center justify-between my-4`}>
          <Link href="/sign-in" style={tw`text-base text-sky-600`}>
            Already have an account? Sign In, instead.
          </Link>
        </MotiView>
        <ButtonSubmit
          title={isPending ? "Creating user..." : "Sign Up"}
          disabled={isPending}
        />
      </AppForm>
    </AppContainer>
  );
}

export default SignUp;

const styles = StyleSheet.create({})