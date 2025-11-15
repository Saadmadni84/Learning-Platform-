import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export interface EmailConfig {
  service: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: Buffer | string;
    contentType?: string;
  }>;
}

export interface WelcomeEmailData {
  username: string;
  email: string;
  verificationUrl?: string;
}

export interface CourseNotificationData {
  username: string;
  courseName: string;
  courseUrl: string;
  achievement?: string;
}

export interface PasswordResetData {
  username: string;
  resetUrl: string;
  expirationTime: string;
}

class EmailService {
  private transporter: Transporter;
  private fromEmail: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@acadevia.com';
    this.transporter = this.createTransporter(); // ✅ Correct method name
  }

  private createTransporter(): Transporter { // ✅ Correct method name
    const emailConfig: EmailConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    };

    // Alternative configuration for custom SMTP
    if (process.env.EMAIL_HOST) {
      return nodemailer.createTransport({ // ✅ Correct nodemailer method
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: emailConfig.auth,
      });
    }

    return nodemailer.createTransport(emailConfig); // ✅ Correct nodemailer method
  }

  /**
   * Send a generic email
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions: SendMailOptions = {
        from: this.fromEmail,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Acadevia</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Welcome to Acadevia!</h1>
            <p>Your gamified learning journey begins here</p>
          </div>
          <div class="content">
            <h2>Hello ${data.username}! 👋</h2>
            <p>We're excited to have you join our gamified learning platform. Get ready to:</p>
            <ul>
              <li>🏆 Earn achievements and badges</li>
              <li>📈 Track your learning progress</li>
              <li>🎮 Complete interactive challenges</li>
              <li>🤝 Connect with fellow learners</li>
            </ul>
            ${data.verificationUrl ? `<p>Please verify your account to get started:</p><a href="${data.verificationUrl}" class="button">Verify Account</a>` : '<p>Your account is ready! Start learning today.</p>'}
          </div>
          <div class="footer">
            <p>Happy learning!<br>The Acadevia Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: data.email,
      subject: '🎓 Welcome to Acadevia - Your Learning Adventure Starts Now!',
      html: htmlContent,
    });
  }

  /**
   * Send course completion or achievement notification
   */
  async sendAchievementEmail(data: CourseNotificationData): Promise<boolean> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Achievement Unlocked!</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; text-align: center; }
          .achievement-badge { font-size: 4em; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏆 Achievement Unlocked!</h1>
          </div>
          <div class="content">
            <div class="achievement-badge">🎉</div>
            <h2>Congratulations ${data.username}!</h2>
            <p>You've successfully completed: <strong>${data.courseName}</strong></p>
            ${data.achievement ? `<p>🏅 <strong>Achievement:</strong> ${data.achievement}</p>` : ''}
            <p>Keep up the excellent work and continue your learning journey!</p>
            <a href="${data.courseUrl}" class="button">Continue Learning</a>
          </div>
          <div class="footer">
            <p>Keep learning, keep growing!<br>The Acadevia Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: data.username, // Assuming username is email, adjust as needed
      subject: '🏆 Achievement Unlocked - Congratulations!',
      html: htmlContent,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(data: PasswordResetData): Promise<boolean> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.username},</h2>
            <p>We received a request to reset your password for your Acadevia account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${data.resetUrl}" class="button">Reset Password</a>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong><br>
              This link will expire on ${data.expirationTime}. If you didn't request this password reset, please ignore this email.
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6c757d;">${data.resetUrl}</p>
          </div>
          <div class="footer">
            <p>Stay secure!<br>The Acadevia Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: data.username, // Assuming username is email, adjust as needed
      subject: '🔐 Password Reset Request - Acadevia',
      html: htmlContent,
    });
  }

  /**
   * Send course enrollment confirmation
   */
  async sendCourseEnrollmentEmail(data: CourseNotificationData): Promise<boolean> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Course Enrollment Confirmed</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📚 Enrollment Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Great news, ${data.username}!</h2>
            <p>You've successfully enrolled in: <strong>${data.courseName}</strong></p>
            <p>🎯 Get ready to:</p>
            <ul>
              <li>Master new skills through interactive lessons</li>
              <li>Earn points and unlock achievements</li>
              <li>Track your progress with detailed analytics</li>
              <li>Join a community of motivated learners</li>
            </ul>
            <p>Start your learning journey now:</p>
            <a href="${data.courseUrl}" class="button">Start Learning</a>
          </div>
          <div class="footer">
            <p>Happy learning!<br>The Acadevia Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: data.username, // Assuming username is email, adjust as needed
      subject: `📚 Welcome to ${data.courseName} - Let's Start Learning!`,
      html: htmlContent,
    });
  }

  /**
   * Send OTP email for phone verification
   */
  async sendOTPEmail(email: string, otp: string, userName: string): Promise<boolean> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; text-align: center; }
          .otp-code { font-size: 2.5em; font-weight: bold; color: #667eea; letter-spacing: 0.1em; margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 10px; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Your OTP Code</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Use this OTP code to complete your verification:</p>
            <div class="otp-code">${otp}</div>
            <p><strong>This code will expire in 5 minutes.</strong></p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Stay secure!<br>The Acadevia Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: '🔐 Your OTP Code - Acadevia',
      html: htmlContent,
    });
  }

  /**
   * Test email configuration
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service is ready to send emails');
      return true;
    } catch (error) {
      console.error('Email service configuration error:', error);
      return false;
    }
  }
}

export default new EmailService();
