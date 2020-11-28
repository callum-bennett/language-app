import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";

import { fetchCategories } from "../store/actions/categories";
import CategoryTile from "../components/CategoryTile";
import { selectCategoriesAsArray } from "../store/selectors/category";
import { fetchLessons, fetchLessonComponents } from "../store/actions/lessons";
import AppText from "../components/UI/AppText";
import * as Colors from "../constants/Colors";
import { fetchWords } from "../store/actions/words";

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
    props.navigation.navigate("CategoryNavigator", {
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
          <AppText style={{ color: "#FFF" }}>{snackbarMessage}</AppText>
        </View>
      </Snackbar>
    </>
  );
};

export default CategoryScreen;
