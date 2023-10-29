import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>CreateProductScreen</Text>
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
