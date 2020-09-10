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
    <View>
      <Touchable
        hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        onPress={props.onPress}
      >
        <View style={styles.button}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 4,
    flex: 1,
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
