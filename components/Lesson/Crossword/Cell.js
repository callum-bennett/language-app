import React, { memo } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppText from "@components/UI/AppText";
import { setActiveAnswer } from "@store/actions/crossword";

const Cell = ({
  active,
  cellDimension,
  empty,
  number,
  value,
  answers,
  answered,
  inActiveAnswer,
  locked,
}) => {
  const dispatch = useDispatch();
  const activeAnswerText = useSelector(
    (state) => state.crossword.activeAnswerText
  );

  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const handleTouch = () => {
    if (empty || answers.size === answered.size) {
      return;
    }

    for (let answer of answers) {
      if (!answered.has(answer) && activeAnswerText !== answer) {
        dispatch(setActiveAnswer(answer));
        break;
      }
    }
  };

  let cellStyle = [styles.cell];
  if (empty) {
    cellStyle.push(styles.empty);
  } else {
    cellStyle.push(styles.letterCell);
  }
  if (inActiveAnswer) {
    cellStyle.push(styles.inActiveAnswer);
  }
  if (active) {
    cellStyle.push(styles.activeCell);
  }
  if (locked) {
    cellStyle.push(styles.locked);
  }
  cellStyle.push({ width: cellDimension, height: cellDimension });

  return (
    <Touchable onPress={() => handleTouch()}>
      <View style={cellStyle}>
        <AppText style={styles.letter}>{value}</AppText>
        {number && (
          <View style={styles.origin}>
            <AppText style={styles.number}>{number}</AppText>
          </View>
        )}
      </View>
    </Touchable>
  );
};
const styles = StyleSheet.create({
  cell: {
    borderStyle: "solid",
    borderWidth: StyleSheet.hairlineWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  empty: {
    backgroundColor: "#333",
    borderColor: "#999",
  },
  letterCell: {
    backgroundColor: "#fff",
    borderColor: "#333",
  },
  activeCell: {
    backgroundColor: "#fff784",
  },
  inActiveAnswer: {
    backgroundColor: "#fffbca",
  },
  locked: {
    backgroundColor: "#f6fff1",
  },
  letter: {
    fontSize: 20,
  },
  origin: {
    position: "absolute",
    left: 2,
    top: 0,
  },
  number: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default memo((props) => <Cell {...props} />);
