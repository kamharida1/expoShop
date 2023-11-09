import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Field, useFormik } from "formik";

import * as Yup from "yup";
import { router } from "expo-router";
import FormPlaces from "../FormPlaces";
import AppForm from "../AppForm";
import { InputAdd } from "../InputAdd";
import { ButtonSubmit } from "../ButtonSubmit";
import { InsertTables } from "@/types";
import { useInsertAddress, useUpdateAddress } from "@/api/addresses";
import { useDeleteProduct } from "@/api/products";
import { useAuth } from "@/providers/UserProvider";

interface FormAddressProps {
  myAddress?: InsertTables<"addresses"> | null;
}

const AddressSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required.")
    .min(4, "Too Short")
    .max(60, "Too Long"),
  last_name: Yup.string()
    .required("Last name is required.")
    .min(2, "Too Short")
    .max(60, "Too Long"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .required("Phone number is required")
    .test(
      "len",
      "Phone number must be exactly 11 digits",
      (val) => !!val && val.length === 11
    ),
  street: Yup.string()
    .required("Address is required.")
    .min(4, "Too Short")
    .max(100, "Too Long"),
  street2: Yup.string().min(2, "Too Short").max(100, "Too Long"),
});

const FormAdd = ({ myAddress }: FormAddressProps) => {
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();

  const initialValues = myAddress || {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street: "",
    street2: "",
    is_selected: false,
    city: "",
    state: "",
    zip_code: "",
    id: "",
    user_id: "",
    created_at: "",
    country: "",
  };

  // Update form values when myAddress prop changes
  useEffect(() => {
    if (!myAddress) {
      return;
    }
    setValues(myAddress || initialValues);
  }, [myAddress]);
 
  const getInfo = (province: any, town: any) => {
    setProvince(province);
    setTown(town);
  };

  const { mutate: insertAddress } = useInsertAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteProduct();

  const submitAddress = async (
    values: FormAddressProps,
    { resetForm }: { resetForm: () => void }
  ) => { 
    try {
      if (myAddress) {
        setLoading(true);
        updateAddress({
          id: myAddress.id,
          ...values,
          city: town,
          state: province,
        });
        setLoading(false);
        Alert.alert("Address updated successfully");
        setTimeout(() => {
          router.back();
        }, 500);
      } else {
        setLoading(true);
        insertAddress({
          ...values,
          city: town,
          state: province,
          user_id: session?.user.id,
        });
        setLoading(false);
        Alert.alert("Address added successfully");
        resetForm();
        setTimeout(() => {
          router.back();
        }, 500);
      }
    } catch (error) {
      console.warn("Error saving shipping address:", error);
    } finally { 
      setLoading(false);
      resetForm();
      router.back();
    }
  }
  

  return (
    <ScrollView style={{ marginTop: 50, marginBottom: 60 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          {myAddress ? "Edit Address" : "Add a New Address"}
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <AppForm
          initialValues={initialValues}
          onSubmit={submitAddress}
          validationSchema={AddressSchema}
        >
          <Field
            component={InputAdd}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Email"
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Field
            component={InputAdd}
            label="Phone"
            name="phone"
            placeholder="Phone"
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <Field
            component={InputAdd}
            label="Address"
            name="street"
            placeholder="Address"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Address 2"
            name="street2"
            placeholder="Address 2"
            autoCapitalize="none"
            keyboardType="default"
          />
          <Field
            component={InputAdd}
            label="Postal Code"
            name="zip_code"
            placeholder="Postal Code"
            autoCapitalize="none"
            keyboardType="numeric"
          />

          <FormPlaces getInfo={getInfo} />

          <ButtonSubmit
            title="Add Address"
            disabled={loading}
            loading={loading}
          />
        </AppForm>
      </View>
    </ScrollView>
    // <Screen style={tw``}>
    //   {loading ? (
    //     <View className="flex-1 z-10 bg-white absolute left-0 right-0 bottom-0 top-0 items-center justify-center">
    //       <ActivityIndicator animating color="black" />
    //     </View>
    //   ) : (
    //     <>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.firstName}
    //           placeholder="First Name"
    //           onChangeText={handleChange("firstName")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.lastName}
    //           placeholder="Last Name"
    //           onChangeText={handleChange("lastName")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.email}
    //           placeholder="Email"
    //           onChangeText={handleChange("email")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.street}
    //           placeholder="Address 1"
    //           onChangeText={handleChange("street")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.street2 as string}
    //           placeholder="Address 2"
    //           onChangeText={handleChange("street2")}
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.phone}
    //           placeholder="Phone number"
    //           onChangeText={handleChange("phone")}
    //           keyboardType="numeric"
    //         />
    //       </View>
    //       <View style={tw`mb-4`}>
    //         <Input
    //           value={values.postalCode as string}
    //           placeholder="Poastal code"
    //           onChangeText={handleChange("postalCode")}
    //           keyboardType="numeric"
    //         />
    //       </View>

    //       <FormPlaces getInfo={getInfo} />

    //       <Button title="Submit" onPress={() => handleSubmit()} />
    //     </>
    //   )}
    // </Screen>
  );
};

export default FormAdd;
