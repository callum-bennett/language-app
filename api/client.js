import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { availableRoutes, navigate } from "../navigation/RootNavigation";

const apiClient = axios.create({
  baseURL: "http://192.168.0.7:8001",
  timeout: 2000,
});

apiClient.interceptors.request.use(async (req) => {
  // Add auth token to headers
  if (req.url.substr(0, 4) === "/api") {
    req.headers["X-AUTH-TOKEN"] = await AsyncStorage.getItem("authToken");
  }

  return req;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;
    const redirectRoute = availableRoutes().contains("Authentication")
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

export default apiClient;
