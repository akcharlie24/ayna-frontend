"use client";

import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .email()
    .min(6, "Email must have minimum 6 characters")
    .max(200, "Maximum 200 characters allowed"),
  password: z.string().min(6, "Password must have minimum 6 characters"),
});
