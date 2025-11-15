'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Star, Trophy, Users, Play, Lock } from 'lucide-react'
import StartQuestButton from '@/components/StartQuestButton'
import QuestWelcomeModal from '@/components/QuestWelcomeModal'
import { useAppSelector } from '@/store/hooks'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  rating: number
  studentsEnrolled: number
  progress?: number // 0-100 for enrolled courses
  isEnrolled: boolean
  isLocked: boolean
  xpReward: number
  lessonsCount: number
  category: string
  instructor: string
  grade: 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'available'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedGrade, setSelectedGrade] = useState<'all' | '6' | '7' | '8' | '9' | '10' | '11' | '12'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const quest = useAppSelector(s => s.quest)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCourses = async () => {
      // Simulated API call
      const mockCourses: Course[] = [
        {
          id: 'math-6-hero-numbers',
          title: 'Grade 6 Math: Number Heroes',
          description: 'Conquer fractions, decimals, and ratios with puzzles and quests.',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 240,
          rating: 4.8,
          studentsEnrolled: 2100,
          progress: 40,
          isEnrolled: true,
          isLocked: false,
          xpReward: 300,
          lessonsCount: 14,
          category: 'Mathematics',
          instructor: 'Ms. Rivera',
          grade: 6
        },
        {
          id: 'sci-7-lab-adventures',
          title: 'Grade 7 Science: Lab Adventures',
          description: 'Explore cells, ecosystems, and forces with fun experiments.',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 300,
          rating: 4.7,
          studentsEnrolled: 1750,
          isEnrolled: false,
          isLocked: false,
          xpReward: 320,
          lessonsCount: 12,
          category: 'Science',
          instructor: 'Dr. Patel',
          grade: 7
        },
        {
          id: 'eng-8-story-builder',
          title: 'Grade 8 English: Story Builder',
          description: 'Grammar games, creative writing, and reading quests.',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 270,
          rating: 4.6,
          studentsEnrolled: 1620,
          isEnrolled: false,
          isLocked: false,
          xpReward: 280,
          lessonsCount: 10,
          category: 'English',
          instructor: 'Mr. Lewis',
          grade: 8
        },
        {
          id: 'math-9-algebra-quest',
          title: 'Grade 9 Math: Algebra Quest',
          description: 'Equations, polynomials, and coordinate geometry as level-ups.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 360,
          rating: 4.8,
          studentsEnrolled: 1480,
          isEnrolled: false,
          isLocked: false,
          xpReward: 450,
          lessonsCount: 16,
          category: 'Mathematics',
          instructor: 'Ms. Kim',
          grade: 9
        },
        {
          id: 'sci-10-physics-play',
          title: 'Grade 10 Science: Physics Playgrounds',
          description: 'Motion, energy, and waves with interactive demos and challenges.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 420,
          rating: 4.7,
          studentsEnrolled: 1325,
          isEnrolled: false,
          isLocked: false,
          xpReward: 480,
          lessonsCount: 15,
          category: 'Science',
          instructor: 'Dr. Nguyen',
          grade: 10
        },
        {
          id: 'eng-11-grammar-arena',
          title: 'Grade 11 English: Grammar Arena',
          description: 'Master advanced grammar and essay structure with mini-battles.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 390,
          rating: 4.5,
          studentsEnrolled: 1100,
          isEnrolled: false,
          isLocked: false,
          xpReward: 420,
          lessonsCount: 14,
          category: 'English',
          instructor: 'Mrs. Blake',
          grade: 11
        },
        {
          id: 'math-12-calculus-journey',
          title: 'Grade 12 Math: Calculus Journey',
          description: 'Limits, derivatives, and integrals presented as quests.',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 540,
          rating: 4.7,
          studentsEnrolled: 980,
          isEnrolled: false,
          isLocked: true,
          xpReward: 600,
          lessonsCount: 20,
          category: 'Mathematics',
          instructor: 'Prof. Allen',
          grade: 12
        }
      ]
      
      setTimeout(() => {
        setCourses(mockCourses)
        setLoading(false)
      }, 1000)
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'enrolled' && course.isEnrolled) ||
      (filter === 'available' && !course.isEnrolled && !course.isLocked)

    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesGrade = selectedGrade === 'all' || String(course.grade) === selectedGrade
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesCategory && matchesGrade && matchesSearch
  })

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))]
  const grades: Array<'6'|'7'|'8'|'9'|'10'|'11'|'12'> = ['6','7','8','9','10','11','12']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your learning adventure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Courses for Classes 6–12
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your class and subject. Collect XP and earn badges as you learn!
          </p>
          <div className="mt-4">
            <button onClick={()=>setWelcomeOpen(true)} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-700">
              Plan Your Quest
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'enrolled', 'available'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Grade Filter */}
            <div className="flex flex-wrap gap-2">
              {(['all', ...grades] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g as any)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedGrade === g
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {g === 'all' ? 'All Classes' : `Class ${g}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {course.category === 'Mathematics' && '➗'}
                    {course.category === 'Science' && '🧪'}
                    {course.category === 'English' && '📚'}
                    {course.category !== 'Mathematics' && course.category !== 'Science' && course.category !== 'English' && '🎓'}
                  </span>
                </div>
                {course.isLocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/90 text-gray-800">
                    Class {course.grade}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsEnrolled}</span>
                  </div>
                </div>

                {/* XP Reward */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {course.xpReward} XP
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.lessonsCount} lessons
                  </span>
                </div>

                {/* Progress Bar (for enrolled courses) */}
                {course.isEnrolled && course.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {course.isLocked ? (
                  <button disabled className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Locked
                  </button>
                ) : course.isEnrolled ? (
                  <Link href={`/student/courses/${course.id}`}>
                    <button className="w-full py-2 px-4 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" /> Continue Learning
                    </button>
                  </Link>
                ) : (
                  <StartQuestButton userId="user-123" difficulty="easy" className="w-full" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
      <QuestWelcomeModal
        open={welcomeOpen}
        onClose={()=>setWelcomeOpen(false)}
        onConfirm={(difficulty, goals)=>{
          setWelcomeOpen(false)
        }}
      />
    </div>
  )
}
