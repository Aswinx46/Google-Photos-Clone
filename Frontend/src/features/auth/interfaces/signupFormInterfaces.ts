

export interface SignupFormValues {
    name: string;
    email: string;
    password?: string;
    confirmPassword: string;
}



export interface SignupFormProps {

    isPending: boolean
    onSubmit: (values: SignupFormValues) => Promise<void>
}
