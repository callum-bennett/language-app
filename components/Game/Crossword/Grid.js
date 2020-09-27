import React from "react";
import { StyleSheet, View } from "react-native";
import Cell from "./Cell";
import { useDispatch, useSelector } from "react-redux";

import {
  checkAnswerStatus,
  unsetActiveAnswer,
} from "../../../store/actions/crossword";
import { drawCrossword } from "../../../utils/crosswordGenerator";
import { people1 as crosswordConfig } from "../../../data/crosswords";

const cellDimension = 35;

const Grid = (props) => {
  const dispatch = useDispatch();
  const [answers, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.answers,
    crossword.activeAnswer,
  ]);

  const grid = drawCrossword(crosswordConfig);
  const gridWidth = grid[0].length * cellDimension;

  let activeCell = null;
  if (activeAnswerText) {
    const answer = answers[activeAnswerText];
    const pos = answer.progress.findIndex((char) => !char);

    if (pos > -1) {
      activeCell = answer.cells[pos];
    } else {
      dispatch(unsetActiveAnswer());
      dispatch(checkAnswerStatus(activeAnswerText));
    }
  }

  const isActiveCell = (row, col) => {
    return activeCell && activeCell.y == row && activeCell.x == col;
  };

  return (
    <View style={{ ...styles.grid, width: gridWidth }}>
      {grid.map((row, i) => {
        return row.map((cellData, j) => {
          return (
            <Cell
              active={isActiveCell(i + 1, j + 1)}
              cellData={cellData}
              cellDimension={cellDimension}
              key={`${i}-${j}`}
              row={i}
              col={j}
            />
          );
        });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});

export default Grid;
