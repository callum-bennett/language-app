import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainNavigator from "./MainNavigator";
import DrawerMenu from "../components/DrawerMenu";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Home" component={MainNavigator} />
    </Drawer.Navigator>
  );
};
