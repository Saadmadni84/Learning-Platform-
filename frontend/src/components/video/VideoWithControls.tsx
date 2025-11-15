'use client'

import React, { useEffect, useRef, useState } from 'react'
import VideoControls from './VideoControls'
import VideoQualityDialog, { VideoQuality } from './VideoQualityDialog'
import { downloadVideo, generateVideoQualities } from '@/utils/videoDownload'

interface VideoWithControlsProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  onDownload?: () => void
  videoTitle?: string
  showQualityDialog?: boolean
}

export default function VideoWithControls({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = false,
  loop = false,
  onDownload,
  videoTitle = 'Video',
  showQualityDialog = true,
}: VideoWithControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isQualityDialogOpen, setIsQualityDialogOpen] = useState(false)
  const [videoQualities, setVideoQualities] = useState<VideoQuality[]>([])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setCurrentTime(v.currentTime)
    const onMeta = () => setDuration(isNaN(v.duration) ? 0 : v.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('durationchange', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('durationchange', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const handlePlayPause = () => {
    const v = videoRef.current
    if (!v) return
    if (isPlaying) v.pause()
    else v.play().catch(() => { v.muted = true; v.play().catch(()=>{}) })
  }

  const handleSeek = (time: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(duration || 0, time))
  }

  const handleSkip = (seconds: number) => {
    const v = videoRef.current
    if (!v) return
    const next = v.currentTime + seconds
    handleSeek(next)
  }

  const handleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !isMuted
    setIsMuted(v.muted)
  }

  const handleVolume = (vol: number) => {
    const v = videoRef.current
    if (!v) return
    const val = Math.max(0, Math.min(100, vol))
    v.volume = val / 100
    setVolume(val)
    if (val === 0) {
      v.muted = true
      setIsMuted(true)
    } else if (isMuted) {
      v.muted = false
      setIsMuted(false)
    }
  }

  const handleFullscreen = () => {
    const v = videoRef.current
    if (!v) return
    if (document.fullscreenElement) document.exitFullscreen()
    else v.requestFullscreen()
  }

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
    <div className={`relative bg-black ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop={loop}
        autoPlay={autoPlay}
        className="w-full h-full object-cover"
        controls={false}
        onClick={handlePlayPause}
      />
      <div className="absolute bottom-0 left-0 right-0">
        <VideoControls
          className="p-3"
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMute}
          onVolumeChange={handleVolume}
          onSeek={(t)=>handleSeek(t)}
          onSkip={(s)=>handleSkip(s)}
          onFullscreen={handleFullscreen}
          onDownload={handleDownload}
          showAdvanced
        />
      </div>

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


