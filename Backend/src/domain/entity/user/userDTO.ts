import { UserEntity } from "./userEntity";

export interface UserDTO extends Omit<UserEntity, 'password' | '_v' | 'createdAt' | 'updatedAt'> { }
