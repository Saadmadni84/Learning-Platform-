'use client'

import React, { useState, useEffect } from 'react'
import { X, ExternalLink, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { SimpleButton as Button } from '@/components/ui/SimpleButton'

interface YouTubeVideoPlayerProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle: string
  videoDescription?: string
  videoDuration?: number
  isRequired?: boolean
}

export default function YouTubeVideoPlayer({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
  videoDescription,
  videoDuration,
  isRequired = false
}: YouTubeVideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Function to convert YouTube URL to embed URL
  const convertToEmbedUrl = (url: string): string => {
    try {
      let videoId = ''
      let timestamp = ''
      
      // Handle different YouTube URL formats
      if (url.includes('youtube.com/watch?v=')) {
        const urlParts = url.split('v=')[1]?.split('&')
        videoId = urlParts?.[0] || ''
        
        // Extract timestamp from t parameter
        const timeMatch = url.match(/[?&]t=(\d+)/)
        if (timeMatch) {
          timestamp = timeMatch[1]
        }
      } else if (url.includes('youtu.be/')) {
        const urlParts = url.split('youtu.be/')[1]?.split('?')
        videoId = urlParts?.[0] || ''
        
        // Extract timestamp from t parameter
        const timeMatch = url.match(/[?&]t=(\d+)/)
        if (timeMatch) {
          timestamp = timeMatch[1]
        }
      } else if (url.includes('youtube.com/live/')) {
        const urlParts = url.split('live/')[1]?.split('?')
        videoId = urlParts?.[0] || ''
        
        // Extract timestamp from t parameter
        const timeMatch = url.match(/[?&]t=(\d+)/)
        if (timeMatch) {
          timestamp = timeMatch[1]
        }
      }
      
      if (!videoId) {
        console.error('Could not extract video ID from URL:', url)
        return ''
      }
      
      // Build embed URL
      let embedUrl = `https://www.youtube.com/embed/${videoId}`
      
      // Add parameters
      const params = new URLSearchParams()
      
      if (timestamp) {
        params.append('start', timestamp)
      }
      
      // Add additional parameters for better embedding
      params.append('rel', '0') // Don't show related videos
      params.append('modestbranding', '1') // Minimal YouTube branding
      params.append('showinfo', '0') // Hide video info
      params.append('controls', '1') // Show controls
      params.append('autoplay', '0') // Don't autoplay
      params.append('mute', '0') // Don't mute by default
      params.append('fs', '1') // Allow fullscreen
      
      embedUrl += '?' + params.toString()
      
      return embedUrl
    } catch (error) {
      console.error('Error converting YouTube URL to embed URL:', error)
      return ''
    }
  }

  // Update embed URL when video URL changes
  useEffect(() => {
    if (videoUrl) {
      setIsLoading(true)
      const embed = convertToEmbedUrl(videoUrl)
      setEmbedUrl(embed)
      setIsLoading(false)
    }
  }, [videoUrl])

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Handle opening in YouTube
  const handleOpenInYouTube = () => {
    window.open(videoUrl, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          {/* Video Header */}
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">▶</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg truncate max-w-md">
                  {videoTitle}
                </h3>
                <div className="flex items-center gap-4 text-gray-300 text-sm">
                  {videoDuration && (
                    <span>Duration: {videoDuration} min</span>
                  )}
                  {isRequired && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                      Required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleOpenInYouTube}
                className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in YouTube
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )}
            
            {embedUrl && (
              <iframe
                src={embedUrl}
                title={videoTitle}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            )}
            
            {!embedUrl && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center text-white">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-lg mb-2">Unable to load video</p>
                  <p className="text-sm text-gray-400 mb-4">
                    The video URL might be invalid or restricted
                  </p>
                  <Button 
                    variant="secondary"
                    onClick={handleOpenInYouTube}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open in YouTube
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Video Description */}
          {videoDescription && (
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                About this video
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {videoDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
