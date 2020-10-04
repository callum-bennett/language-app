import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { selectCategoryById } from "../store/selectors/category";
import { fetchWords } from "../store/actions/words";
import { selectWordsByCategoryId } from "../store/selectors/word";
import AppButton from "../components/AppButton";
import { AppLoading } from "expo";

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
        title: `${category.name} / Learn`,
      },
    });
  };

  return category ? (
    <View>
      <Image source={{ uri: category.imageUrl }} style={styles.headerBg} />
      <Text>{category.name}</Text>
      <Text>Total words: {words.length}</Text>
      {/*<Text>Completion</Text>*/}
      {/*<Text>Practice</Text>*/}
      {/*<Text>Last par</Text>*/}
      {/*<Text>View word list</Text>*/}

      {words.length > 0 && (
        <View style={styles.buttonContainer}>
          <AppButton onPress={handlePressLearn}>Learn</AppButton>
        </View>
      )}
    </View>
  ) : (
    <AppLoading />
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
