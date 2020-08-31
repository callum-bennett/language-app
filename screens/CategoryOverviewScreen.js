import React from "react";
import { StyleSheet, Text, View } from "react-native";
import categories from "../data/categories";

const CategoryOverviewScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const category = categories.find((cat) => cat.id === categoryId);

  return (
    <View style={styles.screen}>
      <Text>{category.name}</Text>
      {/*<Text>Total words</Text>*/}
      {/*<Text>Completion</Text>*/}
      {/*<Text>Practice</Text>*/}
      {/*<Text>Last par</Text>*/}
      {/*<Text>View word list</Text>*/}
    </View>
  );
};

CategoryOverviewScreen.navigationOptions = (navData) => {
  const categoryId = navData.navigation.getParam("categoryId");
  const category = categories.find((cat) => cat.id === categoryId);

  return {
    headerTitle: category.name,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryOverviewScreen;
