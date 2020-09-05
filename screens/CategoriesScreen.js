import React, { useEffect, useState } from "react";
import { FlatList, Button, View } from "react-native";

import CATEGORIES from "../data/categories";
import WORDS from "../data/words";
import CategoryTile from "../components/CategoryTile";
import apiClient from "../api/client";

const CategoryScreen = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await apiClient.get("/category/");
      if (res.data) {
        const categoryData = JSON.parse(res.data);
        setCategories(categoryData);
      }
    })();
  }, []);

  const handleSelectCategory = (item) => {
    props.navigation.navigate({
      routeName: "Category",
      params: {
        categories,
        categoryId: item.id,
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
        renderItem={({ item }) => (
          <CategoryTile
            category={item}
            onSelectCategory={() => {
              handleSelectCategory(item);
            }}
          />
        )}
      />
      <View style={{ margin: 20 }}>
        <Button title="Create data" onPress={createData} />
      </View>
    </>
  );
};

export default CategoryScreen;
