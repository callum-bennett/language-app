import React from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import AppText from "../../AppText";
import { useDispatch } from "react-redux";
import { setActiveAnswer } from "../../../store/actions/crossword";

const Cell = ({ active, cellDimension, empty, number, value, answers }) => {
  const dispatch = useDispatch();

  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const handleTouch = () => {
    if (!empty) {
      // @ todo check if multiple answers
      const answerText = answers[0];
      dispatch(setActiveAnswer(answerText));
    }
  };

  let style = styles.cell;
  if (empty) {
    style = { ...style, ...styles.empty };
  } else {
    style = { ...style, ...styles.letterCell };
  }
  if (active) {
    style = { ...style, ...styles.activeCell };
  }

  return (
    <Touchable onPress={() => handleTouch()}>
      <View style={{ ...style, width: cellDimension, height: cellDimension }}>
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
    backgroundColor: "#FFF",
    borderColor: "#333",
  },
  activeCell: {
    backgroundColor: "#fff784",
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

export default React.memo((props) => <Cell {...props} />);
