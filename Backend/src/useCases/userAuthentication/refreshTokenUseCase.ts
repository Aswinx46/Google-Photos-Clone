import { IuserRepository } from "../../domain/interface/repositoryInterfaces/userRepositoryInterface";
import { IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { IrefreshTokenUseCase } from "../../domain/interface/useCaseInterfaces/Client/userAuthentication/refreshTokenUseCaseInterface";

export class RefreshTokenUseCase implements IrefreshTokenUseCase {
    constructor(private jwtService: IjwtServiceInterface, private userRepository: IuserRepository) { }
    async execute(token: string): Promise<string> {
        const payload = this.jwtService.verifyRefreshToken(token, process.env.REFRESHTOKEN_SECRET_KEY as string)
        if (!payload) throw new Error("Invalid or expired refresh token")
        const user = await this.userRepository.findById(payload.userId)
        if (!user) throw new Error("User no longer exists")
        const newAccessToken = this.jwtService.createAccessToken(process.env.ACCESSTOKEN_SECRET_KEY as string, payload.userId)
        return newAccessToken
    }
}