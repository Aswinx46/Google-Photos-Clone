/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeLayout } from '../component/ImageLayout'
import type { ImageEntity } from '@/types/images/ImageType'
import type { ImageUploadPropsInterface } from '../interfaces/ImageUploadFunctionProps'
import { useFindImages, useUploadImage } from '../hooks/galleryHooks'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/spinner/LoadingSpinner'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
function Home() {
    // const images
    interface ResponseType {
        createdImage: ImageEntity
    }
    const queryClient = useQueryClient()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFindImages()
    const images = data?.pages.flatMap(page => page.images) || []
    const { ref, inView } = useInView()
    const uploadImage = useUploadImage()
    const handleImageUpload = (image: ImageUploadPropsInterface) => {
        const formData = new FormData()
        formData.append('file', image.image)
        formData.append('tags', JSON.stringify(image.tags))
        uploadImage.mutate(formData, {
            onSuccess: (data) => {
                const response: ResponseType = data
                toast("Image Uploaded")
                queryClient.setQueryData(['images'], (oldData: any) => {
                    if (!oldData) return oldData
                    const updatedPages = [...oldData.pages]
                    updatedPages[0] = {
                        ...updatedPages[0],
                        images: [response.createdImage, ...updatedPages[0].images],
                    }
                    return { ...oldData, pages: updatedPages }
                   
                })
            },
            onError: (err) => {
                toast(err.message)
                console.log('error while uploading image', err)
            }
        })
        // console.log(image)
    }



    useEffect(() => {
        const interval = setInterval(() => {
            refetch()  // useTanstackQuery refetch to get fresh signed URLs
        }, 55 * 60 * 1000) // 55 minutes

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <div>
            {uploadImage.isPending && <LoadingSpinner />}
            <HomeLayout images={images} isLoading={false} onUpload={handleImageUpload} ref={ref} isFetchingNextPage={isFetchingNextPage} />
        </div>
    )
}

export default Home
