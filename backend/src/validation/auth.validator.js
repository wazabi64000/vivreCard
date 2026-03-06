import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .email("Email invalide"),
  password: z
    .string()
    .min(8, "Mot de passe minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule requise")
    .regex(/[0-9]/, "Au moins un chiffre requis"),
});

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});
