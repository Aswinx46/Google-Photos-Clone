import { NextFunction, Request, Response } from "express";
import { ItokenService } from "../../../domain/interface/serviceInterfaces/tokenService";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";

export const tokenBlackListCheckingMiddleware = (tokenService: ItokenService) => {
    return async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
            return
        }
        const token = authHeader.split(' ')[1]
        try {
            const isBlacklisted = await tokenService.checkTokenBlackList(token)
            if (isBlacklisted) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "This token is blacklisted", error: "This token is blacklisted" })
                return
            }
            next()
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid token.', error: error instanceof Error ? error.message : 'invalid Token' });
        }
    }
}