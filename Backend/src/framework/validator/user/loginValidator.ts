import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),

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
});
