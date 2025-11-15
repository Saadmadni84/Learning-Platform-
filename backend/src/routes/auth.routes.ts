import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { 
  validateSignup, 
  validateLogin, 
  validateSendOTP, 
  validateVerifyOTP, 
  validateRefreshToken 
} from '../validations/auth.validation';

const router = Router();

router.post('/signup', validateSignup, AuthController.signup);
router.post('/login', validateLogin, AuthController.login);
router.post('/send-otp', validateSendOTP, AuthController.sendOTP);
router.post('/verify-otp', validateVerifyOTP, AuthController.verifyOTP);
router.post('/resend-otp', validateSendOTP, AuthController.sendOTP);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', validateRefreshToken, AuthController.refreshToken);

export default router;
