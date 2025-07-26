export interface DecodedTokenEntity {
    userId: string,
    iat: number,
    exp: number
}
export interface IjwtServiceInterface {
    createAccessToken(accessSecretKey: string, userId: string): string
    createRefreshToken(refreshSecretKey: string, userId: string): string
    verifyAccessToken(accessToken: string, accessSecretKey: string): any
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string): { userId: string } | null
    tokenDecode(accessToken: string): DecodedTokenEntity | null
}
