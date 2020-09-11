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
    CATEGORIES.forEach(async (category) => {
      try {
        await apiClient.post("/category/", category);
      } catch (err) {
        console.log(err);
      }
    });
    WORDS.forEach(async (word) => {
      try {
        await apiClient.post("/word/", word);
      } catch (err) {
        console.log(err);
      }
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
      <View style={{ margin: 20 }}>
        <Button title="Create data" onPress={createData} />
      </View>
    </>
  );
};

export default CategoryScreen;
