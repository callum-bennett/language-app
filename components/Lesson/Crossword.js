import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { generateCrossword } from "../../utils/crosswordGenerator";

const Crossword = (props) => {
  const [crossword, setCrossword] = useState(null);

  useEffect(() => {
    const data = generateCrossword(props.words);
    if (data) {
      setCrossword(data);
    } else {
      //@todo navigate away
    }
  }, [0]);

  const CrosswordCell = ({ cellData, cellDimension, k }) => {
    const widthHeight = {
      width: cellDimension,
      height: 26, // @todo unfix this height
    };
    const extraStyle = cellData === null ? styles.cellEmpty : styles.cellWord;
    return <View style={{ ...widthHeight, ...extraStyle }} key={k} />;
  };

  const CrosswordGrid = () => {
    const cellDimension = Math.floor(100 / crossword[0].length) + "%";

    return (
      <View style={styles.crosswordGrid}>
        {crossword.map((row, i) => {
          return row.map((cellData, j) => (
            <CrosswordCell
              cellData={cellData}
              cellDimension={cellDimension}
              k={`${i}${j}`}
            />
          ));
        })}
      </View>
    );
  };

  return <View>{crossword ? <CrosswordGrid /> : <Text>Loading</Text>}</View>;
};

const styles = StyleSheet.create({
  crosswordGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
  },
  cellEmpty: {
    backgroundColor: "#333",
    borderStyle: "solid",
    borderColor: "#FFF",
    borderWidth: 1,
  },
  cellWord: {
    backgroundColor: "#FFF",
  },
});

export default Crossword;
