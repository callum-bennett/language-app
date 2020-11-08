import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import DrawerNavigator from "./DrawerNavigator";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import { setAuthenticated } from "../store/actions/authentication";
import { navigationRef } from "./RootNavigation";

const Stack = createStackNavigator();

export default () => {
  const dispatchStore = useDispatch();

  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  useEffect(() => {
    (async () => {
      const existingToken = await AsyncStorage.getItem("authToken");
      if (existingToken) {
        dispatchStore(setAuthenticated(existingToken));
      }
    })();
  }, [authenticated]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen name="Home" component={DrawerNavigator} />
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{
              animationTypeForReplace: "pop",
              title: "Log in or create an account",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
