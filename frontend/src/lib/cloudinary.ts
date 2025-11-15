import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dv6ijui25',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary

// Helper function to upload images
export const uploadImage = async (file: File, folder: string = 'acadevia') => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'acadevia_preset') // You'll need to create this preset
    formData.append('folder', folder)

    const response = await fetch(`https://api.cloudinary.com/v1_1/dv6ijui25/image/upload`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return {
      public_id: data.public_id,
      secure_url: data.secure_url,
      width: data.width,
      height: data.height
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Helper function to generate optimized image URLs
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
    gravity?: 'auto' | 'face' | 'center'
  } = {}
) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options

  let url = `https://res.cloudinary.com/dv6ijui25/image/upload/`
  
  // Add transformations
  const transformations = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`c_${crop}`)
  transformations.push(`g_${gravity}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)
  
  if (transformations.length > 0) {
    url += transformations.join(',') + '/'
  }
  
  url += publicId
  
  return url
}

// Helper function to delete images
export const deleteImage = async (publicId: string) => {
  try {
    const response = await fetch(`/api/cloudinary/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicId })
    })

    if (!response.ok) {
      throw new Error('Delete failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

// Helper function to get image info
export const getImageInfo = async (publicId: string) => {
  try {
    const response = await fetch(`/api/cloudinary/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicId })
    })

    if (!response.ok) {
      throw new Error('Failed to get image info')
    }

    return await response.json()
  } catch (error) {
    console.error('Cloudinary info error:', error)
    throw error
  }
}
