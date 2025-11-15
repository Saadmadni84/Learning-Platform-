// Cloudinary Configuration
export const cloudinaryConfig = {
  cloudName: 'dv6ijui25',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  uploadPreset: 'acadevia_preset', // You'll need to create this in your Cloudinary dashboard
  defaultFolder: 'acadevia',
  secure: true
}

// Image transformation presets
export const imagePresets = {
  avatar: {
    width: 150,
    height: 150,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto'
  },
  thumbnail: {
    width: 300,
    height: 200,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  hero: {
    width: 1200,
    height: 600,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  card: {
    width: 400,
    height: 300,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  }
}

// Upload options
export const uploadOptions = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  folders: {
    avatars: 'acadevia/avatars',
    courses: 'acadevia/courses',
    achievements: 'acadevia/achievements',
    thumbnails: 'acadevia/thumbnails'
  }
}
