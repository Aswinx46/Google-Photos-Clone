
import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import type { ImageEntity } from "@/types/images/ImageType"
import { ImageCard } from "./ImageCard"
import ImageModal from "./ImageModal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid3X3, Grid2X2, List, Upload, LogOut } from "lucide-react"
import { ImagePreviewModal } from "./imagePreview"
import type { ImageUploadPropsInterface } from "../interfaces/ImageUploadFunctionProps"
import { toast } from "sonner"
import FullViewImage from "./FullViewImage"
import useDebounce from "../hooks/debouncingHook"
import { useUserLogout } from "../hooks/galleryHooks"
import { useDispatch } from "react-redux"
import { removeUser } from "@/reduxstrore/slices/userSlice"
import { removeToken } from "@/reduxstrore/slices/tokenSlice"
import { useNavigate } from "react-router-dom"

interface HomeLayoutProps {
    images: Record<string, ImageEntity[]>
    isLoading?: boolean
    onUpload: (image: ImageUploadPropsInterface) => void
    ref: (node?: Element | null) => void
    isFetchingNextPage: boolean,
    hasNextPage: boolean,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setSort: React.Dispatch<React.SetStateAction<"newest" | "oldest">>
}

type ViewMode = "grid-large" | "grid-small" | "list"

function HomeLayout({ images, isLoading = false, onUpload, ref, isFetchingNextPage, hasNextPage, setName, setSort }: HomeLayoutProps) {
    const sortOptions = ["newest", "oldest"] as const;
    const userLogoutMutation = useUserLogout()
    const [showSortOptions, setShowSortOptions] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<ImageEntity | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("grid-large")
    const debounceSetName = useDebounce(setName, 1000)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('')
    const [showFullScreen, setShowFullScreen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleImageUpload = (tags: string[]) => {
        if (!selectedFile) {
            toast("Select Atleast One image")
            return
        }
        const image: ImageUploadPropsInterface = {
            image: selectedFile,
            tags
        }
        onUpload(image)
    }

    const handleUserLogout = () => {
        userLogoutMutation.mutate(undefined, {
            onSuccess: () => {
                dispatch(removeUser(null))
                dispatch(removeToken(null))
                toast('Logout Successfull')
                navigate('/login', { replace: true })
            }
        })
    }

    const handleFullScreen = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl)
        setShowFullScreen(true)
        // alert()
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files.length > 0) {
            // onUpload(files)
            setSelectedFile(files[0])
            setSelectedFileUrl(URL.createObjectURL(files[0]))
            setShowImagePreview(true)
        }
    }


    const getGridClasses = () => {
        switch (viewMode) {
            case "grid-large":
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            case "grid-small":
                return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            case "list":
                return "grid-cols-1 gap-4"
            default:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Loading Header */}


                    <div className="mb-8">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse" />
                    </div>

                    {/* Loading Grid */}
                    <div className={`grid ${getGridClasses()}`}>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                                <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                {showFullScreen && <FullViewImage imgUrl={selectedImageUrl} onClose={() => setShowFullScreen(false)} />}

                {showImagePreview && <ImagePreviewModal imageUrl={selectedFileUrl} isOpen={showImagePreview} onClose={() => setShowImagePreview(false)} onSubmit={handleImageUpload} />}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Photos</h1>
                            {/* <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {filteredImages.length} of {images.length} photos
                            </p> */}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                        />

                        <Button onClick={handleUserLogout} className="flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>

                    </div>


                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search photos by name or tags..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    debounceSetName(e.target.value)
                                }}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={handleButtonClick} className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Photos
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === "grid-large" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid-large")}
                            >
                                <Grid2X2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "grid-small" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid-small")}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <Button onClick={() => setShowSortOptions(!showSortOptions)}>SORT</Button>
                    {showSortOptions && (
                        <div className="z-50 bg-white border rounded-lg shadow-lg w-40 p-2 space-y-1">
                            {sortOptions.map((item) => (
                                <p
                                    key={item}
                                    className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    onClick={() => {
                                        setSort(item)
                                        setShowSortOptions(!showSortOptions)
                                    }}
                                >
                                    {item.toUpperCase()}
                                </p>
                            ))}
                        </div>
                    )}
                </motion.div>


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                // className={`grid ${getGridClasses()}`}
                >
                    {Object.entries(images).map(([groupLabel, groupImages]) => (
                        <div key={groupLabel} className="mb-10">
                            {/* <p>{`${groupLabel} : ${ JSON.stringify(groupImages) }}`}</p> */}
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{groupLabel}</h2>
                            <div className={`grid ${getGridClasses()}`}>
                                {groupImages.map((image, index) => (
                                    <ImageCard
                                        key={String(image._id)}
                                        image={image}
                                        index={index}
                                        onImageClick={setSelectedImage}
                                        handleFullScreen={handleFullScreen}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
                {hasNextPage && (
                    <div ref={ref} style={{ height: '1px' }}>
                        {isFetchingNextPage && <p>Loading more...</p>}
                    </div>
                )}
                {/* </AnimatePresence> */}

                {/* Image Modal */}
                <ImageModal image={selectedImage} isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} />
            </div>
        </div>
    )
}

export default React.memo(HomeLayout)