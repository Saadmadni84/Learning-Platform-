"use client"

import { useMemo } from 'react'
import { BarChart } from '@/components/charts/Barchart'
import { LineChart } from '@/components/charts/LineChart'
import { PieChart } from '@/components/charts/PieChart'
import { Trophy, Star, Flame, CalendarDays } from 'lucide-react'

interface SubjectProgress {
  subject: 'Mathematics' | 'Science' | 'English' | 'Coding' | 'History' | 'Art'
  color: string
  icon: string
  completion: number
  xp: number
  streakDays: number
  testsTaken: number
  averageScore: number
  weeklyScores: { label: string; value: number; date: string }[]
  chapters: { label: string; value: number; color: string }[]
}

export default function ProgressPage() {
  const subjects: SubjectProgress[] = useMemo(() => ([
    {
      subject: 'Mathematics',
      color: '#F59E0B',
      icon: '➗',
      completion: 78,
      xp: 1240,
      streakDays: 12,
      testsTaken: 6,
      averageScore: 82,
      weeklyScores: [
        { label: 'Mon', value: 70, date: 'Mon' },
        { label: 'Tue', value: 75, date: 'Tue' },
        { label: 'Wed', value: 80, date: 'Wed' },
        { label: 'Thu', value: 85, date: 'Thu' },
        { label: 'Fri', value: 88, date: 'Fri' }
      ],
      chapters: [
        { label: 'Fractions', value: 90, color: '#F59E0B' },
        { label: 'Decimals', value: 75, color: '#FBBF24' },
        { label: 'Algebra', value: 60, color: '#FDE68A' }
      ]
    },
    {
      subject: 'Science',
      color: '#10B981',
      icon: '🧪',
      completion: 64,
      xp: 980,
      streakDays: 8,
      testsTaken: 5,
      averageScore: 78,
      weeklyScores: [
        { label: 'Mon', value: 60, date: 'Mon' },
        { label: 'Tue', value: 62, date: 'Tue' },
        { label: 'Wed', value: 70, date: 'Wed' },
        { label: 'Thu', value: 72, date: 'Thu' },
        { label: 'Fri', value: 74, date: 'Fri' }
      ],
      chapters: [
        { label: 'Cells', value: 80, color: '#10B981' },
        { label: 'Ecosystems', value: 55, color: '#34D399' },
        { label: 'Forces', value: 58, color: '#A7F3D0' }
      ]
    },
    {
      subject: 'English',
      color: '#3B82F6',
      icon: '📚',
      completion: 71,
      xp: 1120,
      streakDays: 10,
      testsTaken: 4,
      averageScore: 85,
      weeklyScores: [
        { label: 'Mon', value: 68, date: 'Mon' },
        { label: 'Tue', value: 72, date: 'Tue' },
        { label: 'Wed', value: 75, date: 'Wed' },
        { label: 'Thu', value: 78, date: 'Thu' },
        { label: 'Fri', value: 80, date: 'Fri' }
      ],
      chapters: [
        { label: 'Grammar', value: 82, color: '#3B82F6' },
        { label: 'Reading', value: 68, color: '#60A5FA' },
        { label: 'Writing', value: 75, color: '#93C5FD' }
      ]
    },
    {
      subject: 'Coding',
      color: '#8B5CF6',
      icon: '💻',
      completion: 59,
      xp: 760,
      streakDays: 5,
      testsTaken: 3,
      averageScore: 73,
      weeklyScores: [
        { label: 'Mon', value: 50, date: 'Mon' },
        { label: 'Tue', value: 55, date: 'Tue' },
        { label: 'Wed', value: 60, date: 'Wed' },
        { label: 'Thu', value: 62, date: 'Thu' },
        { label: 'Fri', value: 65, date: 'Fri' }
      ],
      chapters: [
        { label: 'Logic', value: 60, color: '#8B5CF6' },
        { label: 'Scratch', value: 70, color: '#A78BFA' },
        { label: 'Web', value: 45, color: '#DDD6FE' }
      ]
    }
  ]), [])

  const pieData = useMemo(() => subjects.map(s => ({ label: s.subject, value: s.completion, color: s.color })), [subjects])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-900">Your Progress Dashboard</h1>
          <p className="text-gray-600 mt-2 font-inter">Track each subject, earn badges, and keep your learning streak alive!</p>
        </div>

        {/* Overview Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PieChart title="Completion by Subject" data={pieData} size={240} />
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Streaks</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {subjects.slice(0, 4).map(s => (
                <div key={s.subject} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className="text-sm text-gray-600">{s.subject}</div>
                      <div className="text-lg font-semibold text-gray-900">{s.streakDays} day streak</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Flame className="w-5 h-5" />
                    <span className="text-sm font-semibold">Keep it up!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {subjects.map((s) => (
            <div key={s.subject} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-5 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <div className="text-sm text-gray-500">Subject</div>
                    <h3 className="text-xl font-bold text-gray-900">{s.subject}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Completion</div>
                  <div className="text-lg font-semibold" style={{ color: s.color }}>{s.completion}%</div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <LineChart
                      title="Weekly Score"
                      data={s.weeklyScores}
                      height={160}
                      color={s.color}
                    />
                  </div>
                  <div>
                    <BarChart
                      title="Chapter Progress"
                      data={s.chapters}
                      maxHeight={140}
                      animated
                      gamified={false}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500">XP Earned</div>
                    <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" /> {s.xp}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500">Avg Score</div>
                    <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" /> {s.averageScore}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500">Tests</div>
                    <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                      <CalendarDays className="w-4 h-4 text-blue-500" /> {s.testsTaken}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
