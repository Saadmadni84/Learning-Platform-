import { createClient, RedisClientType } from 'redis';
import { env } from './env';
import { logger } from '../utils/logger';

class RedisService {
  private client: RedisClientType | null = null;
  private isConnected = false;

  async connect(): Promise<void> {
    try {
      this.client = createClient({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        database: env.REDIS_DB,
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            logger.error('Redis server connection refused');
            return new Error('Redis server connection refused');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            logger.error('Redis retry time exhausted');
            return new Error('Retry time exhausted');
          }
          if (options.attempt > 10) {
            logger.error('Redis max retry attempts reached');
            return undefined;
          }
          return Math.min(options.attempt * 100, 3000);
        },
      });

      this.client.on('error', (err) => {
        logger.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        logger.info('Redis Client Connected');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        logger.info('Redis Client Ready');
      });

      this.client.on('end', () => {
        logger.info('Redis Client Disconnected');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      this.isConnected = false;
    }
  }

  getClient(): RedisClientType | null {
    return this.client;
  }

  isRedisConnected(): boolean {
    return this.isConnected && this.client !== null;
  }

  // Cache operations
  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.client) throw new Error('Redis client not connected');
    
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await this.client.setEx(key, ttl, serializedValue);
    } else {
      await this.client.set(key, serializedValue);
    }
  }

  async get(key: string): Promise<any> {
    if (!this.client) throw new Error('Redis client not connected');
    
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string): Promise<void> {
    if (!this.client) throw new Error('Redis client not connected');
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client) throw new Error('Redis client not connected');
    const result = await this.client.exists(key);
    return result === 1;
  }

  async expire(key: string, ttl: number): Promise<void> {
    if (!this.client) throw new Error('Redis client not connected');
    await this.client.expire(key, ttl);
  }

  // Session management
  async setSession(sessionId: string, sessionData: any, ttl: number = 3600): Promise<void> {
    await this.set(`session:${sessionId}`, sessionData, ttl);
  }

  async getSession(sessionId: string): Promise<any> {
    return await this.get(`session:${sessionId}`);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.del(`session:${sessionId}`);
  }

  // Rate limiting
  async incrementRateLimit(key: string, window: number = 60): Promise<number> {
    if (!this.client) throw new Error('Redis client not connected');
    
    const current = await this.client.incr(key);
    if (current === 1) {
      await this.client.expire(key, window);
    }
    return current;
  }

  // Cache for API responses
  async cacheApiResponse(endpoint: string, data: any, ttl: number = 300): Promise<void> {
    await this.set(`api:${endpoint}`, data, ttl);
  }

  async getCachedApiResponse(endpoint: string): Promise<any> {
    return await this.get(`api:${endpoint}`);
  }

  // User-specific caching
  async cacheUserData(userId: string, data: any, ttl: number = 1800): Promise<void> {
    await this.set(`user:${userId}`, data, ttl);
  }

  async getCachedUserData(userId: string): Promise<any> {
    return await this.get(`user:${userId}`);
  }

  async invalidateUserCache(userId: string): Promise<void> {
    await this.del(`user:${userId}`);
  }

  // Leaderboard caching
  async cacheLeaderboard(type: string, data: any, ttl: number = 300): Promise<void> {
    await this.set(`leaderboard:${type}`, data, ttl);
  }

  async getCachedLeaderboard(type: string): Promise<any> {
    return await this.get(`leaderboard:${type}`);
  }

  // Game progress caching
  async cacheGameProgress(userId: string, progress: any, ttl: number = 3600): Promise<void> {
    await this.set(`progress:${userId}`, progress, ttl);
  }

  async getCachedGameProgress(userId: string): Promise<any> {
    return await this.get(`progress:${userId}`);
  }
}

// Create singleton instance
const redisService = new RedisService();

export default redisService;
export { RedisService };