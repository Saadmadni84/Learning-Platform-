import { z } from 'zod';

export const loginFormSchema = z.object({
  state: z.string().min(1, 'Please select a state'),
  school: z.string().min(1, 'Please select a school'),
  studentId: z.string()
    .min(1, 'Student ID is required')
    .refine((val) => val === '777' || val === '555', {
      message: 'Invalid Student ID. Please enter 777 or 555 to continue.'
    })
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// Individual step schemas for progressive validation
export const stateSelectionSchema = z.object({
  state: z.string().min(1, 'Please select a state')
});

export const schoolSelectionSchema = z.object({
  state: z.string().min(1, 'Please select a state'),
  school: z.string().min(1, 'Please select a school')
});

export const studentIdSchema = z.object({
  studentId: z.string()
    .min(1, 'Student ID is required')
    .refine((val) => val === '777' || val === '555', {
      message: 'Invalid Student ID. Please enter 777 or 555 to continue.'
    })
});
