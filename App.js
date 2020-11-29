import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import AppNavigator from "./navigation/AuthNavigator";
import { Provider } from "react-redux";

import store from "./store/store";

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
