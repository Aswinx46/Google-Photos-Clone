import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .refine(
            (val) =>
                /[A-Z]/.test(val) &&
                /[a-z]/.test(val) &&
                /[0-9]/.test(val) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(val),
            {
                message:
                    'Password must include uppercase, lowercase, number, and special character',
            }
        ),
})