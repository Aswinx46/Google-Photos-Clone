import { UserLoginController } from "../../adapters/controllers/authentication/login/userLoginController";
import { RefreshTokenController } from "../../adapters/controllers/authentication/refreshToken/refreshTokenController";
import { SendOtpController } from "../../adapters/controllers/authentication/signup/sendOtpController";
import { SignupController } from "../../adapters/controllers/authentication/signup/SignupController";
import { CreateImageController } from "../../adapters/controllers/imageGallery/createImageController";
import { DeleteImageController } from "../../adapters/controllers/imageGallery/deleteImageController";
import { FindImagesOfUserController } from "../../adapters/controllers/imageGallery/findImagesOfUser";
import { updateImageController } from "../../adapters/controllers/imageGallery/updateImageController";
import { ImageRepository } from "../../adapters/repository/imageRepository/imageRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { CreateImageUseCase } from "../../useCases/image/createImageUseCase";
import { DeleteImageUseCase } from "../../useCases/image/deleteImageUseCase";
import { FindImagesOfUser } from "../../useCases/image/findImagesOfUser";
import { UpdateImageUseCase } from "../../useCases/image/updateImageUseCase";
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

//------------------------------------------Create images -----------------------------
const imageRepository = new ImageRepository()
const createImageUseCase = new CreateImageUseCase(imageRepository)
export const injectedCreateImageController = new CreateImageController(createImageUseCase)

//---------------------------------------------find images ------------------------
const findImagesOfUser = new FindImagesOfUser(imageRepository)
export const injectedFindImagesOfUserController = new FindImagesOfUserController(findImagesOfUser)

//-----------------------------------------------update Image ------------------------
const updateImageUseCase = new UpdateImageUseCase(imageRepository)
export const injectedUpdateImageController = new updateImageController(updateImageUseCase)

//-------------------------------------Delete Image ---------------------------
const deleteImageUseCase = new DeleteImageUseCase(imageRepository)
export const injectedDeleteImageController = new DeleteImageController(deleteImageUseCase)