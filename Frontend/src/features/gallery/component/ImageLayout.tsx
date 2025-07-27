
import React, { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ImageEntity } from "@/types/images/ImageType"
import { ImageCard } from "./ImageCard"
import { ImageModal } from "./ImageModal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Grid3X3, Grid2X2, List, Upload } from "lucide-react"
import { ImagePreviewModal } from "./imagePreview"
import type { ImageUploadPropsInterface } from "../interfaces/ImageUploadFunctionProps"
import { toast } from "sonner"

interface HomeLayoutProps {
    images: ImageEntity[]
    isLoading?: boolean
    onUpload: (image: ImageUploadPropsInterface) => void
}

type ViewMode = "grid-large" | "grid-small" | "list"

export function HomeLayout({ images, isLoading = false, onUpload }: HomeLayoutProps) {
    const [selectedImage, setSelectedImage] = useState<ImageEntity | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>("grid-large")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

    // Filter images based on search query and tags
    const filteredImages = useMemo(() => {
        return images.filter((image) => {
            const matchesSearch =
                image.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => image.tags.includes(tag))

            return matchesSearch && matchesTags
        })
    }, [images, searchQuery, selectedTags])

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        images.forEach((image) => {
            image.tags.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags)
    }, [images])

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
                {showImagePreview && <ImagePreviewModal imageUrl={selectedFileUrl} isOpen={showImagePreview} onClose={() => setShowImagePreview(false)} onSubmit={handleImageUpload} />}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Photos</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {filteredImages.length} of {images.length} photos
                            </p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                        />

                        <Button onClick={handleButtonClick} className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Photos
                        </Button>

                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search photos by name or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

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

                    {/* Tags Filter */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filter by tags:
                            </span>
                            {allTags.slice(0, 10).map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                                    }}
                                    className="text-xs"
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Images Grid */}
                <AnimatePresence mode="wait">
                    {filteredImages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-16"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No photos found</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {searchQuery || selectedTags.length > 0
                                    ? "Try adjusting your search or filters"
                                    : "Upload some photos to get started"}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`grid ${getGridClasses()}`}
                        >
                            {filteredImages.map((image, index) => (
                                <ImageCard key={String(image._id)} image={image} index={index} onImageClick={setSelectedImage} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Image Modal */}
                <ImageModal image={selectedImage} isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} />
            </div>
        </div>
    )
}
