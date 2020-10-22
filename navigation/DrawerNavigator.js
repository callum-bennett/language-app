import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import DrawerMenu from "../components/DrawerMenu";

const Drawer = createDrawerNavigator();

const getTitle = (route, navigation) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  let headerTitle = routeName;

  switch (routeName) {
    case "Category":
    case "CategoryLesson":
      const activeIndex = route.state.index;
      headerTitle = route.state.routes[activeIndex].params.title;
  }

  navigation.setOptions({ headerTitle });
};
export default ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MainNavigator}
        options={({ route }) => {
          headerTitle: getTitle(route, navigation);
        }}
      />
    </Drawer.Navigator>
  );
};
