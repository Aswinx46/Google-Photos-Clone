import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImagePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    onSubmit: (tags: string[]) => void;
    initialTags?: string[];
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
    isOpen,
    onClose,
    imageUrl,
    onSubmit,
    initialTags = []
}) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [newTag, setNewTag] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()];
            setTags(updatedTags);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);

    };

    const handleOnSubmit = () => {
        onSubmit(tags)
        onClose()
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTag();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 bg-modal-backdrop backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-card rounded-2xl shadow-modal border border-border max-w-4xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90 transition-colors"
                        >
                            <X className="w-5 h-5 text-foreground" />
                        </motion.button>

                        <div className="flex flex-col lg:flex-row max-h-[90vh]">
                            {/* Image Section */}
                            <div className="flex-1 flex items-center justify-center bg-muted/20 relative min-h-[300px] lg:min-h-[500px]">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: imageLoaded ? 1 : 0.8,
                                        opacity: imageLoaded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="relative max-w-full max-h-full"
                                >
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        onLoad={() => setImageLoaded(true)}
                                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                                    />
                                </motion.div>

                                {!imageLoaded && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Tags Section */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-border bg-card/50"
                            >
                                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Image Tags</h3>

                                {/* Add new tag */}
                                <div className="flex gap-2 mb-4">
                                    <Input
                                        placeholder="Add a tag..."
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={addTag}
                                        size="sm"
                                        disabled={!newTag.trim() || tags.includes(newTag.trim()) || tags.length > 10}
                                        className="px-3"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Tags list */}
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <AnimatePresence mode="popLayout">
                                        {tags.map((tag, index) => (
                                            <motion.div
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                // exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay: index * 0.05,
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30
                                                }}
                                                layout
                                                className="flex items-center justify-between bg-tag-background border border-tag-border rounded-lg px-3 py-2 hover:bg-tag-hover transition-colors group"
                                            >
                                                <span className="text-sm font-medium  text-foreground">{tag}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.8 }}
                                                    onClick={() => removeTag(tag)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                                                >
                                                    <Trash2 className="w-3 h-3 text-destructive" />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {tags.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-center text-muted-foreground py-8"
                                    >
                                        <p className="text-sm">No tags added yet</p>
                                        <p className="text-xs mt-1">Add tags to organize your images</p>
                                    </motion.div>
                                )}
                                {/* Tags count */}
                                {tags.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-4 pt-4 border-t border-border"
                                    >
                                        <p className="text-xs text-muted-foreground">
                                            {tags.length} tag{tags.length !== 1 ? 's' : ''} added
                                        </p>
                                        <p className="text-xs mt-2 mb-2">Maximum 10 tags</p>
                                    </motion.div>
                                )}
                                <Button className='absolute' onClick={handleOnSubmit} >Add Image</Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </AnimatePresence>
    );
};