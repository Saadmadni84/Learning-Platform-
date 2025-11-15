'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
// Dialog components replaced with simple modals
import { 
  Youtube, 
  Plus, 
  Upload, 
  Link as LinkIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Trash2,
  Edit
} from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  description?: string;
  duration?: number;
  thumbnail?: string;
  cloudinaryUrl?: string;
  isUploaded: boolean;
  isRequired: boolean;
  addedAt: string;
}

interface YouTubeVideoManagerProps {
  courseId: string;
  courseTitle: string;
  onVideosChange?: (videos: YouTubeVideo[]) => void;
  initialVideos?: YouTubeVideo[];
}

export default function YouTubeVideoManager({ 
  courseId, 
  courseTitle, 
  onVideosChange,
  initialVideos = []
}: YouTubeVideoManagerProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>(initialVideos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    description: '',
    isRequired: false
  });
  const [bulkUrls, setBulkUrls] = useState('');
  const [uploadStatus, setUploadStatus] = useState<Record<string, 'pending' | 'uploading' | 'success' | 'error'>>({});

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (url: string): string => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.url) return;

    if (!validateYouTubeUrl(newVideo.url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    const videoId = `video-${Date.now()}`;
    setUploadStatus({ ...uploadStatus, [videoId]: 'uploading' });

    try {
      const response = await fetch('/api/upload/youtube-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          courseId,
          youtubeUrl: newVideo.url,
          title: newVideo.title,
          description: newVideo.description
        })
      });

      if (response.ok) {
        const result = await response.json();
        const newVideoData: YouTubeVideo = {
          id: videoId,
          title: newVideo.title,
          url: newVideo.url,
          description: newVideo.description,
          thumbnail: getThumbnailUrl(newVideo.url),
          cloudinaryUrl: result.data.video.cloudinaryUrl,
          isUploaded: true,
          isRequired: newVideo.isRequired,
          addedAt: new Date().toISOString()
        };

        setVideos(prev => [...prev, newVideoData]);
        setUploadStatus({ ...uploadStatus, [videoId]: 'success' });
        onVideosChange?.([...videos, newVideoData]);

        // Reset form
        setNewVideo({
          title: '',
          url: '',
          description: '',
          isRequired: false
        });
        setIsAddDialogOpen(false);
      } else {
        throw new Error('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus({ ...uploadStatus, [videoId]: 'error' });
      alert('Failed to upload video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkUrls.trim()) return;

    const urls = bulkUrls.split('\n').filter(url => url.trim());
    setLoading(true);

    try {
      const uploadPromises = urls.map(async (url, index) => {
        if (!validateYouTubeUrl(url)) {
          return { success: false, error: 'Invalid YouTube URL', url };
        }

        const videoId = `bulk-${Date.now()}-${index}`;
        setUploadStatus(prev => ({ ...prev, [videoId]: 'uploading' }));

        try {
          const response = await fetch('/api/upload/youtube-video', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              courseId,
              youtubeUrl: url.trim(),
              title: `Video ${index + 1}`,
              description: `Bulk uploaded video ${index + 1}`
            })
          });

          if (response.ok) {
            const result = await response.json();
            const newVideoData: YouTubeVideo = {
              id: videoId,
              title: `Video ${index + 1}`,
              url: url.trim(),
              description: `Bulk uploaded video ${index + 1}`,
              thumbnail: getThumbnailUrl(url.trim()),
              cloudinaryUrl: result.data.video.cloudinaryUrl,
              isUploaded: true,
              isRequired: false,
              addedAt: new Date().toISOString()
            };

            setVideos(prev => [...prev, newVideoData]);
            setUploadStatus(prev => ({ ...prev, [videoId]: 'success' }));
            return { success: true, video: newVideoData };
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          setUploadStatus(prev => ({ ...prev, [videoId]: 'error' }));
          return { success: false, error: error.message, url };
        }
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(r => r.success);
      
      if (successfulUploads.length > 0) {
        onVideosChange?.([...videos, ...successfulUploads.map(r => r.video)]);
      }

      setBulkUrls('');
      setIsBulkDialogOpen(false);
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Some videos failed to upload. Please check the URLs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
    onVideosChange?.(videos.filter(v => v.id !== videoId));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            YouTube Videos for {courseTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {videos.length} videos • {videos.filter(v => v.isUploaded).length} uploaded to Cloudinary
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add YouTube Video</DialogTitle>
                <DialogDescription>
                  Add a YouTube video to {courseTitle}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Title</Label>
                  <Input
                    id="video-title"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="Video title"
                  />
                </div>
                <div>
                  <Label htmlFor="video-url">YouTube URL</Label>
                  <Input
                    id="video-url"
                    value={newVideo.url}
                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {newVideo.url && !validateYouTubeUrl(newVideo.url) && (
                    <p className="text-sm text-red-500 mt-1">Please enter a valid YouTube URL</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="video-description">Description (Optional)</Label>
                  <Textarea
                    id="video-description"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    placeholder="Brief description of the video"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="video-required"
                    checked={newVideo.isRequired}
                    onChange={(e) => setNewVideo({ ...newVideo, isRequired: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="video-required">Required Video</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddVideo} 
                  disabled={loading || !newVideo.title || !newVideo.url || !validateYouTubeUrl(newVideo.url)}
                >
                  {loading ? 'Uploading...' : 'Add Video'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-1" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Upload YouTube Videos</DialogTitle>
                <DialogDescription>
                  Paste multiple YouTube URLs (one per line) to upload them all at once
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bulk-urls">YouTube URLs</Label>
                  <Textarea
                    id="bulk-urls"
                    value={bulkUrls}
                    onChange={(e) => setBulkUrls(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID_1&#10;https://www.youtube.com/watch?v=VIDEO_ID_2&#10;https://www.youtube.com/watch?v=VIDEO_ID_3"
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter one YouTube URL per line. Videos will be uploaded to Cloudinary automatically.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBulkDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleBulkUpload} 
                  disabled={loading || !bulkUrls.trim()}
                >
                  {loading ? 'Uploading...' : 'Upload All Videos'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Videos List */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card key={video.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {video.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-gray-500">YouTube</span>
                      {video.isRequired && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {uploadStatus[video.id] === 'uploading' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    )}
                    {uploadStatus[video.id] === 'success' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {uploadStatus[video.id] === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {video.thumbnail && (
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {video.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {video.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration || 'Unknown'} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{new Date(video.addedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(video.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Watch
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(video.url)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {video.cloudinaryUrl && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    ✓ Uploaded to Cloudinary
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Youtube className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No YouTube videos added yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add YouTube videos to enhance your course content
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Video
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
