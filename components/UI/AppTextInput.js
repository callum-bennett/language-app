import React, { useEffect, useReducer } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AppText from "./AppText";
import * as Colors from "../../constants/Colors";

const SET_FOCUSSED = "set_focussed";
const SET_TOUCHED = "set_touched";
const SET_UNTOUCHED = "set_untouched";
const VALUE_CHANGE = "value_change";

const reducer = (state, action) => {
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

const AppTextInput = React.forwardRef((props, inputRef) => {
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

  const validateInput = (value) => {
    let error;

    if (props.required && value.trim().length === 0) {
      error = `${props.label} is required`;
    } else if (props.regex && !props.regex.test(value)) {
      error = `${props.label} is not valid`;
    } else if (props.equalTo && value !== props.equalTo.value) {
      error = props.equalTo.message;
    }

    return error;
  };

  const handleFocus = () => {
    dispatch({ type: SET_FOCUSSED });
  };

  const handleEndEditing = (e) => {
    const value = e.nativeEvent.text;
    const error = validateInput(value);
    dispatch({ type: SET_TOUCHED, error });
  };

  const handleChange = (e) => {
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
      {props.label && <AppText style={styles.label}>{props.label}</AppText>}
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
          <AppText style={styles.error}>{error}</AppText>
        </View>
      )}
    </View>
  );
});

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
  error: {
    color: Colors.error,
    fontWeight: "bold",
  },
  inputError: {
    borderBottomColor: Colors.error,
  },
});

export default AppTextInput;
