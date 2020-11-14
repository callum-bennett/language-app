import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserVocabulary } from "../store/actions/words";
import { ActivityIndicator } from "react-native-paper";
import VocabularyList from "../components/VocabularyList";
import { selectUserVocabularyByCategoryId } from "../store/selectors/userVocabulary";
import { CategoryContext } from "../navigation/RootNavigation";

const CategoryWordsScreen = () => {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const { categoryId } = useContext(CategoryContext);

  const [vocabulary] = useSelector((state) => [
    selectUserVocabularyByCategoryId(state, categoryId),
  ]);

  const vocabArray = Object.values(vocabulary).filter((v) => v);

  useEffect(() => {
    (async () => {
      await dispatch(fetchUserVocabulary(categoryId));
      setDataLoaded(true);
    })();
  }, []);

  return (
    <View style={styles.screen}>
      {dataLoaded ? (
        <VocabularyList vocabulary={vocabArray} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryWordsScreen;
