import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../AppTextInput";

const EmailField = (props) => {
  return (
    <AppTextInput
      key="email"
      id="email"
      label="Email"
      autoCapitalize="none"
      required
      regex={
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      }
      maxLength={50}
      value={state.fields.email.value}
      keyboardType="email-address"
      onChange={handleChange}
      blurOnSubmit={false}
      returnKeyType={"next"}
      onSubmitEditing={() => {
        passwordInputRef.current?.focus();
      }}
      changed={props.isSignIn}
      validate={state.dirty}
    />
  );
};

const styles = StyleSheet.create({});

export default EmailField;
