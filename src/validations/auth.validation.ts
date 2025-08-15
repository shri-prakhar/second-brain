import { z } from "zod"

export const signupSchema = z.object ({
    name: z.string().min(3), 
    email:z.string().email(), 
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[\W_]/).max(20)
});

export const signinSchema = z.object({
    email:z.string().email(), 
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[\W_]/).max(20)
});


