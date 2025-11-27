import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const listUsersSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  }).partial()
});

export const bulkSameSchema = z.object({
  body: z.object({
    filter: z.any().optional(),
    update: z.record(z.any(),z.any()).optional()
  })
});

export const bulkDifferentSchema = z.object({
  body: z.object({
    operations: z.array(z.any())
  })
});
