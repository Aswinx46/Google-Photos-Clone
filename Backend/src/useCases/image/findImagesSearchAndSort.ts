import { TimeGroupLabel, ImageDTO } from "../../domain/entity/image/imageDTO";
import { IimageRepository } from "../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { IfindImagesSearchAndSort } from "../../domain/interface/useCaseInterfaces/image/findImagesSerachAndSortInterface";
import { generateSignedImageUrl } from "../../framework/services/cloudinaryService";
import { groupImagesByDate } from "../../framework/utils/groupImageUtil";
import { ImageMapper } from "../mappers/image/imageMapper";

export class FindImagesSearchAndSort implements IfindImagesSearchAndSort {
    constructor(private imageRepository: IimageRepository) { }
    async execute(userId: string, page: number, limit: number, name?: string, sort?: string): Promise<{ images: Record<TimeGroupLabel, ImageDTO[]> | []; totalCount: number; }> {
        const { images, totalCount } = await this.imageRepository.searchAndSorting(userId, page, limit, name, sort)
        if (images && images.length === 0) return { images: [], totalCount: 0 }
        const imagesWithSignedUrl = await Promise.all(
            images.map(async (item) => {
                const signedUrl = await generateSignedImageUrl(item.publicId)
                return {
                    ...item,
                    url: item.format === 'jpg' ? signedUrl : item.url
                }
            })
        )
        const mappedImages = await Promise.all(
            imagesWithSignedUrl.map((item) => ImageMapper.toDTO(item))
        )

        return { images: groupImagesByDate(mappedImages), totalCount }
    }
}