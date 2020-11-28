import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryOverviewScreen from "../screens/CategoryOverviewScreen";
import CategoryWordsScreen from "../screens/CategoryWordsScreen";
import * as Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import AppText from "../components/UI/AppText";
import { CategoryContext } from "./RootNavigation";

const Tab = createBottomTabNavigator();

const tabOptions = {
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let icon;

      if (route.name === "CategoryOverview") {
        icon = "book-open";
      } else if (route.name === "CategoryWords") {
        icon = "list";
      }

      return <FontAwesome5 name={icon} size={size} color={color} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.accent,
    inactiveTintColor: Colors.light,
  },
};

const labelStyle = (focused) => {
  return {
    fontSize: 14,
    fontWeight: "bold",
    color: focused ? Colors.accent : Colors.light,
    marginBottom: 2,
  };
};

export default ({ route }) => {
  return (
    <CategoryContext.Provider value={route.params}>
      <Tab.Navigator {...tabOptions}>
        <Tab.Screen
          name="CategoryOverview"
          component={CategoryOverviewScreen}
          options={{
            title: "Lessons",
            tabBarLabel: ({ focused }) => (
              <AppText style={labelStyle(focused)}>Lessons</AppText>
            ),
          }}
        />
        <Tab.Screen
          name="CategoryWords"
          component={CategoryWordsScreen}
          options={{
            title: "My vocabulary",
            tabBarLabel: ({ focused }) => (
              <AppText style={labelStyle(focused)}>My Vocabulary</AppText>
            ),
          }}
        />
      </Tab.Navigator>
    </CategoryContext.Provider>
  );
};
