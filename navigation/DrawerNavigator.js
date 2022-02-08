import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerMenu from "@components/DrawerMenu";
import LearnNavigator from "./LearnNavigator";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Home" component={LearnNavigator} />
    </Drawer.Navigator>
  );
};
