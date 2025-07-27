import { ImageEntity } from "./imageEntity";

export interface ImageDTO extends Omit<ImageEntity, '_v' | 'createdAt' | 'updatedAt' | 'publicId'> { }