import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppButton from "../components/AppButton";

import AppProgressDonut from "../components/AppProgressDonut";
import CategoryImageWithTitle from "../components/CategoryImageWithTItle";
import AppText from "../components/AppText";
import { fetchLessons } from "../store/actions/lessons";
import { selectUserVocabularyByCategoryId } from "../store/selectors/userVocabulary";
import { selectLessonsByCategoryId } from "../store/selectors/lesson";
import { selectCategoryById } from "../store/selectors/category";
import { fetchUserVocabulary, fetchWords } from "../store/actions/words";
import { selectWordsByCategoryId } from "../store/selectors/word";

const CategoryOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const categoryId = props.route.params.categoryId;

  const [category, words, lessons, vocabulary] = useSelector((state) => [
    selectCategoryById(state, categoryId),
    selectWordsByCategoryId(state, categoryId),
    selectLessonsByCategoryId(state, categoryId),
    selectUserVocabularyByCategoryId(state, categoryId),
  ]);

  const vocabArray = Object.values(vocabulary);
  const wordsLearnedCount = vocabArray.filter((v) => v).length;
  const wordCount = vocabArray.length;
  const progress =
    vocabArray.length > 0
      ? Math.ceil((wordsLearnedCount / wordCount) * 100)
      : 0;

  useEffect(() => {
    dispatch(fetchWords());
    dispatch(fetchLessons());
    dispatch(fetchUserVocabulary());
  }, []);

  const handlePressLearn = (lesson) => {
    props.navigation.navigate({
      name: "CategoryLesson",
      params: {
        lessonId: lesson.id,
        title: `${category.name} / Lesson ${lesson.sequence + 1}`,
      },
    });
  };

  return category ? (
    <View style={styles.screen}>
      <View style={styles.progressContainer}>
        <AppProgressDonut progress={progress} />
      </View>
      <View style={styles.imageContainer}>
        <CategoryImageWithTitle category={category} />
      </View>
      <View style={styles.mainContainer}>
        {vocabArray.length > 0 && (
          <AppText style={styles.wordsLearned}>
            Words learned: {wordsLearnedCount} / {wordCount}
          </AppText>
        )}
        <View style={styles.lessonContainer}>
          {lessons.length ? (
            Object.values(lessons).map((lesson, i) => {
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
            })
          ) : (
            <AppText style={styles.noLessons}>
              There are no lessons available.
            </AppText>
          )}
        </View>
      </View>
    </View>
  ) : (
    <AppText>Loading</AppText>
  );
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
  noLessons: {
    textAlign: "center",
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
