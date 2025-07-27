

export interface ImageEntity {
    _id?: string
    userId: string
    filename: string
    url: string
    filesize: number
    takenAt: Date
    location?: {
        lat: number
        lng: number
        address: string
    }
    tags: string[]
    album: string
    order: number
    uploadDate: Date
}
