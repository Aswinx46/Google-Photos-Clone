import { UserDTO } from "../../domain/entity/user/userDTO";
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/userRepositoryInterface";
import { IhashPassword } from "../../domain/interface/serviceInterfaces/hashPasswordInterface";
import { IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { IuserLoginUseCase } from "../../domain/interface/useCaseInterfaces/Client/userAuthentication/loginUserUseCaseInterface";
import { UserMapper } from "../mappers/user/userMapper";

export class UserLoginUseCase implements IuserLoginUseCase {
    constructor(private userRepository: IuserRepository, private jwtService: IjwtServiceInterface, private hashPassword: IhashPassword) { }
    async execute(email: string, password: string): Promise<{ user: UserDTO; accessToken: string; refreshToken: string; }> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new Error('No user found in this email id')
        const comparePassword = await this.hashPassword.comparePassword(password, user.password!)
        if (!comparePassword) throw new Error("Invalid Password")
        const accessSecretKey = process.env.ACCESSTOKEN_SECRET_KEY
        const refreshSecretKey = process.env.REFRESHTOKEN_SECRET_KEY
        if (!accessSecretKey || !refreshSecretKey) throw new Error("No token secrets provided")
        const accessToken = this.jwtService.createAccessToken(accessSecretKey, user._id?.toString()!)
        const refreshToken = this.jwtService.createRefreshToken(refreshSecretKey, user._id?.toString()!)
        return { user: UserMapper.toDTO(user), accessToken, refreshToken }
    }
}