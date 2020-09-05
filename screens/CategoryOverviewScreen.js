import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as Colors from "../constants/Colors";
import { selectCategoryById } from "../store/selectors/category";
import { fetchWords } from "../store/actions/words";
import { selectWordsByCategoryId } from "../store/selectors/word";

const CategoryOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const categoryId = props.navigation.getParam("categoryId");

  const category = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );
  const words = useSelector((state) =>
    selectWordsByCategoryId(state, categoryId)
  );

  useEffect(() => {
    dispatch(fetchWords());
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
      <Text>Total words: {words.length}</Text>
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
  const title = navData.navigation.getParam("title");

  return {
    headerTitle: title,
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
