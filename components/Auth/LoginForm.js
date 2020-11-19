import React, { useEffect, useRef, useState, useReducer } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import FormControl from "./FormControl";
import AppTextInput from "./AppTextInput";
import * as Colors from "../constants/Colors";
import LoginForm from "./Auth/LoginForm";
import SignUpForm from "./Auth/SignUpForm";
import UsernameOrEmailField from "./UsernameOrEmailField";
import PasswordField from "./PasswordField";

const INPUT_CHANGE = "input_change";
const SWITCH_FORM = "switch_form";
const SET_DIRTY = "set_dirty";

const initialState = {
  fields: {
    usernameoremail: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    confirmPassword: {
      value: "",
      valid: false,
    },
  },
  valid: false,
  dirty: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SWITCH_FORM: {
      let newState = { ...initialState };
      if (action.isSignIn) {
        newState.fields.confirmPassword.valid = true;
      }
      return newState;
    }

    case INPUT_CHANGE: {
      let newState = { ...state };
      newState.fields[action.id] = {
        value: action.value,
        valid: action.valid,
      };

      newState.valid = Object.values(newState.fields).every(
        (field) => field.valid
      );
      return newState;
    }

    case SET_DIRTY: {
      return {
        ...state,
        dirty: true,
      };
    }

    default:
      return state;
  }
};

const AuthForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: SWITCH_FORM, isSignIn: props.isSignIn });
  }, [props.isSignIn]);

  const handleChange = (id, value, valid) => {
    dispatch({
      type: INPUT_CHANGE,
      id,
      value,
      valid,
    });
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!state.valid) {
      dispatch({ type: SET_DIRTY });
    } else {
      const { email, password } = state.fields;
      props.onSubmit(email.value, password.value);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.form]}
    >
      <View>
        <FormControl>
          <UsernameOrEmailField />
        </FormControl>
        <FormControl>
          <PasswordField />
        </FormControl>
      </View>

      <FormControl>
        {!props.loading ? (
          <AppButton onPress={handleSubmit}>Log in</AppButton>
        ) : (
          <ActivityIndicator style={{ height: 36 }} color={Colors.accent} />
        )}
      </FormControl>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: "90%",
    maxWidth: 400,
  },
  passwordIcon: {
    marginLeft: 10,
  },
});

export default AuthForm;
