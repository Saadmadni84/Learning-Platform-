'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Star, Trophy, Users, Play, Lock } from 'lucide-react'

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


  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCourses = async () => {
      // Simulated API call
      const mockCourses: Course[] = [
        // Class 6 Courses - UP Board Syllabus
        {
          id: 'math-6-up-board',
          title: 'Class 6 Mathematics - UP Board',
          description: 'संख्या प्रणाली, भिन्न, दशमलव और अनुपात के साथ गणित की मूल बातें सीखें।',
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
          instructor: 'Shri Gupta',
          grade: 6
        },
        {
          id: 'science-6-up-board',
          title: 'Class 6 Science - UP Board',
          description: 'भोजन, पदार्थ, पौधे और जानवरों के बारे में विज्ञान की मूल बातें।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 200,
          rating: 4.7,
          studentsEnrolled: 1950,
          isEnrolled: false,
          isLocked: false,
          xpReward: 280,
          lessonsCount: 12,
          category: 'Science',
          instructor: 'Dr. Sharma',
          grade: 6
        },
        {
          id: 'english-6-up-board',
          title: 'Class 6 English - UP Board',
          description: 'English grammar, vocabulary, and reading comprehension for UP Board.',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 180,
          rating: 4.6,
          studentsEnrolled: 1850,
          isEnrolled: false,
          isLocked: false,
          xpReward: 250,
          lessonsCount: 10,
          category: 'English',
          instructor: 'Ms. Johnson',
          grade: 6
        },
        {
          id: 'hindi-6-up-board',
          title: 'Class 6 Hindi - UP Board',
          description: 'हिंदी व्याकरण, कविता और साहित्य - यूपी बोर्ड पाठ्यक्रम।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 160,
          rating: 4.5,
          studentsEnrolled: 2200,
          isEnrolled: false,
          isLocked: false,
          xpReward: 240,
          lessonsCount: 11,
          category: 'Hindi',
          instructor: 'Shri Verma',
          grade: 6
        },
        {
          id: 'social-science-6-up-board',
          title: 'Class 6 Social Science - UP Board',
          description: 'इतिहास, भूगोल और नागरिक शास्त्र - यूपी बोर्ड पाठ्यक्रम।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 220,
          rating: 4.4,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 260,
          lessonsCount: 13,
          category: 'Social Science',
          instructor: 'Shri Kumar',
          grade: 6
        },
        {
          id: 'sanskrit-6-up-board',
          title: 'Class 6 Sanskrit - UP Board',
          description: 'संस्कृत भाषा, व्याकरण और साहित्य - यूपी बोर्ड पाठ्यक्रम।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 150,
          rating: 4.6,
          studentsEnrolled: 1200,
          isEnrolled: false,
          isLocked: false,
          xpReward: 230,
          lessonsCount: 10,
          category: 'Sanskrit',
          instructor: 'Pandit Sharma',
          grade: 6
        },
        {
          id: 'computer-6-up-board',
          title: 'Class 6 Computer Science - UP Board',
          description: 'कंप्यूटर की मूल बातें, MS Office और इंटरनेट - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 140,
          rating: 4.7,
          studentsEnrolled: 1600,
          isEnrolled: false,
          isLocked: false,
          xpReward: 220,
          lessonsCount: 9,
          category: 'Computer Science',
          instructor: 'Shri Tech',
          grade: 6
        },

        // Class 7 Courses - UP Board Syllabus
        {
          id: 'math-7-up-board',
          title: 'Class 7 Mathematics - UP Board',
          description: 'बीजगणित, ज्यामिति और संख्या प्रणाली - यूपी बोर्ड पाठ्यक्रम।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 280,
          rating: 4.7,
          studentsEnrolled: 1800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 350,
          lessonsCount: 16,
          category: 'Mathematics',
          instructor: 'Shri Gupta',
          grade: 7
        },
        {
          id: 'science-7-up-board',
          title: 'Class 7 Science - UP Board',
          description: 'पौधे, जानवर, पदार्थ और ऊर्जा - यूपी बोर्ड विज्ञान।',
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
          instructor: 'Dr. Sharma',
          grade: 7
        },
        {
          id: 'hindi-7-up-board',
          title: 'Class 7 Hindi - UP Board',
          description: 'हिंदी व्याकरण, कविता और साहित्य - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 180,
          rating: 4.5,
          studentsEnrolled: 2000,
          isEnrolled: false,
          isLocked: false,
          xpReward: 280,
          lessonsCount: 12,
          category: 'Hindi',
          instructor: 'Shri Verma',
          grade: 7
        },
        {
          id: 'english-7-up-board',
          title: 'Class 7 English - UP Board',
          description: 'English literature, grammar and composition for UP Board.',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 200,
          rating: 4.6,
          studentsEnrolled: 1850,
          isEnrolled: false,
          isLocked: false,
          xpReward: 270,
          lessonsCount: 11,
          category: 'English',
          instructor: 'Ms. Johnson',
          grade: 7
        },
        {
          id: 'social-science-7-up-board',
          title: 'Class 7 Social Science - UP Board',
          description: 'इतिहास, भूगोल और नागरिक शास्त्र - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 220,
          rating: 4.4,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 260,
          lessonsCount: 13,
          category: 'Social Science',
          instructor: 'Shri Kumar',
          grade: 7
        },
        {
          id: 'sanskrit-7-up-board',
          title: 'Class 7 Sanskrit - UP Board',
          description: 'संस्कृत व्याकरण और साहित्य - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 150,
          rating: 4.6,
          studentsEnrolled: 1200,
          isEnrolled: false,
          isLocked: false,
          xpReward: 230,
          lessonsCount: 10,
          category: 'Sanskrit',
          instructor: 'Pandit Sharma',
          grade: 7
        },
        {
          id: 'computer-7-up-board',
          title: 'Class 7 Computer Science - UP Board',
          description: 'प्रोग्रामिंग की मूल बातें और कंप्यूटर अनुप्रयोग।',
          thumbnail: '',
          difficulty: 'beginner',
          duration: 200,
          rating: 4.8,
          studentsEnrolled: 1500,
          isEnrolled: false,
          isLocked: false,
          xpReward: 300,
          lessonsCount: 11,
          category: 'Computer Science',
          instructor: 'Shri Tech',
          grade: 7
        },

        // Class 8 Courses - UP Board Syllabus
        {
          id: 'math-8-up-board',
          title: 'Class 8 Mathematics - UP Board',
          description: 'बीजगणित, ज्यामिति और मापन - यूपी बोर्ड पाठ्यक्रम।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 300,
          rating: 4.7,
          studentsEnrolled: 1800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 380,
          lessonsCount: 16,
          category: 'Mathematics',
          instructor: 'Shri Gupta',
          grade: 8
        },
        {
          id: 'science-8-up-board',
          title: 'Class 8 Science - UP Board',
          description: 'भौतिकी, रसायन और जीव विज्ञान - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 320,
          rating: 4.7,
          studentsEnrolled: 1750,
          isEnrolled: false,
          isLocked: false,
          xpReward: 360,
          lessonsCount: 14,
          category: 'Science',
          instructor: 'Dr. Sharma',
          grade: 8
        },
        {
          id: 'hindi-8-up-board',
          title: 'Class 8 Hindi - UP Board',
          description: 'हिंदी साहित्य, व्याकरण और रचना - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 200,
          rating: 4.6,
          studentsEnrolled: 1900,
          isEnrolled: false,
          isLocked: false,
          xpReward: 320,
          lessonsCount: 13,
          category: 'Hindi',
          instructor: 'Shri Verma',
          grade: 8
        },
        {
          id: 'english-8-up-board',
          title: 'Class 8 English - UP Board',
          description: 'English literature, grammar and writing skills for UP Board.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 270,
          rating: 4.6,
          studentsEnrolled: 1620,
          isEnrolled: false,
          isLocked: false,
          xpReward: 300,
          lessonsCount: 12,
          category: 'English',
          instructor: 'Ms. Johnson',
          grade: 8
        },
        {
          id: 'social-science-8-up-board',
          title: 'Class 8 Social Science - UP Board',
          description: 'इतिहास, भूगोल और नागरिक शास्त्र - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 240,
          rating: 4.5,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 290,
          lessonsCount: 14,
          category: 'Social Science',
          instructor: 'Shri Kumar',
          grade: 8
        },
        {
          id: 'sanskrit-8-up-board',
          title: 'Class 8 Sanskrit - UP Board',
          description: 'संस्कृत साहित्य और व्याकरण - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 180,
          rating: 4.6,
          studentsEnrolled: 1200,
          isEnrolled: false,
          isLocked: false,
          xpReward: 280,
          lessonsCount: 11,
          category: 'Sanskrit',
          instructor: 'Pandit Sharma',
          grade: 8
        },
        {
          id: 'computer-8-up-board',
          title: 'Class 8 Computer Science - UP Board',
          description: 'प्रोग्रामिंग और कंप्यूटर अनुप्रयोग - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 220,
          rating: 4.8,
          studentsEnrolled: 1500,
          isEnrolled: false,
          isLocked: false,
          xpReward: 320,
          lessonsCount: 12,
          category: 'Computer Science',
          instructor: 'Shri Tech',
          grade: 8
        },

        // Class 9 Courses - UP Board Syllabus
        {
          id: 'math-9-up-board',
          title: 'Class 9 Mathematics - UP Board',
          description: 'बीजगणित, ज्यामिति और त्रिकोणमिति - यूपी बोर्ड।',
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
          instructor: 'Shri Gupta',
          grade: 9
        },
        {
          id: 'science-9-up-board',
          title: 'Class 9 Science - UP Board',
          description: 'भौतिकी, रसायन और जीव विज्ञान - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 380,
          rating: 4.7,
          studentsEnrolled: 1750,
          isEnrolled: false,
          isLocked: false,
          xpReward: 420,
          lessonsCount: 15,
          category: 'Science',
          instructor: 'Dr. Sharma',
          grade: 9
        },
        {
          id: 'hindi-9-up-board',
          title: 'Class 9 Hindi - UP Board',
          description: 'हिंदी साहित्य, व्याकरण और रचना - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 240,
          rating: 4.7,
          studentsEnrolled: 1800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 380,
          lessonsCount: 15,
          category: 'Hindi',
          instructor: 'Shri Verma',
          grade: 9
        },
        {
          id: 'english-9-up-board',
          title: 'Class 9 English - UP Board',
          description: 'English literature, grammar and composition for UP Board.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 300,
          rating: 4.6,
          studentsEnrolled: 1620,
          isEnrolled: false,
          isLocked: false,
          xpReward: 360,
          lessonsCount: 13,
          category: 'English',
          instructor: 'Ms. Johnson',
          grade: 9
        },
        {
          id: 'social-science-9-up-board',
          title: 'Class 9 Social Science - UP Board',
          description: 'इतिहास, भूगोल और नागरिक शास्त्र - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 280,
          rating: 4.5,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 350,
          lessonsCount: 14,
          category: 'Social Science',
          instructor: 'Shri Kumar',
          grade: 9
        },
        {
          id: 'sanskrit-9-up-board',
          title: 'Class 9 Sanskrit - UP Board',
          description: 'संस्कृत साहित्य और व्याकरण - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 200,
          rating: 4.5,
          studentsEnrolled: 800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 350,
          lessonsCount: 12,
          category: 'Sanskrit',
          instructor: 'Pandit Sharma',
          grade: 9
        },
        {
          id: 'computer-9-up-board',
          title: 'Class 9 Computer Science - UP Board',
          description: 'प्रोग्रामिंग और कंप्यूटर अनुप्रयोग - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 250,
          rating: 4.8,
          studentsEnrolled: 1500,
          isEnrolled: false,
          isLocked: false,
          xpReward: 380,
          lessonsCount: 13,
          category: 'Computer Science',
          instructor: 'Shri Tech',
          grade: 9
        },

        // Class 10 Courses - UP Board Syllabus
        {
          id: 'math-10-up-board',
          title: 'Class 10 Mathematics - UP Board',
          description: 'बीजगणित, ज्यामिति और त्रिकोणमिति - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 400,
          rating: 4.8,
          studentsEnrolled: 1480,
          isEnrolled: false,
          isLocked: false,
          xpReward: 480,
          lessonsCount: 18,
          category: 'Mathematics',
          instructor: 'Shri Gupta',
          grade: 10
        },
        {
          id: 'science-10-up-board',
          title: 'Class 10 Science - UP Board',
          description: 'भौतिकी, रसायन और जीव विज्ञान - यूपी बोर्ड।',
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
          instructor: 'Dr. Sharma',
          grade: 10
        },
        {
          id: 'hindi-10-up-board',
          title: 'Class 10 Hindi - UP Board',
          description: 'हिंदी साहित्य, व्याकरण और रचना - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 260,
          rating: 4.8,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 420,
          lessonsCount: 16,
          category: 'Hindi',
          instructor: 'Shri Verma',
          grade: 10
        },
        {
          id: 'english-10-up-board',
          title: 'Class 10 English - UP Board',
          description: 'English literature, grammar and writing for UP Board.',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 320,
          rating: 4.6,
          studentsEnrolled: 1620,
          isEnrolled: false,
          isLocked: false,
          xpReward: 400,
          lessonsCount: 14,
          category: 'English',
          instructor: 'Ms. Johnson',
          grade: 10
        },
        {
          id: 'social-science-10-up-board',
          title: 'Class 10 Social Science - UP Board',
          description: 'इतिहास, भूगोल और नागरिक शास्त्र - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 300,
          rating: 4.5,
          studentsEnrolled: 1700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 380,
          lessonsCount: 15,
          category: 'Social Science',
          instructor: 'Shri Kumar',
          grade: 10
        },
        {
          id: 'sanskrit-10-up-board',
          title: 'Class 10 Sanskrit - UP Board',
          description: 'संस्कृत साहित्य और व्याकरण - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 220,
          rating: 4.6,
          studentsEnrolled: 800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 360,
          lessonsCount: 12,
          category: 'Sanskrit',
          instructor: 'Pandit Sharma',
          grade: 10
        },
        {
          id: 'computer-10-up-board',
          title: 'Class 10 Computer Science - UP Board',
          description: 'प्रोग्रामिंग और कंप्यूटर अनुप्रयोग - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'intermediate',
          duration: 280,
          rating: 4.8,
          studentsEnrolled: 1500,
          isEnrolled: false,
          isLocked: false,
          xpReward: 400,
          lessonsCount: 14,
          category: 'Computer Science',
          instructor: 'Shri Tech',
          grade: 10
        },

        // Class 11 Courses - UP Board Syllabus (Science Stream)
        {
          id: 'math-11-science-up-board',
          title: 'Class 11 Mathematics (Science) - UP Board',
          description: 'बीजगणित, त्रिकोणमिति और कलन - विज्ञान स्ट्रीम।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 450,
          rating: 4.8,
          studentsEnrolled: 1200,
          isEnrolled: false,
          isLocked: false,
          xpReward: 550,
          lessonsCount: 20,
          category: 'Mathematics',
          instructor: 'Prof. Gupta',
          grade: 11
        },
        {
          id: 'physics-11-up-board',
          title: 'Class 11 Physics - UP Board',
          description: 'भौतिकी के मूल सिद्धांत और प्रयोग - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 420,
          rating: 4.7,
          studentsEnrolled: 1100,
          isEnrolled: false,
          isLocked: false,
          xpReward: 520,
          lessonsCount: 18,
          category: 'Physics',
          instructor: 'Dr. Physics',
          grade: 11
        },
        {
          id: 'chemistry-11-up-board',
          title: 'Class 11 Chemistry - UP Board',
          description: 'रसायन विज्ञान के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 400,
          rating: 4.7,
          studentsEnrolled: 1100,
          isEnrolled: false,
          isLocked: false,
          xpReward: 520,
          lessonsCount: 17,
          category: 'Chemistry',
          instructor: 'Dr. Chemistry',
          grade: 11
        },
        {
          id: 'biology-11-up-board',
          title: 'Class 11 Biology - UP Board',
          description: 'जीव विज्ञान के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 380,
          rating: 4.6,
          studentsEnrolled: 1000,
          isEnrolled: false,
          isLocked: false,
          xpReward: 500,
          lessonsCount: 16,
          category: 'Biology',
          instructor: 'Dr. Biology',
          grade: 11
        },
        {
          id: 'hindi-11-up-board',
          title: 'Class 11 Hindi - UP Board',
          description: 'हिंदी साहित्य और व्याकरण - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 300,
          rating: 4.8,
          studentsEnrolled: 1600,
          isEnrolled: false,
          isLocked: false,
          xpReward: 480,
          lessonsCount: 18,
          category: 'Hindi',
          instructor: 'Prof. Verma',
          grade: 11
        },
        {
          id: 'english-11-up-board',
          title: 'Class 11 English - UP Board',
          description: 'English literature and advanced grammar for UP Board.',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 350,
          rating: 4.6,
          studentsEnrolled: 1400,
          isEnrolled: false,
          isLocked: false,
          xpReward: 450,
          lessonsCount: 16,
          category: 'English',
          instructor: 'Prof. Johnson',
          grade: 11
        },
        {
          id: 'computer-11-up-board',
          title: 'Class 11 Computer Science - UP Board',
          description: 'प्रोग्रामिंग और कंप्यूटर विज्ञान - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 320,
          rating: 4.8,
          studentsEnrolled: 1300,
          isEnrolled: false,
          isLocked: false,
          xpReward: 480,
          lessonsCount: 15,
          category: 'Computer Science',
          instructor: 'Prof. Tech',
          grade: 11
        },

        // Class 11 Commerce Stream
        {
          id: 'accountancy-11-up-board',
          title: 'Class 11 Accountancy - UP Board',
          description: 'लेखांकन के मूल सिद्धांत - वाणिज्य स्ट्रीम।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 400,
          rating: 4.7,
          studentsEnrolled: 900,
          isEnrolled: false,
          isLocked: false,
          xpReward: 500,
          lessonsCount: 18,
          category: 'Accountancy',
          instructor: 'Prof. Accountant',
          grade: 11
        },
        {
          id: 'business-11-up-board',
          title: 'Class 11 Business Studies - UP Board',
          description: 'व्यापार अध्ययन के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 350,
          rating: 4.6,
          studentsEnrolled: 800,
          isEnrolled: false,
          isLocked: false,
          xpReward: 480,
          lessonsCount: 16,
          category: 'Business Studies',
          instructor: 'Prof. Business',
          grade: 11
        },
        {
          id: 'economics-11-up-board',
          title: 'Class 11 Economics - UP Board',
          description: 'अर्थशास्त्र के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 380,
          rating: 4.7,
          studentsEnrolled: 850,
          isEnrolled: false,
          isLocked: false,
          xpReward: 490,
          lessonsCount: 17,
          category: 'Economics',
          instructor: 'Prof. Economics',
          grade: 11
        },

        // Class 11 Arts Stream
        {
          id: 'history-11-up-board',
          title: 'Class 11 History - UP Board',
          description: 'इतिहास के मूल सिद्धांत - कला स्ट्रीम।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 360,
          rating: 4.6,
          studentsEnrolled: 700,
          isEnrolled: false,
          isLocked: false,
          xpReward: 470,
          lessonsCount: 16,
          category: 'History',
          instructor: 'Prof. History',
          grade: 11
        },
        {
          id: 'geography-11-up-board',
          title: 'Class 11 Geography - UP Board',
          description: 'भूगोल के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 340,
          rating: 4.5,
          studentsEnrolled: 650,
          isEnrolled: false,
          isLocked: false,
          xpReward: 460,
          lessonsCount: 15,
          category: 'Geography',
          instructor: 'Prof. Geography',
          grade: 11
        },
        {
          id: 'political-science-11-up-board',
          title: 'Class 11 Political Science - UP Board',
          description: 'राजनीति विज्ञान के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 320,
          rating: 4.6,
          studentsEnrolled: 600,
          isEnrolled: false,
          isLocked: false,
          xpReward: 450,
          lessonsCount: 14,
          category: 'Political Science',
          instructor: 'Prof. Politics',
          grade: 11
        },
        {
          id: 'sociology-11-up-board',
          title: 'Class 11 Sociology - UP Board',
          description: 'समाजशास्त्र के मूल सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 300,
          rating: 4.5,
          studentsEnrolled: 550,
          isEnrolled: false,
          isLocked: false,
          xpReward: 440,
          lessonsCount: 13,
          category: 'Sociology',
          instructor: 'Prof. Sociology',
          grade: 11
        },

        // Class 12 Courses - UP Board Syllabus (Science Stream)
        {
          id: 'math-12-science-up-board',
          title: 'Class 12 Mathematics (Science) - UP Board',
          description: 'कलन, सांख्यिकी और संभावना - विज्ञान स्ट्रीम।',
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
          instructor: 'Prof. Gupta',
          grade: 12
        },
        {
          id: 'physics-12-up-board',
          title: 'Class 12 Physics - UP Board',
          description: 'भौतिकी के उन्नत सिद्धांत और प्रयोग - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 500,
          rating: 4.8,
          studentsEnrolled: 950,
          isEnrolled: false,
          isLocked: true,
          xpReward: 580,
          lessonsCount: 19,
          category: 'Physics',
          instructor: 'Dr. Physics',
          grade: 12
        },
        {
          id: 'chemistry-12-up-board',
          title: 'Class 12 Chemistry - UP Board',
          description: 'रसायन विज्ञान के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 480,
          rating: 4.7,
          studentsEnrolled: 950,
          isEnrolled: false,
          isLocked: true,
          xpReward: 570,
          lessonsCount: 18,
          category: 'Chemistry',
          instructor: 'Dr. Chemistry',
          grade: 12
        },
        {
          id: 'biology-12-up-board',
          title: 'Class 12 Biology - UP Board',
          description: 'जीव विज्ञान के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 460,
          rating: 4.6,
          studentsEnrolled: 900,
          isEnrolled: false,
          isLocked: true,
          xpReward: 560,
          lessonsCount: 17,
          category: 'Biology',
          instructor: 'Dr. Biology',
          grade: 12
        },
        {
          id: 'hindi-12-up-board',
          title: 'Class 12 Hindi - UP Board',
          description: 'हिंदी साहित्य और व्याकरण - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 360,
          rating: 4.9,
          studentsEnrolled: 1500,
          isEnrolled: false,
          isLocked: true,
          xpReward: 550,
          lessonsCount: 20,
          category: 'Hindi',
          instructor: 'Prof. Verma',
          grade: 12
        },
        {
          id: 'english-12-up-board',
          title: 'Class 12 English - UP Board',
          description: 'English literature and advanced writing for UP Board.',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 400,
          rating: 4.7,
          studentsEnrolled: 1300,
          isEnrolled: false,
          isLocked: true,
          xpReward: 520,
          lessonsCount: 18,
          category: 'English',
          instructor: 'Prof. Johnson',
          grade: 12
        },
        {
          id: 'computer-12-up-board',
          title: 'Class 12 Computer Science - UP Board',
          description: 'प्रोग्रामिंग और कंप्यूटर विज्ञान - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 380,
          rating: 4.8,
          studentsEnrolled: 1200,
          isEnrolled: false,
          isLocked: true,
          xpReward: 540,
          lessonsCount: 17,
          category: 'Computer Science',
          instructor: 'Prof. Tech',
          grade: 12
        },

        // Class 12 Commerce Stream
        {
          id: 'accountancy-12-up-board',
          title: 'Class 12 Accountancy - UP Board',
          description: 'लेखांकन के उन्नत सिद्धांत - वाणिज्य स्ट्रीम।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 450,
          rating: 4.7,
          studentsEnrolled: 850,
          isEnrolled: false,
          isLocked: true,
          xpReward: 550,
          lessonsCount: 19,
          category: 'Accountancy',
          instructor: 'Prof. Accountant',
          grade: 12
        },
        {
          id: 'business-12-up-board',
          title: 'Class 12 Business Studies - UP Board',
          description: 'व्यापार अध्ययन के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 400,
          rating: 4.6,
          studentsEnrolled: 750,
          isEnrolled: false,
          isLocked: true,
          xpReward: 530,
          lessonsCount: 17,
          category: 'Business Studies',
          instructor: 'Prof. Business',
          grade: 12
        },
        {
          id: 'economics-12-up-board',
          title: 'Class 12 Economics - UP Board',
          description: 'अर्थशास्त्र के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 420,
          rating: 4.7,
          studentsEnrolled: 800,
          isEnrolled: false,
          isLocked: true,
          xpReward: 540,
          lessonsCount: 18,
          category: 'Economics',
          instructor: 'Prof. Economics',
          grade: 12
        },

        // Class 12 Arts Stream
        {
          id: 'history-12-up-board',
          title: 'Class 12 History - UP Board',
          description: 'इतिहास के उन्नत सिद्धांत - कला स्ट्रीम।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 400,
          rating: 4.6,
          studentsEnrolled: 650,
          isEnrolled: false,
          isLocked: true,
          xpReward: 520,
          lessonsCount: 17,
          category: 'History',
          instructor: 'Prof. History',
          grade: 12
        },
        {
          id: 'geography-12-up-board',
          title: 'Class 12 Geography - UP Board',
          description: 'भूगोल के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 380,
          rating: 4.5,
          studentsEnrolled: 600,
          isEnrolled: false,
          isLocked: true,
          xpReward: 510,
          lessonsCount: 16,
          category: 'Geography',
          instructor: 'Prof. Geography',
          grade: 12
        },
        {
          id: 'political-science-12-up-board',
          title: 'Class 12 Political Science - UP Board',
          description: 'राजनीति विज्ञान के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 360,
          rating: 4.6,
          studentsEnrolled: 550,
          isEnrolled: false,
          isLocked: true,
          xpReward: 500,
          lessonsCount: 15,
          category: 'Political Science',
          instructor: 'Prof. Politics',
          grade: 12
        },
        {
          id: 'sociology-12-up-board',
          title: 'Class 12 Sociology - UP Board',
          description: 'समाजशास्त्र के उन्नत सिद्धांत - यूपी बोर्ड।',
          thumbnail: '',
          difficulty: 'advanced',
          duration: 340,
          rating: 4.5,
          studentsEnrolled: 500,
          isEnrolled: false,
          isLocked: true,
          xpReward: 490,
          lessonsCount: 14,
          category: 'Sociology',
          instructor: 'Prof. Sociology',
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Courses for Classes 6–12
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Choose your class and subject. Collect XP and earn badges as you learn!
          </p>
        </div>

        {/* Class Selection Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">Select Your Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedGrade === grade
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🎓</div>
                  <div>Class {grade}</div>
                  <div className="text-sm font-normal opacity-80">
                    {courses.filter(c => c.grade === parseInt(grade)).length} courses
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>


        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Clear Class Filter */}
            {selectedGrade !== 'all' && (
                <button
                onClick={() => setSelectedGrade('all')}
                className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Show All Classes
                </button>
            )}
            </div>
          </div>

        {/* Selected Class Header */}
        {selectedGrade !== 'all' && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Class {selectedGrade} Courses
                </h2>
                <p className="text-purple-100">
                  {filteredCourses.length} courses available for Class {selectedGrade}
                </p>
        </div>
              <div className="text-right">
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-sm opacity-80">Grade {selectedGrade}</div>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {course.category === 'Mathematics' && '🔢'}
                    {course.category === 'Science' && '🔬'}
                    {course.category === 'English' && '📚'}
                    {course.category === 'Hindi' && '🕉️'}
                    {course.category === 'Social Science' && '🌍'}
                    {course.category === 'Sanskrit' && '🕉️'}
                    {course.category === 'Computer Science' && '💻'}
                    {course.category === 'Physics' && '⚛️'}
                    {course.category === 'Chemistry' && '🧪'}
                    {course.category === 'Biology' && '🧬'}
                    {course.category === 'Accountancy' && '📊'}
                    {course.category === 'Business Studies' && '💼'}
                    {course.category === 'Economics' && '💰'}
                    {course.category === 'History' && '📜'}
                    {course.category === 'Geography' && '🌍'}
                    {course.category === 'Political Science' && '🏛️'}
                    {course.category === 'Sociology' && '👥'}
                    {course.category !== 'Mathematics' && course.category !== 'Science' && course.category !== 'English' && course.category !== 'Hindi' && course.category !== 'Social Science' && course.category !== 'Sanskrit' && course.category !== 'Computer Science' && course.category !== 'Physics' && course.category !== 'Chemistry' && course.category !== 'Biology' && course.category !== 'Accountancy' && course.category !== 'Business Studies' && course.category !== 'Economics' && course.category !== 'History' && course.category !== 'Geography' && course.category !== 'Political Science' && course.category !== 'Sociology' && '🎓'}
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
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
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {course.xpReward} XP
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.lessonsCount} lessons
                  </span>
                </div>

                {/* Progress Bar (for enrolled courses) */}
                {course.isEnrolled && course.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {course.isLocked ? (
                  <button disabled className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Locked
                  </button>
                ) : course.isEnrolled ? (
                  <Link href={
                    course.id === 'math-6-up-board' ? '/student/courses/class6-math' : 
                    course.id === 'science-6-up-board' ? '/student/courses/class6-science' :
                    `/student/courses/${course.id}`
                  }>
                    <button className="w-full py-2 px-4 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" /> Continue Learning
                    </button>
                  </Link>
                ) : (
                  course.id === 'math-6-up-board' ? (
                    <Link href="/student/courses/class6-math">
                      <button className="w-full py-2 px-4 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" /> Start Course
                      </button>
                    </Link>
                  ) : course.id === 'science-6-up-board' ? (
                    <Link href="/student/courses/class6-science">
                      <button className="w-full py-2 px-4 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" /> Start Course
                      </button>
                    </Link>
                  ) : (
                    <button className="w-full py-2 px-4 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" /> Start Course
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {selectedGrade !== 'all' ? `No courses found for Class ${selectedGrade}` : 'No courses found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedGrade !== 'all' 
                ? 'Try selecting a different class or adjusting your search criteria.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {selectedGrade !== 'all' && (
              <button
                onClick={() => setSelectedGrade('all')}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View All Classes
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
