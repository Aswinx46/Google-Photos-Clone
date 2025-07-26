import { Request, Response } from "express";
import { IuserLoginUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/loginUserUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";

import { setTokenInCookie } from "../../../../framework/services/setTokenInCookie";
import { loginSchema } from "../../../../framework/validator/user/loginValidator";

export class UserLoginController {
    constructor(private userLoginUseCase: IuserLoginUseCase) { }
    async handleUserLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body

            const verifydata = loginSchema.safeParse({ email, password })
            if (!verifydata.success) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Invalid User Input",
                    error: verifydata.error.flatten().fieldErrors
                })
                return
            }
            const { user, accessToken, refreshToken } = await this.userLoginUseCase.execute(email, password)
            setTokenInCookie(res, refreshToken)
            res.status(HttpStatus.OK).json({ message: "Login Successfull", user, accessToken })
        } catch (error) {
            console.log('error while handling user login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while user login",
                error: error instanceof Error ? error.message : 'error while user login'
            })
        }
    }
}