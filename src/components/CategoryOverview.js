import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import CategoryHeader from "@components/CategoryHeader";
import CategoryLessonList from "@components/CategoryLessonList";
import Text from "@components/ui/Text";
import CenteredView from "@components/ui/CenteredView";

import { CategoryContext } from "@navigation/RootNavigation";
import {
  selectUserVocabularyByCategoryId,
  selectLessonsByCategoryId,
  selectCategoryById,
} from "@store/selectors";
import {
  fetchCategoryProgress,
  fetchUserVocabulary,
  fetchWords,
} from "@store/actions";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CategoryOverview = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { categoryId } = useContext(CategoryContext);

  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <CategoryHeader category={category} progress={progress} />
        {loaded ? (
          <View style={styles.mainContainer}>
            {vocabArray.length > 0 && (
              <View>
                <Text style={styles.wordsLearned}>
                  Words learned: {wordsLearnedCount} / {wordCount}
                </Text>
              </View>
            )}
            <CategoryLessonList
              lessons={lessons}
              onPressLearn={props.onPressLearn}
            />
          </View>
        ) : (
          <CenteredView grow style={styles.loadingContainer}>
            <ActivityIndicator />
          </CenteredView>
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
    marginTop: 60,
  },
  noLessons: {
    textAlign: "center",
  },
  wordsLearned: {
    fontSize: 16,
    textAlign: "right",
  },
});

export default CategoryOverview;
