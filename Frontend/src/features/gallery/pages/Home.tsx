/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeLayout } from '../component/ImageLayout'
import type { ImageEntity } from '@/types/images/ImageType'
import type { ImageUploadPropsInterface } from '../interfaces/ImageUploadFunctionProps'
import { useFindImages, useUploadImage } from '../hooks/galleryHooks'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/spinner/LoadingSpinner'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { addKey } from '@/reduxstrore/slices/queryKeySlice'
function Home() {
    interface ResponseType {
        createdImage: ImageEntity
    }
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
                queryClient.setQueryData(['images',name,sort], (oldData: any) => {
                    const cloneData = structuredClone(oldData);
                    cloneData.pages[0].images.Today.unshift(response.createdImage)
                    return cloneData
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
            {uploadImage.isPending && <LoadingSpinner fullScreen={true} isOpen={uploadImage.isPending} />}
            <HomeLayout images={groupedImages} isLoading={false} onUpload={handleImageUpload} ref={ref} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
        </div>
    )
}

export default Home
