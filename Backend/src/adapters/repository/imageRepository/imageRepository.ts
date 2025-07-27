import { ImageEntity } from "../../../domain/entity/image/imageEntity";
import { IimageRepository } from "../../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { imageModel } from "../../../framework/database/models/imageModel";

export class ImageRepository implements IimageRepository {
    async createImage(image: ImageEntity): Promise<ImageEntity | null> {
        return await imageModel.create(image)
    }
}