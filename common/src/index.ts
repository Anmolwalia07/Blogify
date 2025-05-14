import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;