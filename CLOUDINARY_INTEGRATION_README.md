# ☁️ Cloudinary Integration for Acadevia

Complete Cloudinary integration for your Acadevia project using your cloud ID `dv6ijui25`. This setup provides image upload, optimization, and management capabilities.

## 🚀 **Quick Start**

### **1. Environment Setup**
Create a `.env.local` file in your frontend directory:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dv6ijui25
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Next.js Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dv6ijui25
```

### **2. Create Upload Preset**
1. Go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to **Settings** → **Upload** → **Upload presets**
3. Click **Add upload preset**
4. Set the following:
   - **Preset name**: `acadevia_preset`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `acadevia`
   - **Resource Type**: `Image`
   - **Access Mode**: `Public`

### **3. Test the Integration**
Visit `/cloudinary-demo` to test the complete integration.

## 📁 **File Structure**

```
frontend/src/
├── lib/
│   └── cloudinary.ts                    # Core Cloudinary functions
├── config/
│   └── cloudinary.ts                    # Configuration and presets
├── components/cloudinary/
│   ├── ImageUpload.tsx                  # Upload component
│   ├── OptimizedImage.tsx              # Optimized image display
│   └── CloudinaryDemo.tsx              # Demo component
├── hooks/
│   └── useCloudinary.ts                 # Custom hook
└── app/api/cloudinary/
    ├── upload/route.ts                  # Upload API endpoint
    ├── delete/route.ts                 # Delete API endpoint
    └── info/route.ts                   # Image info API endpoint
```

## 🎯 **Key Features**

### **✅ Image Upload**
- **Drag & Drop**: Intuitive file selection
- **Progress Tracking**: Real-time upload progress
- **File Validation**: Size and type checking
- **Error Handling**: Clear error messages
- **Preview**: Instant image preview

### **✅ Image Optimization**
- **Auto Format**: WebP, AVIF, JPEG based on browser
- **Auto Quality**: Optimal quality for file size
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Performance optimization
- **Blur Placeholders**: Smooth loading experience

### **✅ Image Management**
- **Delete Images**: Remove from Cloudinary
- **Image Info**: Get metadata and details
- **Transformations**: On-the-fly image editing
- **Folders**: Organized storage structure

## 🔧 **Usage Examples**

### **Basic Image Upload**
```tsx
import ImageUpload from '@/components/cloudinary/ImageUpload'

function MyComponent() {
  const handleUpload = (url: string, publicId: string) => {
    console.log('Image uploaded:', { url, publicId })
  }

  return (
    <ImageUpload
      onUpload={handleUpload}
      folder="acadevia/avatars"
      maxSize={5}
    />
  )
}
```

### **Display Optimized Images**
```tsx
import OptimizedImage from '@/components/cloudinary/OptimizedImage'

function MyComponent() {
  return (
    <OptimizedImage
      publicId="acadevia/avatars/user123"
      alt="User avatar"
      width={150}
      height={150}
      quality="auto"
      format="auto"
    />
  )
}
```

### **Using the Custom Hook**
```tsx
import { useCloudinary } from '@/hooks/useCloudinary'

function MyComponent() {
  const { uploadFile, deleteFile, isUploading, error } = useCloudinary()

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'acadevia/courses')
      console.log('Upload successful:', result)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <div>
      {isUploading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Your upload UI */}
    </div>
  )
}
```

## 🎨 **Pre-built Components**

### **AvatarImage**
```tsx
import { AvatarImage } from '@/components/cloudinary/OptimizedImage'

<AvatarImage
  publicId="acadevia/avatars/user123"
  alt="User avatar"
  size={80}
  className="rounded-full"
/>
```

### **ThumbnailImage**
```tsx
import { ThumbnailImage } from '@/components/cloudinary/OptimizedImage'

<ThumbnailImage
  publicId="acadevia/courses/math101"
  alt="Math course thumbnail"
  className="rounded-lg"
/>
```

### **HeroImage**
```tsx
import { HeroImage } from '@/components/cloudinary/OptimizedImage'

<HeroImage
  publicId="acadevia/heroes/learning"
  alt="Learning hero image"
  className="w-full h-64"
/>
```

## ⚙️ **Configuration Options**

### **Image Presets**
```typescript
// Available in src/config/cloudinary.ts
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
  }
}
```

### **Upload Options**
```typescript
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
```

## 🔒 **Security Features**

### **Upload Security**
- **File Type Validation**: Only allowed image types
- **Size Limits**: Configurable file size restrictions
- **Virus Scanning**: Cloudinary's built-in security
- **Access Control**: Folder-based permissions

### **API Security**
- **Server-side Upload**: Secure API endpoints
- **Environment Variables**: Protected credentials
- **Signed URLs**: Secure image delivery
- **CORS Configuration**: Controlled access

## 📱 **Responsive Images**

### **Automatic Optimization**
```tsx
<OptimizedImage
  publicId="acadevia/course-banner"
  alt="Course banner"
  width={800}
  height={400}
  quality="auto"
  format="auto"
  className="w-full h-64 md:h-80 lg:h-96"
