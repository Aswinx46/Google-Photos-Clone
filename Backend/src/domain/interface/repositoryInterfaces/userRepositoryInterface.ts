import { ObjectId } from "mongoose";
import { UserEntity } from "../../entity/user/userEntity";

export interface IuserRepository {
    findById(id: string | ObjectId): Promise<UserEntity | null>
    findByEmail(email: string): Promise<UserEntity | null>
    createUser(user:UserEntity):Promise<UserEntity>
}