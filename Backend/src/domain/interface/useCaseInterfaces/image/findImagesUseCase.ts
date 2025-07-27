import { ImageDTO } from "../../../entity/image/imageDTO";

export interface IfindImagesOfUser {
    findImages(userId: string, page: number, limit: number): Promise<{ images: ImageDTO[] | [], totalCount: number }>
}