import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from './config';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = SOCKET_CONFIG.RECONNECTION_ATTEMPTS;

  connect(token?: string): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';
    
    this.socket = io(wsUrl, {
      auth: {
        token: token || (typeof window !== 'undefined' ? localStorage.getItem('authToken') : null),
      },
      transports: ['websocket', 'polling'],
      timeout: SOCKET_CONFIG.TIMEOUT,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
    });

    this.setupEventListeners();
    return this.socket;
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`✅ Socket reconnected after ${attemptNumber} attempts`);
      this.reconnectAttempts = 0;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('❌ Socket reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Socket reconnection failed');
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Game-related socket events
  joinGame(gameId: string): void {
    if (this.socket) {
      this.socket.emit('join-game', { gameId });
    }
  }

  leaveGame(gameId: string): void {
    if (this.socket) {
      this.socket.emit('leave-game', { gameId });
    }
  }

  submitAnswer(gameId: string, answer: any): void {
    if (this.socket) {
      this.socket.emit('submit-answer', { gameId, answer });
    }
  }

  onGameUpdate(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('game-update', callback);
    }
  }

  onGameEnd(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('game-end', callback);
    }
  }

  // Notification events
  onNotification(callback: (notification: any) => void): void {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  onNotificationRead(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('notification-read', callback);
    }
  }

  // Chat events
  joinChat(chatId: string): void {
    if (this.socket) {
      this.socket.emit('join-chat', { chatId });
    }
  }

  leaveChat(chatId: string): void {
    if (this.socket) {
      this.socket.emit('leave-chat', { chatId });
    }
  }

  sendMessage(chatId: string, message: string): void {
    if (this.socket) {
      this.socket.emit('send-message', { chatId, message });
    }
  }

  onMessage(callback: (message: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  onUserJoined(callback: (user: any) => void): void {
    if (this.socket) {
      this.socket.on('user-joined', callback);
    }
  }

  onUserLeft(callback: (user: any) => void): void {
    if (this.socket) {
      this.socket.on('user-left', callback);
    }
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // Remove all listeners
  removeAllListeners(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  // Remove specific listener
  removeListener(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.removeListener(event, callback);
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
export { SocketService };