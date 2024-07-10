import prisma from '../../prisma';
import {Category} from '@/types/category';

export async function createCategory(data: Pick<Category, 'name' | 'slug'>): Promise<Category> {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug
    }
  });
}

export async function getCategoryById(categoryId: number): Promise<Category | null> {
  return prisma.category.findUnique({where: {id: categoryId}});
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

export async function updateCategory(categoryId: number, data: Pick<Category, 'slug' | 'name'>): Promise<Category> {
  return prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      name: data.name,
      slug: data.slug
    }
  });
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await prisma.category.delete({where: {id: categoryId}});
}
