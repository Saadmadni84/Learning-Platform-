import { Server } from 'socket.io';
import { chatHandler } from './handlers/chat.handler';
import { notificationHandler } from './notification.handler';

export const setupSocket = (io: Server) => {
  // Authentication middleware for socket connections
  io.use((socket, next) => {
    // Add authentication logic here if needed
    // For now, allow all connections
    next();
  });

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Join user to their personal room
    socket.on('join-user-room', (userId: string) => {
      socket.join(`user-${userId}`);
      console.log(`👤 User ${userId} joined their room`);
    });

    // Join course room for real-time course interactions
    socket.on('join-course', (courseId: string) => {
      socket.join(`course-${courseId}`);
      console.log(`📚 User ${socket.id} joined course ${courseId}`);
    });

    // Leave course room
    socket.on('leave-course', (courseId: string) => {
      socket.leave(`course-${courseId}`);
      console.log(`📚 User ${socket.id} left course ${courseId}`);
    });

    // Chat handlers
    chatHandler(io, socket);

    // Notification handlers
    notificationHandler(io, socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });

  return io;
};

