// School System Data Structure
export interface SubjectSource {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'document' | 'website' | 'video' | 'other';
  description?: string;
  duration?: number; // in minutes
  isRequired?: boolean;
  order: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sources: SubjectSource[];
}

export interface ClassSection {
  id: string;
  name: string;
  grade: number;
  description: string;
  subjects: Subject[];
  totalStudents?: number;
  averageProgress?: number;
}

export interface SchoolSystem {
  classes: ClassSection[];
  totalClasses: number;
  totalSubjects: number;
}

// Core subjects available across all classes
const coreSubjects = [
  {
    name: "Mathematics",
    description: "Explore numbers, algebra, geometry, and problem-solving",
    icon: "🔢",
    color: "bg-blue-500",
    difficulty: "intermediate" as const
  },
  {
    name: "Science",
    description: "Discover physics, chemistry, biology, and earth sciences",
    icon: "🔬",
    color: "bg-green-500",
    difficulty: "intermediate" as const
  },
  {
    name: "English",
    description: "Master language, literature, and communication skills",
    icon: "📚",
    color: "bg-purple-500",
    difficulty: "beginner" as const
  },
  {
    name: "Hindi",
    description: "Learn Hindi language, grammar, literature, and poetry",
    icon: "🕉️",
    color: "bg-orange-500",
    difficulty: "beginner" as const
  },
  {
    name: "Social Studies",
    description: "Learn about history, geography, civics, and culture",
    icon: "🌍",
    color: "bg-amber-500",
    difficulty: "beginner" as const
  }
];

// Additional subjects for higher classes
const additionalSubjects = [
  {
    name: "Computer Science",
    description: "Programming, algorithms, and digital literacy",
    icon: "💻",
    color: "bg-indigo-500",
    difficulty: "advanced" as const
  },
  {
    name: "Physical Education",
    description: "Sports, fitness, and health education",
    icon: "⚽",
    color: "bg-red-500",
    difficulty: "beginner" as const
  },
  {
    name: "Art & Design",
    description: "Creative expression through visual arts",
    icon: "🎨",
    color: "bg-pink-500",
    difficulty: "beginner" as const
  },
  {
    name: "Foreign Language",
    description: "Learn a second language and cultural awareness",
    icon: "🗣️",
    color: "bg-teal-500",
    difficulty: "intermediate" as const
  },
  {
    name: "Sanskrit",
    description: "Ancient language, literature, and cultural heritage",
    icon: "🕉️",
    color: "bg-yellow-600",
    difficulty: "intermediate" as const
  },
  {
    name: "Economics",
    description: "Understanding money, markets, and economic principles",
    icon: "💰",
    color: "bg-emerald-500",
    difficulty: "intermediate" as const
  },
  {
    name: "Psychology",
    description: "Study of mind, behavior, and human development",
    icon: "🧠",
    color: "bg-violet-500",
    difficulty: "advanced" as const
  },
  {
    name: "Environmental Science",
    description: "Ecology, sustainability, and environmental protection",
    icon: "🌱",
    color: "bg-lime-500",
    difficulty: "intermediate" as const
  }
];

// Regional language subjects
const regionalLanguageSubjects = [
  {
    name: "Tamil",
    description: "Tamil language, literature, and cultural studies",
    icon: "🕉️",
    color: "bg-orange-600",
    difficulty: "beginner" as const
  },
  {
    name: "Telugu",
    description: "Telugu language, grammar, and literature",
    icon: "🕉️",
    color: "bg-orange-700",
    difficulty: "beginner" as const
  },
  {
    name: "Bengali",
    description: "Bengali language, poetry, and cultural heritage",
    icon: "🕉️",
    color: "bg-orange-800",
    difficulty: "beginner" as const
  },
  {
    name: "Marathi",
    description: "Marathi language, literature, and regional culture",
    icon: "🕉️",
    color: "bg-orange-900",
    difficulty: "beginner" as const
  },
  {
    name: "Gujarati",
    description: "Gujarati language, grammar, and literature",
    icon: "🕉️",
    color: "bg-amber-600",
    difficulty: "beginner" as const
  },
  {
    name: "Kannada",
    description: "Kannada language, literature, and cultural studies",
    icon: "🕉️",
    color: "bg-amber-700",
    difficulty: "beginner" as const
  },
  {
    name: "Malayalam",
    description: "Malayalam language, poetry, and regional culture",
    icon: "🕉️",
    color: "bg-amber-800",
    difficulty: "beginner" as const
  },
  {
    name: "Punjabi",
    description: "Punjabi language, literature, and cultural heritage",
    icon: "🕉️",
    color: "bg-amber-900",
    difficulty: "beginner" as const
  }
];

