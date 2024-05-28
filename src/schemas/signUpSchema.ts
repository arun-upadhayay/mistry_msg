import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special character ");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters " })
    .max(20, "Password must be no more than 20 characters"),
});
