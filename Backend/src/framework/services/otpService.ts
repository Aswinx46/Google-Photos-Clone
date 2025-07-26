import { IotpService } from "../../domain/interface/serviceInterfaces/otpServiceInterface";
import { RedisService } from "./redisService";

export class OtpService implements IotpService {
    private redis: RedisService
    constructor() {
        this.redis = new RedisService()
    }
    genarateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
    async storeOtp(email: string, otp: string): Promise<void> {
        await this.redis.set(email, 300, otp)
    }
    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const sendedOtp = await this.redis.get(email)
        if (!sendedOtp || sendedOtp !== otp) {
            return false
        }
        await this.redis.del(email)
        return true
    }

}