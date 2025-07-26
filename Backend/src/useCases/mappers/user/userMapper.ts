import { UserDTO } from "../../../domain/entity/user/userDTO";
import { UserEntity } from "../../../domain/entity/user/userEntity";

export class UserMapper {
    static toDTO(user: UserEntity): UserDTO {
        return {
            email: user.email,
            googleVerified: user.googleVerified,
            name: user.name,
            profileImage: user.profileImage,
            theme: user.theme,
            _id: user._id
        }
    }
}