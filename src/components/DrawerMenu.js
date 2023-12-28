import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signUserOut } from "@store/actions/authentication";

function DrawerMenu(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} style={{ position: "relative" }}>
      <DrawerItemList {...props} style={{ backgroundColor: "red" }} />
      <DrawerItem
        label="Sign out"
        onPress={async () => {
          await AsyncStorage.removeItem("authToken");
          dispatch(signUserOut());
        }}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerMenu;
