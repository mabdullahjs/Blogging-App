import { z } from 'zod';


const schema = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(5).max(300),
    profileUrl: z.string(),
    uid: z.string(),
    username:z.string()
});

export default schema;