import React from "react";
import { StyleSheet, TextInput } from "react-native";

const AppTextInput = (props) => {
  return (
    <TextInput {...props} style={{ ...styles.textInput, ...props.style }} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "roboto",
  },
});

export default AppTextInput;
