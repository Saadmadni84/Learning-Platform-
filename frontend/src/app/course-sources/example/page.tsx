'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Textarea replaced with native HTML textarea
import { Badge } from '@/components/ui/badge';
import { 
  Youtube, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  BookOpen,
  Clock
} from 'lucide-react';

export default function CourseSourcesExample() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const exampleVideos = [
    {
      id: '1',
      title: 'Class 6 Mathematics - Introduction to Numbers',
      url: 'https://www.youtube.com/watch?v=NybHckSEQBI',
      description: 'Learn the basics of numbers and counting',
      duration: 15,
      isRequired: true,
      cloudinaryUrl: 'https://res.cloudinary.com/example/video/upload/v1234567890/math-intro.mp4'
    },
    {
      id: '2',
      title: 'Class 7 Science - Photosynthesis',
      url: 'https://www.youtube.com/watch?v=7DqckSn8T5Y',
      description: 'Understanding how plants make their food',
      duration: 20,
      isRequired: false,
      cloudinaryUrl: 'https://res.cloudinary.com/example/video/upload/v1234567890/photosynthesis.mp4'
    },
    {
      id: '3',
      title: 'Class 8 English - Grammar Basics',
      url: 'https://www.youtube.com/watch?v=8Gv0H-vPoDc',
      description: 'Essential English grammar rules',
      duration: 25,
      isRequired: true,
      cloudinaryUrl: 'https://res.cloudinary.com/example/video/upload/v1234567890/grammar-basics.mp4'
    }
  ];

  const handleUpload = async () => {
    if (!youtubeUrl || !title) {
      alert('Please enter both URL and title');
      return;
    }

    setUploading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadResult({
        success: true,
        message: 'Video uploaded successfully!',
        data: {
          cloudinaryUrl: 'https://res.cloudinary.com/example/video/upload/v1234567890/uploaded-video.mp4',
          publicId: 'courses/example-course/youtube-videos/uploaded-video',
          duration: 18
        }
      });
    } catch (error) {
      setUploadResult({
        success: false,
        message: 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Course Sources Management - Example
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See how to add YouTube videos to courses with Cloudinary integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Add YouTube Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Class 6 Mathematics - Introduction"
                />
              </div>
              
              <div>
                <Label htmlFor="url">YouTube URL</Label>
                <Input
                  id="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the video content"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                />
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={uploading || !youtubeUrl || !title}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading to Cloudinary...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </>
                )}
              </Button>

              {uploadResult && (
                <div className={`p-4 rounded-lg ${
                  uploadResult.success 
                    ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {uploadResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      uploadResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      {uploadResult.message}
                    </span>
                  </div>
                  {uploadResult.success && uploadResult.data && (
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                      <p>Cloudinary URL: {uploadResult.data.cloudinaryUrl}</p>
                      <p>Duration: {uploadResult.data.duration} minutes</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example Videos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Example Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exampleVideos.map((video) => (
                  <div key={video.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{video.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {video.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {video.isRequired && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          <Youtube className="h-3 w-3 mr-1" />
                          YouTube
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{video.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Uploaded to Cloudinary</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => window.open(video.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Watch
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => copyUrl(video.url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use the System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">1. Select Course</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose from classes 6-12 and select the subject you want to add videos to.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Add YouTube URL</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Paste any YouTube URL (watch, live, or short URLs) and add a descriptive title.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Upload to Cloudinary</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The system automatically uploads to Cloudinary for better performance and streaming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Examples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Start Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Supported YouTube URL Formats:</h4>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                  <div>https://www.youtube.com/watch?v=VIDEO_ID</div>
                  <div>https://youtu.be/VIDEO_ID</div>
                  <div>https://www.youtube.com/live/VIDEO_ID</div>
                  <div>http://youtube.com/watch?v=VIDEO_ID</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Example Course Structure:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Class 6 Mathematics</h5>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      <li>• Introduction to Numbers</li>
                      <li>• Basic Operations</li>
                      <li>• Fractions and Decimals</li>
                      <li>• Geometry Basics</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <h5 className="font-medium text-green-900 dark:text-green-100">Class 7 Science</h5>
                    <ul className="text-sm text-green-700 dark:text-green-300 mt-1">
                      <li>• Photosynthesis</li>
                      <li>• Respiration</li>
                      <li>• Nutrition in Plants</li>
                      <li>• Transportation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
