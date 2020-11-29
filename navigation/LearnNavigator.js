import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";
import CategoryNavigator from "./CategoryNavigator";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoryScreen}
        options={{ title: "Learn" }}
      />
      <Stack.Screen
        name="CategoryNavigator"
        component={CategoryNavigator}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="CategoryLesson"
        component={CategoryLessonScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};
