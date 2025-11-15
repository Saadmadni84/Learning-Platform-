'use client'
// For Radix UI

// For Headless UI

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy, BarChart3, Users, User, BookOpen, ArrowRight, Star, Play,
  Award, TrendingUp, Clock, Target, Zap, Shield, Globe, Calendar,
  ChevronRight, Bell, Search, Filter, Menu, Download, Share
} from 'lucide-react'

// UI Components
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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
import VideoControls from '@/components/video/VideoControls'

// Charts
import { BarChart } from '@/components/charts/Barchart'
import { LineChart } from '@/components/charts/LineChart'
import { PieChart } from '@/components/charts/PieChart'

// Theme Provider
import { ThemeProvider } from '@/components/theme-provider'

// Hooks
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useSocket } from '@/hooks/useSocket'
import { useToast } from '@/hooks/use-toast'

export default function HomePage() {
  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showDemoDialog, setShowDemoDialog] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
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
    { id: 1, title: 'React Fundamentals', students: 2400, rating: 4.9, progress: 95, category: 'Frontend' },
    { id: 2, title: 'JavaScript Advanced', students: 1950, rating: 4.8, progress: 88, category: 'Programming' },
    { id: 3, title: 'Node.js Backend', students: 1680, rating: 4.7, progress: 76, category: 'Backend' },
    { id: 4, title: 'TypeScript Mastery', students: 1420, rating: 4.9, progress: 92, category: 'Programming' },
    { id: 5, title: 'Database Design', students: 1200, rating: 4.6, progress: 84, category: 'Database' },
    { id: 6, title: 'UI/UX Design', students: 1800, rating: 4.8, progress: 79, category: 'Design' }
  ]

  const recentAchievements = [
    { user: 'Alex Chen', achievement: 'JavaScript Master', time: '2 hours ago', avatar: '/images/avatar/alex.jpg', points: 500 },
    { user: 'Sarah Johnson', achievement: 'React Expert', time: '4 hours ago', avatar: '/images/avatar/sarah.jpg', points: 750 },
    { user: 'Mike Wilson', achievement: 'Full Stack Hero', time: '6 hours ago', avatar: '/images/avatar/mike.jpg', points: 1000 },
    { user: 'Emily Davis', achievement: 'CSS Wizard', time: '8 hours ago', avatar: '/images/avatar/emily.jpg', points: 400 },
    { user: 'John Smith', achievement: 'Algorithm Pro', time: '10 hours ago', avatar: '/images/avatar/john.jpg', points: 600 }
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

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-inter">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter">
        
        {/* Background Image Component */}
        <BackgroundImage
          src="/images/school-bg.jpg"
          alt="Educational Background"
          className="fixed inset-0 z-0 opacity-20"
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
          className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Main Content */}
        <div className="relative z-10 pt-16">
          
          {/* Hero Section - Kid Friendly */}
          <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="mb-6 bg-yellow-100 text-yellow-800 px-4 py-2 font-poppins font-medium">
                    ✨ New: Fun Quests and Daily Streaks!
                  </Badge>
                  
                  <h1 className="text-5xl md:text-6xl font-poppins font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                    Learning Is An Adventure! 🗺️🎮
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-inter">
                    For explorers in classes 1–6: collect stars ⭐, level up 🚀, and
                    learn Math, Science, English, Coding, and more with bite-sized games and quests!
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 font-poppins font-semibold"
                      asChild
                    >
                      <Link href="/student/courses">
                        <BookOpen className="w-6 h-6 mr-3" />
                        Start Your Quest
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-2xl font-poppins font-medium"
                      onClick={() => setShowDemoDialog(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch a 30s Demo
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-poppins font-bold text-orange-600">{studentStats.totalStudents.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-inter">Happy Learners</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-poppins font-bold text-green-600">{studentStats.activeToday.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-inter">Playing Today</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-poppins font-bold text-purple-600">{studentStats.coursesCompleted.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-inter">Quests Finished</div>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-poppins font-bold text-blue-600">{studentStats.averageScore}%</div>
                      <div className="text-sm text-gray-600 font-inter">Avg Score</div>
                    </Card>
                  </div>

                  {/* Toast Demo Button */}
                  <div className="mt-8">
                    <Button onClick={handleShowToast} variant="ghost" size="sm" className="font-poppins font-medium">
                      Show Welcome Message
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mini Challenges - Earn Stars */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-3">Mini Challenges ⭐</h2>
                <p className="text-gray-600 font-inter">Complete quick tasks to earn stars and badges</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Card className="p-6 rounded-2xl border-2 border-yellow-200">
                  <div className="text-3xl">🔢</div>
                  <h3 className="mt-2 text-xl font-poppins font-semibold text-gray-800">Math Sprint</h3>
                  <p className="text-gray-600 text-sm font-inter">Solve 5 sums in 60 seconds!</p>
                  <Button asChild className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl">
                    <Link href="/student/courses">Play</Link>
                  </Button>
                </Card>
                <Card className="p-6 rounded-2xl border-2 border-green-200">
                  <div className="text-3xl">🔬</div>
                  <h3 className="mt-2 text-xl font-poppins font-semibold text-gray-800">Science Guess</h3>
                  <p className="text-gray-600 text-sm font-inter">Match animals to their homes.</p>
                  <Button asChild className="mt-4 bg-green-400 hover:bg-green-500 text-gray-900 rounded-xl">
                    <Link href="/student/courses">Play</Link>
                  </Button>
                </Card>
                <Card className="p-6 rounded-2xl border-2 border-blue-200">
                  <div className="text-3xl">🔤</div>
                  <h3 className="mt-2 text-xl font-poppins font-semibold text-gray-800">Word Builder</h3>
                  <p className="text-gray-600 text-sm font-inter">Make 3 words from letters.</p>
                  <Button asChild className="mt-4 bg-blue-400 hover:bg-blue-500 text-gray-900 rounded-xl">
                    <Link href="/student/courses">Play</Link>
                  </Button>
                </Card>
                <Card className="p-6 rounded-2xl border-2 border-pink-200">
                  <div className="text-3xl">🧩</div>
                  <h3 className="mt-2 text-xl font-poppins font-semibold text-gray-800">Logic Puzzle</h3>
                  <p className="text-gray-600 text-sm font-inter">Drag blocks to solve it!</p>
                  <Button asChild className="mt-4 bg-pink-400 hover:bg-pink-500 text-gray-900 rounded-xl">
                    <Link href="/student/courses">Play</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </section>

          {/* Subjects Grid - Bright and Playful */}
          <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-3">Choose Your Subject 🎓</h2>
                <p className="text-gray-600 font-inter">Colorful cards lead to bite-sized lessons and games</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-orange-200 hover:border-orange-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">➗</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">Math</div>
                    <p className="text-gray-600 mt-1 font-inter">Puzzles, shapes, and number quests</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-green-200 hover:border-green-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">🧪</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">Science</div>
                    <p className="text-gray-600 mt-1 font-inter">Fun experiments and nature adventures</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-blue-200 hover:border-blue-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">English</div>
                    <p className="text-gray-600 mt-1 font-inter">Stories, spelling, and word games</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-purple-200 hover:border-purple-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">💻</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">Coding</div>
                    <p className="text-gray-600 mt-1 font-inter">Block-based games and logic fun</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-pink-200 hover:border-pink-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">🎨</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">Art</div>
                    <p className="text-gray-600 mt-1 font-inter">Draw, paint, and create masterpieces</p>
                  </Card>
                </Link>
                <Link href="/student/courses" className="group">
                  <Card className="p-6 h-full bg-white border-2 border-yellow-200 hover:border-yellow-300 rounded-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">🏰</div>
                    <div className="text-2xl font-poppins font-semibold text-gray-800">History</div>
                    <p className="text-gray-600 mt-1 font-inter">Time travel quests through the past</p>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-6">
                  Made for Curious Kids 👧👦
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto font-inter">
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
                    <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                      <div className={`p-4 rounded-full w-fit mb-6 bg-${feature.color}-100 group-hover:bg-${feature.color}-200 transition-colors`}>
                        <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                      </div>
                      <h3 className="text-2xl font-poppins font-semibold mb-4 text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed font-inter">
                        {feature.description}
                      </p>
                      <Button variant="ghost" className="text-pink-600 hover:text-pink-800 p-0 font-poppins font-medium" asChild>
                        <Link href={feature.link}>
                          Learn More <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Analytics Dashboard Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-6">
                  Platform Analytics
                </h2>
                <p className="text-xl text-gray-600 font-inter">
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
                    <h3 className="text-lg font-poppins font-semibold mb-4">Course Completion Rates</h3>
                    <BarChart />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Card className="p-6">
                    <h3 className="text-lg font-poppins font-semibold mb-4">Weekly Progress</h3>
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
                    <h3 className="text-lg font-poppins font-semibold mb-4">Subject Distribution</h3>
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
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-4">
                    Popular Courses
                  </h2>
                  <p className="text-xl text-gray-600 font-inter">
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
                      className="pl-10 pr-4 py-2 w-64 font-inter"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins font-medium">
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
                      <th className="text-left p-4 font-poppins font-semibold">Course</th>
                      <th className="text-left p-4 font-poppins font-semibold">Category</th>
                      <th className="text-left p-4 font-poppins font-semibold">Students</th>
                      <th className="text-left p-4 font-poppins font-semibold">Rating</th>
                      <th className="text-left p-4 font-poppins font-semibold">Progress</th>
                      <th className="text-left p-4 font-poppins font-semibold">Action</th>
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
                              <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-poppins font-semibold text-gray-800">{course.title}</div>
                              <div className="text-sm text-gray-500 font-inter">Interactive Course</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-poppins">{course.category}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-poppins font-medium">{course.students.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-poppins font-medium">{course.rating}</span>
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
                            <span className="text-sm font-poppins font-medium text-gray-600">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Button size="sm" className="font-poppins font-medium" asChild>
                            <Link href="/student/courses">
                              View Course
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </section>

          {/* Recent Achievements Section */}
          <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-poppins font-bold text-gray-800 mb-6">
                  Recent Achievements
                </h2>
                <p className="text-xl text-gray-600 font-inter">
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
                      <h3 className="font-poppins font-semibold text-lg mb-2">{item.user}</h3>
                      <Badge className="mb-3 bg-yellow-100 text-yellow-800 font-poppins font-medium">
                        <Award className="w-3 h-3 mr-1" />
                        {item.achievement}
                      </Badge>
                      <div className="text-sm text-gray-500 mb-2 font-inter">{item.time}</div>
                      <div className="text-xs font-poppins font-semibold text-blue-600">+{item.points} points</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Video Demo Section */}
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-poppins font-bold text-white mb-6">
                  See It In Action
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto font-inter">
                  Watch how our platform transforms traditional learning into an engaging, 
                  gamified experience that keeps students motivated and achieving their goals.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden bg-black">
                  <VideoPlayer
                    src="/videos/platform-demo.mp4"
                    poster="/images/video-thumbnail.jpg"
                    className="w-full aspect-video"
                  />
                  <VideoControls className="p-4" />
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Links to All Pages */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-poppins font-bold text-gray-800 mb-6 text-center">
                Explore Pages
              </h2>
              <p className="text-gray-600 text-center mb-10 font-inter">
                Jump directly to any section of the app
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Button asChild className="justify-start">
                  <Link href="/">Home</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/auth/login">Auth / Login</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/auth/verify-otp">Auth / Verify OTP</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/courses">Courses</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/Profile">Profile</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/progress">Progress</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/student/courses">Student / Courses</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/student/dashboard">Student / Dashboard</Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/student/courses/course-123">Sample Course Detail (dynamic)</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
                  Ready to Transform Your Learning?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-inter">
                  Join thousands of students who are already experiencing the future of education.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-poppins font-semibold transform hover:scale-105 transition-all duration-200"
                    onClick={() => setShowRegisterDialog(true)}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-poppins font-medium"
                    asChild
                  >
                    <Link href="/student/courses">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Browse Courses
                    </Link>
                  </Button>
                </div>

                <Separator className="my-8 bg-white/20" />
                
                <div className="flex flex-wrap justify-center gap-8 text-blue-100 font-inter">
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
        <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
          <div className="p-0 sm:p-2">
            <div className="max-w-4xl w-[90vw] sm:w-[720px]">
              <Card className="overflow-hidden bg-black">
                <VideoPlayer
                  src="/videos/platform-demo.mp4#t=0,30"
                  poster="/images/video-thumbnail.jpg"
                  className="w-full aspect-video"
                />
                <VideoControls className="p-4" />
              </Card>
            </div>
          </div>
        </Dialog>
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-poppins font-bold mb-6">Welcome Back!</h2>
            <LoginForm onSuccess={() => setShowLoginDialog(false)} />
            <div className="mt-4 text-center">
              <Button 
                variant="link"
                className="font-poppins font-medium"
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
            <h2 className="text-2xl font-poppins font-bold mb-6">Edit Your Profile</h2>
            <ProfileForm onSuccess={() => setShowProfileDialog(false)} />
          </div>
        </Dialog>

        <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-poppins font-bold mb-6">Create Your Account</h2>
            <RegisterForm onSuccess={() => setShowRegisterDialog(false)} />
            <div className="mt-4 text-center">
              <Button 
                variant="link"
                className="font-poppins font-medium"
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
