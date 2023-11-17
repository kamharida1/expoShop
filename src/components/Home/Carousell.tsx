import { Image, View } from "moti";
import { memo, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import CarouselSlider, { Carousel, Pagination } from 'react-native-snap-carousel';
import { CarouselData } from "@/data/CarouselData";

const sliderWidth = Dimensions.get("screen").width;

const Carousell = memo(() => {
  const carouselRef = useRef<Carousel<unknown> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.imgStyle} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <CarouselSlider
        vertical={false}
        ref={carouselRef}
        data={CarouselData}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={600}
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={true}
      />
      <Pagination
        dotsLength={CarouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          left: "15%",
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        // inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
        inactiveDotStyle={{ width: 15, height: 15, borderRadius: 10 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor="green"
        inactiveDotColor="#FFFFFF"
      />
    </View>
  );
});

export { Carousell };
  
const styles = StyleSheet.create({
  slide: {},
  imgStyle: {
    height: 250,
    width: "68%",
  },
  carouselContainer: {
    position: "relative",

  },
});
