import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
 baseURL: "https://vivre-card-3.vercel.app/api",
   // baseURL: "http://192.168.1.74:3000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async (config) => {

  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});