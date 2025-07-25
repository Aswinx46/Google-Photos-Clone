import { ObjectId } from "mongoose";

export interface UserEntity {
    _id?: ObjectId | string,
    name: string,
    email: string,
    password?: string,
    googleVerified: boolean,
    profileImage:string,
    theme: "dark" | "light"
}