import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import * as Colors from "@constants/Colors";
import { UIText } from "@components";

type Props = {
  disabled: boolean;
  onPress: (e: Event) => any;
  style: Style;
  variant: "small";
  children: any;
};

const UIButton = (props: Props) => {
  const Touchable: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const handleOnPress = (e: Event) => {
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

type Style = {
  button: any;
  buttonSmall: any;
  text: any;
  textSmall: any;
  disabled: any;
};

const styles = StyleSheet.create<Style>({
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
