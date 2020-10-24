import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import * as Colors from "../constants/Colors";

const AppButton = (props) => {
  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Touchable
      hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
      onPress={props.onPress}
    >
      <View style={[styles.button, props.style.button]}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </Touchable>
  );
};

AppButton.defaultProps = {
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
  text: {
    color: "#FFF",
    fontFamily: "roboto",
    fontSize: 18,
  },
});

export default AppButton;
