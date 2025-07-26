import { motion } from "framer-motion";
import LoginForm from "../component/LoginForm";
import React from "react";
import { useUserLogin } from "../hooks/userAuthenticationHooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "@/reduxstrore/slices/userSlice";
import { addToken } from "@/reduxstrore/slices/tokenSlice";
import type { LoginFormValues } from "../interfaces/loginFormAndPageInterfaces";



const Login: React.FC = () => {
    const userLoginMutation = useUserLogin()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = async (values: LoginFormValues) => {
        userLoginMutation.mutate({ email: values.email, password: values.password }, {
            onSuccess: (data) => {
                dispatch(addUser(data.user))
                dispatch(addToken(data.accessToken))
                toast("Login SuccessFull")
                navigate('/home', { replace: true })
            },
            onError: (err) => {
                toast(err.message)
            }
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Background decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl"
                />

                {/* Logo/Brand section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 relative z-10"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                        <span className="text-2xl font-bold text-primary-foreground">P</span>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to PixelNest</h1>
                    <p className="text-muted-foreground">Sign in to continue to your account</p>
                </motion.div>

                {/* Login Form */}
                <div className="relative z-10">
                    <LoginForm onSubmit={handleLogin} isLoading={userLoginMutation.isPending} />
                </div>

              
            </motion.div>
        </div>
    );
};

export default Login;