import React from "react";
import { StyleSheet, View } from "react-native";
import * as Colors from "../../constants/Colors";

const BottomContainer = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDD",
    borderTopWidth: 2,
    borderTopColor: Colors.accent,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: 50,
    bottom: 0,
    width: "100%",
  },
});

export default BottomContainer;
