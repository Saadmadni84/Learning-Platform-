import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create badges
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { id: 'badge_high_scorer' },
      update: {},
      create: {
        id: 'badge_high_scorer',
        name: 'High Scorer',
        description: 'Achieve a score of 90% or higher',
        icon: '🏆',
        color: '#FFD700',
        points: 100,
        category: 'achievement'
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge_speed_demon' },
      update: {},
      create: {
        id: 'badge_speed_demon',
        name: 'Speed Demon',
        description: 'Complete a challenge in under 1 minute',
        icon: '⚡',
        color: '#FF6B6B',
        points: 50,
        category: 'speed'
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge_streak_master' },
      update: {},
      create: {
        id: 'badge_streak_master',
        name: 'Streak Master',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        color: '#FF8C00',
        points: 200,
        category: 'streak'
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge_math_genius' },
      update: {},
      create: {
        id: 'badge_math_genius',
        name: 'Math Genius',
        description: 'Complete 10 math challenges',
        icon: '🧮',
        color: '#4ECDC4',
        points: 150,
        category: 'subject'
      }
    }),
    prisma.badge.upsert({
      where: { id: 'badge_science_explorer' },
      update: {},
      create: {
        id: 'badge_science_explorer',
        name: 'Science Explorer',
        description: 'Complete 10 science challenges',
        icon: '🔬',
        color: '#45B7D1',
        points: 150,
        category: 'subject'
      }
    })
  ]);

  console.log('✅ Badges created');

  // Create challenges
  const challenges = await Promise.all([
    prisma.challenge.upsert({
      where: { id: 'challenge_math_sprint' },
      update: {},
      create: {
        id: 'challenge_math_sprint',
        title: 'Math Sprint',
        description: 'Quick math challenges for all classes (6-12)',
        type: 'MATH_SPRINT',
        difficulty: 1,
        timeLimit: 300, // 5 minutes
        points: 50,
        isActive: true
      }
    }),
    prisma.challenge.upsert({
      where: { id: 'challenge_science_quiz' },
      update: {},
      create: {
        id: 'challenge_science_quiz',
        title: 'Science Quiz',
        description: 'Test your science knowledge',
        type: 'SCIENCE_QUIZ',
        difficulty: 2,
        timeLimit: 600, // 10 minutes
        points: 75,
        isActive: true
      }
    }),
    prisma.challenge.upsert({
      where: { id: 'challenge_word_builder' },
      update: {},
      create: {
        id: 'challenge_word_builder',
        title: 'Word Builder',
        description: 'Build words and improve vocabulary',
        type: 'WORD_BUILDER',
        difficulty: 1,
        timeLimit: 300,
        points: 50,
        isActive: true
      }
    }),
    prisma.challenge.upsert({
      where: { id: 'challenge_logic_puzzle' },
      update: {},
      create: {
        id: 'challenge_logic_puzzle',
        title: 'Logic Puzzle',
        description: 'Solve logical reasoning problems',
        type: 'LOGIC_PUZZLE',
        difficulty: 3,
        timeLimit: 900, // 15 minutes
        points: 100,
        isActive: true
      }
    }),
    prisma.challenge.upsert({
      where: { id: 'challenge_general_knowledge' },
      update: {},
      create: {
        id: 'challenge_general_knowledge',
        title: 'General Knowledge',
        description: 'Test your general knowledge',
        type: 'GENERAL_KNOWLEDGE',
        difficulty: 2,
        timeLimit: 600,
        points: 75,
        isActive: true
      }
    })
  ]);

  console.log('✅ Challenges created');

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'student1@example.com' },
      update: {},
      create: {
        email: 'student1@example.com',
        username: 'student1',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        isVerified: true,
        role: 'STUDENT',
        points: 1500,
        level: 3,
        streakDays: 5,
        completedCourses: 2
      }
    }),
    prisma.user.upsert({
      where: { email: 'student2@example.com' },
      update: {},
      create: {
        email: 'student2@example.com',
        username: 'student2',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        isVerified: true,
        role: 'STUDENT',
        points: 2300,
        level: 4,
        streakDays: 12,
        completedCourses: 4
      }
    }),
    prisma.user.upsert({
      where: { email: 'instructor@example.com' },
      update: {},
      create: {
        email: 'instructor@example.com',
        username: 'instructor',
        password: hashedPassword,
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        isVerified: true,
        role: 'INSTRUCTOR',
        points: 5000,
        level: 10
      }
    })
  ]);

  console.log('✅ Users created');

  // Create sample courses
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { id: 'course_math_basics' },
      update: {},
      create: {
        id: 'course_math_basics',
        title: 'Mathematics - Algebra & Geometry',
        description: 'Learn fundamental concepts of algebra and geometry',
        category: 'Mathematics',
        level: 'BEGINNER',
        duration: 120, // 2 hours
        instructorId: users[2].id, // instructor
        difficulty: 2,
        isPublished: true,
        tags: ['math', 'algebra', 'geometry', 'beginner']
      }
    }),
    prisma.course.upsert({
      where: { id: 'course_science_physics' },
      update: {},
      create: {
        id: 'course_science_physics',
        title: 'Science - Physics & Chemistry',
        description: 'Explore the world of physics and chemistry',
        category: 'Science',
        level: 'INTERMEDIATE',
        duration: 180, // 3 hours
        instructorId: users[2].id,
        difficulty: 3,
        isPublished: true,
        tags: ['science', 'physics', 'chemistry', 'intermediate']
      }
    }),
    prisma.course.upsert({
      where: { id: 'course_english_literature' },
      update: {},
      create: {
        id: 'course_english_literature',
        title: 'English Literature & Grammar',
        description: 'Master English literature and grammar',
        category: 'English',
        level: 'BEGINNER',
        duration: 150, // 2.5 hours
        instructorId: users[2].id,
        difficulty: 2,
        isPublished: true,
        tags: ['english', 'literature', 'grammar', 'beginner']
      }
    })
  ]);

  console.log('✅ Courses created');

  // Create sample enrollments
  await prisma.enrollment.upsert({
    where: { 
      userId_courseId: {
        userId: users[0].id,
        courseId: courses[0].id
      }
    },
    update: {},
    create: {
      userId: users[0].id,
      courseId: courses[0].id,
      status: 'ACTIVE',
      progress: 65
    }
  });

  await prisma.enrollment.upsert({
    where: { 
      userId_courseId: {
        userId: users[1].id,
        courseId: courses[1].id
      }
    },
    update: {},
    create: {
      userId: users[1].id,
      courseId: courses[1].id,
      status: 'ACTIVE',
      progress: 80
    }
  });

  console.log('✅ Enrollments created');

  // Create sample notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: users[0].id,
        title: 'Welcome to Acadevia! 🎉',
        message: 'Start your learning journey with our gamified platform',
        type: 'GENERAL'
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[1].id,
        title: 'New Course Available! 📚',
        message: 'Check out the new Advanced Mathematics course',
        type: 'COURSE_UPDATE'
      }
    })
  ]);

  console.log('✅ Notifications created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });