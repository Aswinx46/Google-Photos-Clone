import { ObjectId } from "mongoose";

export interface ImageEntity {
    _id?: ObjectId | string,
    userId: ObjectId | string,
    filename: string,
    url: string,
    publicId: string,
    filesize: number,
    takenAt?: Date,
    location?: {
        type: string,
        coordinates: [number, number];
        address?: string,
    },
    format:string
    tags: string[],
    album?: ObjectId,
    order: number,
    uploadDate: Date
}