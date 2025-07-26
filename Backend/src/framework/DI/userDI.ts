import { UserLoginController } from "../../adapters/controllers/authentication/login/userLoginController";
import { RefreshTokenController } from "../../adapters/controllers/authentication/refreshToken/refreshTokenController";
import { SendOtpController } from "../../adapters/controllers/authentication/signup/sendOtpController";
import { SignupController } from "../../adapters/controllers/authentication/signup/SignupController";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { RefreshTokenUseCase } from "../../useCases/userAuthentication/refreshTokenUseCase";
import { SendOtpUseCase } from "../../useCases/userAuthentication/sendOtpUseCase";
import { SignupUseCase } from "../../useCases/userAuthentication/signupUserUseCase";
import { UserLoginUseCase } from "../../useCases/userAuthentication/userLoginUseCase";
import { EmailService } from "../services/emailService";
import { HashPassword } from "../services/hashPassword";
import { JwtService } from "../services/jwtService";
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


//------------------------------------- User Login ---------------------------------
const jwtService = new JwtService()
const userLoginUseCase = new UserLoginUseCase(userRepository, jwtService, hashPassword)
export const injectedUserLoginController = new UserLoginController(userLoginUseCase)

//------------------------------------------refreshToken ----------------------------------
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService, userRepository)
export const injectedRefreshTokenController = new RefreshTokenController(refreshTokenUseCase)