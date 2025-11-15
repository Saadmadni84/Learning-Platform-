'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removed problematic imports - using native HTML elements instead
import { 
  Search, 
  Filter, 
  Youtube, 
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  Star,
  Plus,
  Upload,
  ExternalLink,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import YouTubeVideoManager from '@/components/sources/YouTubeVideoManager';
import { schoolSystemData, ClassSection, Subject } from '@/data/schoolData';

interface Course {
  id: string;
  title: string;
  description: string;
  grade: number;
  subject: string;
  instructor: string;
  totalStudents: number;
  averageProgress: number;
  youtubeVideos: number;
  totalSources: number;
}

export default function CourseSourcesPage() {
  const [selectedClass, setSelectedClass] = useState<ClassSection | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // Generate courses from school data
  const generateCourses = (): Course[] => {
    const courses: Course[] = [];
    
    schoolSystemData.classes.forEach(classSection => {
      classSection.subjects.forEach(subject => {
        courses.push({
          id: `${classSection.id}-${subject.id}`,
          title: `${classSection.name} ${subject.name}`,
          description: subject.description,
          grade: classSection.grade,
          subject: subject.name,
          instructor: `Instructor ${subject.name}`,
          totalStudents: classSection.totalStudents || 0,
          averageProgress: subject.progress || 0,
          youtubeVideos: subject.sources?.filter(s => s.type === 'youtube').length || 0,
          totalSources: subject.sources?.length || 0
        });
      });
    });
    
    return courses;
  };

  const [courses] = useState<Course[]>(generateCourses());

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || String(course.grade) === filterGrade;
    const matchesSubject = filterSubject === 'all' || course.subject === filterSubject;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyYouTubeUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Course Sources Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add and manage YouTube videos for all courses from Class 6 to 12
          </p>
        </div>

        {!selectedCourse ? (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={filterGrade} 
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="all">All Grades</option>
                  {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <option key={grade} value={String(grade)}>Class {grade}</option>
                  ))}
                </select>
                <select 
                  value={filterSubject} 
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="all">All Subjects</option>
                  {Array.from(new Set(courses.map(c => c.subject))).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
                      <p className="text-2xl font-bold">{courses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">YouTube Videos</p>
                      <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.youtubeVideos, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.totalStudents, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
                      <p className="text-2xl font-bold">
                        {Math.round(courses.reduce((sum, c) => sum + c.averageProgress, 0) / courses.length)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {course.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {course.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        Class {course.grade}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.subject}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.totalStudents}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Youtube className="h-4 w-4 text-red-500" />
                        <span>{course.youtubeVideos} YouTube</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>{course.totalSources} Total</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="h-4 w-4" />
                        <span>{course.averageProgress}% progress</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>Updated today</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Manage Videos
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          // Quick add YouTube video
                          const youtubeUrl = prompt('Enter YouTube URL:');
                          if (youtubeUrl && youtubeUrl.includes('youtube.com')) {
                            // Here you would call the API to add the video
                            console.log('Adding YouTube video:', youtubeUrl);
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="secondary" 
              onClick={() => setSelectedCourse(null)}
              className="mb-4"
            >
              ← Back to Courses
            </Button>

            {/* Course Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedCourse.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>Class {selectedCourse.grade}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{selectedCourse.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{selectedCourse.averageProgress}% progress</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* YouTube Video Manager */}
            <YouTubeVideoManager
              courseId={selectedCourse.id}
              courseTitle={selectedCourse.title}
              onVideosChange={(videos) => {
                console.log('Videos updated:', videos);
                // Update the course's video count
                setSelectedCourse(prev => prev ? {
                  ...prev,
                  youtubeVideos: videos.length
                } : null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
