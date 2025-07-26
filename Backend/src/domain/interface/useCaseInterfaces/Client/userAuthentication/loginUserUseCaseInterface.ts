import { UserDTO } from "../../../../entity/user/userDTO";

export interface IuserLoginUseCase {
    execute(email: string, password: string): Promise<{ user: UserDTO, accessToken: string, refreshToken: string }>
}