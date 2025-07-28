import { IimageRepository } from "../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { IdeleteImageUseCase } from "../../domain/interface/useCaseInterfaces/image/deleteImageUseCaseInterface";
import { deleteImageFromCloudinary } from "../../framework/services/cloudinaryService";

export class DeleteImageUseCase implements IdeleteImageUseCase {
    constructor(private imageRepository: IimageRepository) { }
    async deleteImage(imageId: string): Promise<void> {
        const deletedImage = await this.imageRepository.deleteImage(imageId)
        if (!deletedImage) throw new Error("No image found in this id")
        const deleteFromCloudinary = await deleteImageFromCloudinary(deletedImage.publicId)      
    }
}