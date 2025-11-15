// Video download utility functions

export interface VideoDownloadOptions {
  filename?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface VideoQuality {
  id: string;
  label: string;
  resolution: string;
  size: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

export interface VideoQualityOptions {
  baseUrl: string;
  qualities: VideoQuality[];
  defaultQuality?: string;
}

/**
 * Downloads a video file from a given URL
 * @param url - The video URL to download
 * @param options - Download options including filename and callbacks
 */
export const downloadVideo = (
  url: string, 
  options: VideoDownloadOptions = {}
): void => {
  const { filename, onSuccess, onError } = options;
  
  try {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || url.split('/').pop() || 'video.mp4';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Call success callback
    onSuccess?.();
  } catch (error) {
    // Call error callback
    onError?.(error as Error);
  }
};

/**
 * Downloads multiple videos in sequence
 * @param videos - Array of video URLs and options
 */
export const downloadMultipleVideos = async (
  videos: Array<{ url: string; options?: VideoDownloadOptions }>
): Promise<void> => {
  for (const video of videos) {
    downloadVideo(video.url, video.options);
    // Add a small delay between downloads to prevent browser blocking
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

/**
 * Gets video filename from URL
 * @param url - Video URL
 * @returns Extracted filename or default name
 */
export const getVideoFilename = (url: string): string => {
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1];
  
  // If no extension, add .mp4
  if (!filename.includes('.')) {
    return `${filename}.mp4`;
  }
  
  return filename;
};

/**
 * Checks if a URL is a valid video URL
 * @param url - URL to check
 * @returns True if URL appears to be a video
 */
export const isValidVideoUrl = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
};

/**
 * Generates quality URLs for different video resolutions
 * @param baseUrl - Base video URL
 * @returns Array of quality options
 */
export const generateVideoQualities = (baseUrl: string): VideoQuality[] => {
  const baseName = baseUrl.split('/').pop()?.split('.')[0] || 'video';
  const extension = baseUrl.split('.').pop() || 'mp4';
  
  return [
    {
      id: 'high',
      label: 'High Quality',
      resolution: '1080p',
      size: '~50MB',
      url: baseUrl.replace(/\.[^.]+$/, `_1080p.${extension}`),
      icon: null, // Will be set by component
      description: 'Best quality for desktop viewing'
    },
    {
      id: 'medium',
      label: 'Medium Quality',
      resolution: '720p',
      size: '~25MB',
      url: baseUrl.replace(/\.[^.]+$/, `_720p.${extension}`),
      icon: null,
      description: 'Good quality for tablet viewing'
    },
    {
      id: 'low',
      label: 'Low Quality',
      resolution: '480p',
      size: '~15MB',
      url: baseUrl.replace(/\.[^.]+$/, `_480p.${extension}`),
      icon: null,
      description: 'Optimized for mobile devices'
    }
  ];
};

/**
 * Downloads video with quality selection
 * @param baseUrl - Base video URL
 * @param options - Download options
 * @param showQualityDialog - Function to show quality dialog
 */
export const downloadVideoWithQuality = (
  baseUrl: string,
  options: VideoDownloadOptions = {},
  showQualityDialog: (qualities: VideoQuality[], onSelect: (quality: VideoQuality) => void) => void
): void => {
  const qualities = generateVideoQualities(baseUrl);
  
  showQualityDialog(qualities, (selectedQuality) => {
    downloadVideo(selectedQuality.url, {
      ...options,
      filename: options.filename || `${selectedQuality.resolution}_${getVideoFilename(baseUrl)}`
    });
  });
};
