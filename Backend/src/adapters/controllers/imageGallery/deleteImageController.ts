import { Request, Response } from "express";
import { IdeleteImageUseCase } from "../../../domain/interface/useCaseInterfaces/image/deleteImageUseCaseInterface";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../framework/constants/errorMessages";

export class DeleteImageController {
    constructor(private deleteImageUseCase: IdeleteImageUseCase) { }
    public async handleDelete(req: Request, res: Response): Promise<void> {
        try {
            const { imageId } = req.params
            await this.deleteImageUseCase.deleteImage(imageId)
            res.status(HttpStatus.NO_CONTENT).json({ message: "Deleted" })
        } catch (error) {
            console.log('error while deleting the image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : "Something went wrong"
            })
        }
    }
}