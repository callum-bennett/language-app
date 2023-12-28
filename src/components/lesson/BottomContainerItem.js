import React from "react";
import { StyleSheet, View } from "react-native";

function BottomContainerItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    alignSelf: "center",
  },
});

export default BottomContainerItem;
