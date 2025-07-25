import { model, ObjectId } from "mongoose";
import { UserEntity } from "../../../domain/entity/user/userEntity";
import { userSchema } from "../schema/userSchema";

export interface IuserModel extends Omit<UserEntity, '_id'>, Document {
    _id: ObjectId
}
export const userModel = model<UserEntity>("user", userSchema)