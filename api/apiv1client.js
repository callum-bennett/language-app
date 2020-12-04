import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { availableRoutes, navigate } from "../navigation/RootNavigation";
import { ROOT_URI } from "./index";
import store from "../store/store";
import { setNotifications } from "../store/actions/app";

const apiV1Client = axios.create({
  baseURL: `${ROOT_URI}/api/v1`,
  timeout: 2000,
});

apiV1Client.interceptors.request.use(async (req) => {
  req.headers["X-AUTH-TOKEN"] = await AsyncStorage.getItem("authToken");
  return req;
});

apiV1Client.interceptors.response.use(
  (res) => {
    const { notifications, payload } = res.data;

    if (notifications) {
      store.dispatch(setNotifications(notifications));
    }
    if (payload) {
      res.data = payload;
    }

    return res;
  },
  (error) => {
    const { response } = error;
    const redirectRoute = availableRoutes().includes("Authentication")
      ? "Authentication"
      : "Categories";

    if (!response) {
      return navigate(redirectRoute, {
        error: "Oops! Something went wrong",
      });
    } else if (response.config.handleException !== false) {
      const { status } = response;
      if (status === 401) {
        AsyncStorage.removeItem("authToken");
        return navigate("Authentication");
      } else if (status === 500) {
        // console.log(error.response.data);
        return navigate(redirectRoute, {
          error: "Oops! Something went wrong",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiV1Client;
