import { useDeleteAddress, useGetSelectedAddress, useMyAddressList, useUpdateAddress, } from "@/api/addresses";
import { useAuth } from "@/providers/UserProvider";
import { Link, Stack, router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { AntDesign, Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function AddressScreen() {
  const { data: addresses, error, isLoading } = useMyAddressList();
  const { data: selectedAddress } = useGetSelectedAddress();

  const { mutate: selectAddress } = useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  
    const updateAddress = async (addressId: string) => {
      if (selectedAddress?.is_selected) {
        await supabase
          .from("addresses")
          .update({ is_selected: false })
          .eq("id", selectedAddress.id);
      }
      selectAddress({
        id: addressId,
        updatedFields: { is_selected: true },
      });
    };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch addresses</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "#fff",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Agubrothers.in" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Link href="/(user)/home/create-address" asChild>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text> Add a new Address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        </Link>

        <Pressable>
          {/* all the added addresses */}
          {addresses?.map((address) => (
            <Pressable
              key={address.id}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {address.first_name} {address.last_name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address.street},{"\n"}
                {address.street2}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address.city} - {address.state}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {address.phone}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {address.zip_code}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(user)/home/create-address",
                      params: { id: address.id },
                    })
                  }
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text> Edit </Text>
                </Pressable>

                <Pressable
                  onPress={() => deleteAddress(address.id)}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  onPress={() => updateAddress(address.id)}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
}