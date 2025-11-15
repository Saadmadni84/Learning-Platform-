import { z } from 'zod';

export const multiStepLoginSchema = z.object({
  state: z.string().min(1, 'Please select a state'),
  district: z.string().min(1, 'Please select a district'),
  userId: z.string()
    .min(1, 'User ID is required')
    .refine((val) => val === '777', {
      message: 'Invalid User ID. Please enter 777 to continue.'
    })
});

export type MultiStepLoginFormData = z.infer<typeof multiStepLoginSchema>;
