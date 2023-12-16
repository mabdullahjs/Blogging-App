import { z } from 'zod';


const schema = z.object({
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
    email:  z.string(),
    uid: z.string(),
    profileUrl: z.string()
});

export default schema;