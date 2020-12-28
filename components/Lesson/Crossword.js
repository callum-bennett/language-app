import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";

import Grid from "./Crossword/Grid";
import Clues from "./Crossword/Clues";
import {
  clearActiveAnswer,
  startCrossword,
  updateAnswer,
  markAnswerCorrect,
  insertAnswer,
} from "../../store/actions/crossword";
import AppButton from "../UI/AppButton";
import { selectCompleteCount } from "../../store/selectors/crossword";
import { arrayToObjectByKey } from "../../util";
import AppText from "../UI/AppText";
import * as Animatable from "react-native-animatable";
import { playSound } from "../../utils/sounds";
import { FEEDBACK_NEGATIVE, FEEDBACK_POSITIVE } from "../../utils/sounds";
import BottomContainer from "./BottomContainer";

const Crossword = (props) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const answerInputRef = useRef(null);
  const animationRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [inputLength, setInputLength] = useState(0);
  const cellDimension = props.config.width >= 10 ? 30 : 35;

  let gridOffsetY = 0;

  const [crossword, completedCount] = useSelector((state) => [
    state.crossword,
    selectCompleteCount(state.crossword),
  ]);

  const { activeAnswerText, answers, grid, initialized } = crossword;
  const activeAnswer = answers[activeAnswerText];
  const wordsById = arrayToObjectByKey(props.words);
  const wordsByText = arrayToObjectByKey(props.words, "name");

  useEffect(() => {
    dispatch(startCrossword(props.config));
    props.completedAnswers.forEach((wordId) => {
      dispatch(insertAnswer(wordsById[wordId].name));
    });
  }, [0]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", scrollToAnswer);
    return () => {
      Keyboard.removeListener("keyboardDidShow", scrollToAnswer);
    };
  });

  const scrollToAnswer = () => {
    if (activeAnswer) {
      const index = Math.floor(activeAnswer.cells.length / 2);
      const cellOffsetY = activeAnswer.cells[index].y * cellDimension;

      scrollViewRef.current.scrollTo({
        x: 0,
        y: gridOffsetY + 30 + cellOffsetY,
        animated: true,
      });
      answerInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (activeAnswer) {
      scrollToAnswer();
      const emptyCells = activeAnswer.cells.filter(
        ({ x, y }) => !grid[y - 1][x - 1].locked
      );
      setInputLength(emptyCells.length);
    } else {
      setInputValue("");
    }
  }, [activeAnswer]);

  const handleContinue = () => {
    props.onComplete();
  };

  const handleTouchAway = () => {
    Keyboard.dismiss();
    setInputValue("");
    dispatch(clearActiveAnswer());
  };

  const handleChange = (e) => {
    let value = e.nativeEvent.text.toLowerCase();
    if (!/^[a-zA-ZÁÉÍÑÓÚÜáéíñóúü]*$/.test(value)) {
      return;
    }

    setInputValue(value);
    dispatch(updateAnswer(value));
  };

  const handleConfirm = () => {
    const isCorrect = activeAnswer.currentGuess === activeAnswerText;
    if (isCorrect) {
      playSound(FEEDBACK_POSITIVE);
      dispatch(markAnswerCorrect(activeAnswerText));
    } else {
      animationRef.current?.shake();
      playSound(FEEDBACK_NEGATIVE);
    }
    props.onSubmitAnswer(wordsByText[activeAnswerText].id, isCorrect);
  };

  return initialized ? (
    <View>
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={handleTouchAway}>
          <View style={styles.container}>
            <Clues words={props.words} />
            <Animatable.View
              ref={animationRef}
              onLayout={(event) => {
                gridOffsetY = event.nativeEvent.layout.y;
              }}
            >
              <Grid grid={grid} cellDimension={cellDimension} />
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {activeAnswer ? (
        <BottomContainer
          items={[
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              blurOnSubmit={false}
              onChange={handleChange}
              ref={answerInputRef}
              style={styles.answerInput}
              maxLength={inputLength}
              value={inputValue}
              onSubmitEditing={handleConfirm}
            />,
            <AppText style={styles.clue}>
              {wordsByText[activeAnswerText].translation}
            </AppText>,
            <AppButton variant="small" onPress={handleConfirm}>
              Submit
            </AppButton>,
          ]}
        />
      ) : (
        <BottomContainer
          items={[
            <></>,
            <AppText>
              {`Completed: ${completedCount} / ${props.words.length}`}
            </AppText>,
            <View>
              {completedCount === props.words.length && (
                <AppButton variant="small" onPress={handleContinue}>
                  Continue
                </AppButton>
              )}
            </View>,
          ]}
        />
      )}
    </View>
  ) : (
    <AppText>Loading</AppText>
  );
};

const styles = StyleSheet.create({
  answerInput: {
    display: "none",
  },
  clue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 20,
  },
});

export default Crossword;
