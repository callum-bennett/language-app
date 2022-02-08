import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  CategoriesScreen,
  CategoryLessonScreen,
  CategoryScreen,
} from "@screens";
import ProgressHeader from "@components/ProgressHeader";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Learn" }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="CategoryLesson"
        component={CategoryLessonScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => {
            return <ProgressHeader lessonId={route.params.lessonId} />;
          },
        })}
      />
    </Stack.Navigator>
  );
};
