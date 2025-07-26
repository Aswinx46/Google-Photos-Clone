import { Request, Response } from "express";
import { IsendOtpUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/sendOtpUseCaseInterface";
import { IsignUpUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/signupOtpUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { signupSchema } from "../../../../framework/validator/user/signupValidator";

export class SignupController {
    constructor(private sendOtpUseCase: IsendOtpUseCase, private signupUseCase: IsignUpUseCase) { }
    async handleUserCreation(req: Request, res: Response): Promise<void> {
        try {
            const { user, enteredOtp } = req.body
            const validateUser = signupSchema.safeParse(user)
            if (!validateUser.success) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Validation Failed",
                    error: validateUser.error.flatten().fieldErrors
                })
                return
            }
            const verifyOtp = await this.sendOtpUseCase.verifyOtp(user.email, enteredOtp)
            if (!verifyOtp) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid OTP", error: "Invalid OTP" })
                return
            }
            const createdUser = await this.signupUseCase.createUser(user)
            res.status(HttpStatus.CREATED).json({ message: "User Created", user: createdUser })
        } catch (error) {
            console.log('Error while handling creating User', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error while creating user", error: error instanceof Error ? error.message : 'error while creating user' })
        }
    }
}