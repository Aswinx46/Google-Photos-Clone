import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useUserSendOtp } from '../hooks/userAuthenticationHooks';
import type { SignupFormProps, SignupFormValues } from '../interfaces/signupFormInterfaces';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

const SignupForm = ({ setUser, setShowOtpModal }: SignupFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const useSendOtpMutation = useUserSendOtp()

    const initialValues: SignupFormValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values: SignupFormValues) => {
        try {
            useSendOtpMutation.mutate(values.email, {
                onSuccess: () => {
                    setShowOtpModal(true)
                    setUser(values)
                }
            })
        } catch (error) {
            toast('error while submiitng')
            console.log(error)
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto"
        >
            <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="space-y-1">
                    <motion.div variants={itemVariants}>
                        <CardTitle className="text-2xl font-bold text-center text-foreground">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center text-muted-foreground">
                            Enter your details to create your account
                        </CardDescription>
                    </motion.div>
                </CardHeader>

                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="space-y-4">
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Field
                                            as={Input}
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className={`pl-10 ${errors.name && touched.name ? 'border-destructive' : ''}`}
                                        />
                                    </div>
                                    <ErrorMessage name="name">
                                        {(msg) => (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-destructive"
                                            >
                                                {msg}
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Field
                                            as={Input}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className={`pl-10 ${errors.email && touched.email ? 'border-destructive' : ''}`}
                                        />
                                    </div>
                                    <ErrorMessage name="email">
                                        {(msg) => (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-destructive"
                                            >
                                                {msg}
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password (Optional)
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a password"
                                            className={`pl-10 pr-10 ${errors.password && touched.password ? 'border-destructive' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password">
                                        {(msg) => (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-destructive"
                                            >
                                                {msg}
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <CheckCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Field
                                            as={Input}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            className={`pl-10 pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-destructive' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmPassword">
                                        {(msg) => (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-destructive"
                                            >
                                                {msg}
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </motion.div>

                                <motion.div variants={itemVariants} className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-11 text-base font-medium"
                                    >
                                        {useSendOtpMutation.isPending ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            'Create Account'
                                        )}
                                    </Button>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center pt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Already have an account?{' '}
                                        <a
                                            href="/signin"
                                            className="font-medium text-primary hover:underline transition-colors"
                                        >
                                            Sign in
                                        </a>
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

export default SignupForm;