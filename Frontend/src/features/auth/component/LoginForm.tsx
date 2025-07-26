import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { LoginFormValues } from "../interfaces/loginFormAndPageInterfaces";
interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => Promise<void>;
    isLoading?: boolean;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <Card className="shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <CardTitle className="text-2xl font-bold text-foreground">Welcome back</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Enter your credentials to access your account
                        </CardDescription>
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="space-y-4">
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Field
                                            as={Input}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className={`pl-10 ${errors.email && touched.email
                                                ? "border-destructive focus-visible:ring-destructive"
                                                : ""
                                                }`}
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-sm text-destructive font-medium"
                                    />
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className={`pl-10 pr-10 ${errors.password && touched.password
                                                ? "border-destructive focus-visible:ring-destructive"
                                                : ""
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-sm text-destructive font-medium"
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.3 }}
                                    className="pt-2"
                                >
                                    <Button
                                        type="submit"
                                        disabled={isLoading || isSubmitting}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                    >
                                        {isLoading || isSubmitting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            <>
                                                <LogIn className="mr-2 h-4 w-4" />
                                                Sign In
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {/* Sign up link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.3 }}
                                    className="text-center pt-2"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                                        >
                                            Sign up
                                        </button>
                                    </p>
                                </motion.div>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default LoginForm;
