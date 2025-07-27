import { HomeLayout } from '../component/ImageLayout'
import type { ImageEntity } from '@/types/images/ImageType'
import type { ImageUploadPropsInterface } from '../interfaces/ImageUploadFunctionProps'

const mockImages: ImageEntity[] = [
    {
        _id: "1",
        userId: "user1" as any,
        filename: "sunset-beach.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 2048576,
        takenAt: new Date("2024-01-15T18:30:00Z"),
        location: {
            lat: 34.0522,
            lng: -118.2437,
            address: "Santa Monica Beach, CA",
        },
        tags: ["sunset", "beach", "nature"],
        album: "album1" as any,
        order: 1,
        uploadDate: new Date("2024-01-16T10:00:00Z"),
    },
    {
        _id: "2",
        userId: "user1" as any,
        filename: "mountain-hike.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 3145728,
        takenAt: new Date("2024-01-10T14:20:00Z"),
        location: {
            lat: 40.7589,
            lng: -111.8883,
            address: "Park City, Utah",
        },
        tags: ["mountain", "hiking", "adventure"],
        album: "album1" as any,
        order: 2,
        uploadDate: new Date("2024-01-11T09:15:00Z"),
    },
    {
        _id: "3",
        userId: "user1" as any,
        filename: "city-lights.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 1572864,
        takenAt: new Date("2024-01-20T21:45:00Z"),
        tags: ["city", "night", "urban"],
        album: "album2" as any,
        order: 1,
        uploadDate: new Date("2024-01-21T08:30:00Z"),
    },
    {
        _id: "4",
        userId: "user1" as any,
        filename: "coffee-morning.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 1048576,
        takenAt: new Date("2024-01-25T08:15:00Z"),
        tags: ["coffee", "morning", "lifestyle"],
        album: "album2" as any,
        order: 2,
        uploadDate: new Date("2024-01-25T12:00:00Z"),
    },
    {
        _id: "5",
        userId: "user1" as any,
        filename: "forest-path.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 2621440,
        takenAt: new Date("2024-01-12T16:30:00Z"),
        location: {
            lat: 45.3311,
            lng: -121.7113,
            address: "Mount Hood National Forest, OR",
        },
        tags: ["forest", "nature", "peaceful"],
        album: "album1" as any,
        order: 3,
        uploadDate: new Date("2024-01-13T11:20:00Z"),
    },
    {
        _id: "6",
        userId: "user1" as any,
        filename: "street-art.jpg",
        url: "/placeholder.svg?height=400&width=400",
        filesize: 1835008,
        takenAt: new Date("2024-01-18T15:45:00Z"),
        tags: ["art", "street", "colorful"],
        album: "album2" as any,
        order: 3,
        uploadDate: new Date("2024-01-19T14:10:00Z"),
    },
]
function Home() {


    const handleImageUpload = (image:ImageUploadPropsInterface) => {

    }

    return (
        <div>
            <HomeLayout images={mockImages} isLoading={false} onUpload={handleImageUpload} />
        </div>
    )
}

export default Home
