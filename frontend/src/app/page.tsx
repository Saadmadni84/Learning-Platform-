'use client'
// For Radix UI

// For Headless UI

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Trophy, BarChart3, Users, User, BookOpen, ArrowRight, Star, Play,
  Award, TrendingUp, Clock, Target, Zap, Shield, Globe, Calendar,
  ChevronRight, Bell, Search, Filter, Menu, Download, Share
} from 'lucide-react'

// UI Components
import { Card } from '@/components/ui/Card'
import { SimpleButton as Button } from '@/components/ui/SimpleButton'
import StartQuestButton from '@/components/StartQuestButton'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table } from '@/components/ui/Table'

// Common Components
import BackgroundImage from '@/components/common/BackgroundImage'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Sidebar from '@/components/common/Sidebar'

// Forms
import LoginForm from '@/components/forms/LoginForm'
import ProfileForm from '@/components/forms/ProfileForm'
import RegisterForm from '@/components/forms/RegisterForm'

// Video Components
import VideoPlayer from '@/components/video/VideoPlayer'
import VideoWithControls from '@/components/video/VideoWithControls'
import { downloadVideo } from '@/utils/videoDownload'

// Charts
import { BarChart } from '@/components/charts/Barchart'
import { LineChart } from '@/components/charts/LineChart'
import { PieChart } from '@/components/charts/PieChart'

// Theme Provider
import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggle from '@/components/ThemeToggle'

// Hooks
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useSocket } from '@/hooks/useSocket'
import { useToast } from '@/hooks/use-toast'

// Game Components
import { GameCard } from '@/components/games/shared/GameCard'

