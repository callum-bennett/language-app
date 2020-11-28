import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import WordCard from "./WordCard";
import { markWordAsSeen } from "../../store/actions/words";
import { useDispatch } from "react-redux";
import AppText from "../UI/AppText";
import AppButton from "../UI/AppButton";
import MultipleChoice from "./MultipleChoice";
import CenteredView from "../UI/AppCenteredView";
import BottomContainer from "./BottomContainer";
import * as Colors from "../../constants/Colors";
import BottomContainerItem from "./BottomContainerItem";

const carouselWidth = Dimensions.get("window").width;
const carouselHeight = Dimensions.get("window").height;
const itemWidth = Math.round(carouselWidth * 0.9);

export const LESSON_TYPE_SLIDES = "slides";
export const LESSON_TYPE_MULTIPLE_CHOICE = "multiplechoice";
export const LESSON_TYPE_CROSSWORD = "crossword";

const Component = (props) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const [allowScroll, setAllowScroll] = useState(false);
  const [activeSlide, setActiveSlide] = useState(props.start + 1);

  const { hintsAvailable } = props.component;
  const isLastSlide = activeSlide === props.words.length;

  const renderItem = ({ item }) => {
    let content;
    switch (props.component.shortname) {
      case LESSON_TYPE_SLIDES:
        content = (
          <WordCard
            word={item}
            onWordComplete={handleWordComplete}
            goNext={handleGoNext}
          />
        );
        break;
      case LESSON_TYPE_MULTIPLE_CHOICE:
        content = (
          <MultipleChoice
            word={item}
            words={props.words}
            onWordComplete={handleWordComplete}
            onSubmitAnswer={props.onSubmitAnswer}
            goNext={handleGoNext}
          />
        );
        break;
    }
    return <View style={styles.item}>{content}</View>;
  };

  const handleWordComplete = (wordId) => {
    setAllowScroll(true);
    dispatch(markWordAsSeen(wordId));
  };

  const handleBeforeSnap = () => {
    setAllowScroll(false);
    setActiveSlide((prevValue) => prevValue + 1);
  };

  const handleGoNext = () => {
    carouselRef.current?.snapToNext();
  };

  const handlePressHint = () => {
    console.log("Coming soon!");
  };

  return (
    <CenteredView grow>
      <CenteredView style={styles.progressContainer}>
        <AppText
          style={styles.progress}
        >{`${activeSlide} / ${props.words.length}`}</AppText>
      </CenteredView>
      <Carousel
        ref={carouselRef}
        firstItem={props.start}
        initialNumToRender={props.words.length}
        layout={"default"}
        data={props.words}
        renderItem={renderItem}
        sliderWidth={carouselWidth}
        sliderHeight={carouselHeight}
        itemWidth={itemWidth}
        scrollEnabled={allowScroll}
        onBeforeSnapToItem={handleBeforeSnap}
      />

      <BottomContainer>
        <BottomContainerItem>
          {hintsAvailable && (
            <AppButton
              variant="small"
              onPress={handlePressHint}
              style={{
                button: styles.hintButton,
              }}
            >
              Hint
            </AppButton>
          )}
        </BottomContainerItem>
        <BottomContainerItem>
          <AppText style={styles.translation}>
            {props.words[activeSlide - 1].translation}
          </AppText>
        </BottomContainerItem>

        <BottomContainerItem>
          {isLastSlide ? (
            <AppButton
              variant="small"
              disabled={!allowScroll}
              onPress={props.onComplete}
            >
              Continue
            </AppButton>
          ) : (
            <AppButton
              variant="small"
              disabled={!allowScroll}
              onPress={handleGoNext}
            >
              Next
            </AppButton>
          )}
        </BottomContainerItem>
      </BottomContainer>
    </CenteredView>
  );
};

Component.defaultProps = {
  start: 1,
  type: LESSON_TYPE_SLIDES,
};

const styles = StyleSheet.create({
  carousel: {
    position: "relative",
    width: "100%",
  },
  item: {
    flex: 1,
  },
  hintButton: {
    backgroundColor: Colors.accent,
    width: "auto",
  },
  translation: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressContainer: {
    height: 40,
  },
  progress: {
    textAlign: "center",
    width: "100%",
    zIndex: 1,
  },
});

export default Component;
