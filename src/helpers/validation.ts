import z from 'zod';

export const registerValidator = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export const loginValidator = z.object({
  emailOrUsername: z.union([z.string().email(), z.string().min(3)]),
  password: z.string().min(5),
});
