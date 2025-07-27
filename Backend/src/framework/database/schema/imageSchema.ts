import { Schema } from "mongoose";
import { ImageEntity } from "../../../domain/entity/image/imageEntity";

export const imageSchema = new Schema<ImageEntity>({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album',
        default: null,
        requried: false
    },
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    filesize: {
        type: Number,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            
        },
        coordinates: {
            type: [Number],
            required: false
        },
        address: {
            type: String,
            required: false
        }
    },
    tags: {
        type: [String],
        required: false
    },
    order: {
        type: Number,
        default: 0
    },
    takenAt: {
        type: Date,
        required: false
    },
    uploadDate: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    format:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

imageSchema.index({ location: '2dsphere' });