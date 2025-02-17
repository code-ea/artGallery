import { z } from "zod";

export const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).regex(/^[a-zA-Z]+$/),
  lastName: z.string().min(1).regex(/^[a-zA-Z]+$/),
  password: z.string().min(6),
});

export const signinBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateBody = z.object({
  email: z.string().email(), // Removed unnecessary `.min(1).regex(...)`
  firstName: z.string().min(1).regex(/^[a-zA-Z]+$/),
  lastName: z.string().min(1).regex(/^[a-zA-Z]+$/),
  password: z.string().min(6),
});

// Exporting TypeScript types for validation
export type SignupBodyType = z.infer<typeof signupBody>;
export type SigninBodyType = z.infer<typeof signinBody>;
export type UpdateBodyType = z.infer<typeof updateBody>;