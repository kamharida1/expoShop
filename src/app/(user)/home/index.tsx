import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useProductList } from "../../../api/products";
import { ProductListItem } from "../../../components/ProductListItem";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { useGetSelectedAddress, useMyAddressList, useUpdateAddress } from "@/api/addresses";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { ProductHorizontalItem } from "@/components/ProductHorizontalItem";
import { Brands, Carousell } from "@/components/Home";

export default function HomeScreen() {
  const { data: products, error, isLoading } = useProductList();
  const { data: selectedAddress } = useGetSelectedAddress();
  const { mutate: selectAddress } = useUpdateAddress();
  const { data: addresses } = useMyAddressList();
  
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
  }

  const addressSheetRef = useRef<BottomSheetModal>(null);
  const openAddress = () => {
    addressSheetRef.current?.present();
  };
  const closeAddress = () => {
    addressSheetRef.current?.dismiss();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <BottomSheetModalProvider>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductHorizontalItem key={index} product={item} />
        )}
        keyExtractor={(item) => item.id}
        //numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          paddingBottom: 40,
          backgroundColor: "#fff",
        }}
        //columnWrapperStyle={{ gap: 10 }}
        ListHeaderComponent={() => (
          // <Pressable
          //   onPress={openAddress}
          //   style={{
          //     flexDirection: "row",
          //     alignItems: "center",
          //     gap: 5,
          //     padding: 10,
          //     paddingTop: 10,
          //     backgroundColor: "#AFEEEE",
          //   }}
          // >
          //   <Ionicons name="location-outline" size={24} color="black" />

          //   <View>
          //     {selectedAddress ? (
          //       <Text>
          //         Deliver to {selectedAddress?.first_name} -{" "}
          //         {selectedAddress?.street}
          //       </Text>
          //     ) : (
          //       <Text style={{ fontSize: 13, fontWeight: "500" }}>
          //         Add Address
          //       </Text>
          //     )}
          //   </View>

          //   <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          // </Pressable>
          <>
            <Brands />
            <Carousell />
          </>
        )}
      />

      <BottomSheetModal
        ref={addressSheetRef}
        snapPoints={["50%"]}
        index={0}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
            ]}
          />
        )}
      >
        <View style={{}}>
          <View
            style={{
              marginBottom: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select your delivery location to see product availability and
              faster delivery options
            </Text>
          </View>

          <ScrollView
            style={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* already added address */}
            {addresses?.map((address, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  updateAddress(address.id);
                  closeAddress();
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress?.id === address.id ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {address?.first_name} {address?.last_name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.street}, {address?.street2}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.state}, {address?.city}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.phone}, {address?.zip_code}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                router.push("/(user)/home/address-screen");
                addressSheetRef.current?.dismiss();
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View
            style={{
              padding: 10,
              flexDirection: "column",
              gap: 7,
              marginBottom: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={24} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter delivery address to see product availability
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside Enugu
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
