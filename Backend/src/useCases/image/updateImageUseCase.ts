import { ImageDTO } from "../../domain/entity/image/imageDTO";
import { IimageRepository } from "../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { IupdateImageUseCaseInterface } from "../../domain/interface/useCaseInterfaces/image/updateImageUseCaseInterface";
import { generateSignedImageUrl } from "../../framework/services/cloudinaryService";
import { ImageMapper } from "../mappers/image/imageMapper";

export class UpdateImageUseCase implements IupdateImageUseCaseInterface {
    constructor(private imageRepository: IimageRepository) { }
    async execute(imageId: string, name: string, tags: string[]): Promise<ImageDTO> {
        console.log('this is the tags',tags)
        const updatedImage = await this.imageRepository.updateImage(imageId, name, tags)
        if (!updatedImage) throw new Error("No image found in this ID")

        const mappedImage = await ImageMapper.toDTO(updatedImage)

        if (updatedImage.format === 'jpg') {
            const signedUrl = await generateSignedImageUrl(updatedImage.publicId)
            mappedImage.url = signedUrl
        }
        return mappedImage
    }
}