import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import AppText from "../components/AppText";
import { fetchCategoryProgress } from "../store/actions/categories";
import { selectUserVocabularyByCategoryId } from "../store/selectors/userVocabulary";
import { selectLessonsByCategoryId } from "../store/selectors/lesson";
import { selectCategoryById } from "../store/selectors/category";
import { fetchUserVocabulary, fetchWords } from "../store/actions/words";
import apiClient from "../api/client";
import CategoryHeader from "../components/CategoryHeader";
import CategoryLessonList from "../components/CategoryLessonList";
import { ActivityIndicator } from "react-native-paper";
import { CategoryContext } from "../navigation/RootNavigation";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CategoryOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { categoryId } = useContext(CategoryContext);

  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [category, lessons, vocabulary] = useSelector((state) => [
    selectCategoryById(state, categoryId),
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

  const loadData = async () => {
    await Promise.all([
      dispatch(fetchWords()),
      dispatch(fetchCategoryProgress(categoryId)),
      dispatch(fetchUserVocabulary()),
    ]);

    setLoaded(true);
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
      return () => {
        setLoaded(false);
      };
    } else {
      setLoaded(false);
    }
  }, [isFocused]);

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

  const handlePressWords = () => {
    props.navigation.navigate("CategoryWords", {
      categoryId,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <CategoryHeader category={category} progress={progress} />
        {loaded ? (
          <View style={styles.mainContainer}>
            {vocabArray.length > 0 && (
              <TouchableWithoutFeedback onPress={handlePressWords}>
                <View>
                  <AppText style={styles.wordsLearned}>
                    Words learned: {wordsLearnedCount} / {wordCount}
                  </AppText>
                </View>
              </TouchableWithoutFeedback>
            )}
            <CategoryLessonList
              lessons={lessons}
              onPressLearn={handlePressLearn}
            />
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainContainer: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
