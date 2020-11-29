import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import AuthenticationScreen from "../screens/AuthenticationScreen";
import { setAuthenticated } from "../store/actions/authentication";
import { navigationRef } from "./RootNavigation";
import { ActivityIndicator } from "react-native-paper";
import CenteredView from "../components/UI/AppCenteredView";
import * as Colors from "../constants/Colors";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

export default () => {
  const [tokenCheck, setTokenCheck] = useState(false);

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
      setTokenCheck(true);
    })();
  }, [authenticated]);

  return tokenCheck ? (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen
            name="Learn"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
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
  ) : (
    <CenteredView grow>
      <ActivityIndicator color={Colors.accent} />
    </CenteredView>
  );
};
