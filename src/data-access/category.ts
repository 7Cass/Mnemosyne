import prisma from '../../prisma';
import {Category} from '@/types/category';

export async function createCategory(data: Pick<Category, 'name' | 'slug'>): Promise<Category> {
  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug
    }
  });
}

export async function getAllCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return prisma.category.findFirst({
    where: {
      slug
    },
  });
}
