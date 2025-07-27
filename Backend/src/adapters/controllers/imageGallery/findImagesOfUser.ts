import { Request, Response } from "express";
import { IfindImagesOfUser } from "../../../domain/interface/useCaseInterfaces/image/findImagesUseCase";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";

export class FindImagesOfUserController {
    constructor(private FindImageOfUser: IfindImagesOfUser) { }
    async handleFindImagesOfUser(req: Request, res: Response): Promise<void> {
        try {

            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 8
            const userId = (req as any).user.userId
            const { images, totalCount } = await this.FindImageOfUser.findImages(userId, page, limit)
            res.status(HttpStatus.OK).json({
                message: "Images Fetched",
                images,
                page,
                limit,
                totalCount,
                hashMore: page * limit < totalCount
            })
        } catch (error) {
            console.log('error while finding the images of the user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while finding the images of the user",
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}