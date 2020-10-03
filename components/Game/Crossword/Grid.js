import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import Cell from "./Cell";
import { drawCrossword } from "../../../utils/crosswordGenerator";
import { people1 as crosswordConfig } from "../../../data/crosswords";

const cellDimension = 35;

const Grid = () => {
  const activeCell = useSelector(({ crossword }) => crossword.activeCell);
  const grid = drawCrossword(crosswordConfig);
  const gridWidth = grid[0].length * cellDimension;

  const isActiveCell = (row, col) => {
    return activeCell && activeCell.y === row && activeCell.x === col;
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
