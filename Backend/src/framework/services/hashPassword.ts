import bcrypt from 'bcrypt'
import { IhashPassword } from '../../domain/interface/serviceInterfaces/hashPasswordInterface';
export class HashPassword implements IhashPassword {
    async comparePassword(password: string, passwordInDb: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordInDb)
    }
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}