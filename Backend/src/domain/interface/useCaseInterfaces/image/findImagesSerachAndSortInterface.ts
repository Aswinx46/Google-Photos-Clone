import { ImageDTO, TimeGroupLabel } from "../../../entity/image/imageDTO";

export interface IfindImagesSearchAndSort {
    execute(userId: string, page: number, limit: number, name?: string, sort?: string): Promise<{ images: Record<TimeGroupLabel, ImageDTO[]> | [], totalCount: number }>
}