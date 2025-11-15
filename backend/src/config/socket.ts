import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { env } from './env';

export const createSocketServer = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Socket middleware for authentication
  io.use((socket, next) => {
    // Add authentication logic here if needed
    // For now, allow all connections
    next();
  });

  return io;
};

export default createSocketServer;