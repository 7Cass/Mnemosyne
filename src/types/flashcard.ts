import {Category} from '@/types/category';

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  slug: string;
  categoryId: number;
  category?: Category
};
