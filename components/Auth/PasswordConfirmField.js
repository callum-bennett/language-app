import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import AppTextInput from "../AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordConfirmField = (props) => {
  return (
    <AppTextInput
      key="confirmPassword"
      id="confirmPassword"
      label="Confirm Password"
      ref={confirmPasswordInputRef}
      autoCapitalize="none"
      required
      maxLength={50}
      equalTo={{
        message: "Passwords don't match",
        value: state.fields.password.value,
      }}
      secureTextEntry={true}
      value={state.fields.confirmPassword.value}
      onChange={handleChange}
      changed={props.isSignIn}
      validate={state.dirty}
    />
  );
};

const styles = StyleSheet.create({});

export default PasswordConfirmField;
