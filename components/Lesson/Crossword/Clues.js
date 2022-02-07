import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppText from "@components/UI/AppText";
import { setActiveAnswer } from "@store/actions/crossword";
import { ANSWER_CORRECT } from "@store/reducers/crosswordReducer";
import { arrayToObjectByKey } from "@utils";
import { DIR_HORIZONTAL } from "@utils/crosswordGenerator";

const Clues = (props) => {
  const dispatch = useDispatch();
  const [answers, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.answers,
    crossword.activeAnswerText,
  ]);

  const wordsByText = arrayToObjectByKey(props.words, "name");

  const sortedAnswers = Object.values(answers).sort((a, b) => {
    if (a.originY < b.originY) {
      return -1;
    } else if (a.originY > b.originY) {
      return 1;
    } else {
      return a.originX > b.originX;
    }
  });

  const handleTouch = (answer) => {
    dispatch(setActiveAnswer(answer.text));
  };

  let instructions = {
    across: [],
    down: [],
  };

  let i = 1;
  for (let answer of sortedAnswers) {
    let textStyle = styles.clue;
    if (answer.status === ANSWER_CORRECT) {
      textStyle = { ...textStyle, ...styles.guessed };
    } else if (answer.text === activeAnswerText) {
      textStyle = { ...textStyle, ...styles.active };
    }
    const instruction = (
      <TouchableOpacity
        activeOpacity={0.9}
        key={answer.text}
        onPress={() => handleTouch(answer)}
      >
        <AppText style={textStyle}>
          {answer.number}. {wordsByText[answer.text].translation}
        </AppText>
      </TouchableOpacity>
    );

    if (answer.direction === DIR_HORIZONTAL) {
      instructions.across.push(instruction);
    } else {
      instructions.down.push(instruction);
    }
    i++;
  }

  return (
    <View style={styles.instructions}>
      <View>
        <AppText key="across" style={styles.heading}>
          Across
        </AppText>
        {instructions.across.map((item) => item)}
      </View>

      <View>
        <AppText key="down" style={styles.heading}>
          Down
        </AppText>
        {instructions.down.map((item) => item)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instructions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    width: "100%",
  },
  clue: {
    marginVertical: 1,
    fontSize: 12,
  },
  active: {
    textDecorationLine: "underline",
  },
  guessed: {
    textDecorationLine: "line-through",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Clues;
