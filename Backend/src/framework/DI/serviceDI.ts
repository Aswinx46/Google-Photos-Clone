import { tokenBlackListCheckingMiddleware } from "../../adapters/middlewares/tokenValidation/tokenBlackListingValidation";
import { tokenTimeExpiryValidationMiddleware } from "../../adapters/middlewares/tokenValidation/tokenExpiryValidation";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { TokenService } from "../services/tokenService";

// -------------------------------token checking middleware -------------------
const jwtService = new JwtService()
export const injectedTokenExpiryValidationMiddleware = tokenTimeExpiryValidationMiddleware(jwtService)

//------------------------------- token blacklist checking middleware ----------------------------
const redisService = new RedisService()
const tokenService = new TokenService(redisService)
export const injectedTokenBlacklistCheckingMiddlware = tokenBlackListCheckingMiddleware(tokenService)