import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { DIR_HORIZONTAL } from "../../../utils/crosswordGenerator";
import { useDispatch, useSelector } from "react-redux";
import AppText from "../../AppText";
import { setActiveAnswer } from "../../../store/actions/crossword";
import { arrayToObjectByKey } from "../../../util";

const Clues = (props) => {
  const dispatch = useDispatch();
  const [answers, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.answers,
    crossword.activeAnswer,
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
    if (answer.status === "correct") {
      textStyle = { ...textStyle, ...styles.complete };
    } else if (answer.text === activeAnswerText) {
      textStyle = { ...textStyle, ...styles.active };
    }
    const instruction = (
      <TouchableHighlight key={answer.text} onPress={() => handleTouch(answer)}>
        <AppText style={textStyle}>
          {answer.number}. {wordsByText[answer.text].translation}
        </AppText>
      </TouchableHighlight>
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
        <AppText style={styles.heading}>Across</AppText>
        {instructions.across.map((item) => item)}
      </View>

      <View>
        <AppText style={styles.heading}>Down</AppText>
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
    marginBottom: 30,
    width: "100%",
  },
  clue: {
    marginVertical: 1,
    fontSize: 16,
  },
  active: {
    textDecorationLine: "underline",
  },
  complete: {
    textDecorationLine: "line-through",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Clues;
