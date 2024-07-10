import {z} from 'zod';
import {Flashcard} from '@/types/flashcard';
import {Category} from '@/types/category';

export const createCategorySchema = z.object<Category>({
  name: z.string().min(2, {
    message: 'Name must have at least 2 characters.',
  })
});

export const updateCategorySchema = z.object<Category>({
  name: z.string().min(2, {
    message: 'Name must have at least 2 characters.',
  })
});

export const createFlashcardSchema = z.object<Flashcard>({
  question: z.string().min(2, {
    message: 'Question must have at least 2 characters.'
  }),
  answer: z.string().min(2, {
    message: 'Answer must have at least 2 characters.'
  }),
  categoryId: z.coerce.number()
});

export const updateFlashcardSchema = z.object<Flashcard>({
  question: z.string().min(2, {
    message: 'Question must have at least 2 characters.'
  }),
  answer: z.string().min(2, {
    message: 'Answer must have at least 2 characters.'
  }),
  categoryId: z.coerce.number()
});
