'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react'
import { uploadImage, getOptimizedImageUrl } from '@/lib/cloudinary'

interface ImageUploadProps {
  onUpload: (url: string, publicId: string) => void
  onRemove?: () => void
  currentImage?: string
  folder?: string
  className?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export default function ImageUpload({
  onUpload,
  onRemove,
  currentImage,
  folder = 'acadevia',
  className = '',
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Please select a valid image file (${acceptedTypes.join(', ')})`)
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    setError('')
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Upload to Cloudinary
      const result = await uploadImage(file, folder)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Get optimized URL
      const optimizedUrl = getOptimizedImageUrl(result.public_id, {
        width: 800,
        height: 600,
        quality: 'auto',
        format: 'auto'
      })

      onUpload(optimizedUrl, result.public_id)
      
      // Clean up preview URL
      URL.revokeObjectURL(previewUrl)
      
    } catch (error) {
      console.error('Upload error:', error)
      setError('Upload failed. Please try again.')
      setPreview(null)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setError('')
    if (onRemove) {
      onRemove()
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
                  <div className="text-white text-sm">Uploading... {uploadProgress}%</div>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isUploading
              ? 'border-blue-300 bg-blue-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
          }`}
        >
          {isUploading ? (
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
              <div className="text-blue-600 font-medium">Uploading... {uploadProgress}%</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="text-gray-600 font-medium mb-2">Upload Image</div>
              <div className="text-gray-400 text-sm">Click to select or drag and drop</div>
              <div className="text-gray-400 text-xs mt-1">
                Max size: {maxSize}MB • {acceptedTypes.join(', ')}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center">
            <X className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
