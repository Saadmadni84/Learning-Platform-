'use client'

import React, { useState } from 'react'
import { Download, X, Check, Monitor, Smartphone, Tablet } from 'lucide-react'

export interface VideoQuality {
  id: string
  label: string
  resolution: string
  size: string
  url: string
  icon: React.ReactNode
  description: string
}

interface VideoQualityDialogProps {
  isOpen: boolean
  onClose: () => void
  onQualitySelect: (quality: VideoQuality) => void
  videoTitle?: string
  qualities?: VideoQuality[]
  defaultQuality?: string
}

const defaultQualities: VideoQuality[] = [
  {
    id: 'high',
    label: 'High Quality',
    resolution: '1080p',
    size: '~50MB',
    url: '',
    icon: <Monitor className="w-5 h-5" />,
    description: 'Best quality for desktop viewing'
  },
  {
    id: 'medium',
    label: 'Medium Quality',
    resolution: '720p',
    size: '~25MB',
    url: '',
    icon: <Tablet className="w-5 h-5" />,
    description: 'Good quality for tablet viewing'
  },
  {
    id: 'low',
    label: 'Low Quality',
    resolution: '480p',
    size: '~15MB',
    url: '',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Optimized for mobile devices'
  }
]

export default function VideoQualityDialog({
  isOpen,
  onClose,
  onQualitySelect,
  videoTitle = 'Video',
  qualities = defaultQualities,
  defaultQuality = 'medium'
}: VideoQualityDialogProps) {
  const [selectedQuality, setSelectedQuality] = useState(defaultQuality)
  const [isDownloading, setIsDownloading] = useState(false)

  if (!isOpen) return null

  const handleDownload = async () => {
    const quality = qualities.find(q => q.id === selectedQuality)
    if (!quality) return

    setIsDownloading(true)
    try {
      await onQualitySelect(quality)
      onClose()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const getQualityColor = (qualityId: string) => {
    switch (qualityId) {
      case 'high': return 'border-green-500 bg-green-50 text-green-700'
      case 'medium': return 'border-blue-500 bg-blue-50 text-blue-700'
      case 'low': return 'border-orange-500 bg-orange-50 text-orange-700'
      default: return 'border-gray-300 bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Download Video
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {videoTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quality Options */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Select Video Quality
          </h4>
          
          <div className="space-y-3">
            {qualities.map((quality) => (
              <button
                key={quality.id}
                onClick={() => setSelectedQuality(quality.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedQuality === quality.id
                    ? getQualityColor(quality.id)
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedQuality === quality.id
                        ? 'bg-white/50'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {quality.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {quality.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {quality.resolution} • {quality.size}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {quality.description}
                      </div>
                    </div>
                  </div>
                  
                  {selectedQuality === quality.id && (
                    <div className="p-1 bg-blue-600 rounded-full">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            disabled={isDownloading}
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
