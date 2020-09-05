import React, { useEffect } from "react";
import { FlatList, Button, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CATEGORIES from "../data/categories";
import WORDS from "../data/words";
import apiClient from "../api/client";
import { fetchCategories } from "../store/actions/categories";
import CategoryTile from "../components/CategoryTile";
import { selectCategoriesAsArray } from "../store/selectors/category";

const CategoryScreen = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesAsArray);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const renderCategoryTile = ({ item }) => (
    <CategoryTile
      category={item}
      onSelectCategory={() => {
        handleSelectCategory(item);
      }}
    />
  );

  const handleSelectCategory = (item) => {
    props.navigation.navigate({
      routeName: "Category",
      params: {
        categoryId: item.id,
        title: item.name,
      },
    });
  };

  const createData = () => {
    CATEGORIES.forEach((category) => apiClient.post("/category/", category));
    WORDS.forEach((word) => apiClient.post("/word/", word));
  };

  return (
    <>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={categories}
        renderItem={renderCategoryTile}
      />
      <View style={{ margin: 20 }}>
        <Button title="Create data" onPress={createData} />
      </View>
    </>
  );
};

export default CategoryScreen;
