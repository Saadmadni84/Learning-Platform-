const axios = require('axios');

// Test the upload-video endpoint
async function testUploadVideo() {
  const baseUrl = 'http://localhost:5000';
  const endpoint = `${baseUrl}/api/upload/upload-video`;
  
  // Test data
  const testData = {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  };

  try {
    console.log('Testing /api/upload/upload-video endpoint...');
    console.log('Request URL:', endpoint);
    console.log('Request data:', testData);

    const response = await axios.post(endpoint, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 seconds timeout for video upload
    });

    console.log('\n✅ Success!');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('\n❌ Error!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Test with missing videoUrl
async function testMissingVideoUrl() {
  const baseUrl = 'http://localhost:5000';
  const endpoint = `${baseUrl}/api/upload/upload-video`;
  
  const testData = {};

  try {
    console.log('\nTesting with missing videoUrl...');
    const response = await axios.post(endpoint, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('❌ Should have failed but got:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Correctly handled missing videoUrl');
      console.log('Response:', error.response.data);
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

// Test with invalid URL
async function testInvalidUrl() {
  const baseUrl = 'http://localhost:5000';
  const endpoint = `${baseUrl}/api/upload/upload-video`;
  
  const testData = {
    videoUrl: 'not-a-valid-url'
  };

  try {
    console.log('\nTesting with invalid URL...');
    const response = await axios.post(endpoint, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('❌ Should have failed but got:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Correctly handled invalid URL');
      console.log('Response:', error.response.data);
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting upload-video endpoint tests...\n');
  
  await testMissingVideoUrl();
  await testInvalidUrl();
  await testUploadVideo();
  
  console.log('\n✨ Tests completed!');
}

runTests().catch(console.error);
