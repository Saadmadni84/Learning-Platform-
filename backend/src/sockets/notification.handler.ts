import { Server, Socket } from 'socket.io';

export const notificationHandler = (io: Server, socket: Socket) => {
  // Send achievement notification
  socket.on('achievement-unlocked', (data: {
    userId: string;
    achievement: string;
    points: number;
  }) => {
    const { userId, achievement, points } = data;
    
    // Send notification to user's room
    io.to(`user-${userId}`).emit('achievement-notification', {
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: `You've unlocked: ${achievement}`,
      points,
      timestamp: new Date().toISOString()
    });
  });

  // Send level up notification
  socket.on('level-up', (data: {
    userId: string;
    newLevel: number;
    experience: number;
  }) => {
    const { userId, newLevel, experience } = data;
    
    io.to(`user-${userId}`).emit('level-up-notification', {
      type: 'level-up',
      title: 'Level Up!',
      message: `Congratulations! You've reached level ${newLevel}`,
      newLevel,
      experience,
      timestamp: new Date().toISOString()
    });
  });

  // Send course completion notification
  socket.on('course-completed', (data: {
    userId: string;
    courseId: string;
    courseTitle: string;
    points: number;
  }) => {
    const { userId, courseId, courseTitle, points } = data;
    
    io.to(`user-${userId}`).emit('course-completion-notification', {
      type: 'course-completion',
      title: 'Course Completed!',
      message: `You've completed: ${courseTitle}`,
      courseId,
      courseTitle,
      points,
      timestamp: new Date().toISOString()
    });
  });

  // Send quiz result notification
  socket.on('quiz-completed', (data: {
    userId: string;
    quizId: string;
    score: number;
    totalQuestions: number;
    points: number;
  }) => {
    const { userId, quizId, score, totalQuestions, points } = data;
    
    io.to(`user-${userId}`).emit('quiz-result-notification', {
      type: 'quiz-result',
      title: 'Quiz Completed!',
      message: `You scored ${score}/${totalQuestions}`,
      quizId,
      score,
      totalQuestions,
      points,
      timestamp: new Date().toISOString()
    });
  });

  // Send general notification
  socket.on('send-notification', (data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: any;
  }) => {
    const { userId, type, title, message, data: additionalData } = data;
    
    io.to(`user-${userId}`).emit('general-notification', {
      type,
      title,
      message,
      data: additionalData,
      timestamp: new Date().toISOString()
    });
  });
};