"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ImageEntity } from "@/types/images/ImageType"
import { X, Download, Heart, Share2, MapPin, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  image: ImageEntity | null
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  if (!image) return null

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{image.filename}</h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  src={image.url}
                  alt={image.filename}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Details */}
              <div className="w-full lg:w-80 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900 dark:text-white">Taken</p>
                        <p className="text-gray-600 dark:text-gray-400">{formatDate(image.takenAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 dark:text-white">File Size</p>
                        <p className="text-gray-600 dark:text-gray-400">{formatFileSize(image.filesize)}</p>
                      </div>
                    </div>

                    {image.location && (
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-900 dark:text-white">Location</p>
                          <p className="text-gray-600 dark:text-gray-400">{String(image.location.address)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {image.tags && image.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
