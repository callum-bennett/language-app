import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.0.7:8001",
  timeout: 2000,
});

export default apiClient;
