import { motion } from "framer-motion";
import LoginForm from "../component/LoginForm";
import React from "react";

interface LoginValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async (values: LoginValues) => {
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Login attempt:", values);
        setIsLoading(false);

        // For demo purposes - you would handle actual authentication here
        if (values.email === "demo@example.com" && values.password === "password") {
            console.log("Login successful!");
        } else {
            throw new Error("Invalid credentials");
        }
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
                    <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                </div>

                {/* Demo credentials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50 relative z-10"
                >
                    <p className="text-sm text-muted-foreground text-center mb-2 font-medium">
                        Demo Credentials:
                    </p>
                    <div className="text-xs text-muted-foreground text-center space-y-1">
                        <p>Email: demo@example.com</p>
                        <p>Password: password</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;