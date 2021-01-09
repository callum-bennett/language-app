import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import Cell from "./Cell";

const Grid = (props) => {
  const [activeCell, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.activeCell,
    crossword.activeAnswerText,
  ]);
  const gridWidth = props.grid[0].length * props.cellDimension;

  const isActiveCell = (row, col) => {
    return activeCell && activeCell.y === row && activeCell.x === col;
  };

  return (
    <View style={{ ...styles.grid, width: gridWidth }}>
      {props.grid.map((row, i) => {
        return row.map((cellData, j) => {
          return (
            <Cell
              active={isActiveCell(i + 1, j + 1)}
              inActiveAnswer={cellData?.answers.has(activeAnswerText)}
              empty={!cellData}
              answers={cellData?.answers ?? null}
              answered={cellData?.answered ?? null}
              locked={cellData?.locked ?? false}
              value={cellData?.value ?? null}
              number={cellData?.number ?? null}
              cellDimension={props.cellDimension}
              key={`${i}-${j}`}
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
