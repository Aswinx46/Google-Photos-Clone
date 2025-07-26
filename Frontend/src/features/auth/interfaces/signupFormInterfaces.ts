import type React from "react";

export interface SignupFormValues {
    name: string;
    email: string;
    password?: string;
    confirmPassword: string;
}



export interface SignupFormProps {
    setUser: React.Dispatch<React.SetStateAction<SignupFormValues | null>>,
    setShowOtpModal: React.Dispatch<React.SetStateAction<boolean>>
}
