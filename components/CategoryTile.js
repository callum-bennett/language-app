import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CategoryImageWithTitle from "./CategoryImageWithTItle";

const CategoryTile = (props) => {
  return (
    <View style={styles.tile}>
      <TouchableOpacity
        onPress={props.onSelectCategory}
        style={{ height: "100%" }}
      >
        <CategoryImageWithTitle category={props.category} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
});

export default CategoryTile;
