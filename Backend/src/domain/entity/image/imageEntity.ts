import { ObjectId } from "mongoose";

export interface ImageEntity {
    _id?: ObjectId | string,
    userId: ObjectId,
    filename: string,
    url: string,
    filesize: number,
    takenAt: Date,
    location?: {
        lat: Number,
        lng: Number,
        address: String
    },
    tags: [string],
    album: ObjectId,
    order: number,
    uploadDate: Date
}