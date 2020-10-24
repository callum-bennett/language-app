import React, { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "./AppText";

const AppTextInput = (props) => {
  const inputRef = useRef(null);

  const handleTouch = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        {props.label && <AppText style={styles.label}>{props.label}</AppText>}
        <View style={styles.inputWrapper}>
          <TextInput
            {...props}
            style={[styles.textInput, props.style]}
            ref={inputRef}
          />
          {props.icon && <View style={styles.icon}>{props.icon}</View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
  },
  inputWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
  },
  label: {
    fontSize: 12,
  },
  icon: {
    alignSelf: "flex-start",
  },
  textInput: {
    fontFamily: "roboto",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
    flexGrow: 1,
    fontSize: 16,
    height: 30,
  },
});

export default AppTextInput;
