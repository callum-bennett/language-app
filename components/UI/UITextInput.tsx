import React, { forwardRef, ReactElement, useEffect, useReducer } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  View,
} from "react-native";
import { AnyAction } from "redux";

import { UIText } from "@components";
import * as Colors from "@constants/Colors";

const SET_FOCUSSED = "set_focussed";
const SET_TOUCHED = "set_touched";
const SET_UNTOUCHED = "set_untouched";
const VALUE_CHANGE = "value_change";

type State = {
  focused: boolean;
  error: string;
  touched: boolean;
  value: string;
};

type Props = {
  id: string;
  icon?: ReactElement;
  value?: string;
  onChange?: (id: string, value: any, valid: boolean) => any;
  changed: boolean;
  validate: boolean;
  required: any;
  label: string;
  regex: any;
  equalTo?: {
    value: string;
    message: string;
  };
  minLength?: number;
  style: Style;
};

const reducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case SET_FOCUSSED:
      return {
        ...state,
        focused: true,
      };
      break;

    case SET_TOUCHED:
      return {
        ...state,
        error: action.error,
        touched: true,
      };
    case SET_UNTOUCHED:
      return {
        ...state,
        error: action.error,
        touched: false,
        value: "",
      };
    case VALUE_CHANGE:
      return {
        ...state,
        error: action.error,
        value: action.value,
      };

    default:
      return state;
  }
};

const UITextInput = forwardRef((props: Props, inputRef) => {
  const [{ touched, error, value }, dispatch] = useReducer(reducer, {
    focused: false,
    touched: false,
    error: null,
    value: props.value ?? "",
  });

  useEffect(() => {
    if (props.onChange) {
      props.onChange(props.id, value, !error);
    }
  }, [props.changed, value]);

  useEffect(() => {
    const error = validateInput(value);
    if (props.validate) {
      dispatch({ type: SET_TOUCHED, error });
    } else {
      dispatch({ type: SET_UNTOUCHED, error });
    }
  }, [props.validate]);

  const validateInput = (value: any) => {
    let error;

    if (props.required && value.trim().length === 0) {
      error = `${props.label} is required`;
    } else if (props.regex && !props.regex.test(value)) {
      error = `${props.label} is not valid`;
    } else if (props.equalTo && value !== props.equalTo.value) {
      error = props.equalTo.message;
    } else if (props.minLength && value.trim().length < props.minLength) {
      error = `${props.label} must be at least ${props.minLength} characters`;
    }

    return error;
  };

  const handleFocus = () => {
    dispatch({ type: SET_FOCUSSED });
  };

  const handleEndEditing = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    const value = e.nativeEvent.text;
    const error = validateInput(value);
    dispatch({ type: SET_TOUCHED, error });
  };

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    const error = validateInput(value);
    dispatch({ type: VALUE_CHANGE, value, error });
  };

  let inputStyle = [styles.textInput, props.style];
  if (touched && error) {
    inputStyle.push(styles.inputError);
  }

  return (
    <View style={styles.container}>
      {props.label && <UIText style={styles.label}>{props.label}</UIText>}
      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          style={inputStyle}
          ref={inputRef}
          onEndEditing={handleEndEditing}
          onFocus={handleFocus}
          onChange={handleChange}
          value={value}
        />
        {props.icon && <View style={styles.icon}>{props.icon}</View>}
      </View>
      {touched && error && (
        <View>
          <UIText style={styles.error}>{error}</UIText>
        </View>
      )}
    </View>
  );
});

type Style = {
  container: any;
  inputWrapper: any;
  label: any;
  icon: any;
  textInput: any;
  error: any;
  inputError: any;
};

const styles = StyleSheet.create<Style>({
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
  error: {
    color: Colors.error,
    fontWeight: "bold",
    fontSize: 12,
  },
  inputError: {
    borderBottomColor: Colors.error,
  },
});

export default UITextInput;
