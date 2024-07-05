import {z} from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, {
    message: 'Name must have at least 2 characters.',
  })
});
