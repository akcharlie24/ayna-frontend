"use client";

import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must have minimum 3 characters")
    .max(50, "Maximum 50 characters allowed"),
  email: z
    .string()
    .email()
    .min(6, "Email must have minimum 6 characters")
    .max(200, "Maximum 200 characters allowed"),
  password: z.string().min(6, "Password must have minimum 6 characters"),
});
