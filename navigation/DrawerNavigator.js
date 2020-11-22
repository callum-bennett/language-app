import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainNavigator from "./MainNavigator";
import DrawerMenu from "../components/DrawerMenu";
import BadgesScreen from "../screens/BadgesScreen";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Home" component={MainNavigator} />
      <Drawer.Screen name="Badges" component={BadgesScreen} />
    </Drawer.Navigator>
  );
};
