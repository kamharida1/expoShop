import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import {Button} from "@/components/Button";
import { Link, router } from "expo-router";
import formatPrice from "@/utils/naira_price";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: {formatPrice(total)}
      </Text>

      <Button
        onPress={() => router.push("/(user)/home/confirm-order")}
        text="Checkout"
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
