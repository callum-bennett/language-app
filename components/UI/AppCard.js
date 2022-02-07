import React from "react";
import { StyleSheet, View } from "react-native";
import * as Colors from "@constants/Colors";
const AppCard = (props) => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderColor: Colors.light,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 3,
  },
});

export default AppCard;
