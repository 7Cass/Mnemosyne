'use server';

import {z} from 'zod';
import {
  createCategorySchema,
  createFlashcardSchema,
  updateCategorySchema,
  updateFlashcardSchema
} from '@/app/manage/schemas';
import {
  createCategory, deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory
} from '@/data-access/category';
import slugify from 'slugify';
import {revalidatePath} from 'next/cache';
import {Category} from '@/types/category';
import {Flashcard} from '@/types/flashcard';
import {
  createFlashcard,
  deleteFlashcard,
  getAllFlashcards,
  getFlashcardById,
  getFlashcardBySlug, updateFlashcard
} from '@/data-access/flashcard';

type ActionReturn<T> =
  | { response: T; error: null }
  | { response: null; error: string };

export async function createCategoryAction(data: z.infer<typeof createCategorySchema>): Promise<ActionReturn<Category>> {
  const slug = slugify(data.name, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g
  });

  const categoryExists = await getCategoryBySlug(slug);

  if (categoryExists) {
    return {
      error: 'Category already exists.',
      response: null
    };
  }

  const newCategory = await createCategory({
    name: data.name,
    slug
  });

  revalidatePath('/manage');
  return {
    response: newCategory,
    error: null,
  };
}

export async function updateCategoryAction(categoryId: number, data: z.infer<typeof updateCategorySchema>): Promise<ActionReturn<Category>> {
  const slug = slugify(data.name, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g
  });

  const categoryExists = await getCategoryBySlug(slug);

  if (categoryExists) {
    return {
      error: 'Category already exists.',
      response: null,
    };
  }

  data.slug = slug;

  const updatedCategory = await updateCategory(categoryId, data);

  revalidatePath('/manage');
  return {
    error: null,
    response: updatedCategory
  };
}

export async function deleteCategoryAction(categoryId: number): Promise<ActionReturn<null>> {
  const categoryExists = await getCategoryById(categoryId);

  if (!categoryExists) {
    return {
      response: null,
      error: 'Category not found.'
    };
  }

  await deleteCategory(categoryId);

  revalidatePath('/manage');
  return {
    response: null,
    error: null
  };
}

export async function createFlashcardAction(data: z.infer<typeof createFlashcardSchema>): Promise<ActionReturn<Flashcard>> {
  const slug = slugify(data.question, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!?:@]/g
  });

  const flashcardExists = await getFlashcardBySlug(slug);

  if (flashcardExists) {
    return {
      error: 'Flashcard already exists.',
      response: null
    };
  }

  const newFlashcard = await createFlashcard({
    ...data,
    slug
  });

  revalidatePath('/manage');
  return {
    response: newFlashcard,
    error: null,
  };
}

export async function getAllCategoriesAction(): Promise<Category[]> {
  return await getAllCategories();
}

export async function getAllFlashcardsAction(): Promise<Flashcard[]> {
  return await getAllFlashcards();
}

export async function updateFlashcardAction(flashcardId: number, data: z.infer<typeof updateFlashcardSchema>): Promise<ActionReturn<Flashcard>> {
  const slug = slugify(data.question, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g
  });

  const flashcardExists = await getFlashcardBySlug(slug);

  if (flashcardExists) {
    return {
      error: 'Flashcard already exists.',
      response: null,
    };
  }

  data.slug = slug;

  const updatedFlashcard = await updateFlashcard(flashcardId, data);

  revalidatePath('/manage');
  return {
    error: null,
    response: updatedFlashcard
  };
}

export async function deleteFlashcardAction(flashcardId: number): Promise<ActionReturn<null>> {
  const flashcardExists = await getFlashcardById(flashcardId);

  if (!flashcardExists) {
    return {
      response: null,
      error: 'Flashcard not found.'
    };
  }

  await deleteFlashcard(flashcardId);

  revalidatePath('/manage');
  return {
    response: null,
    error: null
  };
}
