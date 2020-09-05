import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryOverviewScreen from "../screens/CategoryOverviewScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";
import CategoryGameScreen from "../screens/CategoryGameScreen";

const AppNavigator = createStackNavigator({
  Categories: CategoryScreen,
  Category: CategoryOverviewScreen,
  CategoryLesson: CategoryLessonScreen,
  CategoryGame: CategoryGameScreen,
});

export default createAppContainer(AppNavigator);
