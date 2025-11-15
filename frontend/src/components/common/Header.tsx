// components/common/Header.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
    <header className={`relative z-40 bg-white/90 backdrop-blur shadow-sm border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600">
             Acadevia
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${isActive(item.href)
                    ? `text-white bg-gradient-to-r ${item.color} shadow-md`
                    : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'}`}
              >
                <span>{item.emoji}</span>
                {item.label}
              </Link>
            ))}
            <Link
              href="/Profile"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2
                ${isActive('/Profile')
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md'
                  : 'text-white bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600'}`}
            >
              <span>👤</span>
              Profile
            </Link>

            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
