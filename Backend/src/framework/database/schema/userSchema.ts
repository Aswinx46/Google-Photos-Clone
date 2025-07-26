import { Schema } from "mongoose";
import { UserEntity } from "../../../domain/entity/user/userEntity";

export const userSchema = new Schema<UserEntity>({
    email: {
        type: String,
        required: true
    },
    googleVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'light'
    },
    profileImage: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

