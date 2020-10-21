import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AppText from "./AppText";

const AppTextInput = (props) => {
  return (
    <View style={styles.container}>
      {props.label && <AppText style={styles.label}>{props.label}</AppText>}
      <TextInput {...props} style={[styles.textInput, props.style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
  },
  textInput: {
    fontFamily: "roboto",
    paddingVertical: 5,
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
    flexGrow: 1,
  },
});

export default AppTextInput;
