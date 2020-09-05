import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import * as Colors from "../constants/Colors";
import apiClient from "../api/client";

const CategoryOverviewScreen = (props) => {
  const [words, setWords] = useState([]);

  const categoryId = props.navigation.getParam("categoryId");
  const categories = props.navigation.getParam("categories");
  const category = categories.find((cat) => cat.id === categoryId);

  useEffect(() => {
    (async () => {
      const res = await apiClient.get(`/category/${categoryId}/words/`);
      if (res.data) {
        const wordData = JSON.parse(res.data);
        setWords(wordData);
      }
    })();
  }, []);

  const handlePressLearn = () => {
    props.navigation.navigate({
      routeName: "CategoryLesson",
      params: {
        categoryId: categoryId,
      },
    });
  };

  const handlePressPlay = () => {
    props.navigation.navigate({
      routeName: "CategoryGame",
      params: {
        categoryId: categoryId,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <Image source={category.imageUrl} style={styles.headerBg} />
      <Text>{category.name}</Text>
      {/*<Text>Total words</Text>*/}
      {/*<Text>Completion</Text>*/}
      {/*<Text>Practice</Text>*/}
      {/*<Text>Last par</Text>*/}
      {/*<Text>View word list</Text>*/}

      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          onPress={handlePressLearn}
          title="Learn"
        />

        <Button color={Colors.accent} onPress={handlePressPlay} title="Play" />
      </View>
    </View>
  );
};

CategoryOverviewScreen.navigationOptions = (navData) => {
  const categoryId = navData.navigation.getParam("categoryId");
  const categories = navData.navigation.getParam("categories");
  const category = categories.find((cat) => cat.id === categoryId);

  return {
    headerTitle: category.name,
  };
};

const styles = StyleSheet.create({
  headerBg: {
    height: 200,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
});

export default CategoryOverviewScreen;
