import {Flashcard} from '@/types/flashcard';
import prisma from '../../prisma';

export async function createFlashcard(data: Pick<Flashcard, 'question' | 'answer' | 'slug' | 'categoryId'>): Promise<Flashcard> {
  return prisma.flashcard.create({
    data
  });
}

export async function getFlashcardById(flashcardId: number): Promise<Flashcard | null> {
  return prisma.flashcard.findUnique({where: {id: flashcardId}});
}

export async function getAllFlashcards(): Promise<Flashcard[]> {
  return prisma.flashcard.findMany({
    include: {
      category: true
    }
  });
}

export async function getFlashcardBySlug(slug: string): Promise<Flashcard | null> {
  return prisma.flashcard.findFirst({
    where: {
      slug
    }
  });
}

export async function updateFlashcard(flashcardId: number, data: Flashcard): Promise<Flashcard> {
  return prisma.flashcard.update({where: {id: flashcardId}, data: {...data}});
}

export async function deleteFlashcard(flashcardId: number): Promise<void> {
  await prisma.flashcard.delete({where: {id: flashcardId}});
}
