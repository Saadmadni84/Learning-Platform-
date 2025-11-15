'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Trash2, Eye, Download } from 'lucide-react'
import ImageUpload from './ImageUpload'
import OptimizedImage, { AvatarImage, ThumbnailImage, HeroImage } from './OptimizedImage'
import { useCloudinary } from '@/hooks/useCloudinary'

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

export default function CloudinaryDemo() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)
  const { uploadFile, deleteFile, isUploading, error } = useCloudinary()

  const handleUpload = async (url: string, publicId: string) => {
    // In a real app, you'd get this info from the upload response
    const newImage: UploadedImage = {
      url,
      publicId,
      width: 800,
      height: 600
    }
    
    setUploadedImages(prev => [...prev, newImage])
    setSelectedImage(newImage)
  }

  const handleRemove = async (publicId: string) => {
    const success = await deleteFile(publicId)
    if (success) {
      setUploadedImages(prev => prev.filter(img => img.publicId !== publicId))
      if (selectedImage?.publicId === publicId) {
        setSelectedImage(null)
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Cloudinary Integration Demo</h1>
        <p className="text-gray-600">
          Upload, optimize, and manage images with Cloudinary (Cloud ID: dv6ijui25)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Upload Images
            </h2>
            
            <ImageUpload
              onUpload={handleUpload}
              folder="acadevia/demo"
              maxSize={5}
              className="mb-4"
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {isUploading && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">Uploading image...</p>
              </div>
            )}
          </div>

          {/* Uploaded Images List */}
          {uploadedImages.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Uploaded Images</h3>
              <div className="space-y-3">
                {uploadedImages.map((image, index) => (
                  <motion.div
                    key={image.publicId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <ThumbnailImage
                        publicId={image.publicId}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-12 h-12"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Image {index + 1}</p>
                        <p className="text-sm text-gray-500">{image.width}x{image.height}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemove(image.publicId)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {selectedImage ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-green-600" />
                Image Preview
              </h2>
              
              <div className="space-y-6">
                {/* Original Image */}
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Original</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={selectedImage.url}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Optimized Versions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Avatar</h3>
                    <AvatarImage
                      publicId={selectedImage.publicId}
                      alt="Avatar"
                      size={80}
                      className="mx-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Thumbnail</h3>
                    <ThumbnailImage
                      publicId={selectedImage.publicId}
                      alt="Thumbnail"
                      className="w-full h-20"
                    />
                  </div>
                </div>

                {/* Hero Image */}
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Hero Image</h3>
                  <HeroImage
                    publicId={selectedImage.publicId}
                    alt="Hero"
                    className="w-full h-32"
                  />
                </div>

                {/* Image Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Image Information</h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p><strong>Public ID:</strong> {selectedImage.publicId}</p>
                    <p><strong>Dimensions:</strong> {selectedImage.width}x{selectedImage.height}</p>
                    <p><strong>Format:</strong> Auto-optimized</p>
                    <p><strong>Quality:</strong> Auto</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select an image to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-4">How to Use Cloudinary in Your Project</h3>
        <div className="space-y-4 text-sm text-blue-700">
          <div>
            <h4 className="font-medium">1. Set up environment variables:</h4>
            <code className="block bg-blue-100 p-2 rounded mt-1">
              CLOUDINARY_API_KEY=your_api_key<br/>
              CLOUDINARY_API_SECRET=your_api_secret
            </code>
          </div>
          <div>
            <h4 className="font-medium">2. Create upload preset in Cloudinary dashboard:</h4>
            <p>Go to Settings → Upload → Upload presets → Add upload preset</p>
            <p>Name: <code>acadevia_preset</code>, Signing Mode: Unsigned</p>
          </div>
          <div>
            <h4 className="font-medium">3. Use the components:</h4>
            <code className="block bg-blue-100 p-2 rounded mt-1">
              {`<ImageUpload onUpload={handleUpload} />`}<br/>
              {`<OptimizedImage publicId="image_id" alt="Description" />`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
