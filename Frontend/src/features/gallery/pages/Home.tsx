/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ImageEntity } from '@/types/images/ImageType'
import type { ImageUploadPropsInterface } from '../interfaces/ImageUploadFunctionProps'
import { useFindImages, useUploadImage } from '../hooks/galleryHooks'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/spinner/LoadingSpinner'
import { useInView } from 'react-intersection-observer'
import React, { Suspense, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { addKey } from '@/reduxstrore/slices/queryKeySlice'

const LazyLoadedHome = React.lazy(() => import('../component/ImageLayout'))
export interface ResponseType {
    createdImage: ImageEntity
}

function Home() {
    const queryClient = useQueryClient()
    const [name, setName] = useState<string>('')
    const [sort, setSort] = useState<"newest" | "oldest">("newest");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addKey({ name, sort }))
    }, [dispatch, name, sort])
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFindImages({ name, sort })
    const groupedImages: Record<string, ImageEntity[]> = {}
    // console.log('this is the data from the backend',data)
    data?.pages.forEach(page => {
        const { images } = page
        Object.entries(images).forEach(([groupLabel, groupImages]) => {
            if (!Array.isArray(groupImages)) return

            if (!groupedImages[groupLabel]) {
                groupedImages[groupLabel] = []
            }

            groupedImages[groupLabel].push(...groupImages)
        })
    })
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
                // queryClient.setQueryData(['images', name, sort], (oldData: any) => {
                //     const cloneData = structuredClone(oldData);
                //     console.log('this is the cloneData',cloneData)
                //     cloneData.pages[0].images.Today.unshift(response.createdImage)
                //     return cloneData
                // })
                refetch()
            },
            onError: (err) => {
                toast(err.message)
                console.log('error while uploading image', err)
            }
        })

    }



    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
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
            {uploadImage.isPending && <LoadingSpinner fullScreen={true} isOpen={uploadImage.isPending} />}
            <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
                <LazyLoadedHome images={groupedImages} isLoading={false} onUpload={handleImageUpload} ref={ref} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} setName={setName} setSort={setSort} />
            </Suspense>
        </div>
    )
}

export default Home
