import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createImage, findImages } from "../services/galleryService";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: (formData: FormData) => createImage(formData)
    })
}

export const useFindImages = () => {
    return useInfiniteQuery({
        queryKey: ['images'],
        queryFn: findImages,
        initialPageParam: 1,
        getNextPageParam: (lastpage, allPages) => {
            const fetchedSoFar = allPages.flatMap(p => p.images).length
            return fetchedSoFar < lastpage.totalCount ? allPages.length + 1 : undefined
        }
    })
}