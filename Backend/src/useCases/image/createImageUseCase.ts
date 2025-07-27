import { ImageEntity } from "../../domain/entity/image/imageEntity";
import { IimageRepository } from "../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { IcreateImageUseCase } from "../../domain/interface/useCaseInterfaces/image/createImageUseCaseInterface";
import { generateSignedImageUrl, uploadImageToCloudinary } from "../../framework/services/cloudinaryService";
import { ImageBufferType } from "../../domain/interface/serviceInterfaces/cloudinaryServiceImageInterfaces";
import { ImageMapper } from "../mappers/image/imageMapper";
import { ImageDTO } from "../../domain/entity/image/imageDTO";

export class CreateImageUseCase implements IcreateImageUseCase {
    constructor(private imageRepository: IimageRepository) { }
    async createImage(image: ImageBufferType, tags: string[], userId: string, location?: ImageEntity['location']): Promise<ImageDTO> {
        const { publicId, secureUrl } = await uploadImageToCloudinary(image)
        const imageCreation: ImageEntity = {
            userId,
            filename: image.fileName,
            filesize: image.fileSize,
            url: secureUrl,
            publicId,
            order: 0,
            tags,
            uploadDate: new Date(),

        }
        if (location) {
            console.log('inside if case')
            imageCreation.location = location
        }
        if (image.takenAt) {
            imageCreation.takenAt = new Date(image.takenAt)
        }

        const createdImage = await this.imageRepository.createImage(imageCreation)
        if (!createdImage) throw new Error("Error while creating image")
        const mappedImage = ImageMapper.toDTO(createdImage)
        const signedUrl = await generateSignedImageUrl(createdImage.publicId)
        mappedImage.url = signedUrl
        return mappedImage
    }
}