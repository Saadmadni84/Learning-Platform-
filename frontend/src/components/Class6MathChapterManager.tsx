'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Clock, Star, Play, Youtube, ExternalLink, Download,
  CheckCircle, Lock, Award, Target, Zap, Brain, Calculator,
  ChevronRight, ChevronDown, Eye, EyeOff
} from 'lucide-react'

// UI Components
import { Card } from '@/components/ui/Card'
import { SimpleButton as Button } from '@/components/ui/SimpleButton'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/Dialog'
import YouTubeVideoPlayer from '@/components/YouTubeVideoPlayer'

// Data
import { class6MathChapters, MathChapter, YouTubeVideo } from '@/data/class6MathChapters'

interface ChapterProgress {
  chapterId: string
  completedVideos: string[]
  totalVideos: number
  progress: number
  lastWatched?: string
  totalWatchTime: number
}

interface Class6MathChapterManagerProps {
  onVideoSelect?: (video: YouTubeVideo) => void
  onProgressUpdate?: (progress: ChapterProgress[]) => void
}

export default function Class6MathChapterManager({ 
  onVideoSelect, 
  onProgressUpdate 
}: Class6MathChapterManagerProps) {
  const [selectedChapter, setSelectedChapter] = useState<MathChapter | null>(null)
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [chapterProgress, setChapterProgress] = useState<ChapterProgress[]>([])
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)


  // Initialize progress for all chapters
  useEffect(() => {
    const initialProgress: ChapterProgress[] = class6MathChapters.map(chapter => ({
      chapterId: chapter.id,
      completedVideos: [],
      totalVideos: chapter.videos.length,
      progress: 0,
      totalWatchTime: 0
    }))
    setChapterProgress(initialProgress)
  }, [])

  // Get chapter progress
  const getChapterProgress = (chapterId: string): ChapterProgress => {
    return chapterProgress.find(p => p.chapterId === chapterId) || {
      chapterId,
      completedVideos: [],
      totalVideos: 0,
      progress: 0,
      totalWatchTime: 0
    }
  }

  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  // Watch video handler
  const handleWatchVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video)
    setShowVideoDialog(true)
    onVideoSelect?.(video)
    
    // Update progress
    const progress = getChapterProgress(video.chapterId)
    if (!progress.completedVideos.includes(video.id)) {
      const newCompletedVideos = [...progress.completedVideos, video.id]
      const newProgress = Math.round((newCompletedVideos.length / progress.totalVideos) * 100)
      
      setChapterProgress(prev => {
        const updated = prev.map(p => 
          p.chapterId === video.chapterId 
            ? {
                ...p,
                completedVideos: newCompletedVideos,
                progress: newProgress,
                lastWatched: new Date().toISOString(),
                totalWatchTime: p.totalWatchTime + video.duration
              }
            : p
        )
        onProgressUpdate?.(updated)
        return updated
      })
    }
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  // Get progress color
  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200 dark:bg-gray-700'
    if (progress < 30) return 'bg-red-500'
    if (progress < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Check if video is completed
  const isVideoCompleted = (video: YouTubeVideo): boolean => {
    const progress = getChapterProgress(video.chapterId)
    return progress.completedVideos.includes(video.id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Class 6 Mathematics - Chapter Playlists
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete learning journey with YouTube video playlists for each chapter
          </p>
        </motion.div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        {class6MathChapters.map((chapter, index) => {
          const progress = getChapterProgress(chapter.id)
          const isExpanded = expandedChapters.has(chapter.id)
          
          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                {/* Chapter Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{chapter.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {chapter.titleHindi}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">
                            {chapter.videos.length} videos • {chapter.exercises} exercises
                          </span>
                          <Badge className={getDifficultyColor(chapter.difficulty)}>
                            {chapter.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Progress */}
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {progress.progress}% Complete
                        </div>
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress.progress)}`}
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <Button variant="secondary" size="sm">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Chapter Content (Expanded) */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      {/* Description */}
                      <div className="p-6 pb-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {chapter.description}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {chapter.descriptionHindi}
                        </p>
                        
                        {/* Topics */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Topics Covered:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {chapter.topics.map((topic, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Videos Section */}
                      <div className="px-6 pb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Chapter Videos ({chapter.videos.length})
                        </h4>
                        <div className="space-y-3">
                          {chapter.videos.map((video, videoIndex) => (
                            <div 
                              key={video.id} 
                              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                                isVideoCompleted(video)
                                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                                    isVideoCompleted(video) ? 'bg-green-500' : 'bg-red-500'
                                  }`}>
                                    {isVideoCompleted(video) ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : (
                                      videoIndex + 1
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                      {video.title}
                                    </h5>
                                    {isVideoCompleted(video) && (
                                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                        Completed
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {video.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {video.duration} min
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Youtube className="h-3 w-3" />
                                      YouTube
                                    </span>
                                    {video.isRequired && (
                                      <Badge variant="destructive" className="text-xs">
                                        Required
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="secondary"
                                  onClick={() => window.open(video.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleWatchVideo(video)}
                                  className={isVideoCompleted(video) ? 'bg-green-600 hover:bg-green-700' : ''}
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  {isVideoCompleted(video) ? 'Replay' : 'Watch'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chapter Stats */}
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card className="p-3 text-center">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {chapter.videos.length}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Videos</div>
                          </Card>
                          <Card className="p-3 text-center">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {progress.completedVideos.length}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                          </Card>
                          <Card className="p-3 text-center">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              {chapter.exercises}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Exercises</div>
                          </Card>
                          <Card className="p-3 text-center">
                            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              {chapter.estimatedHours}h
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <YouTubeVideoPlayer
          isOpen={showVideoDialog}
          onClose={() => setShowVideoDialog(false)}
          videoUrl={selectedVideo.url}
          videoTitle={selectedVideo.title}
          videoDescription={selectedVideo.description}
          videoDuration={selectedVideo.duration}
          isRequired={selectedVideo.isRequired}
        />
      )}
    </div>
  )
}
