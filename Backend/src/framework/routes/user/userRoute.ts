import { Request, Response, Router } from "express";
import { injectedSendOtpController, injectedSignupController } from "../../DI/userDI";

export class UserRoute {
    public userRoute: Router
    constructor() {
        this.userRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.userRoute.post('/send-otp', (req: Request, res: Response) => {
            injectedSendOtpController.handleSendOtp(req, res)
        })
        this.userRoute.post('/signup', (req: Request, res: Response) => {
            injectedSignupController.handleUserCreation(req, res)
        })
    }
}