// Generate sample sources for subjects
function generateSampleSources(subjectName: string, grade: number): SubjectSource[] {
  const sources: SubjectSource[] = [];
  
  // Add YouTube video sources based on subject
  if (subjectName === 'Mathematics') {
    sources.push({
      id: `math-video-${grade}-1`,
      title: 'Algebra Basics - Introduction',
      url: 'https://www.youtube.com/watch?v=NybHckSEQBI',
      type: 'youtube',
      description: 'Learn the fundamentals of algebra',
      duration: 15,
      isRequired: true,
      order: 0
    });
    sources.push({
      id: `math-video-${grade}-2`,
      title: 'Geometry Concepts',
      url: 'https://www.youtube.com/watch?v=J6t1GlIeBqI',
      type: 'youtube',
      description: 'Understanding geometric shapes and properties',
      duration: 20,
      isRequired: false,
      order: 1
    });
  } else if (subjectName === 'Science') {
    sources.push({
      id: `science-video-${grade}-1`,
      title: 'Physics Fundamentals',
      url: 'https://www.youtube.com/watch?v=7DqckSn8T5Y',
      type: 'youtube',
      description: 'Basic concepts of physics',
      duration: 18,
      isRequired: true,
      order: 0
    });
    sources.push({
      id: `science-video-${grade}-2`,
      title: 'Chemistry Basics',
      url: 'https://www.youtube.com/watch?v=5yw1YH7ya7I',
      type: 'youtube',
      description: 'Introduction to chemistry concepts',
      duration: 22,
      isRequired: true,
      order: 1
    });
  } else if (subjectName === 'English') {
    sources.push({
      id: `english-video-${grade}-1`,
      title: 'Grammar Essentials',
      url: 'https://www.youtube.com/watch?v=8Gv0H-vPoDc',
      type: 'youtube',
      description: 'Master English grammar rules',
      duration: 25,
      isRequired: true,
      order: 0
    });
  } else if (subjectName === 'Computer Science') {
    sources.push({
      id: `cs-video-${grade}-1`,
      title: 'Programming Basics',
      url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
      type: 'youtube',
      description: 'Introduction to programming concepts',
      duration: 30,
      isRequired: true,
      order: 0
    });
  }

  // Add some additional resources
  sources.push({
    id: `resource-${grade}-1`,
    title: 'Study Guide PDF',
    url: 'https://example.com/study-guide.pdf',
    type: 'document',
    description: 'Comprehensive study guide for the subject',
    isRequired: false,
    order: sources.length
  });

  return sources;
}

