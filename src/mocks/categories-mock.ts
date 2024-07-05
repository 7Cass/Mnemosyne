import type {Category} from '@prisma/client';

export const categoriesMock: Category[] = [
  {
    id: 1,
    name: "Next.js",
    slug: 'next-js'
  },
  {
    id: 2,
    name: "Tailwindcss",
    slug: 'tailwindcss'
  },
  {
    id: 3,
    name: "Typescript",
    slug: 'typescript'
  },
  {
    id: 4,
    name: "NodeJS",
    slug: 'node-js'
  },
  {
    id: 5,
    name: "Design Patterns",
    slug: 'design-patterns'
  }
];
