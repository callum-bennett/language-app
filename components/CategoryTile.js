import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const CategoryTile = (props) => {
  return (
    <View style={styles.tile}>
      <TouchableOpacity
        onPress={props.onSelectCategory}
        style={{ height: "100%" }}
      >
        <View style={{ height: "100%" }}>
          <ImageBackground
            source={{ uri: props.category.imageUrl }}
            style={styles.image}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.category.name}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    justifyContent: "flex-end",
  },
  tile: {
    flex: 1,
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
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
});

export default CategoryTile;
