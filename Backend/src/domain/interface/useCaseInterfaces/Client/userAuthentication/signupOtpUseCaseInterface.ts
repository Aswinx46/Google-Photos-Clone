import { UserDTO } from "../../../../entity/user/userDTO";
import { UserEntity } from "../../../../entity/user/userEntity";

export interface IsignUpUseCase {
    createUser(user: UserEntity): Promise<UserDTO>
}