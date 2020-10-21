import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

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
    if (error.response.status === 401) {
      AsyncStorage.removeItem("authToken");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
