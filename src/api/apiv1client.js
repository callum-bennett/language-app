import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { availableRoutes, navigate } from "../navigation/RootNavigation";
import { ROOT_URI } from "./index";
import store from "../store/store";
import { setNotifications } from "../store/actions/app";
import { signUserOut } from "../store/actions/authentication";

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
    let redirectRoute;

    if (availableRoutes().includes("Authentication")) {
      redirectRoute = "Authentication";
    } else if (availableRoutes().includes("Categories")) {
      redirectRoute = "Categories";
    }

    if (!response) {
      if (redirectRoute) {
        return navigate(redirectRoute, {
          error: "Oops! Something went wrong",
        });
      }
    } else if (response.config.handleException !== false) {
      const { status } = response;
      if (status === 401) {
        AsyncStorage.removeItem("authToken");
        return store.dispatch(signUserOut());
      }
      if (status === 500 && redirectRoute) {
        return navigate(redirectRoute, {
          error: "Oops! Something went wrong",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiV1Client;
