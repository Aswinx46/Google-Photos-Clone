import { Document, model, ObjectId } from "mongoose";
import { ImageEntity } from "../../../domain/entity/image/imageEntity";
import { imageSchema } from "../schema/imageSchema";

export interface IimageModel extends Omit<ImageEntity, '_id'>, Document {
    _id: ObjectId
}
export const imageModel = model<ImageEntity>('image', imageSchema)