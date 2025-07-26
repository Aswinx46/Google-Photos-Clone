import { useMutation } from "@tanstack/react-query"
import { userSendOtp } from "../services/authenticationService"

export const useUserSendOtp = () => {
    return useMutation({
        mutationFn: (email: string) => userSendOtp(email)
    })
}
