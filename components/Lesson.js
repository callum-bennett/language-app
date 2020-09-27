import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import WordCard from "./Lesson/WordCard";

const carouselWidth = Dimensions.get("window").width;
const carouselHeight = Dimensions.get("window").height;
const itemWidth = Math.round(carouselWidth * 0.9);

const Lesson = (props) => {
  const [allowScroll, setAllowScroll] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <WordCard word={item} onComplete={handleCompleteItem} />
      </View>
    );
  };

  const handleCompleteItem = () => {
    setAllowScroll(true);
  };

  const afterSlide = () => {
    setAllowScroll(false);
  };

  return (
    <View style={styles.carousel}>
      <Carousel
        layout={"default"}
        data={props.words}
        renderItem={renderItem}
        sliderWidth={carouselWidth}
        sliderHeight={carouselHeight}
        itemWidth={itemWidth}
        scrollEnabled={allowScroll}
        onBeforeSnapToItem={afterSlide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {},
  item: {
    height: 400,
    flex: 1,
  },
});

export default Lesson;
