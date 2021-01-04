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
import AppIntroScreen from "../screens/AppIntroScreen";
import { fetchUserConfig, setTokenCheck } from "../store/actions/app";
import apiV1Client from "../api/apiv1client";

const Stack = createStackNavigator();

export default () => {
  const dispatchStore = useDispatch();
  const [
    authenticated,
    onboarded,
    configLoaded,
    tokenCheck,
  ] = useSelector((state) => [
    state.authentication.authenticated,
    state.app.onboarded,
    state.app.configLoaded,
    state.app.tokenCheck,
  ]);

  useEffect(() => {
    (async () => {
      const existingToken = await AsyncStorage.getItem("authToken");
      if (existingToken) {
        dispatchStore(setAuthenticated(existingToken));
      }
      dispatchStore(setTokenCheck(true));
    })();
  }, [authenticated]);

  useEffect(() => {
    (async () => {
      if (!authenticated) {
        return;
      }
      dispatchStore(fetchUserConfig(apiV1Client));
    })();
  }, [authenticated]);

  return tokenCheck ? (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {authenticated ? (
          configLoaded ? (
            onboarded ? (
              <Stack.Screen
                name="Learn"
                component={MainNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Intro"
                component={AppIntroScreen}
                options={{ headerShown: false }}
              />
            )
          ) : (
            <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
              {() => (
                <CenteredView grow>
                  <ActivityIndicator color={Colors.accent} />
                </CenteredView>
              )}
            </Stack.Screen>
          )
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
