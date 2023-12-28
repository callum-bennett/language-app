import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import * as Colors from "@constants/Colors";
import UIText from "@components/UI/UIText";

const UIButton = (props) => {
  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const handleOnPress = (e) => {
    if (!props.disabled) {
      props.onPress(e);
    }
  };

  let buttonStyle = [styles.button];
  let textStyle = [styles.text];

  if (props.variant === "small") {
    buttonStyle.push(styles.buttonSmall);
    textStyle.push(styles.textSmall);
  }

  buttonStyle.push(props.style.button);

  if (props.disabled) {
    buttonStyle.push(styles.disabled);
  }

  return (
    <Touchable
      hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
      onPress={handleOnPress}
    >
      <View style={buttonStyle}>
        <UIText style={textStyle}>{props.children}</UIText>
      </View>
    </Touchable>
  );
};

UIButton.defaultProps = {
  variant: "medium",
  style: {
    button: {},
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 4,
    minHeight: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    paddingHorizontal: 12,
    minHeight: 26,
  },
  text: {
    color: "#FFF",
    fontFamily: "roboto",
    fontSize: 18,
  },
  textSmall: {
    fontSize: 14,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: Colors.light,
  },
});

export default UIButton;
