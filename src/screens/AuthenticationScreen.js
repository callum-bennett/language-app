import React, { useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import axios from "axios";

import { setAuthenticated } from "@store/actions/authentication";
import AuthForm from "@components/AuthForm";
import CenteredView from "@components/ui/CenteredView";
import Text from "@components/ui/Text";

import * as Colors from "@constants/Colors";
import { ROOT_URI } from "@api";

const SIGN_IN = "sign_in";
const SIGN_UP = "sign_up";
const SWITCH_MODE = "switch_mode";
const SET_ERROR = "set_error";
const SET_LOADING = "set_loading";
const STOP_LOADING = "stop_loading";

const initialState = {
  error: null,
  mode: SIGN_IN,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SWITCH_MODE:
      return {
        error: initialState.error,
        loading: false,
        mode: state.mode === SIGN_UP ? SIGN_IN : SIGN_UP,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_LOADING:
      return {
        ...state,
        error: initialState.error,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthenticationScreen = () => {
  const storeDispatch = useDispatch();

  const [{ error, loading, mode }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleAuthenticate = async (username, password) => {
    dispatch({ type: SET_LOADING });

    const route = mode === SIGN_UP ? "/register" : "/login";
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await axios.post(`${ROOT_URI}${route}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });

      const authToken = res.headers["x-auth-token"];
      if (authToken) {
        await AsyncStorage.setItem("authToken", authToken);
        storeDispatch(setAuthenticated(authToken));
      }
    } catch (err) {
      let errMessage =
        "Something went wrong. Please contact the administrator.";
      if (err.response) {
        const { status, data } = err.response;

        if (status === 401) {
          errMessage = data.message;
        } else if (status === 400) {
          errMessage = data;
        }
      }

      dispatch({ type: SET_ERROR, error: errMessage });
    }

    dispatch({ type: STOP_LOADING });
  };

  return (
    <TouchableWithoutFeedback>
      <ScrollView
        contentContainerStyle={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <CenteredView grow style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/icon.png")}
          />
          <AuthForm
            loading={loading}
            onSubmit={handleAuthenticate}
            isSignIn={mode === SIGN_IN}
          />
          <View style={styles.switchModeText}>
            <Text>
              {mode === SIGN_UP
                ? "Already have an account? "
                : "Don't have an account already? "}
            </Text>
            <TouchableWithoutFeedback
              hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
              onPress={() => dispatch({ type: SWITCH_MODE })}
            >
              <View>
                <Text style={styles.switchModeCTA}>
                  {mode === SIGN_UP ? "Log in" : "Sign up!"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </CenteredView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 20,
    marginTop: 20,
  },
  switchModeText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  switchModeCTA: {
    color: Colors.primary,
    fontWeight: "bold",
  },

  error: {
    color: Colors.error,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default AuthenticationScreen;
