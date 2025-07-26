"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from "lucide-react"
import type { OTPModalProps } from "../interfaces/OtpModalInterface"


export default function OTPModal({
    isOpen,
    onClose,
    onVerifyOTP,
    onResendOTP,
    title = "Enter Verification Code",
    subtitle = "We've sent a 6-digit code to your phone number",
    otpLength = 6,
}: OTPModalProps) {
    const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""))
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [remainingTime, setRemainingTime] = useState<number>(5 * 60)
    const [resendTimer, setResendTimer] = useState(0)
    const [error, setError] = useState("")
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])


    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer, remainingTime])

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => setRemainingTime((prev) => prev - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [remainingTime])

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(new Array(otpLength).fill(""))
            setError("")
            setResendTimer(30)
            setTimeout(() => {
                inputRefs.current[0]?.focus()
            }, 300)
        }
    }, [isOpen, otpLength])

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value
        if (!/^\d*$/.test(value)) return // Only allow digits

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1) // Take only the last digit
        setOtp(newOtp)
        setError("")

        // Auto-focus next input
        if (value && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, otpLength)
        const newOtp = [...otp]

        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i]
        }
        setOtp(newOtp)

        // Focus the next empty input or the last input
        const nextIndex = Math.min(pastedData.length, otpLength - 1)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleVerify = async () => {
        const otpString = otp.join("")
        if (otpString.length !== otpLength) {
            setError("Please enter all digits")
            return
        }

        setIsVerifying(true)
        setError("")

        try {
            await onVerifyOTP(otpString)
            // console.log('after')
            // onClose()
        } catch (err) {
            setError("Invalid verification code. Please try again.")
            console.log(err)
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResend = async () => {
        setIsResending(true)
        setError("")

        try {
            await onResendOTP()
            setResendTimer(30)
            setOtp(new Array(otpLength).fill(""))
        } catch (err) {
            setError("Failed to resend code. Please try again.")
            console.log(err)
        } finally {
            setIsResending(false)
        }
    }

    const isComplete = otp.every((digit) => digit !== "")

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </motion.button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                            >
                                {title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-600 dark:text-gray-400 text-sm"
                            >
                                {subtitle}
                            </motion.p>
                        </div>

                        {/* OTP Input Fields */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center gap-2 sm:gap-3 mb-6"
                        >
                            {otp.map((digit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Input
                                        ref={(el) => { inputRefs.current[index] = el }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                                        disabled={isVerifying}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="flex justify-center mb-4">
                            <p className="text-black">{`Remaining Time ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}</p>
                        </motion.div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-center mb-4"
                                >
                                    <p className="text-red-500 text-sm">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Verify Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6"
                        >
                            <Button
                                onClick={handleVerify}
                                disabled={!isComplete || isVerifying || remainingTime <= 0}
                                className="w-full h-12 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isVerifying ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </motion.div>
                                ) : (
                                    "Verify Code"
                                )}
                            </Button>
                        </motion.div>

                        {/* Resend Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{"Didn't receive the code?"}</p>
                            <Button
                                variant="ghost"
                                onClick={handleResend}
                                disabled={resendTimer > 0 || isResending}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isResending ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </motion.div>
                                ) : resendTimer > 0 ? (
                                    `Resend in ${resendTimer}s`
                                ) : (
                                    "Resend Code"
                                )}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
