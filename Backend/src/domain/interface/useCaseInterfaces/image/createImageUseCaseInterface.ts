import { ImageDTO } from "../../../entity/image/imageDTO";
import { ImageEntity } from "../../../entity/image/imageEntity";
import { ImageBufferType } from "../../serviceInterfaces/cloudinaryServiceImageInterfaces";

export interface IcreateImageUseCase {
    createImage(image: ImageBufferType, tags: string[], userId: string , location?:ImageEntity['location']): Promise<ImageDTO>
}