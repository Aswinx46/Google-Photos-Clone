/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { ImageEntity } from "@/types/images/ImageType"
import { Calendar, MapPin, Tag, Fullscreen, Pen, Album } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageEditModal from "./updateImage"
import { useUpdateImage } from "../hooks/galleryHooks"
import { toast } from "sonner"
import { useQueryClient } from '@tanstack/react-query'
interface ImageCardProps {
    image: ImageEntity
    index: number
    onImageClick: (image: ImageEntity) => void
    handleFullScreen: (imageUrl: string) => void
}

export function ImageCard({ image, index, onImageClick, handleFullScreen }: ImageCardProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const updateImageMutation = useUpdateImage()
    const queryClient = useQueryClient()
    const handleEditImage = (data: { name: string; tags: string[] }) => {
        console.log('this is the data from the updateimage modal', data)
        updateImageMutation.mutate({ imageId: image._id!, name: data.name, tags: data.tags }, {
            onSuccess: (data) => {
                toast("Image Updated")
                queryClient.setQueryData(['images'], (oldData: any) => {
                    if (!oldData) return oldData
                    console.log('This is the oldData', oldData)
                    const updatedPages = [...oldData.pages]
                    console.log("this is the updatedPages", updatedPages)
                    let index = -1
                    for (let i = 0; i < updatedPages.length; i++) {
                        if (updatedPages[i].images.some((img: ImageEntity) => img._id === image._id)) {
                            index = i
                            break
                        }

                    }
                    if (index === -1) return oldData
                    const filteredImages = updatedPages[index].images.filter((item: ImageEntity) => item._id !== image._id)
                    updatedPages[index] = {
                        ...updatedPages[index],
                        images: [data.updatedImage, ...filteredImages],
                    }
                    console.log('after updation updatedImages', { ...oldData, pages: updatedPages })
                    return { ...oldData, pages: updatedPages }
                })
            },
            onError: (err) => {
                toast(err.message, {
                    description: "Error while updating Image"
                })
            }
        })

    }
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <>
            {openEditModal && <ImageEditModal imageUrl={image.url} isOpen={openEditModal} onClose={() => setOpenEditModal(false)} onSave={handleEditImage} initialName={image.filename} initialTags={image.tags} />}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                    <motion.img
                        src={image.url}
                        alt={image.filename}
                        className={`w-full h-full object-cover cursor-pointer transition-all duration-500 ${isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                            } group-hover:scale-105`}
                        onLoad={() => setIsLoaded(true)}
                        onClick={() => onImageClick(image)}
                        loading="lazy"
                    />

                    {/* Loading Skeleton */}
                    {!isLoaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />}

                    {/* Overlay Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300"
                    >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}

                            >
                                <Album className="w-4 h-4" />

                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenEditModal(true)
                                }}
                            >
                                <Pen className="w-4 h-4" />
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    console.log('this is onClick')
                                    handleFullScreen(image.url)
                                }}
                            >
                                <Fullscreen className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Tags Badge */}
                    {
                        image.tags && image.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-3 left-3"
                            >
                                <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {image.tags.length}
                                </div>
                            </motion.div>
                        )
                    }
                </div >

                {/* Image Info */}
                < div className="p-4" >
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">{image.filename}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatFileSize(image.filesize)}</p>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(image.takenAt)}</span>
                        </div>

                        {image.location && Object.keys(image.location).length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{String(image.location.address)}</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {
                        image.tags && image.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                                {image.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <motion.span
                                        key={tagIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + tagIndex * 0.1 }}
                                        className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                                {image.tags.length > 2 && (
                                    <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                                        +{image.tags.length - 2}
                                    </span>
                                )}
                            </div>
                        )
                    }
                </div >
            </motion.div >
        </>
    )
}
