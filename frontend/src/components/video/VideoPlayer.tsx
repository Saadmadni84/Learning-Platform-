'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import VideoQualityDialog, { VideoQuality } from './VideoQualityDialog'
import { downloadVideo, generateVideoQualities } from '@/utils/videoDownload'

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  width?: number
  height?: number
  controls?: boolean
  onDownload?: () => void
  videoTitle?: string
  showQualityDialog?: boolean
}

export default function VideoPlayer({ 
  src, 
  poster, 
  className = '', 
  autoPlay = false, 
  muted = false, 
  loop = false,
  width,
  height,
  controls = true,
  onDownload,
  videoTitle = 'Video',
  showQualityDialog = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState(0)
  const [isQualityDialogOpen, setIsQualityDialogOpen] = useState(false)
  const [videoQualities, setVideoQualities] = useState<VideoQuality[]>([])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateDuration = () => {
      if (!isNaN(video.duration)) setDuration(video.duration)
    }

    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('durationchange', updateDuration)

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('durationchange', updateDuration)
    }
  }, [])

  const handleDownload = () => {
    if (onDownload) {
      onDownload()
    } else if (showQualityDialog) {
      // Show quality selection dialog
      const qualities = generateVideoQualities(src)
      setVideoQualities(qualities)
      setIsQualityDialogOpen(true)
    } else {
      // Default download behavior using utility
      downloadVideo(src, {
        filename: src.split('/').pop() || 'video.mp4',
        onSuccess: () => console.log('Video download started'),
        onError: (error) => console.error('Download failed:', error)
      })
    }
  }

  const handleQualitySelect = (quality: VideoQuality) => {
    downloadVideo(quality.url, {
      filename: `${quality.resolution}_${src.split('/').pop() || 'video.mp4'}`,
      onSuccess: () => console.log(`Downloading ${quality.resolution} video`),
      onError: (error) => console.error('Download failed:', error)
    })
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        controls={controls}
      />

      {/* Loading State */}
      {duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* Download Button */}
      {(onDownload || showQualityDialog) && (
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          title="Download video"
        >
          <Download className="w-5 h-5" />
        </button>
      )}

      {/* Quality Selection Dialog */}
      <VideoQualityDialog
        isOpen={isQualityDialogOpen}
        onClose={() => setIsQualityDialogOpen(false)}
        onQualitySelect={handleQualitySelect}
        videoTitle={videoTitle}
        qualities={videoQualities}
      />
    </div>
  )
}
