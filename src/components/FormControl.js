import React from "react";
import { StyleSheet, View } from "react-native";

const FormControl = (props) => {
  let style = [styles.container];
  if (props.noMargin) {
    style.push(styles.noMargin);
  }

  return <View style={style}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    minHeight: 30,
  },
  noMargin: {
    marginBottom: 0,
  },
});

export default FormControl;
