# Upload Video Endpoint

## Overview
The `/api/upload/upload-video` endpoint allows you to upload videos from remote URLs to Cloudinary using the Cloudinary Node.js SDK.

## Endpoint Details
- **URL**: `POST /api/upload/upload-video`
- **Authentication**: Not required
- **Content-Type**: `application/json`

## Request Body
```json
{
  "videoUrl": "https://example.com/video.mp4"
}
```

### Required Fields
- `videoUrl` (string): The remote video URL to upload to Cloudinary

## Response

### Success Response (200)
```json
{
  "success": true,
  "message": "Video uploaded successfully to Cloudinary",
  "data": {
    "publicId": "videos/uuid-here",
    "secureUrl": "https://res.cloudinary.com/dv6ijui25/video/upload/v1234567890/videos/uuid-here.mp4",
    "format": "mp4",
    "resourceType": "video",
    "bytes": 1048576,
    "width": 1280,
    "height": 720,
    "duration": 30.5
  }
}
```

### Error Responses

#### Missing videoUrl (400)
```json
{
  "success": false,
  "message": "videoUrl is required"
}
```

#### Invalid URL format (400)
```json
{
  "success": false,
  "message": "Invalid videoUrl format"
}
```

#### URL not accessible (400)
```json
{
  "success": false,
  "message": "Video URL is not accessible or does not exist"
}
```

#### Upload failure (500)
```json
{
  "success": false,
  "message": "Failed to upload video to Cloudinary: [error details]"
}
```

## Environment Variables Required

Add these to your `.env` file:

```env
# Cloudinary Configuration
CLOUD_NAME=dv6ijui25
CLOUDINARY_API_KEY=434572933657642
CLOUDINARY_API_SECRET=R39sHvdI1uB7PQTyG42xyDrwr4A
```

## Features

- **URL Validation**: Validates that the provided URL is properly formatted
- **Accessibility Check**: Verifies that the remote video URL is accessible
- **Automatic Processing**: Cloudinary automatically processes the video with:
  - Multiple quality levels (1280x720, 854x480, 640x360)
  - MP4 format conversion
  - AAC audio codec
  - Automatic quality optimization
  - Thumbnail generation
- **Unique Naming**: Each video gets a unique public ID using UUID
- **Folder Organization**: Videos are stored in the `acadevia-videos` folder

## Usage Examples

### cURL
```bash
curl -X POST http://localhost:5000/api/upload/upload-video \
  -H "Content-Type: application/json" \
  -d '{"videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"}'
```

### JavaScript (fetch)
```javascript
const response = await fetch('http://localhost:5000/api/upload/upload-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    videoUrl: 'https://example.com/video.mp4'
  })
});

const result = await response.json();
console.log(result);
```

### JavaScript (axios)
```javascript
const axios = require('axios');

const response = await axios.post('http://localhost:5000/api/upload/upload-video', {
  videoUrl: 'https://example.com/video.mp4'
});

console.log(response.data);
```

## Testing

A test script is provided at `test-upload-video.js`. To run it:

1. Make sure your server is running: `npm run dev`
2. Install axios if not already installed: `npm install axios`
3. Run the test: `node test-upload-video.js`

## Error Handling

The endpoint includes comprehensive error handling for:
- Missing required fields
- Invalid URL formats
- Inaccessible remote URLs
- Cloudinary upload failures
- Network timeouts

## Cloudinary Configuration

The endpoint uses the following Cloudinary settings:
- **Resource Type**: `video`
- **Format**: `mp4`
- **Audio Codec**: `aac`
- **Quality**: `auto`
- **Streaming Profile**: `auto`
- **Eager Transformations**: Multiple quality levels for responsive delivery
