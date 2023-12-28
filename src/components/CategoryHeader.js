import React from "react";
import { StyleSheet, View } from "react-native";

import CategoryImageWithTitle from "@components/CategoryImageWithTitle";
import ProgressDonut from "@components/ui/ProgressDonut";

function CategoryHeader(props) {
  return (
    <View>
      <View style={styles.progressContainer}>
        <ProgressDonut progress={props.progress} />
      </View>
      <View style={styles.imageContainer}>
        <CategoryImageWithTitle category={props.category} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    width: "100%",
  },
  progressContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },
});

export default CategoryHeader;
