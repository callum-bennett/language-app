import React from "react";
import { StyleSheet, Text as RnText } from "react-native";

function Text(props) {
  return (
    <RnText {...props} style={[styles.text, props.style]}>
      {props.children}
    </RnText>
  );
}
Text.defaultProps = {
  allowFontScaling: false,
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto",
  },
});

export default Text;
