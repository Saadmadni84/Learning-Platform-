import { Server, Socket } from 'socket.io';

export const chatHandler = (io: Server, socket: Socket) => {
  // Send message in course chat
  socket.on('send-message', (data: {
    courseId: string;
    message: string;
    userId: string;
    username: string;
  }) => {
    const { courseId, message, userId, username } = data;
    
    // Broadcast message to all users in the course
    io.to(`course-${courseId}`).emit('new-message', {
      id: Date.now().toString(),
      message,
      userId,
      username,
      timestamp: new Date().toISOString(),
      courseId
    });
  });

  // Send private message
  socket.on('send-private-message', (data: {
    recipientId: string;
    message: string;
    senderId: string;
    senderName: string;
  }) => {
    const { recipientId, message, senderId, senderName } = data;
    
    // Send to recipient's room
    io.to(`user-${recipientId}`).emit('private-message', {
      id: Date.now().toString(),
      message,
      senderId,
      senderName,
      timestamp: new Date().toISOString()
    });
  });

  // Typing indicators
  socket.on('typing-start', (data: { courseId: string; userId: string; username: string }) => {
    socket.to(`course-${data.courseId}`).emit('user-typing', {
      userId: data.userId,
      username: data.username
    });
  });

  socket.on('typing-stop', (data: { courseId: string; userId: string }) => {
    socket.to(`course-${data.courseId}`).emit('user-stopped-typing', {
      userId: data.userId
    });
  });
};