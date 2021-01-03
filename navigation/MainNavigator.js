import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Colors from "../constants/Colors";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import BadgesScreen from "../screens/BadgesScreen";
import DrawerNavigator from "./DrawerNavigator";
import { connect } from "react-redux";
import { selectNotificationsByType } from "../store/selectors/app";
import { AntDesign } from "@expo/vector-icons";
import CategoriesScreen from "../screens/CategoriesScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabOptions = {
  initialRouteName: "Learn",
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let icon;

      if (route.name === "Learn") {
        icon = <AntDesign name="book" size={30} color={color} />;
      } else if (route.name === "Leaderboard") {
        icon = <AntDesign name="profile" size={size} color={color} />;
      } else if (route.name === "Achievements") {
        icon = <AntDesign name="star" size={size} color={color} />;
      }

      return icon;
    },
  }),
  tabBarOptions: {
    activeTintColor: "#FFF",
    activeBackgroundColor: Colors.primary,
    inactiveTintColor: Colors.primary,
    showLabel: false,
  },
};

const LeaderboardNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LeaderboardScreen"
      component={LeaderboardScreen}
      options={{ title: "Leaderboard" }}
    />
  </Stack.Navigator>
);

const BadgesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BadgeScreen"
      component={BadgesScreen}
      options={{ title: "My Badges" }}
    />
  </Stack.Navigator>
);

const MainNavigator = (props) => {
  let badgeNotificationCount;
  if (props.badgeNotifications.length > 0) {
    badgeNotificationCount = props.badgeNotifications.length;
  }

  return (
    <Tab.Navigator {...tabOptions}>
      <Tab.Screen name="Leaderboard" component={LeaderboardNavigator} />
      <Tab.Screen name="Learn" component={DrawerNavigator} />
      <Tab.Screen
        name="Achievements"
        component={BadgesNavigator}
        options={{
          tabBarBadge: badgeNotificationCount,
          tabBarBadgeStyle: {
            color: Colors.dark,
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: "rgba(255,255,255, 0)",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default connect((state) => {
  return {
    badgeNotifications: selectNotificationsByType(state, "badge"),
  };
})(MainNavigator);
