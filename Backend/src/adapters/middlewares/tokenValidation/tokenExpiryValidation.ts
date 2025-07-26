import { NextFunction, Request, Response } from "express";
import { IjwtServiceInterface } from "../../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";

export const tokenTimeExpiryValidationMiddleware = (jwtService: IjwtServiceInterface) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'No token provided' });
            return
        }
        const token = authHeader.split(' ')[1]
        try {
            const decoded =  jwtService.tokenDecode(token)
            if (!decoded || !decoded.exp) {
                res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token expiration done' })
                return
            }
            const currentTime = Math.floor(Date.now() / 1000)
            const timeleft = decoded.exp - currentTime
            if (timeleft <= 0) {
                res.status(HttpStatus.UNAUTHORIZED).json({ error: "Token Expired" })
                return
            }
            next()
        } catch (error) {
            console.log('error while token expiry validation', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error instanceof Error ? error.message : 'error while checking token expiry' })
        }
    }
}