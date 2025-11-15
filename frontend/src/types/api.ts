export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    email?: string;
    userType: string;
    grade?: string;
    avatar?: string;
  };
  message?: string;
}

export interface OTPRequest {
  phoneNumber: string;
  userType: string;
}

export interface OTPVerifyRequest {
  phoneNumber: string;
  otp: string;
  userType: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  userType: string;
  grade?: string;
  avatar?: string;
}

export interface PhoneCheckResponse {
  exists: boolean;
  userType?: string;
}
