import { z } from 'zod';

export const createPaymentIntentSchema = z.object({
  courseId: z.string().uuid('Invalid course ID'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.enum(['usd', 'inr', 'eur', 'gbp']).default('usd'),
  provider: z.enum(['stripe', 'razorpay']).default('stripe'),
  discountCode: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  paymentMethodId: z.string().optional(),
  returnUrl: z.string().url().optional(),
});

export const addPaymentMethodSchema = z.object({
  type: z.enum(['card', 'bank_account', 'upi']),
  card: z.object({
    number: z.string().min(13).max(19),
    expMonth: z.number().min(1).max(12),
    expYear: z.number().min(new Date().getFullYear()),
    cvc: z.string().min(3).max(4),
  }).optional(),
  bankAccount: z.object({
    accountNumber: z.string().min(8),
    routingNumber: z.string().min(8),
    accountHolderName: z.string().min(2),
  }).optional(),
  upi: z.object({
    upiId: z.string().email('Invalid UPI ID'),
  }).optional(),
});

export const createRefundSchema = z.object({
  transactionId: z.string().uuid('Invalid transaction ID'),
  amount: z.number().positive('Refund amount must be positive').optional(),
  reason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer']).optional(),
  metadata: z.record(z.string()).optional(),
});

export const getTransactionsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  status: z.enum(['pending', 'succeeded', 'failed', 'cancelled']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const getTransactionDetailsSchema = z.object({
  transactionId: z.string().uuid('Invalid transaction ID'),
});

export const getRefundsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  status: z.enum(['pending', 'succeeded', 'failed', 'cancelled']).optional(),
  transactionId: z.string().uuid().optional(),
});