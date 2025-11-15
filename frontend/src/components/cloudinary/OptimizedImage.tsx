'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getOptimizedImageUrl } from '@/lib/cloudinary'

interface OptimizedImageProps {
  publicId: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
  gravity?: 'auto' | 'face' | 'center'
  className?: string
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'pixelate' | 'none'
  blurDataURL?: string
  onClick?: () => void
}

export default function OptimizedImage({
  publicId,
  alt,
  width,
  height,
  quality = 'auto',
  format = 'auto',
  crop = 'fill',
  gravity = 'auto',
  className = '',
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  onClick
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const imageUrl = getOptimizedImageUrl(publicId, {
    width,
    height,
    quality,
    format,
    crop,
    gravity
  })

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">Image not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {placeholder === 'blur' && blurDataURL && isLoading && (
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}

      <motion.img
        src={imageUrl}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${onClick ? 'cursor-pointer' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

// Preset components for common use cases
export function AvatarImage({ publicId, alt, size = 40, className = '' }: {
  publicId: string
  alt: string
  size?: number
  className?: string
}) {
  return (
    <OptimizedImage
      publicId={publicId}
      alt={alt}
      width={size}
      height={size}
      crop="fill"
      gravity="face"
      quality={80}
      className={`rounded-full ${className}`}
    />
  )
}

export function ThumbnailImage({ publicId, alt, className = '' }: {
  publicId: string
  alt: string
  className?: string
}) {
  return (
    <OptimizedImage
      publicId={publicId}
      alt={alt}
      width={300}
      height={200}
      crop="fill"
      quality={70}
      className={`rounded-lg ${className}`}
    />
  )
}

export function HeroImage({ publicId, alt, className = '' }: {
  publicId: string
  alt: string
  className?: string
}) {
  return (
    <OptimizedImage
      publicId={publicId}
      alt={alt}
      width={1200}
      height={600}
      crop="fill"
      gravity="auto"
      quality={85}
      className={`rounded-xl ${className}`}
    />
  )
}
