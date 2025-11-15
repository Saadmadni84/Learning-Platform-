// src/data/mockUserData.ts
export interface UserData {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  achievements: Achievement[];
  courses: Course[];
  stats: UserStats;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export interface UserStats {
  totalXP: number;
  streak: number;
  lessonsCompleted: number;
  averageScore: number;
}

// Mock user data for the gamified learning platform
export const mockUserData: UserData = {
  id: "user-123",
  name: "Saad Madni",
  email: "saadmadni84@gmail.com",
  level: 5,
  xp: 2750,
  achievements: [
    {
      id: "ach-1",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlockedAt: new Date("2024-01-15")
    },
    {
      id: "ach-2", 
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlockedAt: new Date("2024-01-22")
    },
    {
      id: "ach-3",
      title: "Code Master",
      description: "Complete 50 coding challenges",
      icon: "💻",
      unlockedAt: new Date("2024-02-01")
    }
  ],
  courses: [
    {
      id: "course-1",
      title: "Math: Calculus Journey",
      progress: 85,
      totalLessons: 20,
      completedLessons: 17
    },
    {
      id: "course-2", 
      title: "Science: Physics Playgrounds",
      progress: 60,
      totalLessons: 15,
      completedLessons: 9
    },
    {
      id: "course-3",
      title: "Science: Lab Adventures", 
      progress: 30,
      totalLessons: 12,
      completedLessons: 4
    }
  ],
  stats: {
    totalXP: 2750,
    streak: 12,
    lessonsCompleted: 30,
    averageScore: 87.5
  }
};

export default mockUserData;
