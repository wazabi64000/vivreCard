import { api } from "./api";

// Login

export const authService = {
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data.token;
  },

  // Register

  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};
