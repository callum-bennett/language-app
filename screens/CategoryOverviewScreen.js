import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppText from "../components/AppText";
import { fetchCategoryProgress } from "../store/actions/categories";
import { selectUserVocabularyByCategoryId } from "../store/selectors/userVocabulary";
import { selectLessonsByCategoryId } from "../store/selectors/lesson";
import { selectCategoryById } from "../store/selectors/category";
import { fetchUserVocabulary, fetchWords } from "../store/actions/words";
import { selectWordsByCategoryId } from "../store/selectors/word";
import apiClient from "../api/client";
import CategoryHeader from "../components/CategoryHeader";
import CategoryLessonList from "../components/CategoryLessonList";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CategoryOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const categoryId = props.route.params.categoryId;
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

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

  const loadData = () => {
    dispatch(fetchWords());
    dispatch(fetchCategoryProgress(categoryId));
    dispatch(fetchUserVocabulary());
    setLoaded(true);
  };

  useEffect(() => {
    loadData();
    return () => {
      setLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (refreshing || !loaded) {
      loadData();
    }
  }, [refreshing]);

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    setRefreshing(false);
  }, []);

  const handlePressLearn = async (lesson) => {
    try {
      const res = await apiClient.patch(`/api/lesson/${lesson.id}/start`);
      if (res) {
        props.navigation.navigate({
          name: "CategoryLesson",
          params: {
            lessonId: lesson.id,
            title: `${category.name} / Lesson ${lesson.sequence + 1}`,
          },
        });
      }
    } catch (e) {}
  };

  return category ? (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.screen}>
          <CategoryHeader category={category} progress={progress} />
          <View style={styles.mainContainer}>
            {vocabArray.length > 0 && (
              <AppText style={styles.wordsLearned}>
                Words learned: {wordsLearnedCount} / {wordCount}
              </AppText>
            )}
            <CategoryLessonList
              lessons={lessons}
              onPressLearn={handlePressLearn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <AppText>Loading</AppText>
  );
};

const styles = StyleSheet.create({
  screen: {
    position: "relative",
  },

  mainContainer: {
    padding: 10,
  },

  noLessons: {
    textAlign: "center",
  },
  wordsLearned: {
    fontSize: 16,
    textAlign: "right",
  },
});

export default CategoryOverviewScreen;
