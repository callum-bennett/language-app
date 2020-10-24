import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../api/client";
import { setAuthenticated } from "../store/actions/authentication";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import FormControl from "../components/FormControl";
import * as Colors from "../constants/Colors";

const AuthenticationScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  useEffect(() => {
    if (authenticated) {
      props.navigation.navigate("Home");
    }
  }, [authenticated]);

  useEffect(() => {
    (async () => {
      try {
        const existingToken = await AsyncStorage.getItem("authToken");
        if (existingToken) {
          dispatch(setAuthenticated(existingToken));
        } else {
          const res = await apiClient.get("/login");
          setEmail(res.data.last_username);
        }
      } catch (e) {}
    })();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await apiClient.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });

      const authToken = res.headers["x-auth-token"];
      if (authToken) {
        await AsyncStorage.setItem("authToken", authToken);
        dispatch(setAuthenticated(authToken));
      }
    } catch (error) {
      let message = "Something went wrong. Please contact the administrator.";
      if (error.response.status === 401) {
        message = error.response.data.message;
      }
      setErrorMessage(message);
    }
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.screen}
      >
        <View style={styles.form} keyboardShouldPersistTaps="always">
          <FormControl>
            <AppTextInput
              key="email"
              id="email"
              label="Email"
              autoCapitalize="none"
              value={email}
              keyboardType="email-address"
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </FormControl>
          <FormControl>
            <AppTextInput
              key="password"
              id="password"
              label="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              icon={
                <MaterialCommunityIcons
                  onPress={() => setShowPassword(!showPassword)}
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#666"
                />
              }
            />
          </FormControl>
          <FormControl>
            {!loading ? (
              <AppButton onPress={handleSignIn}>Log in</AppButton>
            ) : (
              <ActivityIndicator style={{ height: 36 }} />
            )}
          </FormControl>
          <FormControl noMargin>
            {errorMessage && (
              <AppText style={styles.authError}>{errorMessage}</AppText>
            )}
          </FormControl>
          <AppText style={styles.signUpText}>
            Don't have an account already?{" "}
            <TouchableWithoutFeedback>
              <AppText style={{ color: Colors.primary }}>Sign up!</AppText>
            </TouchableWithoutFeedback>
          </AppText>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: "white",
    width: "90%",
    maxWidth: 400,
    padding: 20,
  },
  signUpText: {
    textAlign: "center",
  },
  authError: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AuthenticationScreen;
