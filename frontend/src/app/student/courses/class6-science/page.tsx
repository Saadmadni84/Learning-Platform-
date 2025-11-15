'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

// Data
import { class6ScienceStats } from '@/data/class6ScienceChapters'

// Components
import Class6ScienceChapterManager from '@/components/Class6ScienceChapterManager'

export default function Class6SciencePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl">🔬</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-2">
                  Class 6 Science
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  कक्षा 6 विज्ञान - Complete Chapter-wise Learning
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {class6ScienceStats.totalChapters}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {class6ScienceStats.totalVideos}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Videos</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {class6ScienceStats.totalDuration}m
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {class6ScienceStats.totalExercises}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Chapter Manager Component */}
        <Class6ScienceChapterManager 
          onVideoSelect={(video) => {
            console.log('Video selected:', video.title)
          }}
          onProgressUpdate={(progress) => {
            console.log('Progress updated:', progress)
          }}
        />

      </div>
    </div>
  )
}
