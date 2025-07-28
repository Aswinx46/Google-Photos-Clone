import { Request, Response, Router } from "express";
import { injectedCreateImageController, injectedDeleteImageController, injectedFindImagesOfUserController, injectedRefreshTokenController, injectedSendOtpController, injectedSignupController, injectedUpdateImageController, injectedUserLoginController } from "../../DI/userDI";
import { injectedTokenBlacklistCheckingMiddlware, injectedTokenExpiryValidationMiddleware } from "../../DI/serviceDI";
import { upload } from '../../../adapters/middlewares/multerMiddleware/MulterMiddleware'
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
        this.userRoute.post('/login', (req: Request, res: Response) => {
            injectedUserLoginController.handleUserLogin(req, res)
        })
        this.userRoute.post('/refreshToken', (req: Request, res: Response) => {
            injectedRefreshTokenController.handleRefreshToken(req, res)
        })
        this.userRoute.route('/images').post(injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddlware, upload.single('file'), (req: Request, res: Response) => {
            injectedCreateImageController.handleCreateImage(req, res)
        }).get(injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddlware, (req: Request, res: Response) => {
            injectedFindImagesOfUserController.handleFindImagesOfUser(req, res)
        })
        this.userRoute.route('/images/:imageId').patch(injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddlware, (req: Request, res: Response) => {
            injectedUpdateImageController.handleUpdateImage(req, res)
        }).delete(injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddlware, (req: Request, res: Response) => {
            injectedDeleteImageController.handleDelete(req, res)
        })
    }
}