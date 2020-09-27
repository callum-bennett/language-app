import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 10 }}
        data={categories}
        renderItem={renderCategoryTile}
      />
    </>
  );
};

export default CategoryScreen;
