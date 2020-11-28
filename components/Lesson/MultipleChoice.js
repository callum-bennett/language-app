import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MultipleChoiceOption from "./MultipleChoiceOption";
import BottomContainer from "./BottomContainer";
import AppText from "../UI/AppText";
import {
  FEEDBACK_NEGATIVE,
  FEEDBACK_POSITIVE,
  playSound,
} from "../../utils/sounds";
import AppButton from "../UI/AppButton";

const MultipleChoice = (props) => {
  const [canProgress, setCanProgress] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [data, setData] = useState([]);

  const optionCount = 6;

  useEffect(() => {
    const options = Object.values(props.words)
      .map((a) => [a, Math.random()])
      .sort((a, b) => a[1] - b[1])
      .map((a) => a[0])
      .slice(0, optionCount);

    if (!options.includes(props.word)) {
      const insertPos = Math.floor(Math.random() * Math.floor(optionCount));
      options.splice(insertPos, 1, props.word);
    }

    setData([
      [...options.slice(0, 2)],
      [...options.slice(2, 4)],
      [...options.slice(4, 6)],
    ]);
  }, []);

  const handleChoose = (isCorrect) => {
    if (!answerSubmitted) {
      props.onSubmitAnswer(props.word.id, isCorrect);
      setAnswerSubmitted(true);
    }
    if (isCorrect) {
      playSound(FEEDBACK_POSITIVE);
      setCanProgress(true);
      props.onWordComplete(props.word.id);
    } else {
      playSound(FEEDBACK_NEGATIVE);
    }
  };

  const handleOnPress = () => {
    props.goNext();
    setAnswerSubmitted(false);
  };

  return (
    <>
      <View style={styles.optionContainer}>
        {data.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((wordOption) => (
              <View key={wordOption.id} style={styles.rowItem}>
                <MultipleChoiceOption
                  key={wordOption.id}
                  value={wordOption.name}
                  image={wordOption.imageUrl}
                  isCorrect={wordOption.id === props.word.id}
                  onChoose={handleChoose}
                  locked={canProgress}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
      <BottomContainer>
        <AppButton variant="small">Hint</AppButton>
        <AppText
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {props.word.translation}
        </AppText>
        <AppButton
          variant="small"
          disabled={!canProgress}
          onPress={handleOnPress}
        >
          Next
        </AppButton>
      </BottomContainer>
    </>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  rowItem: {
    padding: 5,
    flex: 1,
  },
});

export default MultipleChoice;
