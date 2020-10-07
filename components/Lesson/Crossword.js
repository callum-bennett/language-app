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

import * as Colors from "../../constants/Colors";

const Crossword = (props) => {
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    // @todo check answers
    dispatch(checkAnswers());

    if (!submitted) {
      const wordsByText = arrayToObjectByKey(props.words, "name");
      Object.values(answers).forEach((answer) => {
        const status = answer.text === answer.progress.join("");
        // @todo this should be referenced by Id
        const word = wordsByText[answer.text];
        submitAttempt(word.id, status);
      });
      setSubmitted(true);
    }

    //@todo if all correct then show solution
  };

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
      dispatch(markAnswerCorrect(activeAnswerText));
    } else {
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

            {/*<View style={styles.buttonContainer}>*/}
            {/*  {!submitted && (*/}
            {/*    <AppButton onPress={handleSubmit}>Check answers</AppButton>*/}
            {/*  )}*/}
            {/*  {submitted && !solutionShown && (*/}
            {/*    <AppButton onPress={handleShowAnswers}>Show solution</AppButton>*/}
            {/*  )}*/}
            {/*  {submitted && solutionShown && (*/}
            {/*    <AppButton onPress={handleContinue}>Continue</AppButton>*/}
            {/*  )}*/}
            {/*</View>*/}

            {/*//@ todo add this to header*/}
            {/*{dirty && (*/}
            {/*  <View style={styles.buttonContainer}>*/}
            {/*    <AppButton onPress={handleReset}>Reset</AppButton>*/}
            {/*  </View>*/}
            {/*)}*/}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {activeAnswer && (
        <View style={styles.answerContainer}>
          <AppText>{wordsByText[activeAnswerText].translation}: </AppText>
          <View style={styles.inputs}>
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
          </View>

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
    margin: 20,
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Crossword;
