import { z } from "zod"

const phoneRegex = /^\+?[0-9\s-]{7,20}$/

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name").max(80),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
    role: z.enum(["individual", "organization", "authority"]),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
