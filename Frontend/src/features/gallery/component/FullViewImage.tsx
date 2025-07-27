import { X } from "lucide-react"

interface FullViewImageProps {
  imgUrl: string
  onClose: () => void
}

function FullViewImage({ imgUrl, onClose }: FullViewImageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
      >
        <X size={32} />
      </button>

      {/* Image */}
      <img
        src={imgUrl}
        alt="Full view"
        className="max-w-full max-h-full object-contain rounded shadow-lg"
      />
    </div>
  )
}

export default FullViewImage
