import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";

import CategoryTile from "@components/CategoryTile";
import UIText from "@components/UI/UIText";

import * as Colors from "@constants/Colors";
import {
  fetchCategories,
  fetchLessons,
  fetchLessonComponents,
  fetchWords,
} from "@store/actions";
import { selectCategoriesAsArray } from "@store/selectors";

const CategoryScreen = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesAsArray);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLessons());
    dispatch(fetchLessonComponents());
    dispatch(fetchWords());
  }, []);

  useEffect(() => {
    const { params } = props.route;
    if (params?.error) {
      setSnackbarMessage(params.error);
    }
  }, [props.route.params]);

  const renderCategoryTile = ({ item }) => (
    <CategoryTile
      category={item}
      onSelectCategory={() => {
        handleSelectCategory(item);
      }}
    />
  );

  const handleSelectCategory = (item) => {
    props.navigation.navigate("CategoryScreen", {
      categoryId: item.id,
      title: item.name,
    });
  };

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 10 }}
        data={categories}
        renderItem={renderCategoryTile}
      />
      <Snackbar
        visible={snackbarMessage}
        duration={3000}
        onDismiss={() => setSnackbarMessage(false)}
        style={{ backgroundColor: Colors.error }}
      >
        <View>
          <UIText style={{ color: "#FFF" }}>{snackbarMessage}</UIText>
        </View>
      </Snackbar>
    </>
  );
};

export default CategoryScreen;
