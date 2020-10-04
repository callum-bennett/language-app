import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { selectCategoryById } from "../store/selectors/category";
import { fetchWords } from "../store/actions/words";
import { selectWordsByCategoryId } from "../store/selectors/word";
import AppButton from "../components/AppButton";
import { AppLoading } from "expo";

import AppProgressDonut from "../components/AppProgressDonut";
import CategoryImageWithTitle from "../components/CategoryImageWithTItle";
import AppText from "../components/AppText";

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

  let lessonParts;
  if (words.length) {
    const wordCount = words.length;
    const wordsPerLesson = 10;
    lessonParts = Array.from(
      {
        length: Math.ceil(wordCount / wordsPerLesson),
      },
      (val, i) => {
        return words.slice(
          i * wordsPerLesson,
          i * wordsPerLesson + wordsPerLesson
        );
      }
    );
  }

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
    <View style={styles.screen}>
      <View style={styles.progressContainer}>
        <AppProgressDonut progress={20} />
      </View>
      <View style={styles.imageContainer}>
        <CategoryImageWithTitle category={category} />
      </View>
      <AppText>Total words: {words.length}</AppText>
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
  screen: {
    position: "relative",
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  progressContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },
});

export default CategoryOverviewScreen;
