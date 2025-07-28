export interface IuserLogoutUseCase {
    execute(token: string): Promise<boolean>
}