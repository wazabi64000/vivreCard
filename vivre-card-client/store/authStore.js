import { create } from "zustand";
import * as SeCureStore from "expo-secure-store";

// on a créer un stockage globale pour gerer les etats d'un utilisateus

export const useAuthSore = create((set) => ({
  token: null,
  isAuthenticated: false,

  // On va sauvgarder le token apres le login

  setToken: async (token) => {
    await SeCureStore.setItemAsync("token", token);

    set({
      token: token,
      isAuthenticated: true,
    });
  },

  // la déconnexion

  logout: async () => {
    await SeCureStore.deleteItemAsync("token");

    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
