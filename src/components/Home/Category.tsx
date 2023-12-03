import { memo, } from "react";

import Brand1 from "../../assets/images/brand1.jpeg";
import Brand2 from "../../assets/images/brand2.jpeg";
import Brand3 from "../../assets/images/brand3.jpeg";
import Brand4 from "../../assets/images/brand4.jpeg";
import { ScrollView, Text } from "moti";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Categories } from "@/data/Categories";


const Category = memo(() => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.container}>
      {Categories?.length &&
        Categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.container}>
            <Image
              source={category.image}
              style={styles.imgStyle}
              resizeMode="contain"
            />
            <Text style={styles.title}>{ category.title}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
});

export { Category };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 5,
    paddingVertical: 5
  },
  imgStyle: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 12,
    color: "#2c4341",
    textAlign: "center",
  },
  category: {},
});
