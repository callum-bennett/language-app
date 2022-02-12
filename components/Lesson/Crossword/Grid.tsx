import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Cell from "./Cell";
import { setActiveAnswer } from "@store/actions";

const Grid = (props) => {
  const dispatch = useDispatch();
  const [activeCell, activeAnswerText] = useSelector(({ crossword }) => [
    crossword.activeCell,
    crossword.activeAnswerText,
  ]);
  const gridWidth = props.grid[0].length * props.cellDimension;

  const handleTouch = (i, j) => {
    const { answers, answered, empty } = props.grid[i][j];
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

  const isActiveCell = (row, col) =>
    activeCell !== null && activeCell.y === row && activeCell.x === col;

  return (
    <View style={{ ...styles.grid, width: gridWidth }}>
      {props.grid.map((row, i) => {
        return row.map((cellData, j) => {
          const active = isActiveCell(i + 1, j + 1);

          return (
            <Cell
              active={active}
              inActiveAnswer={cellData?.answers.has(activeAnswerText)}
              onTouch={useCallback(handleTouch, [])}
              empty={!cellData}
              locked={cellData?.locked ?? false}
              value={cellData?.value ?? null}
              number={cellData?.number ?? null}
              cellDimension={props.cellDimension}
              key={`${i}-${j}`}
              i={i}
              j={j}
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
