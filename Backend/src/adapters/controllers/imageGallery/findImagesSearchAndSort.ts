import { Request, Response } from "express";
import { IfindImagesSearchAndSort } from "../../../domain/interface/useCaseInterfaces/image/findImagesSerachAndSortInterface";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../framework/constants/errorMessages";

export class FindImageSearchAndSortController {
    constructor(private findImageSearchAndSortUseCase: IfindImagesSearchAndSort) { }
    async handleSerachAndSort(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1
            const limit = parseInt(req.query.limit as string, 10) || 10
            const { name, sort } = req.query
            const userId = (req as any).user.userId
            const { images, totalCount } = await this.findImageSearchAndSortUseCase.execute(userId, page, limit, name as string, sort as string)
            res.status(HttpStatus.OK).json({
                message: "Images Fetched",
                images,
                page,
                limit,
                totalCount,
                hashMore: page * limit < totalCount
            })
        } catch (error) {
            console.log('error while finding the images with search and sort', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}