import { z, ZodError } from 'zod';

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

export const createPostValidator = z.object({
  title: z
    .string({
      required_error: 'Title of the a post is required.',
    })
    .min(3, {
      message: 'Title of a post cannot be less than three(3) characters.',
    }),
  content: z
    .string({
      required_error: 'Content of the a post is required.',
    })
    .min(10, {
      message: 'Content of a post cannot be less than ten(10) characters.',
    }),
});

export const updatePostValidator = z.object({
  title: z
    .string({
      required_error: 'Title of the a post is required.',
    })
    .min(3, {
      message: 'Title of a post cannot be less than three(3) characters.',
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content of the a post is required.',
    })
    .min(10, {
      message: 'Content of a post cannot be less than ten(10) characters.',
    })
    .optional(),
});

export const validationError = (data: ZodError) => {
  return data.errors.map((error) => error.message);
};
