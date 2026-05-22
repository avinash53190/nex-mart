import { useEffect, useMemo, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { FALLBACK_PRODUCT_IMAGE, getProductGalleryImages } from '../services/productDetailService'

function ProductImageGallery({ product }) {
  const images = useMemo(() => getProductGalleryImages(product), [product])
  const [activeImage, setActiveImage] = useState(images[0] || FALLBACK_PRODUCT_IMAGE)
  const [imageError, setImageError] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    setActiveImage(images[0] || FALLBACK_PRODUCT_IMAGE)
    setImageError(false)
    setZoomed(false)
  }, [images])

  const resolvedImage = imageError ? FALLBACK_PRODUCT_IMAGE : activeImage

  return (
    <div className="space-y-6">
      <div
        className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-navy-900 border border-navy-800 group cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <motion.img
          src={resolvedImage}
          alt={product.name}
          animate={{ scale: zoomed ? 1.18 : 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-navy-950/20 transition-colors duration-300" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => {
              setActiveImage(image)
              setImageError(false)
            }}
            className={`aspect-square rounded-2xl overflow-hidden bg-navy-900 border transition-colors ${activeImage === image ? 'border-brand-500' : 'border-navy-800 hover:border-brand-500/50'}`}
          >
            <img
              src={image}
              alt={`${product.name} thumbnail`}
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(ProductImageGallery)
