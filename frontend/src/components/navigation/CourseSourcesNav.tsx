'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  BookOpen, 
  Youtube, 
  Upload, 
  Settings,
  BarChart3,
  Users,
  GraduationCap
} from 'lucide-react';

export default function CourseSourcesNav() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Acadevia
            </Link>
            
            <nav className="hidden md:flex items-center gap-4">
              <Link 
                href="/course-sources" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <BookOpen className="h-4 w-4" />
                Course Sources
              </Link>
              <Link 
                href="/admin/course-sources" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <Settings className="h-4 w-4" />
                Admin Panel
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" asChild>
              <Link href="/course-sources">
                <Youtube className="h-4 w-4 mr-1" />
                Manage Videos
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/course-sources">
                <Upload className="h-4 w-4 mr-1" />
                Add Videos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
