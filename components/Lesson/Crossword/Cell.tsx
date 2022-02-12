import React, { memo } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";

import { UIText } from "@components";

const Cell = (props) => {
  const {
    active,
    cellDimension,
    empty,
    number,
    value,
    inActiveAnswer,
    locked,
    i,
    j,
    onTouch,
  } = props;

  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

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
    <Touchable onPress={() => onTouch(i, j)}>
      <View style={cellStyle}>
        <UIText style={styles.letter}>{value}</UIText>
        {number && (
          <View style={styles.origin}>
            <UIText style={styles.number}>{number}</UIText>
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

export default memo(Cell);
