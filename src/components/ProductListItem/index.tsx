import { memo } from "react";
import { Tables } from "../../types"
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";
import { RemoteImage } from "../RemoteImage";
import formatPrice from "@/utils/naira_price";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<'products'>;
}

const ProductListItem = memo<ProductListItemProps>(({ product }) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/home/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price as number)}</Text>
      </Pressable>
    </Link>
  );
})

export { ProductListItem }; 
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
   
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});