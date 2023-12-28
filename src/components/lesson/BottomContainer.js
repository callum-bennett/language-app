import React from "react";
import { StyleSheet, View } from "react-native";

import * as Colors from "@constants/Colors";
import BottomContainerItem from "./BottomContainerItem";

function BottomContainer(props) {
  let content;
  if (props.items) {
    content = props.items.map((item, i) => (
      <BottomContainerItem key={i}>{item}</BottomContainerItem>
    ));
  } else {
    content = props.children;
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDD",
    borderTopWidth: 2,
    borderTopColor: Colors.accent,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: 50,
    bottom: 0,
    width: "100%",
  },
});

export default BottomContainer;
