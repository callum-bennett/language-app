import React from "react";
import { StyleSheet, View } from "react-native";

const AppListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    marginVertical: 5,
    padding: 5,
  },
  content: {},
});

export default AppListItem;
