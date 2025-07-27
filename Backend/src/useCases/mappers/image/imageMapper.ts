import { ImageDTO } from "../../../domain/entity/image/imageDTO";
import { ImageEntity } from "../../../domain/entity/image/imageEntity";

export class ImageMapper {
    static toDTO(image: ImageEntity): ImageDTO {
        return {
            filename: image.filename,
            filesize: image.filesize,
            order: image.order,
            tags: image.tags,
            uploadDate: image.uploadDate,
            url: image.url,
            userId: image.userId,
            _id: image._id,
            album: image.album,
            location: image.location,
            takenAt: image.takenAt
        }
    }
}