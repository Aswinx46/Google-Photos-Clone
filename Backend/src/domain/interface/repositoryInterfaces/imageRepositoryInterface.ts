import { ImageEntity } from "../../entity/image/imageEntity";

export interface IimageRepository {
    createImage(image: ImageEntity): Promise<ImageEntity | null>
}