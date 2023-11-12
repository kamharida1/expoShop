import { Stack, router, useLocalSearchParams,  } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import ImageModal from "../../../components/ImageModal";
import formatPrice from "../../../utils/naira_price";
import ImageCarousel from "../../../components/Carousel";

import { CardProductDetail } from "../../../components/CardProductDetail";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";
import { useCart } from "@/providers/CartProvider";
import { RemoteImage } from "@/components/RemoteImage";
import { useState } from "react";

export default function ProductDetail() {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100 + 130;
  const [addedToCart, setAddedToCart] = useState(false);

  // let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  // let [activeIndex, setActiveIndex] = useState(0);
  // const handleImagePress = useCallback(
  //   (index: number): void => {
  //     setIsImageModalVisible(!isImageModalVisible);
  //     setActiveIndex(index);
  //   },
  //   [isImageModalVisible, activeIndex]
  // );

  const { id: idString } = useLocalSearchParams();
  // const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(idString as string );

  const { addItem } = useCart();

  const addToCart = () => {
    if (!product) {
      return;
    }
    setAddedToCart(true);
    addItem(product);
    router.push('/cart');
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "white"
      }}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: product?.title || "" }} />
      {/* <ImageCarousel onImagePress={handleImagePress} product={product as any} /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(product?.images || []).map((item, index) => (
          <ImageBackground
            source={{ uri: item || "" }}
            style={{ width, height, marginTop: 25 }}
            key={index}
          >
            <RemoteImage
              style={{ width, height }}
              path={item}
              fallback=""
            />
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <Pressable
              onPress={() => {}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="heart" size={24} color="black" />
            </Pressable>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 12,
                }}
              >
                20% off
              </Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text
          //numberOfLines={1}
          //ellipsizeMode="tail"
          style={{
            fontSize: 17,
            fontWeight: "500",
            //fontFamily: "AirBold",
          }}
        >
          {product?.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            //fontFamily: "AirBold",
            marginTop: 6,
            color: Colors.light.tint,
          }}
        >
          {formatPrice(product?.price as number)}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            //fontFamily: "AirBold",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Description
        </Text>
        <Text
          style={{
            //fontFamily: "AirBlack",
            fontSize: 15,
            marginTop: 6,
          }}
        >
          {product?.description}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />
      <CardProductDetail productDetails={product?.product_details} />
      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: "300", marginVertical: 20 }}>
          {formatPrice(product?.price as number)}
        </Text>
        <Text
          style={{
            color: "#e47911",
            //fontFamily: "AirBold",
          }}
        >
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginVertical: 8,
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text
            style={{
              fontSize: 14,
              color: "#444",
              fontWeight: "500",
            }}
          >
            Deliver To Nnamdi - AguBrothers 560019
          </Text>
        </View>
      </View>
      {product?.count && product.count < 3 ? (
        <Text
          style={{
            color: "red",
            marginHorizontal: 10,
            //fontFamily: "AirBold",
            fontSize: 17,
          }}
        >
          Only {product?.count} left in stock - order soon.
        </Text>
      ) : (
        <Text
          style={{
            color: "green",
            marginHorizontal: 10,
            //fontFamily: "AirBold",
            fontSize: 20,
          }}
        >
          {/* {product?.count} left in stock */}
          IN Stock
        </Text>
      )}
      <Pressable
        onPress={addToCart}
        style={{
          backgroundColor: "#FFC72C",
          padding: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{
              //fontFamily: "AirBold",
              fontSize: 17
            }}>
              Added to Cart
            </Text>
          </View>
        ) : (
            <Text style={{
              //fontFamily: "AirBold",
              fontSize: 17
            }}>
            Add to Cart
          </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => alert("Buy Now")}
        style={{
          backgroundColor: "#FFAC1C",
          padding: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{
          //fontFamily: "AirBold",
          fontSize: 17
        }}>
          Buy Now
        </Text>
      </Pressable>
      {/* <ImageModal
        activeIndex={activeIndex}
        images={(product?.images || []).map((item) => item) as any}
        isVisible={isImageModalVisible}
        setVisible={setIsImageModalVisible}
      /> */}
    </ScrollView>
  );
}
