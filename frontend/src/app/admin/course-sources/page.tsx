'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Dialog from '@/components/ui/Dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc, 
  Youtube, 
  FileText, 
  Globe, 
  Video,
  ExternalLink,
  Upload,
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  Star,
  Edit,
  Trash2,
  Copy,
  Link as LinkIcon
} from 'lucide-react';
import { schoolSystemData, ClassSection, Subject } from '@/data/schoolData';

interface CourseSource {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'document' | 'website' | 'video' | 'other';
  description?: string;
  duration?: number;
  isRequired?: boolean;
  order: number;
  cloudinaryUrl?: string;
  thumbnail?: string;
  addedAt?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  grade: number;
  subject: string;
  instructor: string;
  sources: CourseSource[];
  totalStudents: number;
  averageProgress: number;
}

export default function CourseSourcesManagementPage() {
  const [selectedClass, setSelectedClass] = useState<ClassSection | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('order');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [newSource, setNewSource] = useState({
    title: '',
    url: '',
    type: 'youtube' as const,
    description: '',
    duration: 0,
    isRequired: false,
    order: 0
  });
  const [bulkYouTubeUrls, setBulkYouTubeUrls] = useState('');
  const [loading, setLoading] = useState(false);

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
          sources: subject.sources || [],
          totalStudents: classSection.totalStudents || 0,
          averageProgress: subject.progress || 0
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
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'class' && selectedClass?.id === `class-${course.grade}`) ||
                         (filterType === 'subject' && selectedSubject?.name === course.subject);
    return matchesSearch && matchesFilter;
  });

  const handleAddSource = async () => {
    if (!newSource.title || !newSource.url || !selectedCourse) return;

    setLoading(true);
    try {
      // If it's a YouTube URL, upload to Cloudinary
      if (newSource.type === 'youtube' && newSource.url.includes('youtube.com')) {
        const response = await fetch('/api/upload/youtube-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            courseId: 'class-6-mathematics',
            youtubeUrl: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=E_1UfHOib13g1kK7',
            title: 'Mathematics Basics',
            description: 'Mathematics Basics'
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('YouTube video uploaded successfully:', result);
        }
      }

      // Add to local state (in real app, this would be handled by the API response)
      const newCourseSource: CourseSource = {
        id: `source-${Date.now()}`,
        ...newSource,
        order: selectedCourse.sources.length,
        addedAt: new Date().toISOString()
      };

      setSelectedCourse({
        ...selectedCourse,
        sources: [...selectedCourse.sources, newCourseSource]
      });

      // Reset form
      setNewSource({
        title: '',
        url: '',
        type: 'youtube',
        description: '',
        duration: 0,
        isRequired: false,
        order: 0
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding source:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkYouTubeUrls || !selectedCourse) return;

    setLoading(true);
    try {
      const urls = bulkYouTubeUrls.split('\n').filter(url => url.trim());
      const uploadPromises = urls.map(async (url, index) => {
        const response = await fetch('/api/upload/youtube-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            courseId: selectedCourse.id,
            youtubeUrl: url.trim(),
            title: `Video ${index + 1}`,
            description: `Bulk uploaded video ${index + 1}`
          })
        });

        if (response.ok) {
          const result = await response.json();
          return result.data.video;
        }
        return null;
      });

      const results = await Promise.all(uploadPromises);
      console.log('Bulk upload completed:', results);

      setBulkYouTubeUrls('');
      setIsBulkUploadDialogOpen(false);
    } catch (error) {
      console.error('Error in bulk upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'website':
        return <Globe className="h-4 w-4 text-green-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-purple-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            Manage learning resources for all courses from Class 6 to 12
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid w-full grid-cols-3 gap-2">
            <Button 
              variant={filterType === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('all')}
              className="w-full"
            >
              All Courses
            </Button>
            <Button 
              variant={filterType === 'class' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('class')}
              className="w-full"
            >
              By Class
            </Button>
            <Button 
              variant={filterType === 'subject' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('subject')}
              className="w-full"
            >
              By Subject
            </Button>
          </div>

          {/* All Courses Section */}
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
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="all">All Courses</option>
                  <option value="class">By Class</option>
                  <option value="subject">By Subject</option>
                </select>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="title">Title</option>
                  <option value="grade">Grade</option>
                  <option value="subject">Subject</option>
                  <option value="sources">Sources Count</option>
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
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
                        <span>{course.sources.filter(s => s.type === 'youtube').length} YouTube</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>{course.sources.filter(s => s.type === 'document').length} Docs</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{course.sources.reduce((total, source) => total + (source.duration || 0), 0)} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="h-4 w-4" />
                        <span>{course.averageProgress}% progress</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Manage Sources
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsBulkUploadDialogOpen(true);
                        }}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* By Class Section */}
          {filterType === 'class' && (
            <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolSystemData.classes.map((classSection) => (
                <Card key={classSection.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{classSection.name}</span>
                      <Badge variant="secondary">
                        {classSection.subjects.length} subjects
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {classSection.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {classSection.subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{subject.icon}</span>
                            <span className="text-sm font-medium">{subject.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(subject.difficulty)}>
                              {subject.difficulty}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => {
                                const course = courses.find(c => c.id === `${classSection.id}-${subject.id}`);
                                if (course) setSelectedCourse(course);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>
          )}

          {/* By Subject Section */}
          {filterType === 'subject' && (
            <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(courses.map(c => c.subject))).map((subjectName) => {
                const subjectCourses = courses.filter(c => c.subject === subjectName);
                return (
                  <Card key={subjectName} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{subjectName}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subjectCourses.length} courses across all classes
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {subjectCourses.map((course) => (
                          <div key={course.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">{course.title}</span>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => setSelectedCourse(course)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            </div>
          )}
        </div>

        {/* Course Sources Management Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Manage Sources: {selectedCourse.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add, edit, and organize learning resources for this course
              </p>

              <div className="space-y-6">
                {/* Course Info */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Grade:</span> Class {selectedCourse.grade}
                    </div>
                    <div>
                      <span className="font-medium">Subject:</span> {selectedCourse.subject}
                    </div>
                    <div>
                      <span className="font-medium">Students:</span> {selectedCourse.totalStudents}
                    </div>
                    <div>
                      <span className="font-medium">Progress:</span> {selectedCourse.averageProgress}%
                    </div>
                  </div>
                </div>

                {/* Add Source Form */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Add New Source</h3>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setIsAddDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Single
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setIsBulkUploadDialogOpen(true)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Bulk Upload
                      </Button>
                    </div>
                  </div>

                  {/* Quick Add Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quick-title">Title</Label>
                      <Input
                        id="quick-title"
                        value={newSource.title}
                        onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
                        placeholder="Resource title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quick-url">URL</Label>
                      <Input
                        id="quick-url"
                        value={newSource.url}
                        onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="quick-type">Type</Label>
                      <select 
                        value={newSource.type} 
                        onChange={(e) => setNewSource({ ...newSource, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                      >
                        <option value="youtube">YouTube Video</option>
                        <option value="document">Document</option>
                        <option value="website">Website</option>
                        <option value="video">Video</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="quick-duration">Duration (minutes)</Label>
                      <Input
                        id="quick-duration"
                        type="number"
                        value={newSource.duration}
                        onChange={(e) => setNewSource({ ...newSource, duration: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="quick-description">Description</Label>
                      <textarea
                        id="quick-description"
                        value={newSource.description}
                        onChange={(e) => setNewSource({ ...newSource, description: e.target.value })}
                        placeholder="Brief description of the resource"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="quick-required"
                        checked={newSource.isRequired}
                        onChange={(e) => setNewSource({ ...newSource, isRequired: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="quick-required">Required Resource</Label>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleAddSource} disabled={loading}>
                        {loading ? 'Adding...' : 'Add Source'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sources List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Sources ({selectedCourse.sources.length})</h3>
                  
                  {selectedCourse.sources.length > 0 ? (
                    <div className="space-y-2">
                      {selectedCourse.sources.map((source, index) => (
                        <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            {getSourceTypeIcon(source.type)}
                            <div>
                              <div className="font-medium">{source.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {source.description || source.url}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {source.duration && (
                              <span className="text-sm text-gray-500">{source.duration}min</span>
                            )}
                            {source.isRequired && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                            <Button size="sm" variant="secondary">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No sources added yet. Add your first learning resource above.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bulk Upload Modal */}
        {isBulkUploadDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Bulk Upload YouTube Videos</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsBulkUploadDialogOpen(false)}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Paste multiple YouTube URLs (one per line) to upload them all at once
              </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bulk-urls">YouTube URLs</Label>
                <textarea
                  id="bulk-urls"
                  value={bulkYouTubeUrls}
                  onChange={(e) => setBulkYouTubeUrls(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID_1&#10;https://www.youtube.com/watch?v=VIDEO_ID_2&#10;https://www.youtube.com/watch?v=VIDEO_ID_3"
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter one YouTube URL per line. Videos will be uploaded to Cloudinary automatically.
                </p>
              </div>
            </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="secondary" onClick={() => setIsBulkUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBulkUpload} disabled={loading || !bulkYouTubeUrls.trim()}>
                  {loading ? 'Uploading...' : 'Upload All Videos'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
