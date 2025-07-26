import { ObjectId } from "mongoose";
import { UserEntity } from "../../../domain/entity/user/userEntity";
import { IuserRepository } from "../../../domain/interface/repositoryInterfaces/userRepositoryInterface";
import { userModel } from "../../../framework/database/models/userModel";
export class UserRepository implements IuserRepository {
    async findByEmail(email: string): Promise<UserEntity | null> {
        return await userModel.findOne({ email })
    }
    async findById(id: string | ObjectId): Promise<UserEntity | null> {
        return await userModel.findById(id)
    }
    async createUser(user: UserEntity): Promise<UserEntity> {
        return await userModel.create(user)
    }
}