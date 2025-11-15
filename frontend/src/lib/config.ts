// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000',
  TIMEOUT: 10000,
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  USER_KEY: 'user',
};

// Socket Configuration
export const SOCKET_CONFIG = {
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 1000,
  TIMEOUT: 20000,
};

// Game Configuration
export const GAME_CONFIG = {
  MAX_LIVES: 3,
  TIME_LIMIT: 60, // seconds
  POINTS_PER_CORRECT: 10,
  BONUS_POINTS: 5,
};

// Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300, // 5 minutes
  MAX_TTL: 3600, // 1 hour
};

export default {
  API_CONFIG,
  AUTH_CONFIG,
  SOCKET_CONFIG,
  GAME_CONFIG,
  UPLOAD_CONFIG,
  PAGINATION_CONFIG,
  CACHE_CONFIG,
};
