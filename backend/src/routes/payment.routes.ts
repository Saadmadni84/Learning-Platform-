import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { createPaymentIntentSchema, confirmPaymentSchema } from '../validations/payment.validation';

const router = Router();

// All payment routes require authentication
router.use(authenticateToken);

// Payment intents
router.post('/create-intent', 
  validateRequest(createPaymentIntentSchema), 
  PaymentController.createPaymentIntent
);

router.post('/confirm', 
  validateRequest(confirmPaymentSchema), 
  PaymentController.confirmPayment
);

// Payment methods
router.get('/methods', PaymentController.getPaymentMethods);
router.post('/methods', PaymentController.addPaymentMethod);
router.delete('/methods/:methodId', PaymentController.removePaymentMethod);

// Transactions
router.get('/transactions', PaymentController.getTransactions);
router.get('/transactions/:transactionId', PaymentController.getTransactionDetails);

// Refunds
router.post('/refunds', PaymentController.createRefund);
router.get('/refunds', PaymentController.getRefunds);

// Webhooks
router.post('/webhook/stripe', PaymentController.handleStripeWebhook);
router.post('/webhook/razorpay', PaymentController.handleRazorpayWebhook);

export default router;
