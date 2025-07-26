import { useMutation } from "@tanstack/react-query"
import { userSendOtp, userSignup } from "../services/authenticationService"
import type { SignupFormValues } from "../interfaces/signupFormInterfaces"

export const useUserSendOtp = () => {
    return useMutation({
        mutationFn: (email: string) => userSendOtp(email)
    })
}

export const useUserSignup = () => {
    return useMutation({
        mutationFn: ({ user, enteredOtp }: { user: Omit<SignupFormValues, 'confirmPassword'>, enteredOtp: string }) => userSignup(user, enteredOtp)
    })
}