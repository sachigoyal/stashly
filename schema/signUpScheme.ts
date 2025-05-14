import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be atleast 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }).min(8, { message: "Password must be atleast 8 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})