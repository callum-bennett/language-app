import React from "react";
import { StyleSheet, View } from "react-native";

const CenteredView = (props) => {
  return <View style={[styles.view, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CenteredView;
