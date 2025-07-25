import { ObjectId } from "mongoose";

export interface AlbumEntity {
    _id?: ObjectId | string,
    name: string,
    description?: string,
    coverImage?: string,
    userId: ObjectId,
    imageIds: ObjectId[],
    createdAt: true,
    updatedAt: true
}