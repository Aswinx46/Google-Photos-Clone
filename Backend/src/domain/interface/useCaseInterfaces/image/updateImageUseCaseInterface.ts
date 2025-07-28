import { ImageDTO } from "../../../entity/image/imageDTO";

export interface IupdateImageUseCaseInterface {
    execute(imageId: string, name: string, tags: string[]):Promise<ImageDTO>
}