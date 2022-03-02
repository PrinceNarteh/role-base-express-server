import { z } from 'zod';

export const registerValidator = z.object({
  username: z
    .string({
      invalid_type_error: 'Username should be string.',
      required_error: 'Username is required.',
    })
    .min(3),
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'Password should be at least six(6) character.' }),
});

export const loginValidator = z.object({
  emailOrUsername: z.union([z.string().email(), z.string().min(3)]),
  password: z.string().min(5),
});
