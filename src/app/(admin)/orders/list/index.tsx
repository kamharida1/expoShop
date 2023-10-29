import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text>Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe",
    alignItems: "center",
    justifyContent: "center",
  },
});
