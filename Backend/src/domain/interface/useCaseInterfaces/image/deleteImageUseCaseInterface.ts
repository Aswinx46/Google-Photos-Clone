export interface IdeleteImageUseCase {
    deleteImage(imageId: string): Promise<void>
}