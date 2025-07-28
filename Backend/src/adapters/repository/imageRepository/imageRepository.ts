import { ImageEntity } from "../../../domain/entity/image/imageEntity";
import { IimageRepository } from "../../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { imageModel } from "../../../framework/database/models/imageModel";

export class ImageRepository implements IimageRepository {
    async createImage(image: ImageEntity): Promise<ImageEntity | null> {
        return await imageModel.create(image)
    }
    async findImagesOfUser(userId: string, page: number, limit: number): Promise<{ images: ImageEntity[] | [], totalCount: number }> {
        const skip = (page - 1) * limit
        const images = await imageModel.find({ userId }).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean()
        const totalCount = await imageModel.countDocuments({ userId })
        return { images, totalCount }
    }
    async updateImage(imageId: string, name: string, tags: string[]): Promise<ImageEntity | null> {
        return await imageModel.findByIdAndUpdate(imageId, { $set: { filename: name, tags } }, { new: true })
    }
    async deleteImage(imageId: string): Promise<ImageEntity | null> {
        return await imageModel.findByIdAndDelete(imageId)

    }
}