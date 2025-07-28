import { Request, Response } from "express";
import { IupdateImageUseCaseInterface } from "../../../domain/interface/useCaseInterfaces/image/updateImageUseCaseInterface";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../framework/constants/errorMessages";

export class updateImageController {
    constructor(private updateImageUseCase: IupdateImageUseCaseInterface) { }
    async handleUpdateImage(req: Request, res: Response): Promise<void> {
        try {
            const { imageId } = req.params
            const { name, tags } = req.body
            const updatedImage = await this.updateImageUseCase.execute(imageId, name, tags)
            res.status(HttpStatus.OK).json({ message: "Image Updated", updatedImage })
        } catch (error) {
            console.log('error while updating image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}