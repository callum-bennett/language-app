import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";

import { people1 as crosswordConfig } from "../../data/crosswords";
import Grid from "../Game/Crossword/Grid";
import Clues from "../Game/Crossword/Clues";
import {
  clearActiveAnswer,
  startCrossword,
  showAnswers,
  checkAnswers,
  enterCharacter,
  markAnswerCorrect,
  setActiveCell,
} from "../../store/actions/crossword";
import AppButton from "../AppButton";
import { selectAllAnswersAttempted } from "../../store/selectors/crossword";
import { submitAttempt } from "../../store/actions/words";
import { arrayToObjectByKey } from "../../util";
import AppText from "../AppText";
import * as Animatable from "react-native-animatable";
import * as Colors from "../../constants/Colors";
import { playSound } from "../../utils/sounds";
import { FEEDBACK_NEGATIVE, FEEDBACK_POSITIVE } from "../../utils/sounds";

const Crossword = (props) => {
  const dispatch = useDispatch();
  const AnimationRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [allowChange, setAllowChange] = useState(true);
  const [inputValue, setInputValue] = useState([]);
  const [inputPlaceholders, setInputPlaceholders] = useState([]);
  const [focusedCell, setFocusedCell] = useState(null);
  const [solutionShown, setSolutionShown] = useState(false);
  const inputRefs = useRef([]);
  const scrollViewRef = useRef(null);
  const cellDimension = 35;

  let gridOffsetY = 0;

  const [
    activeAnswerText,
    activeCell,
    answers,
    dirty,
    grid,
    initialized,
    allAnswersAttempted,
  ] = useSelector(({ crossword }) => [
    crossword.activeAnswerText,
    crossword.activeCell,
    crossword.answers,
    crossword.dirty,
    crossword.grid,
    crossword.initialized,
    selectAllAnswersAttempted(crossword),
  ]);

  const activeAnswer = answers[activeAnswerText];
  const wordsByText = arrayToObjectByKey(props.words, "name");

  useEffect(() => {
    dispatch(startCrossword(crosswordConfig));
  }, [0]);

  useEffect(() => {
    if (activeAnswer) {
      const currentValues = activeAnswer.cells.map(
        (cell) => grid[cell.y - 1][cell.x - 1].value
      );
      setInputValue([...currentValues]);
      inputRefs.current = inputRefs.current.slice(0, activeAnswer.text.length);
      inputRefs.current[0].focus();
    }
  }, [activeAnswer]);

  useEffect(() => {
    if (activeCell) {
      const cellOffsetY = activeCell.y * cellDimension;
      scrollViewRef.current.scrollTo({
        x: 0,
        y: gridOffsetY + 30 + cellOffsetY,
        animated: true,
      });
    }
  }, [activeCell]);

  const handleShowAnswers = () => {
    dispatch(showAnswers());
    setSolutionShown(true);
  };

  const handleContinue = () => {
    props.onComplete();
  };

  const handleTouchAway = () => {
    Keyboard.dismiss();
    setInputValue([]);
    dispatch(clearActiveAnswer());
  };

  const handleBlur = (i) => {
    // inputValue[i] = inputPlaceholders[i];
    // inputPlaceholders[i] = null;
    // setInputPlaceholders(inputPlaceholders);
    // setInputValue(inputValue);
    //   dispatch(enterCharacter(inputValue[i], i));
  };

  const handleFocus = (i) => {
    // if (inputValue[i]) {
    //   inputPlaceholders[i] = inputValue[i];
    //   inputValue[i] = null;
    //   setInputPlaceholders(inputPlaceholders);
    //   setInputValue(inputValue);
    // }

    setFocusedCell(i);
    dispatch(setActiveCell(activeAnswer.cells[i]));
  };

  const handleKeyPress = (key, pos) => {
    const prevPos = pos - 1;
    if (key === "Backspace") {
      if (pos > 0 && !inputValue[pos]) {
        inputRefs.current[prevPos].focus();
      }
    }
  };

  const handleReset = () => {
    dispatch(startCrossword(crosswordConfig));
  };

  const handleChange = (char, pos) => {
    dispatch(enterCharacter(char, pos));

    const nextPos = pos + 1;
    inputValue[pos] = char;
    setInputValue(inputValue);

    if (char) {
      if (inputRefs.current.length > nextPos) {
        inputRefs.current[nextPos].focus();
        inputRefs.current[pos].blur();
      }
    }
  };

  const handleConfirm = () => {
    const currentGuess = inputValue.join("");
    if (currentGuess === activeAnswerText) {
      playSound(FEEDBACK_POSITIVE);
      dispatch(markAnswerCorrect(activeAnswerText));
    } else {
      AnimationRef.current.shake();
      playSound(FEEDBACK_NEGATIVE);
    }
  };

  return initialized ? (
    <View>
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={handleTouchAway}>
          <View style={styles.container}>
            <Clues words={props.words} />
            <View
              onLayout={(event) => {
                gridOffsetY = event.nativeEvent.layout.y;
              }}
            >
              <Grid grid={grid} cellDimension={cellDimension} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {dirty && <AppButton onPress={handleReset}>Reset</AppButton>}
        {submitted && !solutionShown && (
          <AppButton onPress={handleShowAnswers}>Show solution</AppButton>
        )}
        {submitted && solutionShown && (
          <AppButton onPress={handleContinue}>Continue</AppButton>
        )}
      </View>
      {activeAnswer && (
        <View style={styles.answerContainer}>
          <AppText>{wordsByText[activeAnswerText].translation}: </AppText>
          <Animatable.View ref={AnimationRef} style={styles.inputs}>
            {activeAnswer.progress.map((char, i) => {
              let style = styles.cell;
              if (focusedCell === i) {
                style = { ...style, ...styles.focussed };
              }
              return (
                <View key={i} style={style}>
                  <TextInput
                    onBlur={() => handleBlur(i)}
                    onFocus={() => handleFocus(i)}
                    maxLength={1}
                    multiline={false}
                    ref={(el) => (inputRefs.current[i] = el)}
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                    placeholder={inputPlaceholders[i]}
                    caretHidden={true}
                    style={{
                      fontFamily: "roboto",
                      fontSize: 20,
                      textTransform: "lowercase",
                      textAlign: "center",
                    }}
                    value={inputValue[i]}
                    onChange={({ nativeEvent }) =>
                      handleChange(nativeEvent.text, i)
                    }
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent.key, i)
                    }
                  />
                </View>
              );
            })}
          </Animatable.View>

          <AppButton onPress={handleConfirm}>Confirm</AppButton>
        </View>
      )}
    </View>
  ) : (
    <AppText>Loading</AppText>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: "#DDD",
    borderTopWidth: 4,
    borderTopColor: Colors.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    height: 120,
    bottom: 0,
    width: "100%",
  },
  cell: {
    width: 35,
    height: 35,
    borderStyle: "solid",
    borderWidth: StyleSheet.hairlineWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "#FFF",
    borderColor: "#333",
    marginHorizontal: 2,
  },
  focussed: {
    borderWidth: 1,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  buttonContainer: {
    margin: 0,
    position: "absolute",
    height: 40,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Crossword;
