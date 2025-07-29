import { Request, Response } from "express";
import { IcreateImageUseCase } from "../../../domain/interface/useCaseInterfaces/image/createImageUseCaseInterface";
import { HttpStatus } from "../../../framework/constants/httpStatusCode";
import { ImageBufferType } from "../../../domain/interface/serviceInterfaces/cloudinaryServiceImageInterfaces";
import * as exifr from 'exifr'
export class CreateImageController {
    constructor(private createImageUseCase: IcreateImageUseCase) { }
    async handleCreateImage(req: Request, res: Response): Promise<void> {
        try {
            const file = req.file
            const { tags } = req.body
            const userId = (req as any).user.userId
            const parses = JSON.parse(tags)
            const parsedTags = parses.map((tag: string) => tag.trim());
            if (!file) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No image file provided" })
                return
            }
            const imageData: ImageBufferType = {
                imageBuffer: file.buffer,
                fileName: file.originalname,
                fileSize: file.size
            }

            const exif = await exifr.parse(file.buffer)
            console.log('this is the exif', exif)
            let takenAt: string | undefined = undefined;
            let location: {
                type: 'Point';
                coordinates: [number, number];
                address?: string;
            } | undefined = undefined;
            if (exif?.DateTimeOriginal) {
                takenAt = exif.DateTimeOriginal.toISOString();
            }

            if (exif?.latitude && exif?.longitude) {
                location = {
                    type: 'Point',
                    coordinates: [exif.longitude, exif.latitude] as [number, number], // GeoJSON expects [lng, lat]
                    address: undefined // or fetch address if you want
                };
            }

            const createdImage = await this.createImageUseCase.createImage({ ...imageData, takenAt }, parsedTags, userId, location)
            res.status(HttpStatus.CREATED).json({
                message: "Image created",
                createdImage
            })

        } catch (error) {
            console.log('error while creating image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error whiel creating image",
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}