import { z } from "zod";

// Validation inscription
export const registerSchema = z
  .object({
    email: z.string().email("Email invalide"),

    password: z
      .string()
      .min(8, "Mot de passe minimum 8 caractères")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[0-9]/, "Au moins un chiffre"),

    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer le mot de passe")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Validation login
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});