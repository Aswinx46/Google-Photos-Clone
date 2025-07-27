import { useMutation } from "@tanstack/react-query";
import { createImage } from "../services/galleryService";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: (formData: FormData) => createImage(formData)
    })
}