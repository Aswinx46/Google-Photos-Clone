import { ObjectId } from "mongoose";
import { AlbumEntity } from "../../../domain/entity/album/albumEntity";

export interface IalbumModel extends Omit<AlbumEntity, '_id'>, Document {
    _id: ObjectId
}