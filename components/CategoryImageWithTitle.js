import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import UIText from "./UI/UIText";

const CategoryImageWithTitle = (props) => {
  return (
    <View style={{ height: "100%" }}>
      {props.category && (
        <ImageBackground
          source={{ uri: props.category.imageUrl }}
          style={styles.image}
        >
          <View style={styles.titleContainer}>
            <UIText style={styles.title} numberOfLines={1}>
              {props.category.name}
            </UIText>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  image: {
    height: "100%",
    justifyContent: "flex-end",
  },
});

export default CategoryImageWithTitle;
