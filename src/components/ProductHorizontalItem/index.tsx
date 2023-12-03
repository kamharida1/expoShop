import { Tables } from "@/types";
import { Link, useSegments } from "expo-router";
import { Text, View } from "moti";
import { memo } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { RemoteImage } from "../RemoteImage";
import { getRating } from "@/utils/getRating";
import formatPrice from "@/utils/naira_price";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductHorizontalItemProps = {
  product: Tables<"products">;
  key: number;
};


const ProductHorizontalItem = memo<ProductHorizontalItemProps>(
  ({ product, key }) => {
    const segments = useSegments();
    //console.log("product Image : ", product.image);
    
    return (
      <Link href={`/${segments[0]}/home/${product.id}`} asChild>
        <Pressable key={key} style={styles.container}>
          <View style={styles.productSection}>
            <View style={styles.productImageSection}>
              <RemoteImage
                path={product.image}
                fallback={defaultPizzaImage}
                style={styles.productImg}
                resizeMode="contain"
              />
            </View>
            <View style={styles.productDetailsSection}>
              <Text style={styles.sponsored}>Sponsored</Text>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.tagline}>{product.category}</Text>
              <View style={styles.row}>
                <Text style={styles.rating}>{product.ratings}</Text>
                {getRating(product.ratings as number)}
                <Text style={styles.ratingCount}>{product.avg_rating}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.price}>
                  {formatPrice(product.price as number)}
                </Text>
                <Text style={styles.mrp}>{product.brand}</Text>
                <Text style={styles.crossout}>
                  {formatPrice(product.old_price as number)}
                </Text>
              </View>

              <Text style={styles.cashback}>
                Up to 5% cashback with Amazon Pay Credit card
              </Text>
              <Image
                style={{ width: 30, height: 30, resizeMode: "contain" }}
                source={{
                  uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                }}
              />
              <Text style={styles.cashback}>FREE Delivery by 10:29 am</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }
);

export { ProductHorizontalItem }; 

const styles = StyleSheet.create({
  container: { padding: 3 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tagline: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666",
  },
  productSection: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    marginVertical: 5,
  },
  productDetailsSection: {
    width: "60%",
    padding: 10,
    justifyContent: "space-between",
  },
  productImageSection: {
    width: "40%",
    backgroundColor: "#eff0f1",
    justifyContent: "center",
  },
  productImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  sponsored: {
    fontSize: 11,
    color: "black",
    lineHeight: 18,
  },
  productName: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 18,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  rating: {
    fontSize: 10,
    color: "#017185",
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 10,
    color: "#017185",
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: "#000000",
  },
  mrp: {
    fontSize: 10,
    color: "grey",
    marginHorizontal: 5,
  },
  crossout: {
    fontSize: 10,
    color: "grey",
    textDecorationLine: "line-through",
  },
  cashback: {
    fontSize: 10,
    color: "grey",
    marginVertical: 2,
  },
  logo: {},
});