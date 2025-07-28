import { ImageDTO, TimeGroupLabel } from "../../../entity/image/imageDTO";

export interface IfindImagesOfUser {
    findImages(userId: string, page: number, limit: number): Promise<{ images: Record<TimeGroupLabel, ImageDTO[]> | [], totalCount: number }>
}