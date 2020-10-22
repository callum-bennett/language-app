import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import AuthenticationScreen from "../screens/AuthenticationScreen";

const Stack = createStackNavigator();

export default () => {
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen name="Home" component={DrawerNavigator} />
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{
              animationTypeForReplace: "pop",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
