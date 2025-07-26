import { UserMapper } from "../mappers/user/userMapper";
import { UserDTO } from "../../domain/entity/user/userDTO";
import { UserEntity } from "../../domain/entity/user/userEntity";
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/userRepositoryInterface";
import { IhashPassword } from "../../domain/interface/serviceInterfaces/hashPasswordInterface";
import { IsignUpUseCase } from "../../domain/interface/useCaseInterfaces/Client/userAuthentication/signupOtpUseCaseInterface";

export class SignupUseCase implements IsignUpUseCase {
    constructor(private UserRepository: IuserRepository, private hashpassword: IhashPassword) { }
    async createUser(user: UserEntity): Promise<UserDTO> {
        const oldClient = await this.UserRepository.findByEmail(user.email)
        if (oldClient) throw new Error("Already User Exist in this Email")

        const hashedPassword = await this.hashpassword.hashPassword(user.password!)
        if (!hashedPassword) throw new Error("Error while hashing password")
        const newClient = await this.UserRepository.createUser({ ...user, password: hashedPassword })
        return UserMapper.toDTO(newClient)
    }
}