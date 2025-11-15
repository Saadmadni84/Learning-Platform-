# YouTube Video Integration with Cloudinary

This document explains how to add YouTube videos to courses using Cloudinary for video processing and storage.

## Overview

The system now supports uploading YouTube videos to Cloudinary and adding them to course sources. This allows instructors to:

- Upload YouTube videos directly to Cloudinary for better performance
- Add YouTube videos as course resources
- Generate thumbnails automatically
- Store video metadata (duration, format, etc.)

## API Endpoint

### POST `/api/upload/youtube-video`

Adds a YouTube video to a course by uploading it to Cloudinary and storing the metadata in the course sources.

#### Request Body

```json
{
  "courseId": "string (required)",
  "youtubeUrl": "string (required)",
  "title": "string (optional)",
  "description": "string (optional)"
}
```

#### Headers

```
Authorization: Bearer <your-auth-token>
Content-Type: application/json
```

#### Response

```json
{
  "success": true,
  "message": "YouTube video added to course successfully",
  "data": {
    "course": {
      "id": "course-id",
      "title": "Course Title",
      "sources": [
        {
          "id": "youtube-timestamp",
          "type": "youtube",
          "title": "Video Title",
          "description": "Video Description",
          "url": "original-youtube-url",
          "cloudinaryUrl": "cloudinary-processed-url",
          "cloudinaryPublicId": "cloudinary-public-id",
          "duration": 240,
          "thumbnail": "youtube-thumbnail-url",
          "addedAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    },
    "video": {
      "cloudinaryUrl": "processed-video-url",
      "publicId": "cloudinary-public-id",
      "duration": 240,
      "originalUrl": "original-youtube-url"
    }
  }
}
```

## Usage Examples

### 1. Using cURL

```bash
curl -X POST http://localhost:3000/api/upload/youtube-video \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-auth-token" \
  -d '{
    "courseId": "math-6-up-board",
    "youtubeUrl": "https://www.youtube.com/live/hgUPZ7eWnvw?si=qIQa8WDRHL2XUkPR",
    "title": "Class 6 Mathematics - Live Session",
    "description": "संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।"
  }'
```

### 2. Using JavaScript/Node.js

```javascript
const axios = require('axios');

async function addYouTubeVideo() {
  try {
    const response = await axios.post('http://localhost:3000/api/upload/youtube-video', {
      courseId: 'math-6-up-board',
      youtubeUrl: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=qIQa8WDRHL2XUkPR',
      title: 'Class 6 Mathematics - Live Session',
      description: 'संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।'
    }, {
      headers: {
        'Authorization': 'Bearer your-auth-token',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Video added successfully:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}
```

### 3. Using the Test Script

Run the provided test script:

```bash
cd backend
node test-youtube-upload.js
```

## Supported YouTube URL Formats

The endpoint supports various YouTube URL formats:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/live/VIDEO_ID`
- `http://youtube.com/watch?v=VIDEO_ID` (without https)

## Course Data Structure

After adding a YouTube video, the course's `sources` field will contain:

```json
{
  "sources": [
    {
      "id": "youtube-1704067200000",
      "type": "youtube",
      "title": "Class 6 Mathematics - Live Session",
      "description": "संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।",
      "url": "https://www.youtube.com/live/hgUPZ7eWnvw?si=qIQa8WDRHL2XUkPR",
      "cloudinaryUrl": "https://res.cloudinary.com/your-cloud/video/upload/v1234567890/courses/math-6-up-board/youtube-videos/course-math-6-up-board-youtube-1704067200000.mp4",
      "cloudinaryPublicId": "courses/math-6-up-board/youtube-videos/course-math-6-up-board-youtube-1704067200000",
      "duration": 240,
      "thumbnail": "https://img.youtube.com/vi/hgUPZ7eWnvw/maxresdefault.jpg",
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Cloudinary Configuration

Make sure your `.env` file contains the required Cloudinary credentials:

```env
CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Error Handling

The endpoint handles various error scenarios:

- **400 Bad Request**: Invalid YouTube URL format or missing required fields
- **401 Unauthorized**: Invalid or missing authentication token
- **404 Not Found**: Course not found or user doesn't have permission
- **500 Internal Server Error**: Cloudinary upload failure or database error

## Video Processing Features

Cloudinary automatically processes uploaded videos with:

- **Multiple resolutions**: 1280x720, 854x480, 640x360
- **Auto quality optimization**
- **Thumbnail generation**
- **Streaming optimization**
- **Format conversion to MP4**
- **Audio codec optimization (AAC)**

## Security Considerations

- Only course instructors can add videos to their courses
- YouTube URLs are validated before processing
- Cloudinary uploads are secured with proper access controls
- All requests require authentication

## Performance Benefits

- **Faster loading**: Videos are served from Cloudinary's CDN
- **Better streaming**: Optimized for web delivery
- **Multiple formats**: Automatic format conversion
- **Thumbnail generation**: Automatic thumbnail creation
- **Bandwidth optimization**: Adaptive quality based on connection

## Troubleshooting

### Common Issues

1. **Invalid YouTube URL**: Ensure the URL follows supported formats
2. **Authentication Error**: Verify your auth token is valid
3. **Course Not Found**: Check if the course ID exists and you have permission
4. **Cloudinary Error**: Verify Cloudinary credentials in `.env` file

### Debug Steps

1. Check server logs for detailed error messages
2. Verify Cloudinary configuration
3. Test with a simple YouTube URL first
4. Ensure the course exists and you're the instructor

## Future Enhancements

- Support for YouTube playlists
- Batch video uploads
- Video analytics integration
- Custom thumbnail uploads
- Video chapter markers
