import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createImage, deleteImage, findImages, updateImage, userLogout } from "../services/galleryService";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: (formData: FormData) => createImage(formData)
    })
}

export const useFindImages = ({ name, sort }: { name?: string, sort?: string }) => {
    return useInfiniteQuery({
        queryKey: ['images', name, sort],
        queryFn: ({ pageParam = 1, queryKey }) => {
            const [, name, sort] = queryKey; // destructure from queryKey
            return findImages({ pageParam, name, sort });
        },
        initialPageParam: 1,
        getNextPageParam: (lastpage, allPages) => {
            const fetchedSoFar = allPages.flatMap(p => p.images).length
            return fetchedSoFar < lastpage.totalCount ? allPages.length + 1 : undefined
        }
    })
}

export const useUpdateImage = () => {
    return useMutation({
        mutationFn: ({ imageId, name, tags }: { imageId: string, name: string, tags: string[] }) => updateImage(imageId, name, tags)
    })
}

export const useDeleteImage = () => {
    return useMutation({
        mutationFn: (imageId: string) => deleteImage(imageId)
    })
}

export const useUserLogout = () => {
    return useMutation({
        mutationFn: userLogout
    })
}