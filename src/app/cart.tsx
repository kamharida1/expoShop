import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import {Button} from "@/components/Button";
import { Link, router } from "expo-router";
import formatPrice from "@/utils/naira_price";
import CartProductItem from "@/components/CartProductItem.tsx";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    }}>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartProductItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, paddingBottom: 80 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
              Total: {formatPrice(total)}
            </Text>

            <Button
              onPress={() => router.push("/(user)/home/confirm-order")}
              text="Checkout"
            />
          </>
        )}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
