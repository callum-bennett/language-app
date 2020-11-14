import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";
import CategoryNavigator from "./CategoryNavigator";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="CategoryNavigator" component={CategoryNavigator} />
      <Stack.Screen name="CategoryLesson" component={CategoryLessonScreen} />
    </Stack.Navigator>
  );
};
