import { Request, Response } from "express";
import { IrefreshTokenUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/userAuthentication/refreshTokenUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";

export class RefreshTokenController {
    constructor(private refreshTokenUseCase: IrefreshTokenUseCase) { }
    async handleRefreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No refreshToken found" })
                return
            }
            const newAccessToken = await this.refreshTokenUseCase.execute(refreshToken)
            res.status(HttpStatus.OK).json({ message: "New Access token created", newAccessToken })
        } catch (error) {
            console.log('error while creating new Access token', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating new Access token",
                error: error instanceof Error ? error.message : "error while creating new AccessToken"
            })
        }
    }
}