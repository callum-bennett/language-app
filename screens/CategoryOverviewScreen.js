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
import { fetchLessons } from "../store/actions/lessons";

const CategoryOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const categoryId = props.navigation.getParam("categoryId");

  const [category, words, lessons] = useSelector((state) => [
    selectCategoryById(state, categoryId),
    selectWordsByCategoryId(state, categoryId),
    state.lessons.byId,
  ]);

  useEffect(() => {
    dispatch(fetchWords());
    dispatch(fetchLessons());
  }, []);

  const handlePressLearn = (lesson) => {
    props.navigation.navigate({
      routeName: "CategoryLesson",
      params: {
        lessonId: lesson.id,
        title: `${category.name} / Lesson ${lesson.sequence + 1}`,
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
      <View style={styles.mainContainer}>
        <AppText style={styles.wordsLearned}>
          Words learned: 0 / {words.length}
        </AppText>

        {lessons && (
          <View style={styles.lessonContainer}>
            {Object.values(lessons).map((lesson, i) => {
              return (
                <View key={i}>
                  <AppText style={styles.sectionHeading}>
                    Lesson {i + 1}
                  </AppText>
                  <View style={styles.buttonContainer}>
                    <AppButton onPress={() => handlePressLearn(lesson)}>
                      Learn
                    </AppButton>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
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
  mainContainer: {
    padding: 10,
  },
  lessonContainer: {
    marginTop: 20,
  },
  wordsLearned: {
    fontSize: 16,
    textAlign: "right",
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",
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
