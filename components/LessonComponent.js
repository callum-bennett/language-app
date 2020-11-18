import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import WordCard from "./Lesson/WordCard";
import { markWordAsSeen } from "../store/actions/words";
import { useDispatch } from "react-redux";
import AppText from "./AppText";
import AppButton from "./AppButton";
import MultipleChoice from "./Lesson/MultipleChoice";

const carouselWidth = Dimensions.get("window").width;
const carouselHeight = Dimensions.get("window").height;
const itemWidth = Math.round(carouselWidth * 0.9);

export const LESSON_TYPE_SLIDES = 0;
export const LESSON_TYPE_MULTIPLE_CHOICE = 1;

const Lesson = (props) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const [allowScroll, setAllowScroll] = useState(false);
  const [activeSlide, setActiveSlide] = useState(props.start);

  const renderItem = ({ item }) => {
    let content;
    switch (props.type) {
      case LESSON_TYPE_SLIDES:
        content = (
          <WordCard
            word={item}
            onComplete={handleCompleteItem}
            goNext={handleGoNext}
          />
        );
        break;
      case LESSON_TYPE_MULTIPLE_CHOICE:
        content = (
          <MultipleChoice
            word={item}
            words={props.words}
            onComplete={handleCompleteItem}
            goNext={handleGoNext}
          />
        );
        break;
    }
    return <View style={styles.item}>{content}</View>;
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

  const handleGoNext = () => {
    carouselRef.current?.snapToNext();
  };

  return (
    <View style={styles.container}>
      <View>
        <AppText
          style={styles.progress}
        >{`${activeSlide} / ${props.words.length}`}</AppText>
      </View>

      <Carousel
        ref={carouselRef}
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
  type: LESSON_TYPE_SLIDES,
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
  progress: {
    textAlign: "center",
    top: 20,
    width: "100%",
    zIndex: 1,
  },
});

export default Lesson;
