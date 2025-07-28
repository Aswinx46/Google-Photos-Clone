import { Request, Response } from "express";
import { IuserLogoutUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/clientLogoutUseCaseInterface";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";

export class UserLogoutController {
    constructor(private userLogoutUseCase: IuserLogoutUseCase) { }
    async handleUserLogoutUseCase(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Authorization header missing' });
                return;
            }
            const token = authHeader.split(' ')[1]
            const logout = await this.userLogoutUseCase.execute(token)
            if (!logout) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while loging out' });
                return;
            }
            res.status(HttpStatus.NO_CONTENT).json({ messgae: "logout done" })
        } catch (error) {
            console.log('error while handling userLogout', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}