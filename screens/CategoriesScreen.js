import React from "react";
import { FlatList } from "react-native";

import Categories from "../data/categories";
import CategoryTile from "../components/CategoryTile";

const CategoryScreen = (props) => {
  const handleSelectCategory = (item) => {
    props.navigation.navigate({
      routeName: "Category",
      params: {
        categoryId: item.id,
      },
    });
  };

  return (
    <FlatList
      style={{ paddingHorizontal: 10 }}
      data={Categories}
      renderItem={({ item }) => (
        <CategoryTile
          category={item}
          onSelectCategory={() => {
            handleSelectCategory(item);
          }}
        />
      )}
    />
  );
};

export default CategoryScreen;