/>
```

### **Multiple Sizes**
```tsx
// Mobile
<OptimizedImage
  publicId="acadevia/hero"
  alt="Hero image"
  width={400}
  height={200}
  className="block md:hidden"
/>

// Desktop
<OptimizedImage
  publicId="acadevia/hero"
  alt="Hero image"
  width={1200}
  height={600}
  className="hidden md:block"
/>
```

## 🎯 **Use Cases for Acadevia**

### **User Avatars**
```tsx
<AvatarImage
  publicId={`acadevia/avatars/${userId}`}
  alt={`${userName} avatar`}
  size={40}
  className="rounded-full"
/>
```

### **Course Thumbnails**
```tsx
<ThumbnailImage
  publicId={`acadevia/courses/${courseId}`}
  alt={`${courseName} thumbnail`}
  className="rounded-lg"
/>
```

### **Achievement Badges**
```tsx
<OptimizedImage
  publicId={`acadevia/achievements/${badgeId}`}
  alt={`${achievementName} badge`}
  width={100}
  height={100}
  className="rounded-full"
/>
```

### **Learning Materials**
```tsx
<OptimizedImage
  publicId={`acadevia/materials/${materialId}`}
  alt={`${materialTitle} image`}
  width={600}
  height={400}
  className="rounded-xl"
/>
```

## 🚀 **Performance Benefits**

### **Automatic Optimization**
- **Format Selection**: WebP, AVIF, JPEG based on browser support
- **Quality Adjustment**: Optimal quality for file size
- **Responsive Delivery**: Different sizes for different devices
- **CDN Distribution**: Global content delivery

### **Loading Performance**
- **Lazy Loading**: Images load only when needed
- **Progressive Enhancement**: Blur to sharp transition
- **Caching**: Browser and CDN caching
- **Compression**: Automatic image compression

## 🧪 **Testing**

### **Demo Page**
Visit `/cloudinary-demo` to test:
- Image upload functionality
- Different image transformations
- Upload progress tracking
- Error handling
- Image optimization

### **Manual Testing**
1. **Upload Test**: Try uploading different image types
2. **Size Test**: Test with various file sizes
3. **Format Test**: Check auto-format optimization
4. **Delete Test**: Test image deletion
5. **Error Test**: Test with invalid files

## 🔧 **Troubleshooting**

### **Common Issues**

**1. Upload Fails**
- Check API credentials in environment variables
- Verify upload preset is created and unsigned
- Ensure file size is within limits

**2. Images Not Displaying**
- Check public ID is correct
- Verify image exists in Cloudinary dashboard
- Check network connectivity

**3. Slow Loading**
- Enable lazy loading
- Use appropriate image sizes
- Check CDN configuration

### **Debug Mode**
```typescript
// Enable debug logging
console.log('Cloudinary config:', cloudinaryConfig)
console.log('Upload result:', result)
```

## 📈 **Analytics & Monitoring**

### **Cloudinary Dashboard**
- **Usage Statistics**: Upload/download metrics
- **Storage Usage**: Total storage consumed
- **Bandwidth**: Data transfer statistics
- **Transformations**: Image processing metrics

### **Custom Analytics**
```typescript
// Track upload events
const trackUpload = (publicId: string, size: number) => {
  // Your analytics code
  console.log('Image uploaded:', { publicId, size })
}
```

## 🎯 **Next Steps**

### **Immediate Actions**
1. **Set up environment variables** with your API credentials
2. **Create upload preset** in Cloudinary dashboard
3. **Test the demo page** at `/cloudinary-demo`
4. **Customize presets** for your specific needs

### **Future Enhancements**
- [ ] Video upload support
- [ ] Advanced transformations
- [ ] Batch upload functionality
- [ ] Image editing tools
- [ ] AI-powered image optimization
- [ ] Custom upload widgets

## 📞 **Support**

### **Cloudinary Resources**
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Transformation Reference](https://cloudinary.com/documentation/transformation_reference)
- [SDK Documentation](https://cloudinary.com/documentation/cloudinary_sdks)

### **Project Integration**
- Check `/cloudinary-demo` for working examples
- Review component documentation
- Test with your specific use cases

---

**🎉 Your Cloudinary integration is ready!** 

With cloud ID `dv6ijui25`, you now have a complete image management system for your Acadevia project. Upload, optimize, and deliver images with ease! ☁️✨
