import { Schema } from "mongoose";
import { AlbumEntity } from "../../../domain/entity/album/albumEntity";

export const albumSchema = new Schema<AlbumEntity>({
    coverImage: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageIds: [{
        type: Schema.Types.ObjectId,
        ref: "image",
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})