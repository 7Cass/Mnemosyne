'use server';

import {z} from 'zod';
import {createCategorySchema} from '@/app/manage/schemas';
import {createCategory, getAllCategories, getCategoryBySlug} from '@/data-access/category';
import slugify from 'slugify';
import {revalidatePath} from 'next/cache';
import {Category} from '@/types/category';

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

export async function getAllCategoriesAction(): Promise<Category[]> {
  return await getAllCategories();
}
