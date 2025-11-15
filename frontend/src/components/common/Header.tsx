// components/common/Header.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear login data
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    
    // Redirect to login page
    router.push('/login')
  };

  const navItems = [
    { label: 'Home', href: '/', emoji: '🏠', color: 'from-orange-400 to-pink-500' },
    { label: 'Courses', href: '/student/courses', emoji: '📚', color: 'from-blue-400 to-purple-500' },
    { label: 'Progress', href: '/progress', emoji: '📊', color: 'from-green-400 to-emerald-500' },
    { label: 'Leaderboard', href: '/leaderboard', emoji: '🏆', color: 'from-yellow-400 to-amber-500' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className={`relative z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-sm border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-500 dark:to-blue-500 drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
             Acadevia 
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  console.log('Navigation clicked:', item.label, 'to:', item.href);
                  // Ensure the navigation happens
                  e.preventDefault();
                  router.push(item.href);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:font-semibold cursor-pointer
                  ${isActive(item.href)
                    ? `text-white bg-gradient-to-r ${item.color} shadow-md font-semibold`
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>{item.emoji}</span>
                {item.label}
              </Link>
            ))}
            <Link
              href="/Profile"
              onClick={(e) => {
                console.log('Navigation clicked: Profile to: /Profile');
                e.preventDefault();
                router.push('/Profile');
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 hover:font-bold cursor-pointer
                ${isActive('/Profile')
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md'
                  : 'text-white bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600'}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>👤</span>
              Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
