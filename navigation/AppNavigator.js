import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryOverviewScreen from "../screens/CategoryOverviewScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";
import CategoryGameScreen from "../screens/CategoryGameScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";

const CategoryNavigator = createStackNavigator({
  Categories: CategoryScreen,
  Category: CategoryOverviewScreen,
  CategoryLesson: CategoryLessonScreen,
  CategoryGame: CategoryGameScreen,
});

const AuthenticationNavigator = createStackNavigator({
  Authentication: AuthenticationScreen,
});

const AppNavigator = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  Category: CategoryNavigator,
});

export default createAppContainer(AppNavigator);
