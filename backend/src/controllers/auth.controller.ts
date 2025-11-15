import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { generateOTP, isValidEmail } from '../utils/helpers';
import emailService from '../services/email.service';

export class AuthController {
  // POST /auth/signup
  static async signup(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, role = 'STUDENT' } = req.body;
      
      // Input validation
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email and password are required' 
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid email format' 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({ 
          success: false, 
          message: 'Password must be at least 6 characters long' 
        });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User already exists with this email' 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Generate username from email
      const username = email.split('@')[0] + Math.random().toString(36).substr(2, 4);
      
      // Create user
      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          username,
          password: hashedPassword,
          firstName: firstName || '',
          lastName: lastName || '',
          role: role.toUpperCase(),
          isVerified: false,
          emailVerificationToken: generateOTP(),
          emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          emailVerificationToken: true,
          createdAt: true
        }
      });

      // Send verification email
      try {
        await emailService.sendEmail({
          to: user.email,
          subject: 'Verify your Acadevia account',
          html: `
            <h2>Welcome to Acadevia!</h2>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}">
              Verify Email
            </a>
            <p>This link will expire in 24 hours.</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail signup if email fails
      }

      res.status(201).json({
        success: true,
        message: 'User created successfully. Please check your email for verification.',
        user
      });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during signup' 
      });
    }
  }

  // POST /auth/login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          level: true,
          points: true,
          badges: true,
          achievements: true,
          avatar: true,
          bio: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_JWT_SECRET!,
        { expiresIn: '7d' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        accessToken,
        refreshToken
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during login' 
      });
    }
  }

  // POST /auth/send-otp
  static async sendOTP(req: Request, res: Response) {
    try {
      const { email, type = 'email' } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Update user with OTP
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerificationToken: otp,
          emailVerificationExpires: otpExpiry
        }
      });

      // Send OTP via email
      try {
        await emailService.sendEmail({
          to: user.email,
          subject: 'Your Acadevia OTP',
          html: `
            <h2>Your OTP Code</h2>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>
          `
        });

        res.status(200).json({
          success: true,
          message: 'OTP sent successfully'
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        res.status(500).json({
          success: false,
          message: 'Failed to send OTP'
        });
      }

    } catch (error) {
      console.error('Send OTP error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during OTP sending' 
      });
    }
  }

  // POST /auth/verify-otp
  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp, type = 'email' } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required'
        });
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check OTP
      if (user.emailVerificationToken !== otp) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP'
        });
      }

      // Check expiry
      if (!user.emailVerificationExpires || user.emailVerificationExpires < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'OTP has expired'
        });
      }

      // Verify user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          emailVerificationToken: null,
          emailVerificationExpires: null
        }
      });

      res.status(200).json({
        success: true,
        message: 'Email verified successfully'
      });

    } catch (error) {
      console.error('Verify OTP error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during OTP verification' 
      });
    }
  }

  // POST /auth/logout
  static async logout(req: Request, res: Response) {
    try {
      // In a real app, you might want to blacklist the token
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during logout' 
      });
    }
  }

  // POST /auth/refresh-token
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        });
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!) as any;
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      res.status(200).json({
        success: true,
        accessToken
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(401).json({ 
        success: false, 
        message: 'Invalid refresh token' 
      });
    }
  }
}