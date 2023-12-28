import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "@components/ui/Text";
import { setActiveAnswer } from "@store/actions/crossword";
import { ANSWER_CORRECT } from "@store/reducers/crosswordReducer";
import { arrayToObjectByKey } from "@utils";
import { DIR_HORIZONTAL } from "@utils/crosswordGenerator";

function Clues(props) {
  const dispatch = useDispatch();
  const [answers, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.answers,
    crossword.activeAnswerText,
  ]);

  const wordsByText = arrayToObjectByKey(props.words, "name");

  const sortedAnswers = Object.values(answers).sort((a, b) => {
    if (a.originY < b.originY) {
      return -1;
    }
    if (a.originY > b.originY) {
      return 1;
    }
    return a.originX > b.originX;
  });

  const handleTouch = (answer) => {
    dispatch(setActiveAnswer(answer.text));
  };

  const instructions = {
    across: [],
    down: [],
  };

  let i = 1;
  for (const answer of sortedAnswers) {
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
        <Text style={textStyle}>
          {answer.number}.{wordsByText[answer.text].translation}
        </Text>
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
        <Text key="across" style={styles.heading}>
          Across
        </Text>
        {instructions.across.map((item) => item)}
      </View>

      <View>
        <Text key="down" style={styles.heading}>
          Down
        </Text>
        {instructions.down.map((item) => item)}
      </View>
    </View>
  );
}

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
