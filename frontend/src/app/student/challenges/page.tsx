'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Calculator, Brain, Target, Clock, Trophy } from 'lucide-react'

export default function ChallengesPage() {
  const challenges = [
    {
      id: 'math-sprint',
      title: 'Math Sprint',
      description: 'Quick math challenges for all classes (6-12)',
      icon: '🔢',
      color: 'from-pink-400 to-pink-500',
      bgColor: 'from-pink-50 to-pink-100',
      borderColor: 'border-pink-200',
      href: '/student/challenges/math-sprint',
      features: ['5 Questions', 'Class-specific', 'Timer-based']
    },
    {
      id: 'science-quiz',
      title: 'Science Quiz',
      description: 'Test your science knowledge',
      icon: '🔬',
      color: 'from-teal-400 to-teal-500',
      bgColor: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-200',
      href: '/student/challenges/science-quiz',
      features: ['Coming Soon', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'word-builder',
      title: 'Word Builder',
      description: 'Build words and improve vocabulary',
      icon: '🔤',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      href: '/student/challenges/word-builder',
      features: ['Coming Soon', 'Vocabulary', 'Spelling']
    },
    {
      id: 'general-knowledge',
      title: 'General Knowledge',
      description: 'Test your general knowledge',
      icon: '🧠',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      href: '/student/challenges/general-knowledge',
      features: ['Coming Soon', 'History', 'Geography', 'Current Affairs']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button asChild variant="outline" className="mr-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900">Learning Challenges</h1>
          </div>
          <p className="text-xl text-gray-600">Choose a challenge and test your knowledge!</p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <Card 
              key={challenge.id} 
              className={`p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${challenge.borderColor} bg-gradient-to-br ${challenge.bgColor}`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{challenge.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {challenge.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/50 rounded-full text-sm font-medium text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                {challenge.features.includes('Coming Soon') ? (
                  <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                    Coming Soon
                  </Button>
                ) : (
                  <Button asChild className={`w-full bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white`}>
                    <Link href={challenge.href}>
                      Start Challenge
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Multiple Classes</h3>
            <p className="text-gray-600">Challenges for classes 6-12</p>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Timed Challenges</h3>
            <p className="text-gray-600">Test your speed and accuracy</p>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
            <p className="text-gray-600">Monitor your improvement</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
