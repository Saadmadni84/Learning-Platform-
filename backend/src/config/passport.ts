import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from './database';
import { env } from './env';

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
}, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        avatar: true,
        level: true,
        experience: true,
        points: true,
        badges: true,
        achievements: true,
      }
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// Local Strategy for email/password login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return done(null, false, { message: 'Please verify your email before logging in' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return done(null, userWithoutPassword);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        avatar: true,
        level: true,
        experience: true,
        points: true,
        badges: true,
        achievements: true,
      }
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;