import { Request, Response } from "express";
import { IsendOtpUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/sendOtpUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";

export class SendOtpController {
    constructor(private sendOtpUseCase: IsendOtpUseCase) { }
    async handleSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email?.trim();
            if (!email || !email.includes("@")) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "Missing user data or email" });
                return;
            }
            await this.sendOtpUseCase.execute(email)
            res.status(HttpStatus.OK).json({ message: "OTP Sended" })
        } catch (error) {
            console.log('error while sending OTP', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error while sending OTP", error: error instanceof Error ? error.message : "unknown error" })
        }
    }
}