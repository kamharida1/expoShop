import React, { useEffect, useState } from "react";
import { InsertTables } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useAddress, useEditAddress, useInsertAddress } from "@/api/addresses";
import { useDeleteProduct } from "@/api/products";
import { useAuth } from "@/providers/UserProvider";
import { Alert, ScrollView } from "react-native";
import { Text, View } from "moti";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import AppForm from "@/components/AppForm";
import { InputAdd } from "@/components/InputAdd";
import FormPlaces from "@/components/FormPlaces";
import { Button } from "@/components/Button";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

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


export default function CreateAddress() {
  const [province, setProvince] = useState<string>("");
  const [town, setTown] = useState<string>("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [street2, setStreet2] = useState<string>("");
  const [zip_code, setZipCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();

  const getInfo = (province: any, town: any) => {
    setProvince(province);
    setTown(town);
  };

  const { id: idString } = useLocalSearchParams();
  // const id = parseFloat(
  //   typeof idString === "string" ? idString : idString?.[0]
  // );

  const isUpdating = !!idString;

  const { mutate: insertAddress} = useInsertAddress();
  const { mutate: updateAddress} = useEditAddress();
  const { data: updatingAddress } = useAddress(idString as string);
  const { mutate: deleteAddress } = useDeleteProduct();

  useEffect(() => {
    if (isUpdating && updatingAddress) {
      setFirstName(updatingAddress.first_name || "");
      setLastName(updatingAddress.last_name || "");
      setEmail(updatingAddress.email || "") ;
      setPhone(updatingAddress.phone  || ""  );
      setStreet(updatingAddress.street  || "");
      setStreet2(updatingAddress.street2  || "");
      setZipCode(updatingAddress.zip_code || "");
      setTown(updatingAddress.city  || "");
      setProvince(updatingAddress.state || "");
    }
  }, [updatingAddress])
  
  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setStreet2("");
    setZipCode("");
    setTown("");
    setProvince("");
  }

  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
    } else {
      // create
      onCreate();
    }
  };

  const onCreate = () => {
    const address = {
      first_name,
      last_name,
      email,
      phone,
      street,
      street2,
      zip_code,
      city: town,
      state: province,
      user_id: session?.user.id,
    };
    insertAddress(address, {
      onSuccess: () => {
        alert("Address created successfully");
        resetFields();
        router.back();
      },
      onError: (error: any) => {
        alert(error.message);
      },
    });
  }

  const onUpdate =  () => {
    updateAddress(
      {
        id: idString as string,
        first_name,
        last_name,
        email,
        phone,
        street,
        street2,
        zip_code,
        city: town,
        state: province,
        user_id: session?.user.id,
      },
      {
        onSuccess: () => {
          alert("Address updated successfully");
          resetFields();
          router.back();
        },
        onError: (error: any) => {
          alert(error.message);
        },
      }
    );
  };

  const onDelete = () => {
    deleteAddress(idString as string, {
      onSuccess: () => {
        alert("Address deleted successfully");
        resetFields();
        router.back();
      },
      onError: (error: any) => {
        alert(error.message);
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  
  return (
    <ScrollView style={{ flex: 1 }}>
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
          {updatingAddress ? "Edit Address" : "Add a New Address"}
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={first_name}
          onChangeText={setFirstName}
          placeholder="First Name"
          style={styles.input}
        />
        <Text style={styles.label}> Last Name</Text>
        <TextInput
          value={last_name}
          onChangeText={setLastName}
          placeholder="Last Name"
          style={styles.input}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          style={styles.input}
        />
        <Text style={styles.label}>Street</Text>
        <TextInput
          value={street}
          onChangeText={setStreet}
          placeholder="Street"
          style={styles.input}
        />
        <Text style={styles.label}>Street 2</Text>
        <TextInput
          value={street2}
          onChangeText={setStreet2}
          placeholder="Street 2"
          style={styles.input}
        />
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          value={zip_code}
          onChangeText={setZipCode}
          placeholder="Zip Code"
          style={styles.input}
        />

        <FormPlaces getInfo={getInfo} />

        <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
        {isUpdating && (
          <Text onPress={confirmDelete} style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: Colors.light.tint,
            marginVertical: 10,
          }}>
            Delete
          </Text>
        )}
      </View>
    </ScrollView>
  );

}
const styles = StyleSheet.create({
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});