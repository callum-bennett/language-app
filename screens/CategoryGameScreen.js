import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CategoryGameScreen = (props) => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <View style={styles.screen}>
      <Text>Category Game Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryGameScreen;
