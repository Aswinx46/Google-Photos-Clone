import { ImageEntity } from "../../entity/image/imageEntity";

export interface IimageRepository {
    createImage(image: ImageEntity): Promise<ImageEntity | null>
    findImagesOfUser(userId: string, page: number, limit: number): Promise<{ images: ImageEntity[] | [], totalCount: number }>
}