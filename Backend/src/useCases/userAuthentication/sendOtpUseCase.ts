import { IuserRepository } from "../../domain/interface/repositoryInterfaces/userRepositoryInterface";
import { IemailService } from "../../domain/interface/serviceInterfaces/emailServiceInterface";
import { IotpService } from "../../domain/interface/serviceInterfaces/otpServiceInterface";
import { IsendOtpUseCase } from "../../domain/interface/useCaseInterfaces/Client/userAuthentication/sendOtpUseCaseInterface";


export class SendOtpUseCase implements IsendOtpUseCase {
    private otpService: IotpService
    private emailService: IemailService
    private userRepository: IuserRepository
    constructor(otpService: IotpService, emailService: IemailService, userRepository: IuserRepository) {
        this.otpService = otpService
        this.emailService = emailService
        this.userRepository = userRepository
    }
    async execute(email: string): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) throw new Error("Email Already Exist")
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        await this.emailService.sendEmailOtp(email, otp)
    }
    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
        const verify = await this.otpService.verifyOtp(email, enteredOtp)
        if (!verify) throw new Error("Invalid OTP")
        return verify
    }
    async resendOtp(email: string): Promise<void> {
        const otp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, otp)
        await this.emailService.sendEmailOtp(email, otp)
    }

}