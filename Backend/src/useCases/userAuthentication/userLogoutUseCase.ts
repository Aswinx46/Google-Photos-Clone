import { IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { IredisService } from "../../domain/interface/serviceInterfaces/redisServiceInterface";
import { IuserLogoutUseCase } from "../../domain/interface/useCaseInterfaces/Client/userAuthentication/clientLogoutUseCaseInterface";

export class UserLogoutUseCase implements IuserLogoutUseCase {
    constructor(private jwtService: IjwtServiceInterface, private redisService: IredisService) { }
    async execute(token: string): Promise<boolean> {
        const decode = await this.jwtService.tokenDecode(token)
        const exp = decode?.exp
        if (!exp) throw new Error("Invalid Token")
        const currentTime = Math.floor(Date.now() / 1000)
        const ttl = exp - currentTime
        if (ttl > 0) {
            await this.redisService.set(`blackList:${token}`, ttl, 'true')
            return true
        }
        return false
    }
}