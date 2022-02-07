import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";

import {
  BottomContainer,
  BottomContainerItem,
  MultipleChoice,
  WordCard,
} from "./";
import { markWordAsSeen } from "@store/actions/words";
import { AppButton, AppText, AppCenteredView } from "@components/UI";
import * as Colors from "@constants/Colors";
import { playSound } from "@utils/sounds";

const carouselWidth = Dimensions.get("window").width;
const carouselHeight = Dimensions.get("window").height;
const itemWidth = Math.round(carouselWidth * 0.9);

export const LESSON_TYPE_SLIDES = "slides";
export const LESSON_TYPE_MULTIPLE_CHOICE = "multiplechoice";
export const LESSON_TYPE_CROSSWORD = "crossword";

const Component = (props) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  const { hintsAvailable } = props.component;

  const [allowScroll, setAllowScroll] = useState(false);
  const [allowHint, setAllowHint] = useState(hintsAvailable);
  const [activeSlide, setActiveSlide] = useState(props.start + 1);
  const [visibleSlide, setVisibleSlide] = useState(props.start + 1);

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
    setAllowHint(false);

    dispatch(markWordAsSeen(wordId));
  };

  const handleBeforeSnap = (slidingTo) => {
    if (slidingTo >= activeSlide) {
      setAllowScroll(false);
      if (hintsAvailable) {
        setAllowHint(true);
      }
      setActiveSlide((prevValue) => prevValue + 1);
    }
  };

  const handleAfterSnap = (slidingTo) => {
    setVisibleSlide((prevValue) => {
      return slidingTo >= prevValue ? ++prevValue : --prevValue;
    });
  };

  const handleGoNext = () => {
    carouselRef.current?.snapToNext();
  };

  const handlePressHint = () => {
    playSound({ uri: props.words[activeSlide - 1].soundUrl });
  };

  return (
    <AppCenteredView grow>
      <AppCenteredView style={styles.progressContainer}>
        <AppText
          style={styles.progress}
        >{`${visibleSlide} / ${props.words.length}`}</AppText>
      </AppCenteredView>
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
        scrollEnabled={false}
        onBeforeSnapToItem={handleBeforeSnap}
        onSnapToItem={handleAfterSnap}
      />

      <BottomContainer>
        <BottomContainerItem>
          {hintsAvailable && (
            <AppButton
              variant="small"
              onPress={handlePressHint}
              disabled={!allowHint}
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
            {props.words[visibleSlide - 1].translation}
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
    </AppCenteredView>
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
    fontSize: 16,
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
