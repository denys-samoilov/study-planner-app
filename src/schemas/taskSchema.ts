import { z } from 'zod';
import type { Priority } from '../types/task';

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Name required')
    .max(120, 'Name cannot exceed 120 characters'),
  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters'),
  category: z
    .string()
    .trim()
    .min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high'] satisfies readonly [Priority, Priority, Priority]),
});

export type TaskFormData = z.infer<typeof taskSchema>;