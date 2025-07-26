import { SendOtpController } from "../../adapters/controllers/authentication/signup/sendOtpController";
import { SignupController } from "../../adapters/controllers/authentication/signup/SignupController";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { SendOtpUseCase } from "../../useCases/userAuthentication/sendOtpUseCase";
import { SignupUseCase } from "../../useCases/userAuthentication/signupUserUseCase";
import { EmailService } from "../services/emailService";
import { HashPassword } from "../services/hashPassword";
import { OtpService } from "../services/otpService";

//-------------------------------------sendOtp User ---------------------------------
const otpService = new OtpService()
const emailService = new EmailService()
const userRepository = new UserRepository()
const sendOtpUseCase = new SendOtpUseCase(otpService, emailService, userRepository)
export const injectedSendOtpController = new SendOtpController(sendOtpUseCase)

//-------------------------------------verify otp and create user -------------------------------
const hashPassword = new HashPassword()
const signupUseCase = new SignupUseCase(userRepository, hashPassword)
export const injectedSignupController = new SignupController(sendOtpUseCase, signupUseCase)