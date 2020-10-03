import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AppText from "../../AppText";
import { useDispatch } from "react-redux";
import {
  enterCharacter,
  setActiveAnswer,
} from "../../../store/actions/crossword";

const Cell = ({ active, cellData, cellDimension, row, col }) => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);

  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const handleTouch = (row, col) => {
    if (cellData !== null) {
      // @ todo check if multiple answers
      const answerText = cellData.answers[0];
      dispatch(setActiveAnswer(answerText, col, row));
    }
  };

  const handleChange = (e) => {
    dispatch(enterCharacter(e.nativeEvent.text, col, row));
    setValue(e.nativeEvent.text);
  };

  let style = styles.cell;
  if (cellData === null) {
    style = { ...style, ...styles.empty };
  } else {
    style = { ...style, ...styles.letterCell };
  }
  if (active) {
    style = { ...style, ...styles.activeCell };
  }

  return (
    <Touchable onPress={() => handleTouch(row, col)}>
      <View style={{ ...style, width: cellDimension, height: cellDimension }}>
        {active ? (
          <TextInput
            style={styles.input}
            ref={inputRef}
            maxLength={1}
            onChange={handleChange}
            autoCapitalize="none"
            placeholder={value}
            placeholderTextColor="#888"
          />
        ) : (
          <AppText style={styles.letter}>{value}</AppText>
        )}
        {cellData && cellData.number && (
          <View style={styles.origin}>
            <AppText style={styles.number}>{cellData.number}</AppText>
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
  input: {
    fontFamily: "roboto",
    fontSize: 20,
    textTransform: "lowercase",
    textAlign: "center",
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

export default Cell;
