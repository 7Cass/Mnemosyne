import {Flashcard} from '@/types/flashcard';

export type Category = {
  id: number;
  name: string;
  slug: string;
  flashcards?: Flashcard[];
};
