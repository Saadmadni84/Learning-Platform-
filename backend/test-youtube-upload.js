const axios = require('axios');

// Test script to add YouTube video to course using the new endpoint
async function testYouTubeVideoUpload() {
  const baseURL = 'http://localhost:3000'; // Adjust if your server runs on different port
  const youtubeUrl = 'https://www.youtube.com/live/hgUPZ7eWnvw?si=qIQa8WDRHL2XUkPR';
  
  // You'll need to replace these with actual values
  const courseId = 'math-6-up-board'; // The course ID from your data
  const authToken = 'your-auth-token-here'; // Get this from login
  
  const requestData = {
    courseId: courseId,
    youtubeUrl: youtubeUrl,
    title: 'Class 6 Mathematics - Live Session',
    description: 'संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।'
  };

  try {
    console.log('🚀 Testing YouTube video upload to Cloudinary...');
    console.log('📹 YouTube URL:', youtubeUrl);
    console.log('📚 Course ID:', courseId);
    
    const response = await axios.post(`${baseURL}/api/upload/youtube-video`, requestData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Success! YouTube video uploaded to Cloudinary and added to course sources');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading YouTube video:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage with curl command
function generateCurlCommand() {
  const youtubeUrl = 'https://www.youtube.com/live/hgUPZ7eWnvw?si=qIQa8WDRHL2XUkPR';
  const courseId = 'math-6-up-board';
  const authToken = 'your-auth-token-here';
  
  const curlCommand = `curl -X POST http://localhost:3000/api/upload/youtube-video \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${authToken}" \\
  -d '{
    "courseId": "${courseId}",
    "youtubeUrl": "${youtubeUrl}",
    "title": "Class 6 Mathematics - Live Session",
    "description": "संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।"
  }'`;

  console.log('🔧 cURL Command:');
  console.log(curlCommand);
}

// Run the test
if (require.main === module) {
  console.log('📝 YouTube Video Upload Test Script');
  console.log('=====================================\n');
  
  console.log('🔧 To test this endpoint, you can use:');
  generateCurlCommand();
  
  console.log('\n📋 Or run the JavaScript test:');
  console.log('node test-youtube-upload.js');
  
  console.log('\n⚠️  Make sure to:');
  console.log('1. Start your backend server (npm run dev)');
  console.log('2. Get a valid auth token from login');
  console.log('3. Update the courseId and authToken variables');
  console.log('4. Ensure Cloudinary is properly configured in your .env file');
}

module.exports = { testYouTubeVideoUpload, generateCurlCommand };
