import { ImageDTO } from "../../domain/entity/image/imageDTO";
import { IimageRepository } from "../../domain/interface/repositoryInterfaces/imageRepositoryInterface";
import { IfindImagesOfUser } from "../../domain/interface/useCaseInterfaces/image/findImagesUseCase";
import { generateSignedImageUrl } from "../../framework/services/cloudinaryService";
import { ImageMapper } from "../mappers/image/imageMapper";

export class FindImagesOfUser implements IfindImagesOfUser {
    constructor(private ImageRepository: IimageRepository) { }
    async findImages(userId: string, page: number, limit: number): Promise<{ images: ImageDTO[] | [], totalCount: number }> {
        const { images, totalCount } = await this.ImageRepository.findImagesOfUser(userId, page, limit)
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
        return { images: mappedImages, totalCount }
    }
}