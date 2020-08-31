import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoriesScreen";
import CategoryOverviewScreen from "../screens/CategoryOverviewScreen";

const AppNavigator = createStackNavigator({
  // Home: HomeScreen,
  Categories: CategoryScreen,
  Category: CategoryOverviewScreen,
});

export default createAppContainer(AppNavigator);