export default function HomePage() {
  const router = useRouter()
  
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showDemoDialog, setShowDemoDialog] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userProfile, setUserProfile] = useState<any>(null)
  
  // Custom hooks
  const { user, login, logout } = useAuth()
  const debouncedSearch = useDebounce(searchTerm, 300)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const { socket, isConnected } = useSocket()
  const { toast } = useToast()

  // Sample data
  const studentStats = {
    totalStudents: 15420,
    activeToday: 3847,
    coursesCompleted: 2156,
    averageScore: 87.3
  }

  const topCourses = [
    { id: 1, title: 'Mathematics - Algebra & Geometry', students: 2400, rating: 4.9, progress: 95, category: 'Mathematics' },
    { id: 2, title: 'Science - Physics & Chemistry', students: 1950, rating: 4.8, progress: 88, category: 'Science' },
    { id: 3, title: 'English Literature & Grammar', students: 1680, rating: 4.7, progress: 76, category: 'English' },
    { id: 4, title: 'Social Studies - History & Geography', students: 1420, rating: 4.9, progress: 92, category: 'Social Studies' },
    { id: 5, title: 'Computer Science - Programming Basics', students: 1200, rating: 4.6, progress: 84, category: 'Computer Science' },
    { id: 6, title: 'Art & Creative Expression', students: 1800, rating: 4.8, progress: 79, category: 'Arts' }
  ]

  const recentAchievements = [
    { user: 'Alex Chen', achievement: 'Math Genius', time: '2 hours ago', avatar: '/images/avatar/alex.jpg', points: 500 },
    { user: 'Sarah Johnson', achievement: 'Science Explorer', time: '4 hours ago', avatar: '/images/avatar/sarah.jpg', points: 750 },
    { user: 'Mike Wilson', achievement: 'English Scholar', time: '6 hours ago', avatar: '/images/avatar/mike.jpg', points: 1000 },
    { user: 'Emily Davis', achievement: 'History Buff', time: '8 hours ago', avatar: '/images/avatar/emily.jpg', points: 400 },
    { user: 'John Smith', achievement: 'Creative Artist', time: '10 hours ago', avatar: '/images/avatar/john.jpg', points: 600 }
  ]

  const features = [
    {
      icon: Trophy,
      title: 'Achievements & Badges',
      description: 'Unlock rewards as you progress through courses and complete challenges',
      color: 'yellow',
      link: '/student/progress'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your learning journey with detailed insights and performance metrics',
      color: 'blue',
      link: '/progress'
    },
    {
      icon: Users,
      title: 'Social Learning',
      description: 'Join study groups, compete with friends, and learn from peers',
      color: 'green',
      link: '/leaderboard'
    },
    {
      icon: Target,
      title: 'Personalized Paths',
      description: 'AI-powered recommendations tailored to your learning style and goals',
      color: 'purple',
      link: '/student/courses'
    },
    {
      icon: Zap,
      title: 'Interactive Content',
      description: 'Engage with hands-on projects, coding challenges, and simulations',
      color: 'red',
      link: '/student/courses'
    },
    {
      icon: Shield,
      title: 'Certified Learning',
      description: 'Earn industry-recognized certificates upon course completion',
      color: 'indigo',
      link: '/Profile'
    }
  ]

  const miniChallenges = [
    {
      id: 'math-sprint',
      title: 'Math Sprint',
      description: 'Solve 5 sums in 60 seconds!',
      icon: '📊',
      difficulty: 34,
      color: 'pink'
    },
    {
      id: 'science-guess',
      title: 'Science Guess',
      description: 'Match animals to their homes.',
      icon: '🔬',
      difficulty: 0,
      color: 'green'
    },
    {
      id: 'word-builder',
      title: 'Word Builder',
      description: 'Make 3 words from letters.',
      icon: 'abc',
      difficulty: 0,
      color: 'purple'
    },
    {
      id: 'logic-puzzle',
      title: 'Logic Puzzle',
      description: 'Drag blocks to solve it!',
      icon: '🧩',
      difficulty: 0,
      color: 'cyan'
    }
  ]

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userProfile = localStorage.getItem('userProfile')
      
      if (!isLoggedIn || !userProfile) {
        // User is not logged in, redirect to login page
        router.replace('/login')
        return
      }
      
      // User is logged in, continue to home page
      try {
        const profile = JSON.parse(userProfile)
        setUserProfile(profile)
      } catch (error) {
        console.error('Error parsing user profile:', error)
        // If profile is corrupted, clear it and redirect to login
        localStorage.removeItem('userProfile')
        router.replace('/login')
        return
      }
      setIsCheckingLogin(false)
    }

    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(checkLoginStatus, 100)
    return () => clearTimeout(timer)
  }, []) // Remove router dependency to prevent re-running on navigation

  useEffect(() => {
    if (debouncedSearch) {
      // Implement search functionality
      console.log('Searching for:', debouncedSearch)
    }
  }, [debouncedSearch])

  // Event handlers
  const handleShowToast = () => {
    toast({
      title: "Welcome!",
      description: "Explore our gamified learning platform.",
    })
  }

  const handleLogout = () => {
    // Clear login data
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userProfile')
    
    // Redirect to login page
    router.push('/login')
  }

  if (isLoading || isCheckingLogin) {
    return (
      <div className="flex items-center justify-center min-h-screen font-inter">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-teal-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-inter overflow-hidden">
        
         {/* Geometric Background Patterns */}
         <div className="fixed inset-0 z-0 opacity-20">
           {/* Floating Hexagons */}
           <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg transform rotate-45 animate-pulse"></div>
           <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-teal-300 to-cyan-400 rounded-lg transform rotate-12 animate-bounce"></div>
           <div className="absolute top-60 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg transform -rotate-12 animate-pulse"></div>
           
           {/* Hexagonal Patterns */}
           <div className="absolute top-32 right-1/3 w-24 h-24 bg-gradient-to-br from-teal-200 to-purple-300 transform rotate-45 opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
           <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-br from-pink-200 to-teal-300 transform -rotate-45 opacity-40 animate-pulse"></div>
           
           {/* Abstract Geometric Shapes */}
           <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
           <div className="absolute top-1/3 right-10 w-6 h-6 bg-gradient-to-br from-teal-400 to-pink-400 transform rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
           <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg transform rotate-12 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
         </div>
        
         {/* Background Image Component */}
         <BackgroundImage
           src="/images/school-bg.jpg"
           alt="Educational Background"
           className="fixed inset-0 z-0 opacity-5"
         />

        

        {/* Sidebar Component */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          className="z-50"
        />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-30">
          <ThemeToggle />
        </div>

        {/* Logout Button */}
        <div className="fixed top-4 right-24 z-30">
          <Button
            onClick={handleLogout}
            variant="secondary"
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-16">
          
          {/* Hero Section - Kid Friendly */}
          <section className="relative pt-8 pb-32 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="mb-6 bg-yellow-100 text-yellow-800 px-4 py-2 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ✨ New: Fun Quests and Daily Streaks!
                  </Badge>
                  
                  
                  <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-gradient-to-r from-pink-500 via-teal-500 to-purple-600 dark:from-pink-400 dark:via-teal-400 dark:to-purple-500 bg-clip-text text-transparent drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                      Welcome Back! 🎉
                    </span>
                    <span className="ml-4 text-5xl md:text-6xl">🗺️</span>
                    <span className="ml-2 text-5xl md:text-6xl">🎮</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-black text-gray-800 dark:text-gray-200" style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    lineHeight: '1.5',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <span className="inline-block transform hover:scale-110 transition-all duration-300 hover:rotate-1">
                      For explorers in classes 6-12: collect stars ⭐, level up 🚀, and
                    </span>
                    <br />
                    <span className="inline-block transform hover:scale-110 transition-all duration-300 hover:-rotate-1">
                      learn Math, Science, English, Coding, and more with bite-sized games and quests!
                    </span>
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <StartQuestButton userId="user-123" difficulty="easy" className="px-8 py-4 text-base" />
                    
                    <Button 
                      variant="secondary"
                      size="lg"
                      className="border-2 border-teal-300 text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-2xl font-bold"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      onClick={() => setShowDemoDialog(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Demo
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                    <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 border-2 border-pink-200 dark:border-pink-700">
                      <div className="text-3xl font-black text-pink-600 dark:text-pink-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>{studentStats.totalStudents.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Happy Learners</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 border-2 border-teal-200 dark:border-teal-700">
                      <div className="text-3xl font-black text-teal-600 dark:text-teal-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>{studentStats.activeToday.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Playing Today</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-2 border-purple-200 dark:border-purple-700">
                      <div className="text-3xl font-black text-purple-600 dark:text-purple-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>{studentStats.coursesCompleted.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Quests Finished</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 border-2 border-cyan-200 dark:border-cyan-700">
                      <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>{studentStats.averageScore}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Avg Score</div>
                    </Card>
                  </div>

                  {/* Toast Demo Button */}
                  <div className="mt-8">
                    <Button onClick={handleShowToast} variant="secondary" size="sm" className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Show Welcome Message
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mini Challenges - Earn Stars */}
          <section className="py-16 bg-gradient-to-br from-white via-pink-50 to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 relative overflow-hidden">
            {/* Hexagonal Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-400 transform rotate-45 rounded-lg"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-teal-300 to-cyan-400 transform -rotate-12 rounded-lg"></div>
              <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-400 transform rotate-12 rounded-lg"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Mini Challenges ⭐</h2>
                <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Complete quick tasks to earn stars and badges</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {miniChallenges.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </section>

          {/* Subjects Grid - Geometric Playground */}
          <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 relative overflow-hidden">
            {/* Abstract Geometric Shapes */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-400 transform rotate-45 rounded-2xl animate-pulse"></div>
              <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-teal-300 to-cyan-400 transform -rotate-12 rounded-2xl animate-bounce"></div>
              <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-purple-300 to-pink-400 transform rotate-12 rounded-2xl animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Choose Your Subject 🎓</h2>
                <p className="text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Colorful cards lead to bite-sized lessons and games</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 hover:border-pink-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">➗</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Math</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Puzzles, shapes, and number quests</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 hover:border-teal-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">🧪</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Science</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Fun experiments and nature adventures</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:border-purple-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>English</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Stories, spelling, and word games</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 hover:border-cyan-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">💻</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Coding</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Block-based games and logic fun</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 hover:border-pink-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">🎨</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Art</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Draw, paint, and create masterpieces</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 hover:border-teal-300 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-4xl mb-3">🏰</div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>History</div>
                    <p className="text-gray-600 mt-1 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Time travel quests through the past</p>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 relative overflow-hidden">
            {/* Hexagonal Patterns with Educational Icons */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-400 transform rotate-45 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-teal-300 to-cyan-400 transform -rotate-12 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-300 to-pink-400 transform rotate-12 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Made for Curious Kids 👧👦
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Short lessons, colorful games, and rewards that make learning feel like play
                </p>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-pink-200">
                      <div className={`p-4 rounded-2xl w-fit mb-6 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 group-hover:from-${feature.color}-200 group-hover:to-${feature.color}-300 transition-all duration-300 transform group-hover:rotate-6`}>
                        <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {feature.description}
                      </p>
                      <Button variant="secondary" className="text-teal-600 hover:text-teal-800 p-0 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Analytics Dashboard Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Platform Analytics
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Real-time insights into learning progress and platform performance
                </p>
              </motion.div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Course Completion Rates</h3>
                    <BarChart />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Weekly Progress</h3>
                    <LineChart
                      data={[
                        { day: 'Mon', score: 85 },
                        { day: 'Tue', score: 92 },
                        { day: 'Wed', score: 78 },
                        { day: 'Thu', score: 95 },
                        { day: 'Fri', score: 88 },
                        { day: 'Sat', score: 91 },
                        { day: 'Sun', score: 87 },
                      ]}
                      height={300}
                    />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Subject Distribution</h3>
                    <PieChart
                      data={[
                        { subject: 'Mathematics', value: 30, color: '#8B5CF6' },
                        { subject: 'Science', value: 25, color: '#3B82F6' },
                        { subject: 'English', value: 20, color: '#10B981' },
                        { subject: 'History', value: 15, color: '#F59E0B' },
                        { subject: 'Others', value: 10, color: '#EF4444' },
                      ]}
                      size={250}
                    />
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Top Courses Section with Table */}
          <section className="py-20 bg-white dark:bg-gray-900 relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Popular Courses
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Discover what students are learning right now
                  </p>
                </div>
                
                {/* Search and Filter */}
                <div className="flex gap-4 mt-6 md:mt-0">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 font-medium"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                  <Button variant="secondary" size="sm" className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Courses Table */}
              <Card className="overflow-hidden">
                <Table>
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Course</th>
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Category</th>
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Students</th>
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Rating</th>
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Progress</th>
                      <th className="text-left p-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCourses.filter(course => 
                      course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                      course.category.toLowerCase().includes(debouncedSearch.toLowerCase())
                    ).map((course) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-black" />
                            </div>
                            <div>
                              <div className="font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>{course.title}</div>
                              <div className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Interactive Course</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{course.category}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{course.students.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{course.rating}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{course.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Link href="/student/courses">
                            <Button size="sm" className="font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              View Course
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </section>

          {/* Recent Achievements Section */}
          <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Recent Achievements
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Celebrate success stories from our learning community
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {recentAchievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-300">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                      </Avatar>
                      <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.user}</h3>
                      <Badge className="mb-3 bg-yellow-100 text-yellow-800 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <Award className="w-3 h-3 mr-1" />
                        {item.achievement}
                      </Badge>
                      <div className="text-sm text-gray-500 mb-2 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>{item.time}</div>
                      <div className="text-xs font-bold text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>+{item.points} points</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Video Demo Section */}
          <section className="py-20 bg-gray-900 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  See It In Action
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Watch how our platform transforms traditional learning into an engaging, 
                  gamified experience that keeps students motivated and achieving their goals.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden bg-black">
                  <VideoWithControls
                    src="/videos/platform-demo.mp4"
                    poster="/images/video-thumbnail.jpg"
                    className="w-full aspect-video"
                    videoTitle="Platform Demo"
                    showQualityDialog={true}
                  />
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Links to All Pages */}
          <section className="py-16 bg-white dark:bg-gray-900 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Explore Pages
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-10 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Jump directly to any section of the app
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600">
                  <span className="flex items-center gap-2"><span>🏠</span> Home</span>
                  <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                </Button>
                <Link href="/auth/login">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700">
                    <span className="flex items-center gap-2"><span>🔑</span> Auth / Login</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/auth/verify-otp">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600">
                    <span className="flex items-center gap-2"><span>📩</span> Auth / Verify OTP</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/multi-step-login">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700">
                    <span className="flex items-center gap-2"><span>🎯</span> Multi-Step Login</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/courses" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
                    <span className="flex items-center gap-2"><span>📚</span> Courses</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600">
                    <span className="flex items-center gap-2"><span>🏆</span> Leaderboard</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/Profile">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700">
                    <span className="flex items-center gap-2"><span>👤</span> Profile</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-lime-500 to-green-600 text-white hover:from-lime-600 hover:to-green-700">
                    <span className="flex items-center gap-2"><span>📊</span> Progress</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/student/courses">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700">
                    <span className="flex items-center gap-2"><span>🎒</span> Student / Courses</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/student/dashboard">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700">
                    <span className="flex items-center gap-2"><span>🧭</span> Student / Dashboard</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
                <Link href="/student/courses/course-123">
                  <Button className="group justify-between items-center rounded-2xl shadow hover:shadow-xl active:scale-[0.98] transition bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700">
                    <span className="flex items-center gap-2"><span>🧩</span> Sample Course Detail (dynamic)</span>
                    <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-pink-600 via-teal-600 to-purple-600 relative overflow-hidden">
            {/* Geometric Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white transform rotate-45 rounded-2xl animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-white transform -rotate-12 rounded-2xl animate-bounce"></div>
              <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-white transform rotate-12 rounded-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-white transform -rotate-45 rounded-2xl animate-bounce"></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ready to Transform Your Learning?
                </h2>
                <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Join thousands of students who are already experiencing the future of education.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transform hover:scale-105 transition-all duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    onClick={() => setShowRegisterDialog(true)}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                  
                  <Link href="/student/courses">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-xl font-bold"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Browse Courses
                    </Button>
                  </Link>
                </div>

                <Separator className="my-8 bg-white/20" />
                
                <div className="flex flex-wrap justify-center gap-8 text-pink-100 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Free Trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span>{isConnected ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        

        {/* Dialogs */}
        {/* Demo Video Dialog */}
        <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog} className="bg-transparent shadow-none">
          <div className="p-0">
            <div className="max-w-4xl w-[90vw] sm:w-[720px]">
              <iframe
                src="https://www.youtube.com/embed/o_TTvaGzTT0?si=0onSkMSWmIGuuAIc&controls=1&modestbranding=1&rel=0"
                title="Demo Video"
                className="w-full aspect-video rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Dialog>
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome Back!</h2>
            <LoginForm onSuccess={() => setShowLoginDialog(false)} />
            <div className="mt-4 text-center">
              <Button 
                variant="secondary"
                className="font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => {
                  setShowLoginDialog(false)
                  setShowRegisterDialog(true)
                }}
              >
                Don't have an account? Register here
              </Button>
            </div>
          </div>
        </Dialog>

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Edit Your Profile</h2>
            <ProfileForm onSuccess={() => setShowProfileDialog(false)} />
          </div>
        </Dialog>

        <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Create Your Account</h2>
            <RegisterForm onSuccess={() => setShowRegisterDialog(false)} />
            <div className="mt-4 text-center">
              <Button 
                variant="secondary"
                className="font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => {
                  setShowRegisterDialog(false)
                  setShowLoginDialog(true)
                }}
              >
                Already have an account? Sign in here
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
