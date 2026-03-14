import { api } from "./api";

export const userService = {
  // On va mettre a jour la position (location)

  update: async (location) => {
    return api.put("/users/location", location);
  },

  // On récupere les utilisateur actifs

  getActiveusers: async () => {
    const response = await api.get("/users/active");

    return response.data;
  },
};
