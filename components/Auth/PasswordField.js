import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import AppTextInput from "../AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const ShowHideToggle = () => (
    <TouchableWithoutFeedback
      onPress={() => setShowPassword(!showPassword)}
      hitSlop={{ top: 30, right: 40, bottom: 20, left: 40 }}
    >
      <View style={styles.passwordIcon}>
        <MaterialCommunityIcons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color="#666"
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <AppTextInput
      key="password"
      id="password"
      label="Password"
      ref={passwordInputRef}
      autoCapitalize="none"
      required
      maxLength={50}
      returnKeyType={props.isSignIn ? "done" : "next"}
      secureTextEntry={!showPassword}
      value={state.fields.password.value}
      onChange={handleChange}
      blurOnSubmit={props.isSignIn}
      onSubmitEditing={() => {
        confirmPasswordInputRef.current?.focus();
      }}
      changed={props.isSignIn}
      validate={state.dirty}
      icon={<ShowHideToggle />}
    />
  );
};

const styles = StyleSheet.create({});

export default PasswordField;
