import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppText>This is the home screen</AppText>
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

export default HomeScreen;
