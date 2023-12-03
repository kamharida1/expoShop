import { Text, View } from "moti";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AmazonPay from "../../assets/images/amazon-pay.png";
import PayBills from "../../assets/images/pay-bills.jpeg";
import ScanQR from "../../assets/images/scan-qr.jpeg";
import SendMoney from "../../assets/images/send-money.jpg";
import { Image } from "react-native";
import { RecentSearchData } from "@/data/RecentSearchData";


const Services = memo(() => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle={{ paddingRight: 20}}
      style={styles.container}
    >
      <View style={styles.serviceContainer}>
        <View style={styles.row}>
          <View style={styles.innerContainer}>
            <Image style={styles.imgStyle} source={AmazonPay} />
            <Text style={styles.title}>Amazon Pay</Text>
          </View>
          <View style={styles.innerContainer}>
            <Image style={styles.imgStyle} source={SendMoney} />
            <Text style={styles.title}>Send Money</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.innerContainer}>
            <Image style={styles.imgStyle} source={ScanQR} />
            <Text style={styles.title}>Scan QR</Text>
          </View>
          <View style={styles.innerContainer}>
            <Image style={styles.imgStyle} source={PayBills} />
            <Text style={styles.title}>Pay Bills</Text>
          </View>
        </View>
      </View>
      {RecentSearchData.map((item) => (
        <View key={item.id} style={styles.outerContainer}>
          <Text style={styles.recentSearch}>{item.title}</Text>
          <Image style={styles.serviceImg} source={item.image} />
        </View>
      ))}
    </ScrollView>
  );
});

export { Services };

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },
  serviceContainer: {
    backgroundColor: "#eef2f9",
    borderRadius: 5,
    elevation: 5,
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  innerContainer: {
    padding: 10,
    alignItems: "center",
    paddingTop: 15
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
  serviceImg: {
    width: '100%',
    height: 130,
  },
  outerContainer: {
    backgroundColor: "#ffe",
    marginLeft: 8,
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    width: 140,
  },
  recentSearch: {
    fontSize: 13,
    color: "#000",
    marginBottom: 8,
   
  },
})

