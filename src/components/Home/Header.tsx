import { View } from "moti";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const Header = memo(() => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#88dae0", "#98e1d6", "#9ee4d4"]}
        style={styles.container}
      >
        <View style={styles.inputBox}>
          <View style={styles.row}>
            <Ionicons name="search" size={22} color="#1f1f1f" />
            <TextInput
              placeholder="Search for products, brands and more"
              placeholderTextColor="#848484"
              style={styles.textInput}
            />
          </View>
          <AntDesign name="scan1" size={22} color="#909594" />
        </View>
        <Feather name="mic" size={20} color="#000000" />
      </LinearGradient>
    </View>
  );
});

export { Header };
  
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    paddingTop: 60
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a1bcc0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    width: "90%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    padding: 8,
  },
});