// Generate subjects for each class with appropriate difficulty and content
function generateSubjectsForClass(grade: number): Subject[] {
  const subjects: Subject[] = [];
  
  // Core subjects for all classes
  coreSubjects.forEach((subject, index) => {
    const difficulty = grade <= 8 ? 'beginner' : grade <= 10 ? 'intermediate' : 'advanced';
    const totalLessons = Math.max(10, 15 + (grade - 6) * 2);
    const completedLessons = Math.floor(Math.random() * totalLessons * 0.7);
    
    subjects.push({
      id: `class-${grade}-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: subject.name,
      description: subject.description,
      icon: subject.icon,
      color: subject.color,
      totalLessons,
      completedLessons,
      progress: Math.round((completedLessons / totalLessons) * 100),
      difficulty,
      sources: generateSampleSources(subject.name, grade)
    });
  });

  // Add Physical Education and Art & Design for all classes
  const basicAdditionalSubjects = additionalSubjects.filter(subject => 
    subject.name === 'Physical Education' || subject.name === 'Art & Design'
  );
  
  basicAdditionalSubjects.forEach((subject) => {
    const difficulty = grade <= 8 ? 'beginner' : grade <= 10 ? 'intermediate' : 'advanced';
    const totalLessons = Math.max(8, 10 + (grade - 6) * 1.5);
    const completedLessons = Math.floor(Math.random() * totalLessons * 0.6);
    
    subjects.push({
      id: `class-${grade}-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: subject.name,
      description: subject.description,
      icon: subject.icon,
      color: subject.color,
      totalLessons,
      completedLessons,
      progress: Math.round((completedLessons / totalLessons) * 100),
      difficulty,
      sources: generateSampleSources(subject.name, grade)
    });
  });

  // Add regional language for Class 6 (Hindi is already in core subjects)
  if (grade === 6) {
    // Add one regional language for Class 6
    const regionalSubject = regionalLanguageSubjects[Math.floor(Math.random() * regionalLanguageSubjects.length)];
    const totalLessons = 12;
    const completedLessons = Math.floor(Math.random() * totalLessons * 0.5);
    
    subjects.push({
      id: `class-${grade}-${regionalSubject.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: regionalSubject.name,
      description: regionalSubject.description,
      icon: regionalSubject.icon,
      color: regionalSubject.color,
      totalLessons,
      completedLessons,
      progress: Math.round((completedLessons / totalLessons) * 100),
      difficulty: 'beginner',
      sources: generateSampleSources(regionalSubject.name, grade)
    });
  }

  // Add more subjects for classes 7-8
  if (grade >= 7 && grade <= 8) {
    const intermediateSubjects = additionalSubjects.filter(subject => 
      subject.name === 'Computer Science' || subject.name === 'Environmental Science'
    );
    
    intermediateSubjects.forEach((subject) => {
      const totalLessons = Math.max(10, 12 + (grade - 7) * 2);
      const completedLessons = Math.floor(Math.random() * totalLessons * 0.4);
      
      subjects.push({
        id: `class-${grade}-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: subject.name,
        description: subject.description,
        icon: subject.icon,
        color: subject.color,
        totalLessons,
        completedLessons,
        progress: Math.round((completedLessons / totalLessons) * 100),
        difficulty: grade === 7 ? 'beginner' : 'intermediate',
        sources: generateSampleSources(subject.name, grade)
      });
    });
  }

  // Add all additional subjects for classes 9-12
  if (grade >= 9) {
    additionalSubjects.forEach((subject, index) => {
      const totalLessons = Math.max(8, 12 + (grade - 9) * 2);
      const completedLessons = Math.floor(Math.random() * totalLessons * 0.5);
      
      subjects.push({
        id: `class-${grade}-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: subject.name,
        description: subject.description,
        icon: subject.icon,
        color: subject.color,
        totalLessons,
        completedLessons,
        progress: Math.round((completedLessons / totalLessons) * 100),
        difficulty: subject.difficulty,
        sources: generateSampleSources(subject.name, grade)
      });
    });

    // Add one regional language for higher classes
    if (grade >= 10) {
      const regionalSubject = regionalLanguageSubjects[Math.floor(Math.random() * regionalLanguageSubjects.length)];
      const totalLessons = Math.max(10, 15 + (grade - 10) * 2);
      const completedLessons = Math.floor(Math.random() * totalLessons * 0.3);
      
      subjects.push({
        id: `class-${grade}-${regionalSubject.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: regionalSubject.name,
        description: regionalSubject.description,
        icon: regionalSubject.icon,
        color: regionalSubject.color,
        totalLessons,
        completedLessons,
        progress: Math.round((completedLessons / totalLessons) * 100),
        difficulty: 'intermediate',
        sources: generateSampleSources(regionalSubject.name, grade)
      });
    }
  }

  return subjects;
}

// Generate class sections for grades 6-12
function generateClassSections(): ClassSection[] {
  const classes: ClassSection[] = [];
  
  for (let grade = 6; grade <= 12; grade++) {
    const subjects = generateSubjectsForClass(grade);
    const totalStudents = Math.floor(Math.random() * 30) + 20; // 20-50 students
    const averageProgress = Math.round(
      subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length
    );

    classes.push({
      id: `class-${grade}`,
      name: `Class ${grade}`,
      grade,
      description: `Grade ${grade} curriculum with comprehensive subject coverage`,
      subjects,
      totalStudents,
      averageProgress
    });
  }

  return classes;
}

// Main school system data
export const schoolSystemData: SchoolSystem = {
  classes: generateClassSections(),
  totalClasses: 7, // Classes 6-12
  totalSubjects: generateClassSections().reduce((total, classSection) => total + classSection.subjects.length, 0)
};

// Helper functions
export function getClassById(classId: string): ClassSection | undefined {
  return schoolSystemData.classes.find(cls => cls.id === classId);
}

export function getSubjectById(classId: string, subjectId: string): Subject | undefined {
  const classSection = getClassById(classId);
  return classSection?.subjects.find(subject => subject.id === subjectId);
}

export function getClassesByGradeRange(minGrade: number, maxGrade: number): ClassSection[] {
  return schoolSystemData.classes.filter(cls => cls.grade >= minGrade && cls.grade <= maxGrade);
}

export function getSubjectsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Subject[] {
  const subjects: Subject[] = [];
  schoolSystemData.classes.forEach(cls => {
    subjects.push(...cls.subjects.filter(subject => subject.difficulty === difficulty));
  });
  return subjects;
}

export default schoolSystemData;

