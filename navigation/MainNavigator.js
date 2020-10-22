import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryOverviewScreen from "../screens/CategoryOverviewScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="Category" component={CategoryOverviewScreen} />
      <Stack.Screen name="CategoryLesson" component={CategoryLessonScreen} />
    </Stack.Navigator>
  );
};
