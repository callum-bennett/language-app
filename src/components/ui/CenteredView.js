import React from "react";
import { StyleSheet, View } from "react-native";

function CenteredView(props) {
  const style = [styles.view];
  if (props.grow) {
    style.push(styles.grow);
  }
  style.push(props.style);

  return <View style={style}>{props.children}</View>;
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grow: {
    flex: 1,
  },
});

export default CenteredView;
