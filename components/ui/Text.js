import React from "react";
import { StyleSheet, Text } from "react-native";

const UIText = (props) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};
UIText.defaultProps = {
  allowFontScaling: false,
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto",
  },
});

export default UIText;
