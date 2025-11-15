


import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import 'dotenv/config';



class EmailService {
  private transporter: Transporter;
  private fromEmail: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@acadevia.com';
    this.transporter = this.createTransporter(); // ✓ Correct method name
  }

  private createTransporter(): Transporter { // ✓ Correct method name
    const emailConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    };

    // Alternative configuration for custom SMTP
    if (process.env.EMAIL_HOST) {
      return nodemailer.createTransport({ // ✓ Correct nodemailer method
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: emailConfig.auth,
      });
    }

    return nodemailer.createTransport(emailConfig); // ✓ Correct nodemailer method
  }

  // ... rest of your methods
}
