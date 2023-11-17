import { Image, Text, View } from "moti";
import { memo } from "react"
import { StyleSheet } from "react-native";
import Brand1 from "../../assets/images/brand1.jpeg";
import Brand2 from "../../assets/images/brand2.jpeg";
import Brand3 from "../../assets/images/brand3.jpeg";
import Brand4 from "../../assets/images/brand4.jpeg";

const Brands = memo(() => { 
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Brands of the day</Text>
        <View style={styles.row}>
          <View style={styles.brands}>
            <Image source={Brand1} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Min. 20% off | CaratLane Diamond Necklace
            </Text>
          </View>
          <View style={styles.brands}>
            <Image source={Brand2} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Min. 40% off | Fossil, Titan Smart Watch & More
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.brands}>
              <Image source={Brand3} style={styles.imgStyle} />
              <Text style={styles.brandTitle}>
                Heels - Upto 50% OFF on Heeled Sandals, High Heel{" "}
              </Text>
            </View>
            <View style={styles.brands}>
              <Image source={Brand4} style={styles.imgStyle} />
              <Text style={styles.brandTitle}>
                Sony 60W Blutooth SoundBar Speaker Audio Engine
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

export { Brands }

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  imgStyle: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    padding: 10,
  },
  innerContainer: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    // padding: 10,
  },
  brands: {
    width: "50%",
    padding: 10,
  },
  brandTitle: {
    fontSize: 12,
    color: "black",
    marginTop: 4,
  },
});