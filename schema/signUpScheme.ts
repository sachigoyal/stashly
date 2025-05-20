import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "First name must be less than 20 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Last name must be less than 20 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be atleast 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .min(8, { message: "Password must be atleast 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
