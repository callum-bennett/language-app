import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../AppTextInput";
import FormControl from "../FormControl";

const UsernameField = (props) => {
  return (
    <AppTextInput
      key="username"
      id="username"
      label="Username"
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

export default UsernameField;
