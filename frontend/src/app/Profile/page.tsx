// src/app/page.tsx or your component file
'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// Import the mock data
import { mockUserData, type UserData } from '@/data/mockUserData';

export default function HomePage() {
  // Use mockUserData as initial data
  const [userData, setUserData] = useLocalStorage<UserData>('userData', mockUserData);
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      {/* Profile Hero */}
      <div className="relative overflow-hidden rounded-2xl mb-8 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 dark:from-indigo-600 dark:to-purple-700">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_0%,white,transparent_35%)]" />
        <div className="relative px-6 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white/60 overflow-hidden shadow-xl">
              <img src="/images/avatar/profile.jpg" alt={userData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-white/90 text-sm">Student Profile</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {userData.name}
              </h1>
              <div className="text-white/90 text-sm">{userData.email}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur">Level {userData.level}</span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur">{userData.xp} XP</span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur">{userData.stats.streak}-day Streak 🔥</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-xl bg-white text-pink-600 font-semibold shadow hover:shadow-md transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition">
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Courses</h3>
        <div className="space-y-4">
          {userData.courses.map(course => (
            <div key={course.id} className="border rounded-xl p-4 shadow-sm dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{course.title}</h4>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{course.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.achievements.map(achievement => (
            <div key={achievement.id} className="border rounded-xl p-5 text-center shadow-sm dark:border-gray-700">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">{achievement.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="text-center">
        <p className="mb-3 text-gray-700 dark:text-gray-300">Current theme: {theme}</p>
        <button 
          onClick={toggleTheme}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
