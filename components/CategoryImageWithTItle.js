import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AppText from "./UI/AppText";

const CategoryImageWithTitle = (props) => {
  return (
    <View style={{ height: "100%" }}>
      {props.category && (
        <ImageBackground
          source={{ uri: props.category.imageUrl }}
          style={styles.image}
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {props.category.name}
            </AppText>
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
