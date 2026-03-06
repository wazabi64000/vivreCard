import {z } from "zod"

export const registrationSchema = z.object({

    email: z.email('Email Non'),
    password:  z.string()
   
    .min(8, "Mot de passe minimum 8 caracteres")
    .regex(/[A-Z]/, "Au moin Une majiscule")
    .regex(/[0-9]/, "Au moin un chiffre requis")
});

export const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string()
})