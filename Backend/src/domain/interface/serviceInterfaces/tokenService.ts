export interface ItokenService {
    checkTokenBlackList(token: string): Promise<boolean>
}