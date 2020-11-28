import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { availableRoutes, navigate } from "../navigation/RootNavigation";
import { ROOT_URI } from "./index";

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
    //@todo tidy up
    if (res.data?.notifications) {
      // @ todo dispatch notifications
    }
    if (res.data?.payload) {
      res.data = res.data.payload;
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
    } else {
      const { status } = response;
      if (status === 401) {
        AsyncStorage.removeItem("authToken");
        return navigate("Authentication");
      } else if (status === 500) {
        return navigate(redirectRoute, {
          error: "Oops! Something went wrong",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiV1Client;
