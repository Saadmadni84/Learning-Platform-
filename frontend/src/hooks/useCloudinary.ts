'use client'

import { useState, useCallback } from 'react'
import { uploadImage, deleteImage, getOptimizedImageUrl } from '@/lib/cloudinary'

interface UploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
}

interface UseCloudinaryReturn {
  uploadFile: (file: File, folder?: string) => Promise<UploadResult>
  deleteFile: (publicId: string) => Promise<boolean>
  getOptimizedUrl: (publicId: string, options?: any) => string
  isUploading: boolean
  uploadProgress: number
  error: string | null
}

export function useCloudinary(): UseCloudinaryReturn {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(async (file: File, folder: string = 'acadevia'): Promise<UploadResult> => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const result = await uploadImage(file, folder)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [])

  const deleteFile = useCallback(async (publicId: string): Promise<boolean> => {
    try {
      setError(null)
      await deleteImage(publicId)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      return false
    }
  }, [])

  const getOptimizedUrl = useCallback((publicId: string, options: any = {}) => {
    return getOptimizedImageUrl(publicId, options)
  }, [])

  return {
    uploadFile,
    deleteFile,
    getOptimizedUrl,
    isUploading,
    uploadProgress,
    error
  }
}
