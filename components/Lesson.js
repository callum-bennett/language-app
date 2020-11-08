import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import WordCard from "./Lesson/WordCard";
import { markWordAsSeen } from "../store/actions/words";
import { useDispatch } from "react-redux";
import AppText from "./AppText";
import AppButton from "./AppButton";

const carouselWidth = Dimensions.get("window").width;
const carouselHeight = Dimensions.get("window").height;
const itemWidth = Math.round(carouselWidth * 0.9);

const Lesson = (props) => {
  const dispatch = useDispatch();
  const [allowScroll, setAllowScroll] = useState(false);
  const [activeSlide, setActiveSlide] = useState(props.start);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <WordCard word={item} onComplete={handleCompleteItem} />
      </View>
    );
  };

  const handleCompleteItem = (wordId) => {
    setAllowScroll(true);
    dispatch(markWordAsSeen(wordId));
  };

  const handleSnapToItem = (index) => {
    setActiveSlide(index + 1);
  };

  const handleBeforeSnap = () => {
    setAllowScroll(false);
  };

  return (
    <View style={styles.carousel}>
      <AppText
        style={styles.progress}
      >{`${activeSlide} / ${props.words.length}`}</AppText>
      <Carousel
        firstItem={props.start - 1}
        layout={"default"}
        data={props.words}
        renderItem={renderItem}
        sliderWidth={carouselWidth}
        sliderHeight={carouselHeight}
        itemWidth={itemWidth}
        scrollEnabled={allowScroll}
        onBeforeSnapToItem={handleBeforeSnap}
        onSnapToItem={handleSnapToItem}
      />

      <View style={styles.buttonContainer}>
        {allowScroll && activeSlide === props.words.length && (
          <AppButton onPress={props.onComplete} style={styles.button}>
            Continue
          </AppButton>
        )}
      </View>
    </View>
  );
};

Lesson.defaultProps = {
  start: 1,
};

const styles = StyleSheet.create({
  carousel: {
    position: "relative",
  },
  item: {
    flex: 1,
  },
  button: {
    margin: "auto",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    height: 80,
  },
  progress: {
    position: "absolute",
    textAlign: "center",
    top: 20,
    width: "100%",
    zIndex: 1,
  },
});

export default Lesson;
