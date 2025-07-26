import { IredisService } from "../../domain/interface/serviceInterfaces/redisServiceInterface";
import { ItokenService } from "../../domain/interface/serviceInterfaces/tokenService";

export class TokenService implements ItokenService {
    constructor(private redisService: IredisService) { }
    async checkTokenBlackList(token: string): Promise<boolean> {
        const result = await this.redisService.get(`blacklist:${token}`)
        return !!result
    }
}