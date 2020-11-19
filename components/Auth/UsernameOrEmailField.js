import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../AppTextInput";

const UsernameOrEmail = (props) => {
  return (
    <AppTextInput
      key="usernameoremail"
      id="usernameoremail"
      label="Username or email"
      autoCapitalize="none"
      required
      maxLength={50}
      value={state.fields.email.value}
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

export default UsernameOrEmail;
