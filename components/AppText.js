import React from "react";
import { StyleSheet, Text } from "react-native";

const AppText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto",
  },
});

export default AppText;
